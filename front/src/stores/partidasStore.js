import { defineStore } from "pinia";
import partidasService from "src/services/partidasService";

export const usePartidasStore = defineStore("PartidasStore", {
  state: () => ({
    partidas: [],
    mapas: [],
    campeonatos: [],
    times: [],
    error: null,
  }),
  actions: {
    async fetchPartidas() {
      try {
        const response = await partidasService.getPartidas();
        this.partidas = response.data;
      } catch (error) {
        this.error = "Erro ao buscar partidas.";
        console.error(error);
      }
    },
    async fetchMapas() {
      try {
        const response = await partidasService.getMapas();
        this.mapas = response.data;
      } catch (error) {
        this.error = "Erro ao buscar mapas.";
        console.error(error);
      }
    },
    async fetchCampeonatos() {
      try {
        const response = await partidasService.getCampeonatos();
        this.campeonatos = response.data;
      } catch (error) {
        this.error = "Erro ao buscar campeonatos.";
        console.error(error);
      }
    },
    async fetchTimes() {
      try {
        const response = await partidasService.getTimes();
        this.times = response.data;
      } catch (error) {
        this.error = "Erro ao buscar times.";
        console.error(error);
      }
    },
    async addPartida(partidaData) {
      try {
        await partidasService.addPartida(partidaData);
        await this.fetchPartidas();
      } catch (error) {
        this.error = "Erro ao adicionar partida.";
        console.error(error);
      }
    },
    async updatePartida(id, partidaData) {
      try {
        await partidasService.updatePartida(id, partidaData);
        await this.fetchPartidas();
      } catch (error) {
        this.error = "Erro ao atualizar partida.";
        console.error(error);
      }
    },
    async deletePartida(id) {
      try {
        await partidasService.deletePartida(id);
        await this.fetchPartidas();
      } catch (error) {
        this.error = "Erro ao deletar partida.";
        console.error(error);
      }
    },
  },
});
