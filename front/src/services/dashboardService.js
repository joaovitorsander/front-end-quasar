import { api } from "src/boot/axios";

export default {
  async getDashboardData() {
    try {
      const [
        playersResponse,
        teamsResponse,
        rankingResponse,
        agentsResponse,
        mapsResponse,
      ] = await Promise.all([
        api.get("/usuarios"),
        api.get("/times"),
        api.get("/partidas"),
        api.get("/agentes"),
        api.get("/mapas"),
      ]);

      return {
        topPlayers: playersResponse.data,
        topTimes: teamsResponse.data,
        ranking: rankingResponse.data,
        mostPlayedAgents: agentsResponse.data,
        mostPlayedMaps: mapsResponse.data,
      };
    } catch (error) {
      console.error("Erro ao carregar dados da Dashboard:", error);
      throw error;
    }
  },
};
