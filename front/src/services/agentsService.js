import { api } from "src/boot/axios";

export default {
  getAgents() {
    return api.get("/agentes");
  },
  addAgent(agent) {
    return api.post("/agentes", agent);
  },
  updateAgent(agentId, agent) {
    return api.put(`/agentes/${agentId}`, agent);
  },
  deleteAgent(agentId) {
    return api.delete(`/agentes/${agentId}`);
  },
};
