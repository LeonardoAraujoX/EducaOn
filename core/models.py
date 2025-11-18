from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class ProfessorManager(BaseUserManager):
    def create_user(self, email, nome, password=None, **extra_fields):
        if not email:
            raise ValueError('Email obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, nome=nome, **extra_fields)
        user.set_password(password)
        user.save()
        return user

class Professor(AbstractBaseUser):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    especialidade = models.CharField(max_length=50)
    foto = models.URLField(max_length=500, blank=True, null=True, default='https://cdn-icons-png.flaticon.com/512/4140/4140047.png')
    preco_hora = models.DecimalField(max_digits=8, decimal_places=2, default=80.00)
    minutos_disponiveis = models.IntegerField(default=240)
    descricao = models.TextField(blank=True, null=True)
    ativo = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    objects = ProfessorManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']

    class Meta:
        db_table = 'professores'                    # Nome da tabela no banco
        verbose_name = 'Professor'                  # Nome singular no Admin
        verbose_name_plural = 'Professores'         # Nome plural no Admin
        ordering = ['nome']                         # Ordena por nome A-Z

    def __str__(self):
        return f"Prof. {self.nome} - {self.especialidade}"
    

class AlunoManager(BaseUserManager):
    def create_user(self, email, nome, password=None, **extra_fields):
        if not email:
            raise ValueError('Email obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, nome=nome, **extra_fields)
        user.set_password(password)
        user.save()
        return user

class Aluno(AbstractBaseUser):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    foto = models.URLField(blank=True, null=True)
    numero = models.CharField(max_length=15)
    ativo = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    objects = AlunoManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']


    class Meta:
        db_table = 'alunos' 
        verbose_name = 'Aluno'
        verbose_name_plural = 'Alunos'
        ordering = ['nome'] 

    def __str__(self):
        return self.nome


class Agendamento(models.Model):
    # Choices para status do agendamento
    STATUS_CHOICES = [
        ('agendado', 'Agendado'),
        ('confirmado', 'Confirmado'),
        ('cancelado', 'Cancelado'),
        ('realizado', 'Realizado'),
    ]

    professor = models.ForeignKey(
        'Professor',
        on_delete=models.CASCADE,
        related_name='agendamentos'
    )

    aluno = models.ForeignKey(
        'Aluno',
        on_delete=models.CASCADE,
        related_name='agendamentos'
    )
    
    data_agendamento = models.DateTimeField()
    duracao_minutos = models.IntegerField(
        default=60,
        validators=[MinValueValidator(30), MaxValueValidator(240)]
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='agendado'
    )
    
    servico = models.ForeignKey(
        'Servico',
        on_delete=models.CASCADE,
        related_name='agendamentos'  
    )

    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'agendamentos'
        verbose_name = 'Agendamento'
        verbose_name_plural = 'Agendamentos'
        ordering = ['data_agendamento']
    
    def __str__(self):
        return f"{self.aluno.nome} com {self.professor.nome} - {self.data_agendamento.strftime('%d/%m/%Y %H:%M')}"
    

class Servico(models.Model):
    descricao = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.descricao} - R$ {self.preco}"