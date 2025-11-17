import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("professor");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/auth/login/", {
        email: email,
        password: password,
        user_type: userType,
      });

      const { access, refresh, user } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user_type", userType);
      localStorage.setItem("user_info", JSON.stringify(user));

      if (userType === "professor") {
        alert(`Bem-vindo, Professor ${user.name}!`);
      } else {
        alert(`Bem-vindo, Aluno ${user.name}!`);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      if (error.response) {
        setError(
          error.response.data.detail ||
            error.response.data.message ||
            "Erro ao fazer login"
        );
      } else if (error.request) {
        setError("Servidor indisponível. Tente novamente.");
      } else {
        setError("Erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <h1>TutorConnect</h1>
          <p className="subtitle">Entre na sua conta</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Tipo de Usuário</label>
            <div className="user-type-selector">
              <button
                type="button"
                className={`type-btn ${userType === "professor" ? "active" : ""}`}
                onClick={() => setUserType("professor")}
                disabled={loading}
              >
                Professor
              </button>
              <button
                type="button"
                className={`type-btn ${userType === "aluno" ? "active" : ""}`}
                onClick={() => setUserType("aluno")}
                disabled={loading}
              >
                Aluno
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${loading ? 'loading' : ''}`} 
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Não tem uma conta? <a href="#" className="footer-link">Cadastre-se</a>
          </p>
          <a href="#" className="forgot-password">Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;