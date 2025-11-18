// Register.jsx
import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [userType, setUserType] = useState('aluno');
  const [formData, setFormData] = useState({
    // Campos comuns
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    
    // Campos específicos do aluno
    idade: '',
    serie: '',
    
    // Campos específicos do professor
    especialidade: '',
    descricao: '',
    experiencia: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui você adicionaria a lógica de cadastro
  };

  return (
    <div className="register-page">
      {/* Header */}
      <header className="header-full">
        <div className="navbar-full">
          <div className="logo-gradient">EducaOn</div>
          <ul className="nav-links">
            <li><a href="/">Voltar para Home</a></li>
            <li><a href="/login" >Já tenho conta</a></li>
          </ul>
        </div>
      </header>

      {/* Formulário de Cadastro */}
      <section className="register-section">
        <div className="container">
          <div className="register-container">
            <div className="register-header">
              <h1>Criar Conta</h1>
              <p>Junte-se à nossa comunidade de educação</p>
            </div>

            {/* Seletor de Tipo de Usuário */}
            <div className="user-type-selector">
              <button
                className={`type-btn ${userType === 'aluno' ? 'active' : ''}`}
                onClick={() => setUserType('aluno')}
                type="button"
              >
                👨‍🎓 Sou Aluno
              </button>
              <button
                className={`type-btn ${userType === 'professor' ? 'active' : ''}`}
                onClick={() => setUserType('professor')}
                type="button"
              >
                👨‍🏫 Sou Professor
              </button>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              {/* Campos Comuns */}
              <div className="form-section">
                <h3>Informações Pessoais</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nome">Nome Completo *</label>
                    <input 
                      type="text" 
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome completo"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone *</label>
                    <input 
                      type="tel" 
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="senha">Senha *</label>
                    <input 
                      type="password" 
                      id="senha"
                      name="senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      placeholder="Crie uma senha segura"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmarSenha">Confirmar Senha *</label>
                    <input 
                      type="password" 
                      id="confirmarSenha"
                      name="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                      placeholder="Digite a senha novamente"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Campos Específicos por Tipo */}
              {userType === 'aluno' ? (
                <div className="form-section">
                  <h3>Informações do Aluno</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="idade">Idade</label>
                      <input 
                        type="number" 
                        id="idade"
                        name="idade"
                        value={formData.idade}
                        onChange={handleInputChange}
                        placeholder="Sua idade"
                        min="6"
                        max="100"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="serie">Série/Ano</label>
                      <select 
                        id="serie"
                        name="serie"
                        value={formData.serie}
                        onChange={handleInputChange}
                      >
                        <option value="">Selecione sua série</option>
                        <option value="fundamental-1">Fundamental I (1º-5º)</option>
                        <option value="fundamental-2">Fundamental II (6º-9º)</option>
                        <option value="medio">Ensino Médio</option>
                        <option value="graduacao">Graduação</option>
                        <option value="pos">Pós-graduação</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-section">
                  <h3>Informações do Professor</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="especialidade">Especialidade *</label>
                      <select 
                        id="especialidade"
                        name="especialidade"
                        value={formData.especialidade}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecione sua área</option>
                        <option value="matematica">Matemática</option>
                        <option value="portugues">Português</option>
                        <option value="historia">História</option>
                        <option value="geografia">Geografia</option>
                        <option value="ciencias">Ciências</option>
                        <option value="fisica">Física</option>
                        <option value="quimica">Química</option>
                        <option value="biologia">Biologia</option>
                        <option value="ingles">Inglês</option>
                        <option value="espanhol">Espanhol</option>
                        <option value="filosofia">Filosofia</option>
                        <option value="sociologia">Sociologia</option>
                        <option value="artes">Artes</option>
                        <option value="educacao-fisica">Educação Física</option>
                        <option value="programacao">Programação</option>
                        <option value="musica">Música</option>
                        <option value="outras">Outras</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="experiencia">Experiência (anos)</label>
                      <input 
                        type="number" 
                        id="experiencia"
                        name="experiencia"
                        value={formData.experiencia}
                        onChange={handleInputChange}
                        placeholder="Anos de experiência"
                        min="0"
                        max="50"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group full-width">
                      <label htmlFor="descricao">Descrição Pessoal</label>
                      <textarea 
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        placeholder="Fale um pouco sobre sua experiência, metodologia de ensino, etc..."
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-section">
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="termos" 
                    required
                  />
                  <label htmlFor="termos">
                    Concordo com os <a href="/termos">Termos de Uso</a> e <a href="/privacidade">Política de Privacidade</a> *
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Criar Conta
                </button>
              </div>
            </form>

            <div className="login-redirect">
              <p>
                Já tem uma conta? <a href="/login">Fazer login</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <ul className="footer-links">
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/termos">Termos de Uso</a></li>
            <li><a href="/privacidade">Política de Privacidade</a></li>
          </ul>
          <p className="copyright">&copy; 2023 EducaOn. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;