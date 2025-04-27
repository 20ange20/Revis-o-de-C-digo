// Importa o React e hooks para estados e efeitos colaterais
import React, { useEffect, useState } from 'react';
// Importa o contexto de autenticação
import { useAuth } from '../context/AuthContext';
// Importa funções para manipular dados no Firestore
import { doc, getDoc, updateDoc } from 'firebase/firestore';
// Importa o banco de dados Firestore configurado
import { db } from '../firebaseConfig';

// Componente para atualizar o perfil do usuário
export const Profile = () => {
    const { user } = useAuth(); // Obtém o usuário do contexto de autenticação
    const [username, setUsername] = useState(''); // Estado para armazenar o novo nome de usuário
    const [profileUrl, setProfileUrl] = useState(''); // Estado para armazenar a nova URL do perfil

    // useEffect para carregar os dados atuais do usuário ao montar o componente
    useEffect(() => {
        if (user?.uid) {
            fetchUserData(user.uid);
        }
    }, [user]);

    // Função para buscar dados do usuário no Firestore
    const fetchUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            setUsername(data.username);
            setProfileUrl(data.profileUrl);
        }
    };

    // Função para atualizar os dados do usuário no Firestore
    const handleUpdate = async () => {
        if (user?.uid) {
            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, {
                username,
                profileUrl
            });
            alert('Perfil atualizado com sucesso!');
        }
    };

    // Renderiza o formulário de atualização de perfil
    return (
        <div>
            <h1>Atualizar Perfil</h1>
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
            <button onClick={handleUpdate}>Salvar</button>
        </div>
    )
};
