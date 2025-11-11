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
    if request.method == "POST":
        professor = repo.criar(
            nome=request.POST.get("nome"),
            email=request.POST.get("email"),
            especialidade=request.POST.get("especialidade")
        )
        return JsonResponse({
            "mensagem": "Professor criado com sucesso!",
            "id": professor.id
        })
    return JsonResponse({"erro": "Método não permitido"}, status=405)