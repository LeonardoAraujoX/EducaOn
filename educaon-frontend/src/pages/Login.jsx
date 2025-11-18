import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import "./Login.css"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("aluno");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!email.trim() || !password.trim() ) {
      toast.error("Crendiciais de login não podem estar vazias!");
      return;
  }
  setLoading(true);

  try {
    const response = await axios.post("http://localhost:8000/auth/login/", {
      email: email,
      password: password,
      userType: userType
    })

    if (response.data && response.data.access){
      const { access, refresh, user} = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("userType", userType);
      localStorage.setItem("userInfo", JSON.stringify(user));


    } else {
      toast.error("Crendenciais inválidas!");
      setLoading(false);
      return;
    }

    if (userType === "aluno"){
      navigate("/dashboard-aluno")
    } else if (userType === "professor") {
      navigate("/dashboard-professor")
    }
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Erro no login");
    } else {
      toast.error("Erro de conexão");
    }
  }
  finally {
    setLoading(false)
  }

}
  return (

  <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
      {/* Título */}
      <h2>Login</h2>
      
      {/* Seletor de tipo de usuário */}
      <div className="user-type-selector">
        <label>
          <input 
            type="radio" 
            value="aluno" 
            checked={userType === "aluno"}
            onChange={(e) => setUserType(e.target.value)}
          />
          Aluno
        </label>
        <label>
          <input 
            type="radio" 
            value="professor" 
            checked={userType === "professor"}
            onChange={(e) => setUserType(e.target.value)}
          />
          Professor
        </label>
      </div>

      {/* Input de email */}
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
        />
      </div>

      {/* Input de senha */}
      <div className="input-group">
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />
      </div>

      {/* Botão de submit */}
      <button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Entrar"}
      </button>
    </form>
  </div>
);
}

export default Login;