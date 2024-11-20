import { api } from "src/boot/axios";

export default {
  getMaps() {
    return api.get("/mapas");
  },
  addMap(map) {
    return api.post("/mapas", map);
  },
  updateMap(mapId, map) {
    return api.put(`/mapas/${mapId}`, map);
  },
  deleteMap(mapId) {
    return api.delete(`/mapas/${mapId}`);
  },
};
