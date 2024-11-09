import { defineStore } from "pinia";
import dashboardService from "src/services/dashboardService";

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    topPlayers: [],
    topTimes: [],
    ranking: [],
    mostPlayedAgents: [],
    mostPlayedMaps: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDashboardData() {
      this.loading = true;
      this.error = null;
      try {
        const data = await dashboardService.getDashboardData();

        this.topPlayers = data.topPlayers.slice(0, 3);
        this.topTimes = data.topTimes.slice(0, 3);
        this.ranking = data.ranking;
        this.mostPlayedAgents = data.mostPlayedAgents.slice(0, 4);
        this.mostPlayedMaps = data.mostPlayedMaps.slice(0, 4);
      } catch (err) {
        this.error = "Erro ao carregar dados da Dashboard";
      } finally {
        this.loading = false;
      }
    },
  },
});
