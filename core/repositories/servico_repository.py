from ..models import Servico

class ServicoRepository:
    @staticmethod
    def listar_servicos():
        return Servico.objects.all()
    
    @staticmethod
    def listar_servico(id):
        try:
            return Servico.objects.get(id=id)
        except Servico.DoesNotExist:
            return None
        
    @staticmethod
    def criar_servico(preco,descricao):
        servico = Servico(preco=preco, descricao=descricao)
        servico.save()                                     
        return servico
    
    @staticmethod
    def atualizar_servico(id, preco=None, descricao=None):
        try:
            servico = Servico.objects.get(id=id)
            if preco is not None:
                servico.preco = preco
            if descricao is not None:
                servico.descricao = descricao
            servico.save()
            return servico
        except Servico.DoesNotExist:
            return None

    @staticmethod
    def deletar_servico(id):
        try:
            servico = Servico.objects.get(id=id)
            servico.delete()
            return True
        except Servico.DoesNotExist:
            return False

servico_repository = ServicoRepository()

 
          
        
