import { defineStore } from "pinia";
import estatisticasJogadorService from "@/services/playerStatsService";

export const useEstatisticasJogadorStore = defineStore(
  "estatisticasJogadorStore",
  {
    state: () => ({
      estatisticas: [],
      jogadores: [],
      partidas: [],
      agentes: [],
      error: null,
    }),
    actions: {
      async fetchEstatisticas() {
        try {
          const response = await estatisticasJogadorService.getEstatisticas();
          this.estatisticas = response.data;
        } catch (error) {
          this.error = "Erro ao buscar estatísticas dos jogadores.";
          console.error(error);
        }
      },
      async fetchJogadores() {
        try {
          const response = await estatisticasJogadorService.getJogadores();
          this.jogadores = response.data;
        } catch (error) {
          this.error = "Erro ao buscar jogadores.";
          console.error(error);
        }
      },
      async fetchPartidas() {
        try {
          const response = await estatisticasJogadorService.getPartidas();
          this.partidas = response.data;
        } catch (error) {
          this.error = "Erro ao buscar partidas.";
          console.error(error);
        }
      },
      async fetchAgentes() {
        try {
          const response = await estatisticasJogadorService.getAgentes();
          this.agentes = response.data;
        } catch (error) {
          this.error = "Erro ao buscar agentes.";
          console.error(error);
        }
      },
      async addEstatistica(estatisticaData) {
        try {
          await estatisticasJogadorService.addEstatistica(estatisticaData);
          await this.fetchEstatisticas();
        } catch (error) {
          this.error = "Erro ao adicionar estatística.";
          console.error(error);
        }
      },
      async updateEstatistica(id, estatisticaData) {
        try {
          await estatisticasJogadorService.updateEstatistica(
            id,
            estatisticaData
          );
          await this.fetchEstatisticas();
        } catch (error) {
          this.error = "Erro ao atualizar estatística.";
          console.error(error);
        }
      },
      async deleteEstatistica(id) {
        try {
          await estatisticasJogadorService.deleteEstatistica(id);
          await this.fetchEstatisticas();
        } catch (error) {
          this.error = "Erro ao deletar estatística.";
          console.error(error);
        }
      },
    },
  }
);
