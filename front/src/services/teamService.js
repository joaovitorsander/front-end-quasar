import { api } from "src/boot/axios";

export default {
  getTimes() {
    return api.get("/times");
  },
  addTime(time) {
    return api.post("/times", time);
  },
  updateTime(timeId, time) {
    return api.put(`/times/${timeId}`, time);
  },
  deleteTime(timeId) {
    return api.delete(`/times/${timeId}`);
  },
};
