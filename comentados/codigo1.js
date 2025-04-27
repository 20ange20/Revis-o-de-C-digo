// Importa funções do React para manipular contexto, estados e efeitos
import { createContext, useContext, useEffect, useState } from "react";

// Importa funções de autenticação do Firebase
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Importa a instância de autenticação e o banco de dados Firestore configurados
import { auth, db } from "../firebaseConfig";

// Importa funções para interagir com documentos do Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore'

// Cria um contexto de autenticação
export const AuthContext = createContext();

// Componente que provê o contexto de autenticação para toda a aplicação
export const AuthContextProvider = ({ children }) => {
    // Estado para armazenar o usuário autenticado
    const [user, setUser] = useState(null);
    // Estado que indica se a autenticação já foi checada
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    // Efeito que observa mudanças no estado de autenticação
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid); // Atualiza informações extras do usuário
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        // Retorna a função de limpeza para remover o listener
        return unsub;
    }, []);

    // Função para buscar e atualizar informações adicionais do usuário
    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId });
        }
    }

    // Função para autenticar o usuário usando email e senha
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/invalid-credential)')) msg = 'E-mail ou Senha incorretos';
            return { success: false, msg };
        }
    }

    // Função para deslogar o usuário
    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message, error: e };
        }
    }

    // Função para registrar um novo usuário no Firebase e no Firestore
    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            });
            return { success: true, data: response?.user };
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/email-already-in-use)')) msg = 'Esse e-mail já está em uso';
            return { success: false, msg };
        }
    }

    // Fornece o contexto para os componentes filhos
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook customizado para acessar o contexto de autenticação
export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useAuth deve ser usado dentro de AuthContextProvider');
    }
    return value;
}
