import { api } from "src/boot/axios";

export default {
  async login(username, password) {
    const response = await api.get("/usuarios");
    const users = response.data;
    const user = users.find(
      (u) => u.nome_de_usuario === username && u.senha === password
    );
    if (user) {
      return user;
    } else {
      throw new Error("Usuário ou senha incorretos.");
    }
  },

  async register(newUser) {
    const response = await api.get("/usuarios");
    const users = response.data;
    const userExists = users.some(
      (u) => u.nome_de_usuario === newUser.nome_de_usuario
    );
    if (userExists) {
      throw new Error("Nome de usuário já existe.");
    }

    const registerResponse = await api.post("/usuarios", newUser);
    return registerResponse.data;
  },
};
