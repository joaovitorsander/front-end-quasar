import { api } from "src/boot/axios";

export default {
  getJogadoresTimes() {
    return api.get("/jogadores_times");
  },
  addJogadorTime(jogadorTime) {
    return api.post("/jogadores_times", jogadorTime);
  },
  updateJogadorTime(jogadorTimeId, jogadorTime) {
    return api.put(`/jogadores_times/${jogadorTimeId}`, jogadorTime);
  },
  deleteJogadorTime(jogadorTimeId) {
    return api.delete(`/jogadores_times/${jogadorTimeId}`);
  },
};
