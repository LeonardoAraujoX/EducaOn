from django.urls import path
from core.controllers import aluno_controller

urlpatterns = [
    path('alunos/', aluno_controller.listar_alunos),
    path('alunos/<init:id>', aluno_controller.listar_aluno),
    path('alunos/criar/', aluno_controller.criar_aluno),
    path('alunos/atualizar/<init:id>',aluno_controller.atualizar_aluno),
    path('alunos/deletar/<init:id>',aluno_controller.deletar_aluno),
]
