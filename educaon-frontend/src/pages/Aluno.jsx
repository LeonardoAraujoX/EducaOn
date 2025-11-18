import React, { useState, useEffect } from 'react';
import './Aluno.css';

const Aluno = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Todas');
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Matérias disponíveis para filtro
  const materias = ['Todas', 'Matemática', 'Português', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Literatura', 'Redação'];

  // Verificar autenticação e carregar dados
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        
        // Verificar se o usuário está autenticado
        const token = localStorage.getItem('educaon_token');
        const userData = localStorage.getItem('educaon_user');
        
        if (!token || !userData) {
          setError('Usuário não autenticado. Por favor, faça login.');
          setLoading(false);
          return;
        }

        const userObj = JSON.parse(userData);
        setUser(userObj);

        // Verificar se é aluno
        if (userObj.tipo !== 'aluno') {
          setError('Acesso restrito para alunos.');
          setLoading(false);
          return;
        }

        // Carregar professores da API
        await fetchProfessores(token);
        
      } catch (err) {
        console.error('Erro ao inicializar:', err);
        setError('Erro ao carregar dados: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Função para carregar professores da API
  const fetchProfessores = async (token) => {
    try {
      // SUBSTITUA ESTA URL PELA SUA API REAL
      const response = await fetch('https://sua-api-real.com/api/professores', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProfessores(data);
      setError(null);
      
    } catch (err) {
      console.error('Erro ao carregar professores:', err);
      setError('Erro ao carregar professores: ' + err.message);
      setProfessores([]); // Garante que a lista fique vazia em caso de erro
    }
  };

  // Filtrar professores
  const filteredProfessores = professores.filter(professor => {
    const matchesSearch = professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professor.materias?.some(materia => 
                           materia.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesSubject = selectedSubject === 'Todas' || 
                          professor.materias?.includes(selectedSubject);
    
    return matchesSearch && matchesSubject;
  });

  // Função para renderizar estrelas
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">⭐</span>);
    }

    // Preencher com estrelas vazias até 5
    while (stars.length < 5) {
      stars.push(<span key={stars.length} className="star empty">☆</span>);
    }

    return stars;
  };

  // Função para agendar aula
  const handleAgendarAula = async (professorId) => {
    try {
      const token = localStorage.getItem('educaon_token');
      const userData = localStorage.getItem('educaon_user');
      
      if (!token || !userData) {
        alert('Por favor, faça login para agendar aulas.');
        return;
      }

      const userObj = JSON.parse(userData);

      // SUBSTITUA ESTA URL PELA SUA API REAL DE AGENDAMENTO
      const response = await fetch('https://sua-api-real.com/api/agendamentos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          professorId: professorId,
          alunoId: userObj.id,
          data: new Date().toISOString(),
          duracao: 60, // 1 hora em minutos
          status: 'pendente'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao agendar aula');
      }

      const result = await response.json();
      alert('Aula agendada com sucesso!');
      console.log('Agendamento realizado:', result);
      
    } catch (err) {
      alert('Erro ao agendar aula: ' + err.message);
      console.error('Erro no agendamento:', err);
    }
  };

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('educaon_token');
    localStorage.removeItem('educaon_user');
    window.location.href = '/login';
  };

  // Função para tentar recarregar os dados
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('educaon_token');
    if (token) {
      fetchProfessores(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  // Estado de não autenticado ou erro de permissão
  if (error && !user) {
    return (
      <div className="student-dashboard unauthenticated">
        <header className="dashboard-header expanded">
          <nav className="navbar expanded-navbar">
            <div className="logo">EducaOn</div>
            <ul className="nav-links">
              <li><a href="/">Início</a></li>
              <li><a href="/login" className="active">Login</a></li>
              <li><a href="/register">Cadastrar</a></li>
            </ul>
          </nav>
        </header>
        <div className="auth-container-large">
          <div className="access-restricted-card">
            <div className="restricted-icon">🔒</div>
            <h1>Acesso Restrito</h1>
            <p>Usuário não autenticado. Por favor, faça login.</p>
            <a href="/login" className="btn-login-large">Fazer Login</a>
          </div>
        </div>
      </div>
    );
  }

  // Estado de permissão negada (usuário logado mas não é aluno)
  if (error && user && user.tipo !== 'aluno') {
    return (
      <div className="student-dashboard">
        <header className="dashboard-header">
          <div className="container">
            <nav className="navbar">
              <div className="logo">EducaOn</div>
              <ul className="nav-links">
                <li><a href="/">Início</a></li>
                <li><a href="#" onClick={handleLogout}>Sair</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="container auth-container">
          <div className="auth-message">
            <h3>⚠️ Acesso Não Permitido</h3>
            <p>{error}</p>
            <button onClick={handleLogout} className="btn btn-primary">
              Fazer Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="student-dashboard">
        <header className="dashboard-header">
          <div className="container">
            <nav className="navbar">
              <div className="logo">EducaOn</div>
              <ul className="nav-links">
                <li><a href="#">Início</a></li>
                <li><a href="#" className="active">Buscar Professores</a></li>
                <li><a href="#">Minhas Aulas</a></li>
                <li><a href="#" onClick={handleLogout}>Sair</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="container loading-container">
          <div className="loading-spinner">Carregando professores...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <nav className="navbar">
            <div className="logo">EducaOn</div>
            <div className="user-info">
              <span>Olá, {user?.nome}</span>
            </div>
            <ul className="nav-links">
              <li><a href="#">Início</a></li>
              <li><a href="#" className="active">Buscar Professores</a></li>
              <li><a href="#">Minhas Aulas</a></li>
              <li><a href="#" onClick={handleLogout}>Sair</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mensagem de erro (se houver) */}
      {error && (
        <div className="container">
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={handleRetry} className="btn btn-outline">
              Tentar Novamente
            </button>
          </div>
        </div>
      )}

      <div className="container main-container">
        {/* Sidebar de Filtros */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Filtrar por Matéria</h3>
            <div className="materias-list">
              {materias.map((materia, index) => (
                <button
                  key={index}
                  className={`materia-btn ${selectedSubject === materia ? 'active' : ''}`}
                  onClick={() => setSelectedSubject(materia)}
                >
                  {materia}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Disponibilidade</h3>
            <div className="availability-filter">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Online agora
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Esta semana
              </label>
            </div>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className="dashboard-main">
          <div className="search-header">
            <h1>Encontre seu professor ideal</h1>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar por nome ou matéria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {/* Lista de Professores */}
          <div className="professores-grid">
            {filteredProfessores.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">😔</div>
                <h3>Nenhum professor encontrado</h3>
                <p>{professores.length === 0 ? 'Nenhum professor disponível no momento' : 'Tente alterar os filtros ou termos de busca'}</p>
              </div>
            ) : (
              filteredProfessores.map(professor => (
                <div key={professor.id} className="professor-card">
                  <div className="professor-header">
                    <div className="professor-avatar">
                      {professor.nome ? professor.nome.split(' ')[1]?.charAt(0) || professor.nome.charAt(0) : 'P'}
                    </div>
                    <div className="professor-info">
                      <h3>{professor.nome || 'Professor'}</h3>
                      <div className="professor-rating">
                        {renderStars(professor.avaliacao || professor.rating || 0)}
                        <span className="rating-value">{professor.avaliacao || professor.rating || 0}</span>
                      </div>
                    </div>
                  </div>

                  <p className="professor-experience">{professor.experiencia || 'Experiência não informada'}</p>
                  <p className="professor-description">{professor.descricao || 'Descrição não disponível'}</p>

                  <div className="professor-materias">
                    {(professor.materias || [professor.materia] || ['Geral']).map((materia, index) => (
                      <span key={index} className="materia-tag">{materia}</span>
                    ))}
                  </div>

                  <div className="professor-details">
                    <div className="disponibilidade">
                      {professor.disponibilidade || 0} min disponíveis
                    </div>
                    <div className="preco">
                      R$ {professor.preco ? professor.preco.toFixed(2) : '0.00'}/h
                    </div>
                  </div>

                  <button 
                    className="agendar-btn"
                    onClick={() => handleAgendarAula(professor.id)}
                  >
                    Agendar Aula
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Aluno;