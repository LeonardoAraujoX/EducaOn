import React, { useState, useEffect } from 'react';
import './Aluno.css';

const Aluno = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Todas');
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Matérias disponíveis para filtro
  const materias = ['Todas', 'Matemática', 'Português', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Literatura', 'Redação'];

  // Carregar professores da API
  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        setLoading(true);
        // Substitua esta URL pela sua API real
        const response = await fetch('https://sua-api.com/professores');
        
        if (!response.ok) {
          throw new Error('Erro ao carregar professores');
        }
        
        const data = await response.json();
        setProfessores(data);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar professores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessores();
  }, []);

  // Filtrar professores
  const filteredProfessores = professores.filter(professor => {
    const matchesSearch = professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professor.materia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professor.materias?.some(materia => 
                           materia.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesSubject = selectedSubject === 'Todas' || 
                          professor.materias?.includes(selectedSubject) ||
                          professor.materia === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  // Função para renderizar estrelas
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">⭐</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star">⭐</span>);
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
      // Substitua pela sua API real de agendamento
      const response = await fetch('https://sua-api.com/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          professorId: professorId,
          alunoId: 'ID_DO_ALUNO', // Você precisará obter isso do contexto/auth
          data: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao agendar aula');
      }

      const result = await response.json();
      alert('Aula agendada com sucesso!');
      console.log('Agendamento:', result);
      
    } catch (err) {
      alert('Erro ao agendar aula: ' + err.message);
      console.error('Erro no agendamento:', err);
    }
  };

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
                <li><a href="#">Sair</a></li>
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

  if (error) {
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
                <li><a href="#">Sair</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="container error-container">
          <div className="error-message">
            <h3>Erro ao carregar professores</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              Tentar Novamente
            </button>
          </div>
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
            <ul className="nav-links">
              <li><a href="#">Início</a></li>
              <li><a href="#" className="active">Buscar Professores</a></li>
              <li><a href="#">Minhas Aulas</a></li>
              <li><a href="#">Sair</a></li>
            </ul>
          </nav>
        </div>
      </header>

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
                <p>Tente alterar os filtros ou termos de busca</p>
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