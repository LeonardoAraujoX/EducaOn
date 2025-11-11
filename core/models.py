from django.db import models


class Professor(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    especialidade = models.CharField(max_length=50)
    ativo = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prof. {self.nome} - {self.especialidade}"