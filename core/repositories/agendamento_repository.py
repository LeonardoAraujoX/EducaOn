from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
from ..models import Agendamento

class AgendamentoRepository:

    def listar_por_professor(self, professor_id):
        """Lista todos agendamentos de um professor"""
        return Agendamento.objects.filter(professor_id=professor_id)
    
    def listar_por_aluno(self, aluno_id):
        """Lista todos agendamentos de um aluno"""
        return Agendamento.objects.filter(aluno_id=aluno_id)
    
    def listar_ativos_por_professor(self, professor_id):
        """Lista agendamentos ATIVOS de um professor"""
        return Agendamento.objects.filter(
            professor_id=professor_id,
            data_agendamento__gte=timezone.now(),
            status__in=['agendado', 'confirmado']
        ).order_by('data_agendamento')
    
    def listar_ativos_por_aluno(self, aluno_id):
        """Lista agendamentos ATIVOS de um aluno"""
        return Agendamento.objects.filter(
            aluno_id=aluno_id,
            data_agendamento__gte=timezone.now(),
            status__in=['agendado', 'confirmado']
        ).order_by('data_agendamento')
    
    def buscar_por_id(self, id):
        try:
            return Agendamento.objects.get(id=id)
        except ObjectDoesNotExist:
            return None
    
    def criar(self, professor_id, aluno_id, data_agendamento, duracao_minutos=60, descricao=""):
        return Agendamento.objects.create(
            professor_id=professor_id,
            aluno_id=aluno_id,
            data_agendamento=data_agendamento,
            duracao_minutos=duracao_minutos,
            descricao=descricao
        )
    
    def atualizar_status(self, id, novo_status):
        agendamento = self.buscar_por_id(id)
        if agendamento:
            agendamento.status = novo_status
            agendamento.save()
            return agendamento
        return None
    
    def deletar(self, id):
        agendamento = self.buscar_por_id(id)
        if agendamento:
            agendamento.delete()
            return True
        return False
    
    def verificar_conflito(self, professor_id, data_agendamento, duracao_minutos):
        """Verifica se já existe agendamento no mesmo horário"""
        data_fim = data_agendamento + timezone.timedelta(minutes=duracao_minutos)
        
        conflitos = Agendamento.objects.filter(
            professor_id=professor_id,
            data_agendamento__lt=data_fim,
            data_agendamento__gte=data_agendamento - timezone.timedelta(minutes=duracao_minutos),
            status__in=['agendado', 'confirmado']
        )
        return conflitos.exists()