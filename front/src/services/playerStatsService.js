import { api } from "src/boot/axios";

export default {
  getEstatisticas() {
    return api.get("/estatisticas_do_jogador");
  },
  getJogadores() {
    return api.get("/jogadores_times");
  },
  getPartidas() {
    return api.get("/partidas");
  },
  getAgentes() {
    return api.get("/agentes");
  },
  addEstatistica(estatistica) {
    return api.post("/estatisticas_do_jogador", estatistica);
  },
  updateEstatistica(estatisticaId, estatistica) {
    return api.put(`/estatisticas_do_jogador/${estatisticaId}`, estatistica);
  },
  deleteEstatistica(estatisticaId) {
    return api.delete(`/estatisticas_do_jogador/${estatisticaId}`);
  },
};
