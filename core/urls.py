from django.urls import path
from core.controllers import professor_controller

urlpatterns = [
    path('professores/', professor_controller.listar_professores),
]