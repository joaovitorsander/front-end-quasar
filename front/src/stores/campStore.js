import { defineStore } from "pinia";
import campService from "src/services/campService";

export const useCampeonatoStore = defineStore("campeonato", {
  state: () => ({
    campeonatos: [],
    times: [],
  }),
  actions: {
    async fetchCampeonatos() {
      try {
        const response = await campService.getCampeonatos();
        this.campeonatos = response.data;
      } catch (error) {
        console.error("Erro ao buscar campeonatos:", error);
      }
    },
    async fetchTimes() {
      try {
        const response = await campService.getTimes();
        this.times = response.data;
      } catch (error) {
        console.error("Erro ao buscar times:", error);
      }
    },
    async addCampeonato(campeonato) {
      try {
        await campService.addCampeonato(campeonato);
        this.fetchCampeonatos();
      } catch (error) {
        console.error("Erro ao adicionar campeonato:", error);
      }
    },
    async updateCampeonato(campId, campeonato) {
      try {
        await campService.updateCampeonato(campId, campeonato);
        this.fetchCampeonatos();
      } catch (error) {
        console.error("Erro ao atualizar campeonato:", error);
      }
    },
    async deleteCampeonato(campId) {
      try {
        await campService.deleteCampeonato(campId);
        this.fetchCampeonatos();
      } catch (error) {
        console.error("Erro ao deletar campeonato:", error);
      }
    },
  },
});
