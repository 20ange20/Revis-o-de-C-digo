// Importa funções essenciais do React
import { createContext, useContext, useEffect, useState } from "react";
// Importa funções de autenticação do Firebase
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
// Importa a configuração do Firebase (auth e db)
import { auth, db } from "../firebaseConfig";
// Importa funções para manipular documentos no Firestore
import { doc, getDoc, setDoc } from "firebase/firestore";

// Cria um contexto para autenticação
const AuthContext = createContext();

// Componente que provê o contexto para os filhos
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Armazena informações do usuário
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Efeito para observar mudanças de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: currentUser.uid, ...userDoc.data() });
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Função de login com email e senha
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Função de logout
  const logout = () => signOut(auth);

  // Função de registro de novo usuário
  const register = async (email, password, additionalData) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", user.uid), additionalData);
  };

  // Fornece o contexto para os componentes filhos
  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para acessar o contexto
export const useAuth = () => useContext(AuthContext);
