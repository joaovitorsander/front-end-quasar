import { defineStore } from "pinia";
import mapService from "src/services/mapsService";

export const useMapStore = defineStore("mapStore", {
  state: () => ({
    maps: [],
    error: null,
  }),
  actions: {
    async fetchMaps() {
      try {
        const response = await mapService.getMaps();
        this.maps = response.data;
      } catch (error) {
        this.error = "Erro ao buscar mapas.";
        console.error(error);
      }
    },
    async addMap(mapData) {
      try {
        await mapService.addMap(mapData);
        await this.fetchMaps();
      } catch (error) {
        this.error = "Erro ao adicionar mapa.";
        console.error(error);
      }
    },
    async updateMap(id, mapData) {
      try {
        await mapService.updateMap(id, mapData);
        await this.fetchMaps();
      } catch (error) {
        this.error = "Erro ao atualizar mapa.";
        console.error(error);
      }
    },
    async deleteMap(id) {
      try {
        await mapService.deleteMap(id);
        await this.fetchMaps();
      } catch (error) {
        this.error = "Erro ao deletar mapa.";
        console.error(error);
      }
    },
  },
});
