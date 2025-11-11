from django.urls import path
from .controllers import professor_controller

urlpatterns = [
    path('professores/', professor_controller.listar_professores),  # GET
    path('professores/criar/', professor_controller.criar_professor),  # POST
    path('professores/<int:id>/', professor_controller.buscar_professor),  # GET
    path('professores/<int:id>/deletar/', professor_controller.deletar_professor),  # DELETE
]