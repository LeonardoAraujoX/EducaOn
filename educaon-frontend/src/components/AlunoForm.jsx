import { useState } from "react";

export function AlunoForm({ onAlunoCriado }) {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    numero: "",
  });

  // Estado para mensagens de sucesso/erro
  const [mensagem, setMensagem] = useState("");

  // Função que atualiza os campos quando o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função que envia os dados para a API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    try {
      // 👇 AQUI CHAMAMOS A API PARA CRIAR O ALUNO
      const response = await fetch("http://127.0.0.1:8000/api/alunos/criar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(`✅ Aluno "${formData.nome}" criado com sucesso!`);
        // Limpa o formulário
        setFormData({ nome: "", email: "", numero: "" });

        // Chama a função do pai (se existir)
        if (onAlunoCriado) {
          onAlunoCriado(data.aluno);
        }
      } else {
        setMensagem(`❌ Erro: ${data.erro || "Erro ao criar aluno"}`);
      }
    } catch (error) {
      setMensagem("❌ Erro de conexão com o servidor");
    }
  };

  return (
    <div className="aluno-form">
      <h3>Cadastrar Novo Aluno</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome completo:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: joao@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Número de telefone:</label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            placeholder="Ex: (11) 99999-9999"
            required
          />
        </div>

        <button type="submit">Cadastrar Aluno</button>
      </form>

      {/* Mostra mensagem de sucesso/erro */}
      {mensagem && (
        <div
          className={`mensagem ${mensagem.includes("✅") ? "sucesso" : "erro"}`}
        >
          {mensagem}
        </div>
      )}
    </div>
  );
}
