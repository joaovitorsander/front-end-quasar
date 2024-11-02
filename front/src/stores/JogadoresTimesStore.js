import { defineStore } from "pinia";
import jogadorTimeService from "src/services/JogadoresTimesService";

export const useJogadoresTimesStore = defineStore("JogadoresTimesStore", {
  state: () => ({
    jogadoresTimes: [],
    times: [],
    error: null,
  }),
  actions: {
    async fetchJogadoresTimes() {
      try {
        const response = await jogadorTimeService.getJogadoresTimes();
        this.jogadoresTimes = response.data;
      } catch (error) {
        this.error = "Erro ao buscar jogadores times.";
        console.error(error);
      }
    },
    async fetchTimes() {
      try {
        const response = await jogadorTimeService.getTimes();
        this.times = response.data;
      } catch (error) {
        this.error = "Erro ao buscar times.";
        console.error(error);
      }
    },
    async addJogadorTime(jogadorTimeData) {
      try {
        await jogadorTimeService.addJogadorTime(jogadorTimeData);
        await this.fetchJogadoresTimes();
      } catch (error) {
        this.error = "Erro ao adicionar jogador ao time.";
        console.error(error);
      }
    },
    async updateJogadorTime(id, jogadorTimeData) {
      try {
        await jogadorTimeService.updateJogadorTime(id, jogadorTimeData);
        await this.fetchJogadoresTimes();
      } catch (error) {
        this.error = "Erro ao atualizar jogador do time.";
        console.error(error);
      }
    },
    async deleteJogadorTime(id) {
      try {
        await jogadorTimeService.deleteJogadorTime(id);
        await this.fetchJogadoresTimes();
      } catch (error) {
        this.error = "Erro ao deletar jogador do time.";
        console.error(error);
      }
    },
  },
});
