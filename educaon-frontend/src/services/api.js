import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

// Criar instância do Axios
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10 segundos
});

export const api = {

  login: (email, password, userType) => 
    apiClient.post('/auth/login/',{
      email,
      password,
      userType
    }).then(res=>res.data),

  // 👇 ALUNOS
  getAlunos: () => apiClient.get("/alunos/").then((res) => res.data),

  criarAluno: (dadosAluno) =>
    apiClient
      .post("/alunos/criar/", dadosAluno, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data),

  getAluno: (id) => apiClient.get(`/alunos/${id}`).then((res) => res.data),

  atualizarAluno: (id, dadosAluno) =>
    apiClient
      .put(`/alunos/atualizar/${id}/`, dadosAluno)
      .then((res) => res.data),

  deletarAluno: (id) =>
    apiClient.delete(`/alunos/deletar/${id}/`).then((res) => res.data),

  // 👇 PROFESSORES
  getProfessores: () => apiClient.get("/professores/").then((res) => res.data),

  getProfessor: (id) =>
    apiClient.get(`/professores/${id}/`).then((res) => res.data),

  criarProfessor: (dadosProfessor) =>
    apiClient
      .post("/professores/criar/", dadosProfessor)
      .then((res) => res.data),

  atualizarProfessor: (id, dadosProfessor) =>
    apiClient
      .put(`/professores/${id}/`, dadosProfessor)
      .then((res) => res.data),

  deletarProfessor: (id) =>
    apiClient.delete(`/professores/${id}/deletar/`).then((res) => res.data),

  // 👇 AGENDAMENTOS
  getAgendamentosPorProfessor: (professorId) =>
    apiClient
      .get(`/professores/${professorId}/agendamentos/`)
      .then((res) => res.data),

  getAgendamentosAtivosProfessor: (professorId) =>
    apiClient
      .get(`/professores/${professorId}/agendamentos/ativos/`)
      .then((res) => res.data),

  getAgendamentosPorAluno: (alunoId) =>
    apiClient.get(`/alunos/${alunoId}/agendamentos/`).then((res) => res.data),

  getAgendamento: (id) =>
    apiClient.get(`/agendamentos/${id}/`).then((res) => res.data),

  criarAgendamento: (dadosAgendamento) =>
    apiClient
      .post("/agendamentos/criar/", dadosAgendamento)
      .then((res) => res.data),

  atualizarStatusAgendamento: (id, status) =>
    apiClient
      .patch(`/agendamentos/${id}/status/`, { status })
      .then((res) => res.data),

  deletarAgendamento: (id) =>
    apiClient.delete(`/agendamentos/${id}/deletar/`).then((res) => res.data),

  // 👇 SERVIÇOS/MATÉRIAS
  getServicos: () => apiClient.get("/servicos/").then((res) => res.data),

  getServico: (id) => apiClient.get(`/servicos/${id}/`).then((res) => res.data),

  criarServico: (dadosServico) =>
    apiClient.post("/servicos/criar/", dadosServico).then((res) => res.data),

  atualizarServico: (id, dadosServico) =>
    apiClient
      .put(`/servicos/atualizar/${id}/`, dadosServico)
      .then((res) => res.data),

  deletarServico: (id) =>
    apiClient.delete(`/servicos/deletar/${id}/`).then((res) => res.data),
};
