import { api } from "src/boot/axios";

export default {
  getCampeonatos() {
    return api.get("/campeonatos");
  },
  getTimes() {
    return api.get("/times");
  },
  addCampeonato(campeonato) {
    return api.post("/campeonatos", campeonato);
  },
  updateCampeonato(camp_id, campeonato) {
    return api.put(`${API_URL}/campeonatos/${camp_id}`, campeonato);
  },
  deleteCampeonato(camp_id) {
    return api.delete(`${API_URL}/campeonatos/${camp_id}`);
  },
};
