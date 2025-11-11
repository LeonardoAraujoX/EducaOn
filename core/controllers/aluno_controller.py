from django.views.decorators.csrf import csrf_exempt
from core.repositories.aluno_repository import Aluno_repository 
import json
from django.http import JsonResponse

@csrf_exempt
def listar_alunos(request):
    if request.method == 'GET':
        alunos = Aluno_repository.listar_alunos()
        return JsonResponse(alunos,safe=False)
    else:
          return JsonResponse({'erro': 'alunos não encontrados'}, status=405)