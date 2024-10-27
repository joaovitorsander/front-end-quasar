import { defineStore } from "pinia";
import agentService from "src/services/agentService";

export const useAgentStore = defineStore("agentStore", {
  state: () => ({
    agentes: [], // Certifique-se de que começa como array vazio
    error: null,
  }),
  actions: {
    async fetchAgents() {
      try {
        const response = await agentService.getAgents();
        this.agentes = response.data;
      } catch (error) {
        this.error = "Erro ao buscar agentes.";
        console.error(error);
      }
    },
    async addAgent(agentData) {
      try {
        await agentService.addAgent(agentData);
        await this.fetchAgents();
      } catch (error) {
        this.error = "Erro ao adicionar agente.";
        console.error(error);
      }
    },
    async updateAgent(id, agentData) {
      try {
        await agentService.updateAgent(id, agentData);
        await this.fetchAgents();
      } catch (error) {
        this.error = "Erro ao atualizar agente.";
        console.error(error);
      }
    },
    async deleteAgent(id) {
      try {
        await agentService.deleteAgent(id);
        await this.fetchAgents();
      } catch (error) {
        this.error = "Erro ao deletar agente.";
        console.error(error);
      }
    },
  },
});
