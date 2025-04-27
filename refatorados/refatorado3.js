// Importa React e hook useState
import React, { useState } from "react";
// Importa o hook de autenticação
import { useAuth } from "../context/AuthContext";

// Componente de login
export const Login = () => {
  const { login } = useAuth(); // Função de login do contexto
  const [email, setEmail] = useState(""); // Estado para email
  const [password, setPassword] = useState(""); // Estado para senha

  // Função para realizar o login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login realizado!");
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  // Renderiza o formulário
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
};
