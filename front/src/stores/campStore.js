// src/stores/campStore.js
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
        this.fetchCampeonatos(); // Atualiza a lista após adicionar
      } catch (error) {
        console.error("Erro ao adicionar campeonato:", error);
      }
    },
  },
});
