from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from core.models import Aluno, Professor

class AuthController:
    @staticmethod
    def login(request):
        nome=request.data.get("nome")
        senha = request.data.get("senha")

        usuario=authenticate(nome=nome, senha=senha)
        if not usuario:
            return Response({"error": "Credenciais inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(usuario)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "id": usuario.id,
            "role": "aluno" if Aluno.objects.filter(usuario=usuario).exists() else "professor"
        })

