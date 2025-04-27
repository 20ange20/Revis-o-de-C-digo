// Importa o React e hooks necessários
import React, { useState } from 'react';
// Importa funções de autenticação
import { useAuth } from '../context/AuthContext';

// Componente de formulário de login
export const Login = () => {
    const { login } = useAuth(); // Obtém a função de login do contexto
    const [email, setEmail] = useState(''); // Estado para armazenar o email
    const [password, setPassword] = useState(''); // Estado para armazenar a senha

    // Função chamada ao tentar fazer login
    const handleLogin = async () => {
        const result = await login(email, password);
        if (result.success) {
            alert('Login realizado com sucesso!');
        } else {
            alert('Erro ao fazer login: ' + result.msg);
        }
    };

    // Renderiza o formulário de login
    return (
        <div>
            <h1>Login</h1>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Senha" 
            />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    )
};
