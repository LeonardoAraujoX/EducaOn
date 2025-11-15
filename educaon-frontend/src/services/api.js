const API_BASE = "http://127.0.0.1:8000/api";

export const api = {
  // Buscar todos os alunos
  getAlunos: () => fetch(`${API_BASE}/alunos/`).then((res) => res.json()),

  // Criar novo aluno
  criarAluno: (dadosAluno) =>
    fetch(`${API_BASE}/alunos/criar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(dadosAluno),
    }).then((res) => res.json()),

  // 👇 FUNÇÕES QUE JÁ EXISTEM (para professores):
  getProfessores: () =>
    fetch(`${API_BASE}/professores/`).then((res) => res.json()),

  getAgendamentosPorProfessor: (professorId) =>
    fetch(`${API_BASE}/professores/${professorId}/agendamentos/`).then((res) =>
      res.json()
    ),
};
