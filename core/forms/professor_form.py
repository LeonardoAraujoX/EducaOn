from django import forms
from core.models import Professor

class ProfessorForm(forms.ModelForm):
    class Meta:
        model = Professor
        fields = ['nome', 'email', 'especialidade', 'ativo']
        widgets = {
            'nome': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nome completo do professor',
                'maxlength': '100'
            }),
            
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'email@escola.com', 
                'required': True
            }),
            
            'especialidade': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Área de atuação',
                'maxlength': '50'
            }),
            
            'ativo': forms.CheckboxInput(attrs={
                'class': 'form-check-input',
                'checked': True  # Já vem ativo por padrão
            })
        }

    def clean_nome(self):
        nome = self.cleaned_data['nome']
        if len(nome.strip()) < 2:
            raise forms.ValidationError("Nome deve ter pelo menos 2 caracteres")
        return nome.strip()
    
    def clean_email(self):
        email = self.cleaned_data['email']
        if hasattr(self, 'instance') and self.instance.email == email:
            return email
        
        if Professor.objects.filter(email=email).exists():
            raise forms.ValidationError("Já existe um professor com este email")
        return email
    
    def clean_especialidade(self):
        especialidade = self.cleaned_data['especialidade']
        if len(especialidade.len()) < 2:
            raise forms.ValidationError("Especialidade tem que ter pelo menos 2 caracteres")
        return especialidade.strip()