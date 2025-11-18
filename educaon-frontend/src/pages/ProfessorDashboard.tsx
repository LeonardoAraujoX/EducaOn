import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import "./ProfessorDashboard.css";

interface Professor {
  id: number;
  nome: string;
  email: string;
  foto?: string;
  especialidade: string;
  preco_hora: number;
  minutos_disponiveis: number;
  descricao?: string;
}

interface Agendamento {
  id: number;
  aluno: {
    id: number;
    nome: string;
    email: string;
    foto?: string;
  };
  data_agendamento: string;
  duracao_minutos: number;
  status: "agendado" | "confirmado" | "cancelado" | "realizado";
  servico: {
    id: number;
    descricao: string;
    preco: number;
  };
}

export default function ProfessorDashboard() {
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"scheduled" | "history" | "edit">(
    "scheduled"
  );

  const fetchProfessorData = async () => {
    try {
      setLoading(true);
      setError(null);

      const professorId = 1;

      // Buscar professor específico
      const professorData = await api.getProfessor(professorId);
      setProfessor(professorData);

      // Buscar agendamentos desse professor
      const agendamentosData = await api.getAgendamentosPorProfessor(
        professorId
      );
      setAgendamentos(agendamentosData || []);
    } catch (err: any) {
      console.error("Erro detalhado:", err);

      // Tratamento de erro correto para Axios
      if (err.response) {
        // Erro da API (4xx, 5xx)
        setError(
          `Erro ${err.response.status}: ${
            err.response.data?.message || "Erro na requisição"
          }`
        );
      } else if (err.request) {
        // Erro de rede (sem resposta)
        setError(
          "Erro de conexão. Verifique sua internet e se o servidor está rodando."
        );
      } else {
        // Outros erros
        setError("Erro inesperado: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para debug - remove depois que funcionar
  const testEndpoints = async () => {
    console.log("=== TESTANDO ENDPOINTS ===");
    try {
      const prof = await api.getProfessor(1);
      console.log("✅ Professor:", prof);

      const agend = await api.getAgendamentosPorProfessor(1);
      console.log("✅ Agendamentos:", agend);
    } catch (error) {
      console.error("❌ Erro no teste:", error);
    }
  };

  useEffect(() => {
    fetchProfessorData();
    testEndpoints(); // Remove esta linha depois que funcionar
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("professorId");
    window.location.href = "/login";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDateTime = (dateTimeString: string) => {
    try {
      const date = new Date(dateTimeString);

      const dateFormatted = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const timeFormatted = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Calcular horário de término
      const endTime = new Date(date.getTime() + 60 * 60000); // +60 minutos
      const endTimeFormatted = endTime.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        date: dateFormatted,
        time: `${timeFormatted} – ${endTimeFormatted}`,
      };
    } catch (e) {
      return {
        date: "Data inválida",
        time: "Horário inválido",
      };
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      agendado: "Agendada",
      confirmado: "Confirmada",
      cancelado: "Cancelada",
      realizado: "Realizada",
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getStatusClass = (status: string) => {
    const statusClassMap = {
      agendado: "status-agendada",
      confirmado: "status-confirmada",
      cancelado: "status-cancelada",
      realizado: "status-realizada",
    };
    return (
      statusClassMap[status as keyof typeof statusClassMap] || "status-agendada"
    );
  };

  const handleEnterClass = (agendamentoId: number) => {
    alert(
      `Entrando na aula ${agendamentoId} - Funcionalidade em desenvolvimento`
    );
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Carregando dados reais do professor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">
          <h3>😕 Erro ao carregar dados</h3>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={fetchProfessorData} className="retry-btn">
              🔄 Tentar novamente
            </button>
            <button
              onClick={() => console.log("Abrir ferramenta de debug")}
              className="debug-btn"
            >
              🐛 Debug
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="logo">EducaOn</h1>
        <div className="top-right">
          <span>Olá, {professor?.nome?.split(" ")[0] || "Professor"}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <section className="profile-card">
        <div className="profile-info">
          <img
            src={
              professor?.foto ||
              "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
            }
            className="avatar"
            alt={`Avatar de ${professor?.nome}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://cdn-icons-png.flaticon.com/512/4140/4140047.png";
            }}
          />
          <div className="profile-details">
            <h2>Prof. {professor?.nome || "Nome não encontrado"}</h2>
            <p className="email">
              {professor?.email || "Email não disponível"}
            </p>
            <p className="especialidade">
              🎯 {professor?.especialidade || "Especialidade não definida"}
            </p>
          </div>
        </div>

        <div className="stats">
          <div className="stat-box">
            <h3>
              {professor
                ? formatCurrency(Number(professor.preco_hora))
                : "R$ 0,00"}
            </h3>
            <span>Preço por hora</span>
          </div>
          <div className="stat-box">
            <h3>{professor?.minutos_disponiveis || 0}</h3>
            <span>Minutos disponíveis</span>
          </div>
          <div className="stat-box">
            <h3>{professor?.especialidade ? 1 : 0}</h3>
            <span>Especialidade</span>
          </div>
        </div>
      </section>

      <div className="tabs">
        <button
          className={activeTab === "scheduled" ? "active" : ""}
          onClick={() => setActiveTab("scheduled")}
        >
          📅 Aulas Agendadas
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          📊 Histórico
        </button>
        <button
          className={activeTab === "edit" ? "active" : ""}
          onClick={() => setActiveTab("edit")}
        >
          ✏️ Editar Perfil
        </button>
      </div>

      {activeTab === "scheduled" && (
        <section className="next-classes">
          <h2>Próximas Aulas</h2>

          <div className="class-list">
            {agendamentos.length === 0 ? (
              <div className="no-classes">
                <div className="no-classes-icon">📚</div>
                <p>Nenhuma aula agendada no momento.</p>
                <small>Quando houver agendamentos, eles aparecerão aqui.</small>
              </div>
            ) : (
              agendamentos.map((agendamento) => {
                const { date, time } = formatDateTime(
                  agendamento.data_agendamento
                );

                return (
                  <div key={agendamento.id} className="class-card">
                    <div className="class-header">
                      <img
                        src={
                          agendamento.aluno.foto ||
                          "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                        }
                        className="student-avatar"
                        alt={`Avatar de ${agendamento.aluno.nome}`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://cdn-icons-png.flaticon.com/512/4140/4140037.png";
                        }}
                      />
                      <div className="student-info">
                        <h3>{agendamento.aluno.nome}</h3>
                        <span>Aluno • {agendamento.servico.descricao}</span>
                      </div>
                      <span
                        className={`status ${getStatusClass(
                          agendamento.status
                        )}`}
                      >
                        {getStatusText(agendamento.status)}
                      </span>
                    </div>

                    <div className="class-details">
                      <p>📅 {date}</p>
                      <p>
                        ⏰ {time} ({agendamento.duracao_minutos} minutos)
                      </p>
                    </div>

                    <div className="class-footer">
                      <span className="price">
                        {formatCurrency(Number(agendamento.servico.preco))}
                      </span>
                      {(agendamento.status === "agendado" ||
                        agendamento.status === "confirmado") && (
                        <button
                          className="enter-btn"
                          onClick={() => handleEnterClass(agendamento.id)}
                        >
                          🚀 Entrar na Aula
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}

      {activeTab === "history" && (
        <section className="history">
          <div className="section-placeholder">
            <div className="placeholder-icon">📊</div>
            <h2>Histórico de Aulas</h2>
            <p>
              Em breve você poderá ver todo o histórico das suas aulas aqui.
            </p>
          </div>
        </section>
      )}

      {activeTab === "edit" && (
        <section className="edit-profile">
          <div className="section-placeholder">
            <div className="placeholder-icon">✏️</div>
            <h2>Editar Perfil</h2>
            <p>Em breve você poderá editar suas informações de perfil aqui.</p>
          </div>
        </section>
      )}
    </div>
  );
}
