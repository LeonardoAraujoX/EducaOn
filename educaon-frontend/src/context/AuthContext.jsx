import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Criando o contexto
const AuthContext = createContext();

// Configuração base do axios
const API_BASE_URL = "http://localhost:3001/api"; // Altere para sua URL

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Verificar se o usuário está logado ao carregar o app
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Configurar o token no axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Verificar se o token é válido
        const response = await axios.get(`${API_BASE_URL}/auth/me`);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };

  // Função de login
  const login = async (email, password) => {
    try {
      setError("");
      setLoading(true);

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Salvar token no localStorage
      localStorage.setItem("token", token);

      // Configurar header de autorização
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
      return { success: true, user };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao fazer login";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Função de cadastro
  const register = async (userData) => {
    try {
      setError("");
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );

      const { token, user } = response.data;

      // Salvar token no localStorage
      localStorage.setItem("token", token);

      // Configurar header de autorização
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
      return { success: true, user };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao criar conta";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setError("");
  };

  // Função de login social (exemplo com Google)
  const socialLogin = async (provider, accessToken) => {
    try {
      setError("");
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/auth/social/${provider}`,
        {
          accessToken,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
      return { success: true, user };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro no login social";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    socialLogin,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
