from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from datetime import datetime
from core.repositories.agendamento_repository import AgendamentoRepository
import os
import requests

repo = AgendamentoRepository()


def gerar_sala_meet():
    DAILY_API_KEY = os.getenv("DAILY_API_KEY")
    
    url = "https://api.daily.co/v1/rooms"
    headers = {
        "Authorization": f"Bearer {DAILY_API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json={"privacy": "public"}, headers=headers)

    if response.status_code != 200:
        return None  

    data = response.json()
    return data["url"]


def listar_agendamentos_professor(request, professor_id):
    agendamentos = repo.listar_ativos_por_professor(professor_id)
    dados = [{
        "id": a.id,
        "aluno": a.aluno.nome,
        "data_agendamento": a.data_agendamento,
        "duracao_minutos": a.duracao_minutos,
        "status": a.status,
        "descricao": a.descricao
    } for a in agendamentos]
    return JsonResponse({"agendamentos": dados})

def listar_agendamentos_aluno(request, aluno_id):
    agendamentos = repo.listar_ativos_por_aluno(aluno_id)
    dados = [{
        "id": a.id,
        "professor": a.professor.nome,
        "data_agendamento": a.data_agendamento,
        "duracao_minutos": a.duracao_minutos,
        "status": a.status,
        "descricao": a.descricao
    } for a in agendamentos]
    return JsonResponse({"agendamentos": dados})

def listar_agendamentos_ativos_professor(request, professor_id):
    """Lista agendamentos ATIVOS de um professor"""
    agendamentos = repo.listar_ativos_por_professor(professor_id)
    dados = [{
        "id": a.id,
        "aluno": a.aluno.nome,
        "data_agendamento": a.data_agendamento,
        "duracao_minutos": a.duracao_minutos,
        "status": a.status
    } for a in agendamentos]
    return JsonResponse({"agendamentos_ativos": dados})

def listar_agendamentos_ativos_aluno(request, aluno_id):
    """Lista agendamentos ATIVOS de um aluno"""
    agendamentos = repo.listar_ativos_por_aluno(aluno_id)
    dados = [{
        "id": a.id,
        "professor": a.professor.nome,
        "data_agendamento": a.data_agendamento,
        "duracao_minutos": a.duracao_minutos,
        "status": a.status
    } for a in agendamentos]
    return JsonResponse({"agendamentos_ativos": dados})

def buscar_agendamento(request, id):
    agendamento = repo.buscar_por_id(id)
    if agendamento:
        return JsonResponse({
            "id": agendamento.id,
            "professor": {
                "id": agendamento.professor.id,
                "nome": agendamento.professor.nome
            },
            "aluno": {
                "id": agendamento.aluno.id,
                "nome": agendamento.aluno.nome
            },
            "data_agendamento": agendamento.data_agendamento,
            "duracao_minutos": agendamento.duracao_minutos,
            "status": agendamento.status,
            "descricao": agendamento.descricao
        })
    return JsonResponse({"erro": "Agendamento não encontrado"}, status=404)

@csrf_exempt
def criar_agendamento(request):
    if request.method == "POST":
        professor_id = request.POST.get("professor_id")
        aluno_id = request.POST.get("aluno_id")
        servico_id = request.POST.get("servico_id") 
        data_agendamento_str = request.POST.get("data_agendamento")
        duracao_minutos = int(request.POST.get("duracao_minutos", 60))
        
        data_agendamento = datetime.fromisoformat(data_agendamento_str.replace('Z', '+00:00'))
        
        if repo.verificar_conflito(professor_id, data_agendamento, duracao_minutos):
            return JsonResponse({"erro": "Conflito de horário com outro agendamento"}, status=400)
        
        agendamento = repo.criar(
            professor_id=professor_id,
            aluno_id=aluno_id,
            servico_id=servico_id,
            data_agendamento=data_agendamento,
            duracao_minutos=duracao_minutos
        )

        meeting_url = gerar_sala_meet()
        
        return JsonResponse({
            "mensagem": "Agendamento criado com sucesso!",
            "id": agendamento.id,
            "meeting_url": meeting_url
        })
    return JsonResponse({"erro": "Método não permitido"}, status=405)

@csrf_exempt
def atualizar_status_agendamento(request, id):
    if request.method == "POST":
        novo_status = request.POST.get("status")
        agendamento = repo.atualizar_status(id, novo_status)
        if agendamento:
            return JsonResponse({"mensagem": f"Status atualizado para {novo_status}"})
        return JsonResponse({"erro": "Agendamento não encontrado"}, status=404)
    return JsonResponse({"erro": "Método não permitido"}, status=405)

@csrf_exempt
def deletar_agendamento(request, id):
    if request.method == "DELETE":
        sucesso = repo.deletar(id)
        if sucesso:
            return JsonResponse({"mensagem": "Agendamento deletado!"})
        return JsonResponse({"erro": "Agendamento não encontrado"}, status=404)
    
