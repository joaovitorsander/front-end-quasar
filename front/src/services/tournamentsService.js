import { api } from "src/boot/axios";

export default {
  getCampeonatos() {
    return api.get("/camp");
  },
  getTimes() {
    return api.get("/times");
  },
  addCampeonato(campeonato) {
    return api.post("/camp", campeonato);
  },
  updateCampeonato(camp_id, campeonato) {
    return api.put(`/camp/${camp_id}`, campeonato);
  },
  deleteCampeonato(camp_id) {
    return api.delete(`/camp/${camp_id}`);
  },
};
