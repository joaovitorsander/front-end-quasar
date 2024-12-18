import { defineStore } from "pinia";
import teamService from "src/services/teamsService";
import { ref } from "vue";

export const useTimesStore = defineStore("teamStore", () => {
  const times = ref([]);
  const error = ref(null);

  async function fetchTimes() {
    try {
      const response = await teamService.getTimes();
      times.value = response.data;
    } catch (err) {
      error.value = "Erro ao buscar times";
      console.error(err);
    }
  }

  async function addTime(time) {
    try {
      await teamService.addTime(time);
      await fetchTimes();
    } catch (err) {
      error.value = "Erro ao adicionar time";
      console.error(err);
    }
  }

  async function updateTime(timeId, time) {
    try {
      await teamService.updateTime(timeId, time);
      await fetchTimes();
    } catch (err) {
      error.value = "Erro ao atualizar time";
      console.error(err);
    }
  }

  async function deleteTime(timeId) {
    try {
      await teamService.deleteTime(timeId);
      await fetchTimes();
    } catch (err) {
      error.value = "Erro ao deletar time";
      console.error(err);
    }
  }

  return { times, error, fetchTimes, addTime, updateTime, deleteTime };
});
