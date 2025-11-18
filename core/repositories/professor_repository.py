from django.core.exceptions import ObjectDoesNotExist
from ..forms.professor_form import ProfessorForm
from ..models import Professor

class ProfessorRepository:

    def listar_todos(self):
        return Professor.objects.all()
    
    def listar_ativos(self):
        return Professor.objects.filter(ativo=True)
    
    def buscar_por_id(self, id):
        try:
            return Professor.objects.get(id=id)
        except ObjectDoesNotExist:
            return None
    
    def buscar_por_especialidade(self, especialidade):
        return Professor.objects.filter(especialidade=especialidade)

    def criar(self, nome, email, especialidade, password, foto=None, preco_hora=80.00, minutos_disponiveis=240):
        try:
            professor = Professor.objects.create_user(
                nome=nome,
                email=email,
                password = password,
                especialidade = especialidade,
                foto=foto,
                preco_hora=preco_hora,
                minutos_disponiveis=minutos_disponiveis
            )
            return professor
        except Exception as e:
            raise ValueError(f"Erro ao criar professor: {str(e)}")
    
    def atualizar(self, id, **dados):
        professor = self.buscar_por_id(id)
        if professor:
            for campo, valor in dados.items():
                setattr(professor, campo, valor)
            professor.save()
            return professor
        return None
    
    def deletar(self, id):
        professor = self.buscar_por_id(id)
        if professor:
            professor.delete()
            return True
        return False