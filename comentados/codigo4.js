// Importa o React e hook useState
import React, { useState } from 'react';
// Importa o contexto de autenticação
import { useAuth } from '../context/AuthContext';

// Componente para registrar novo usuário
export const Register = () => {
    const { register } = useAuth(); // Obtém a função de registrar do contexto
    const [email, setEmail] = useState(''); // Estado para o email
    const [password, setPassword] = useState(''); // Estado para a senha
    const [username, setUsername] = useState(''); // Estado para o nome de usuário
    const [profileUrl, setProfileUrl] = useState(''); // Estado para a URL da foto de perfil

    // Função chamada ao tentar registrar
    const handleRegister = async () => {
        const result = await register(email, password, username, profileUrl);
        if (result.success) {
            alert('Usuário registrado com sucesso!');
        } else {
            alert('Erro ao registrar: ' + result.msg);
        }
    };

    // Renderiza o formulário de registro
    return (
        <div>
            <h1>Registrar</h1>
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
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Nome de usuário" 
            />
            <input 
                type="text" 
                value={profileUrl} 
                onChange={(e) => setProfileUrl(e.target.value)} 
                placeholder="URL da foto de perfil" 
            />
            <button onClick={handleRegister}>Registrar</button>
        </div>
    )
};
