from django.views.decorators.csrf import csrf_exempt
from core.repositories.servico_repository import servico_repository
from django.http import JsonResponse
import json


@csrf_exempt
def listar_servicos(request):
    if request.method == 'GET':
        servicos = servico_repository.listar_servicos()
        dados = [{
            "id":servico.id,
            "preco":float(servico.preco),
            "descricao":servico.descricao
        } for servico in servicos]
        return JsonResponse({"servicos" : dados})

    return JsonResponse({"erro": "Método não permitido"}, status=405)

@csrf_exempt
def listar_servico(request,id):
    if request.method == 'GET':
        servico = servico_repository.listar_servico(id)
        dados = {
            "id":servico.id,
            "preco":float(servico.preco),
            "descricao":servico.descricao
        }
        return JsonResponse({"servico" : dados})

    return JsonResponse({"erro": "serviço não pode ser acessado"}, status=405)

@csrf_exempt
def criar_servico(request):
    if request.method == 'POST':
        dados = json.loads(request.body.decode('utf-8'))
        preco = dados.get("preco")
        descricao = dados.get("descricao")
        
        servico = servico_repository.criar_servico(preco,descricao)   
        return JsonResponse({
            "mensagem": "Serviço criado com sucesso!",
            "aluno": {
                "id": servico.id,
                "preço": float(servico.preco),
                "descrição":servico.descricao
            }
        }, status=201)

    return JsonResponse({"erro": "Método não permitido"}, status=405)


@csrf_exempt
def atualizar_servico(request, id):
    if request.method == 'PUT':
        dados = json.loads(request.body.decode('utf-8'))
        preco = dados.get("preco")
        descricao = dados.get("descricao")

        servico = servico_repository.atualizar_servico(id, preco=preco, descricao=descricao)
        if not servico:
            return JsonResponse({"erro": "Serviço não encontrado"}, status=404)
        return JsonResponse({"mensagem": "Serviço atualizado com sucesso!"})
    return JsonResponse({"erro": "Método não permitido"}, status=405)

@csrf_exempt
def deletar_servico(request, id):
    if request.method == 'DELETE':
        servico = servico_repository.deletar_servico(id)
        if not servico:
            return JsonResponse({"erro": "Serviço não encontrado"}, status=404)
        return JsonResponse({"mensagem": "Serviço deletado!"})
    return JsonResponse({"erro": "Método não permitido"}, status=405)