Código 1
Melhor organizado pois agrupou login, logout, register e user dentro de um único AuthContext.Provider.
Também adicionou controle de loading para saber se o Firebase já terminou de verificar o usuário e agora quando registra, já salva dados adicionais no Firestore.

Código 2
Juntou username e profileUrl em um único profileData e usa setProfileData({ ...profileData, campoNovo }) em vez de vários estados separados.

Código 3
Usa onSubmit do <form>, evitando o reload padrão do navegador e usa try/catch pra capturar falhas no login.

Código 4
Captura falhas no registro (por exemplo, email já usado) e ao registrar, já passa username e profileUrl como objeto no Firestore.