// home.jsx
import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Header */}
      <header>
        <div className="container">
          <nav className="navbar">
            <div className="logo">EducaOn</div>
            <ul className="nav-links">
              <li><a href="#">Início</a></li>
              <li><a href="#">Como Funciona</a></li>             
              <li><a href="#">Entrar</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section - MAIS COMPACTA */}
      <section className="hero">
        <div className="container hero-container">
          <h1>EducaOn</h1>
          <h2>Aprenda com os melhores professores</h2>
          <p>Conecte-se com professores qualificados, agende aulas online e aprenda no seu ritmo.</p>
          <div className="hero-btns">
            <a href="#" className="btn btn-primary">Começar Agora</a>
            <a href="#" className="btn btn-primary">Saiba Mais</a>
          </div>
        </div>
      </section>

      {/* Features Section - MAIOR E MAIS COMPLETA */}
      <section className="features">
        <div className="container">
          <div className="section-title">
            <h2>Por que escolher o EducaOn?</h2>
            <p>Oferecemos a melhor experiência de aprendizado online com professores qualificados e recursos personalizados</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Diversas Matérias</h3>
              <p>Encontre professores especializados em qualquer área do conhecimento</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Aulas Personalizadas</h3>
              <p>Aulas particulares focadas no seu objetivo de aprendizado</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Flexibilidade Total</h3>
              <p>Escolha o melhor horário e professor para você</p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section - MAIOR */}
   <section className="login-section">
  <div className="container">
    <div className="login-container">
      <h2>EducaOn</h2>
      <div className="login-options">
        <a href="#" className="btn btn-primary">Entrar como Aluno</a>
        
        <div className="account-divider"></div>
        
        <a href="#" className="btn btn-outline">Professor</a>
      </div>
      <div className="signup-link">
        Não tem uma conta? <a href="#">Criar conta</a>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer>
        <div className="container">
          <ul className="footer-links">
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Contato</a></li>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Política de Privacidade</a></li>
          </ul>
          <p className="copyright">&copy; 2023 EducaOn. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
