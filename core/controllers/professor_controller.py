# core/controllers/professor_controller.py
from django.http import JsonResponse

def listar_professores(request):
    return JsonResponse({"mensagem": "API Professores funcionando!"})