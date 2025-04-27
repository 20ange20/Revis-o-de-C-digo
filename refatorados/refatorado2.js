// Importa React e hook useEffect, useState
import React, { useEffect, useState } from "react";
// Importa o hook de autenticação
import { useAuth } from "../context/AuthContext";
// Importa funções de manipulação do Firestore
import { doc, getDoc, updateDoc } from "firebase/firestore";
// Importa a instância do Firestore
import { db } from "../firebaseConfig";

// Componente para exibir e editar o perfil do usuário
export const Profile = () => {
  const { user } = useAuth(); // Obtém o usuário autenticado
  const [profileData, setProfileData] = useState({ username: "", profileUrl: "" }); // Estado para armazenar dados do perfil

  // Carrega dados do perfil ao montar
  useEffect(() => {
    if (user?.uid) {
      const fetchData = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      };
      fetchData();
    }
  }, [user]);

  // Atualiza dados do perfil no Firestore
  const handleUpdate = async () => {
    if (user?.uid) {
      await updateDoc(doc(db, "users", user.uid), profileData);
      alert("Perfil atualizado!");
    }
  };

  // Renderiza o formulário
  return (
    <div>
      <h1>Perfil</h1>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={profileData.username}
        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL da foto de perfil"
        value={profileData.profileUrl}
        onChange={(e) => setProfileData({ ...profileData, profileUrl: e.target.value })}
      />
      <button onClick={handleUpdate}>Salvar</button>
    </div>
  );
};
