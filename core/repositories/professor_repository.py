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

    def criar(self, nome, email, especialidade):
        form = ProfessorForm(data={
            'nome':nome,
            'email':email,
            'especialidade':especialidade,
        })
        if form.is_valid():
            professor = form.save()
            return professor
        else:
            errors = " | ".join([
                f"{field}: {', '.join(errors)}"
                for field, erros in form.errors.items()
            ])
            raise ValueError(errors)
    
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