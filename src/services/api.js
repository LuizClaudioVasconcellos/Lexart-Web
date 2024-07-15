import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const api = axios.create({
  baseURL: "https://lexart.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Adiciona um interceptor de resposta
api.interceptors.response.use(
  (response) => {
    console.log(response);
    // Retorna a resposta se não houver erros
    return response;
  },
  (error) => {
    const navigate = useNavigate();

    const { logout } = useContext(AuthContext);

    // Verifica se o erro é de autenticação (token expirado)
    if (error.response && error.response.status === 401) {
      logout(); // Executa a função de logout
      navigate("/login"); // Redireciona para a página de login
    }

    return Promise.reject(error);
  }
);

export default api;
