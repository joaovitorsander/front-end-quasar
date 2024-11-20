import { api } from "src/boot/axios";

export default {
  getPartidas() {
    return api.get("/partidas");
  },
  getMapas() {
    return api.get("/mapas");
  },
  getCampeonatos() {
    return api.get("/camp");
  },
  getTimes() {
    return api.get("/times");
  },
  addPartida(partida) {
    return api.post("/partidas", partida);
  },
  updatePartida(partidaId, partida) {
    return api.put(`/partidas/${partidaId}`, partida);
  },
  deletePartida(partidaId) {
    return api.delete(`/partidas/${partidaId}`);
  },
};
