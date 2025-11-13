# core/admin.py
from django.contrib import admin
from .models import Professor, Aluno, Servico, Agendamento

@admin.register(Professor)
class ProfessorAdmin(admin.ModelAdmin):
    list_display = ['nome', 'email', 'especialidade', 'data_criacao']
    search_fields = ['nome', 'email']

@admin.register(Aluno)
class AlunoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'email', 'numero']


@admin.register(Servico)
class ServicoAdmin(admin.ModelAdmin):
    list_display = ['descricao', 'preco']
    search_fields = ['descricao']

@admin.register(Agendamento)
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = ['aluno', 'professor', 'servico', 'data_agendamento', 'status']
    list_filter = ['status', 'professor']