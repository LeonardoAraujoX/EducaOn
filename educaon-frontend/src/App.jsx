import { useState, useEffect } from "react";
import { AlunoForm } from "./components/AlunoForm";
import "./App.css";

function App() {
  const [alunos, setAlunos] = useState([]);

  // Função para carregar alunos da API
  const carregarAlunos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/alunos/");
      const data = await response.json();
      setAlunos(data.alunos || []);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    }
  };

  // Carrega alunos quando o componente é montado
  useEffect(() => {
    carregarAlunos();
  }, []);

  // Função chamada quando um novo aluno é criado
  const handleAlunoCriado = (novoAluno) => {
    // Atualiza a lista de alunos
    carregarAlunos();
  };

  return (
    <div className="app">
      <h1>🎓 EducaOn - Sistema de Alunos</h1>

      {/* Formulário de cadastro */}
      <div className="section">
        <AlunoForm onAlunoCriado={handleAlunoCriado} />
      </div>

      {/* Lista de alunos cadastrados */}
      <div className="section">
        <h2>Alunos Cadastrados ({alunos.length})</h2>
        <div className="alunos-list">
          {alunos.map((aluno) => (
            <div key={aluno.id} className="aluno-card">
              <h3>{aluno.nome}</h3>
              <p>📧 {aluno.email}</p>
              <p>📞 {aluno.numero}</p>
            </div>
          ))}

          {alunos.length === 0 && <p>Nenhum aluno cadastrado ainda.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
