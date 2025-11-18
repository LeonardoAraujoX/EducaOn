from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from core.repositories.professor_repository import ProfessorRepository

repo = ProfessorRepository()

def listar_professores(request):
    professores = repo.listar_ativos()
    dados = [{
        "id": p.id,
        "nome": p.nome,
        "email": p.email, 
        "especialidade": p.especialidade
    } for p in professores]
    return JsonResponse({"professores": dados})

def buscar_professor(request, id):
    professor = repo.buscar_por_id(id)
    if professor:
        return JsonResponse({
            "id": professor.id,
            "nome": professor.nome,
            "email": professor.email,
            "especialidade": professor.especialidade,
            "ativo": professor.ativo
        })
    return JsonResponse({"erro": "Professor não encontrado"}, status=404)


@csrf_exempt
def criar_professor(request):
    if request.method == 'POST':
        try:
            print("Dados recebidos:", dict(request.POST))  
            professor = repo.criar(
                nome = request.POST.get("nome"),
                email = request.POST.get("email"),
                especialidade = request.POST.get("especialidade"),
                password = request.POST.get("senha"),  
                foto = request.POST.get("foto"), 
                preco_hora = request.POST.get("preco_hora", 80.00),
                minutos_disponiveis = request.POST.get("minutos_disponiveis", 240)
            )
            return JsonResponse({
                "mensagem":"✅ Professor criado com sucesso!",
                "professor":{
                    "id": professor.id,
                    "nome": professor.nome,
                    "email": professor.email,
                    "especialidade": professor.especialidade,
                    "foto": professor.foto,  # 👈 Campos novos no response
                    "preco_hora": float(professor.preco_hora),
                    "minutos_disponiveis": professor.minutos_disponiveis
                }
            }, status=201)
        except ValueError as e:
            return JsonResponse({"erro": "❌ " + str(e)}, status=400)
        
@csrf_exempt
def deletar_professor(request, id):
    if request.method == "DELETE":
        sucesso = repo.deletar(id)
        if sucesso:
            return JsonResponse({"mensagem": "Professor Deletado!"})
        return JsonResponse({"erro": "Professor não encontrado"}, status=404)