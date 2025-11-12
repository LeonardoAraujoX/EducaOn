from django.urls import path
from .controllers import professor_controller
from .controllers import aluno_controller
from .controllers import agendamento_controller
from core.controllers import servico_controller


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


    # Agendamentos por usuário
    path('professores/<int:professor_id>/agendamentos/', agendamento_controller.listar_agendamentos_professor),
    path('alunos/<int:aluno_id>/agendamentos/', agendamento_controller.listar_agendamentos_aluno),
    path('professores/<int:professor_id>/agendamentos/ativos/', agendamento_controller.listar_agendamentos_ativos_professor),
    path('alunos/<int:aluno_id>/agendamentos/ativos/', agendamento_controller.listar_agendamentos_ativos_aluno),
    
    # Operações gerais
    path('agendamentos/<int:id>/', agendamento_controller.buscar_agendamento),
    path('agendamentos/criar/', agendamento_controller.criar_agendamento),
    path('agendamentos/<int:id>/status/', agendamento_controller.atualizar_status_agendamento),
    path('agendamentos/<int:id>/deletar/', agendamento_controller.deletar_agendamento),

    path('servicos/', servico_controller.listar_servicos),
    path('servicos/<int:id>/', servico_controller.listar_servico),
    path('servicos/criar/', servico_controller.criar_servico),
    path('servicos/atualizar/<int:id>/', servico_controller.atualizar_servico),
    path('servicos/deletar/<int:id>/', servico_controller.deletar_servico),

]