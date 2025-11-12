from django.views.decorators.csrf import csrf_exempt
from core.repositories.aluno_repository import aluno_repository
from django.http import JsonResponse
import json


@csrf_exempt
def listar_alunos(request):
    if request.method == 'GET':
        alunos = aluno_repository.listar_alunos()
        dados = [{
            "id": aluno.id,
            "nome": aluno.nome,
            "email": aluno.email,
            "numero": aluno.numero
        } for aluno in alunos]
        return JsonResponse({"alunos": dados})
    return JsonResponse({"erro": "Método não permitido"}, status=405)


@csrf_exempt
def listar_aluno(request, id):
    aluno = aluno_repository.listar_aluno(id)
    if not aluno:
        return JsonResponse({"erro": "Aluno não encontrado"}, status=404)

    dados = {
        "id": aluno.id,
        "nome": aluno.nome,
        "email": aluno.email,
        "numero": aluno.numero
    }
    return JsonResponse(dados, safe=False)


@csrf_exempt
def criar_aluno(request):
    if request.method == 'POST':
        dados = json.loads(request.body.decode('utf-8'))
        nome = dados.get("nome")
        email = dados.get("email")
        numero = dados.get("numero")
        aluno = aluno_repository.criar_aluno(nome, email, numero)

        return JsonResponse({
            "mensagem": "Aluno criado com sucesso!",
            "aluno": {
                "id": aluno.id,
                "nome": aluno.nome,
                "email": aluno.email,
                "numero": aluno.numero
            }
        }, status=201)
    return JsonResponse({"erro": "Método não permitido"}, status=405)


@csrf_exempt
def atualizar_aluno(request, id):
    if request.method == 'PUT':
        dados = json.loads(request.body.decode('utf-8'))
        aluno = aluno_repository.atualizar_aluno(
            id,
            nome=dados.get("nome"),
            email=dados.get("email"),
            numero=dados.get("numero")
        )
        if not aluno:
            return JsonResponse({"erro": "Aluno não encontrado"}, status=404)
        return JsonResponse({"mensagem": "Aluno atualizado com sucesso"}, status=200)
    return JsonResponse({"erro": "Método não permitido"}, status=405)


@csrf_exempt
def deletar_aluno(request, id):
    if request.method == 'DELETE':
        deletado = aluno_repository.deletar_aluno(id)
        if not deletado:
            return JsonResponse({"erro": "Aluno não encontrado"}, status=404)
        return JsonResponse({"mensagem": "Aluno deletado com sucesso"}, status=200)
    return JsonResponse({"erro": "Método não permitido"}, status=405)




     
     

     
    
