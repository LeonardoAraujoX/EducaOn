from django.urls import path
from core.controllers import aluno_controller

urlpatterns = [
    path('alunos/', aluno_controller.listar_alunos),
    path('alunos/<int:id>/', aluno_controller.listar_aluno),  # ← int, não init
    path('alunos/criar/', aluno_controller.criar_aluno),
    path('alunos/atualizar/<int:id>/', aluno_controller.atualizar_aluno),  # ← int
    path('alunos/deletar/<int:id>/', aluno_controller.deletar_aluno),  # ← int
]