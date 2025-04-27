// Importa React e hook useState
import React, { useState } from "react";
// Importa o hook de autenticação
import { useAuth } from "../context/AuthContext";

// Componente de registro
export const Register = () => {
  const { register } = useAuth(); // Função de registro do contexto
  const [email, setEmail] = useState(""); // Estado para email
  const [password, setPassword] = useState(""); // Estado para senha
  const [username, setUsername] = useState(""); // Estado para nome de usuário
  const [profileUrl, setProfileUrl] = useState(""); // Estado para URL do perfil

  // Função para realizar o registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, { username, profileUrl });
      alert("Usuário registrado!");
    } catch (error) {
      alert("Erro ao registrar: " + error.message);
    }
  };

  // Renderiza o formulário
  return (
    <form onSubmit={handleSubmit}>
      <h1>Registrar</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="URL da foto de perfil" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} />
      <button type="submit">Registrar</button>
    </form>
  );
};
