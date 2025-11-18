from django.core.exceptions import ObjectDoesNotExist
from ..forms.aluno_form import AlunoForm
from ..models import Aluno


class AlunoRepository:

    @staticmethod
    def listar_alunos():
        alunos = Aluno.objects.all()
        return alunos

    @staticmethod
    def listar_aluno(id):
        try:
            return Aluno.objects.get(id=id)
        except Aluno.DoesNotExist:
            return None

    def criar_aluno(self, nome, email, numero, password, foto=None):
       try:
           aluno = Aluno.objects.create_user(
               nome=nome,
               email=email,
               password=password,
               numero=numero,
               foto=foto
           )
           return aluno
       except Exception as e:
           raise ValueError(f"Erro ao criar aluno: {str(e)}")

    @staticmethod
    def atualizar_aluno(id, nome=None, email=None, numero=None):
        aluno = Aluno.objects.get(id=id)
        if nome:
            aluno.nome = nome
        if email:
            aluno.email = email
        if numero:
            aluno.numero = numero
        aluno.save()
        return aluno

    @staticmethod
    def deletar_aluno(id):
        try:
            aluno = Aluno.objects.get(id=id)
            aluno.delete()
            return True
        except Aluno.DoesNotExist:
            return False



aluno_repository = AlunoRepository()
