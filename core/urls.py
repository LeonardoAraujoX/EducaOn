from django.urls import path
from .controllers import professor_controller
from .controllers import aluno_controller

urlpatterns = [
    path('professores/', professor_controller.listar_professores),  # GET
    path('professores/criar/', professor_controller.criar_professor),  # POST
    path('professores/<int:id>/', professor_controller.buscar_professor),  # GET
    path('professores/<int:id>/deletar/', professor_controller.deletar_professor),  # DELETE

    path('alunos/',aluno_controller.listar_alunos),
    path('alunos/<int:id>',aluno_controller.listar_aluno),
    path('alunos/criar/', aluno_controller.criar_aluno),
    path('alunos/atualizar/<int:id>/', aluno_controller.atualizar_aluno),
    path('alunos/deletar/<int:id>/', aluno_controller.deletar_aluno),
]