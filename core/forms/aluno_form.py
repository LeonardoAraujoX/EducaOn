# core/forms/aluno_form.py
from django import forms
from core.models import Aluno

class AlunoForm(forms.ModelForm):
    class Meta:
        model = Aluno
        fields = ['nome', 'email', 'numero']
        widgets = {
            'nome': forms.TextInput(attrs={'placeholder': 'Nome completo'}),
            'email': forms.EmailInput(attrs={'placeholder': 'email@exemplo.com'}),
            'numero': forms.TextInput(attrs={'placeholder': '(11) 99999-9999'}),
        }
    
    def clean_nome(self):
        nome = self.cleaned_data['nome']
        if len(nome.strip()) < 2:
            raise forms.ValidationError("Nome deve ter pelo menos 2 caracteres")
        return nome.strip()
    
    def clean_email(self):
        email = self.cleaned_data['email']
        # Verifica duplicata (exceto na edição)
        if hasattr(self, 'instance') and self.instance.email == email:
            return email
            
        if Aluno.objects.filter(email=email).exists():
            raise forms.ValidationError("Já existe um aluno com este email")
        return email
    
    def clean_numero(self):
        numero = self.cleaned_data['numero']
        numeros_limpos = ''.join(filter(str.isdigit, numero))
        if len(numeros_limpos) < 10:
            raise forms.ValidationError("Número deve ter pelo menos 10 dígitos")
        return numero