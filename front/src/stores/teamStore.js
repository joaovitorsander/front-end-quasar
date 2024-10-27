// src/stores/useTimesStore.js
import { defineStore } from "pinia";
import TimesService from "src/services/teamService";
import { ref } from "vue";

export const useTimesStore = defineStore("times", () => {
  const times = ref([]);
  const error = ref(null);

  async function fetchTimes() {
    try {
      const response = await TimesService.getTimes();
      times.value = response.data;
    } catch (err) {
      error.value = "Erro ao buscar times";
      console.error(err);
    }
  }

  async function addTime(time) {
    try {
      const response = await TimesService.addTime(time);
      times.value.push(response.data);
    } catch (err) {
      error.value = "Erro ao adicionar time";
      console.error(err);
    }
  }

  async function updateTime(timeId, time) {
    try {
      await TimesService.updateTime(timeId, time);
      const index = times.value.findIndex((t) => t.id === timeId);
      if (index !== -1) times.value[index] = time;
    } catch (err) {
      error.value = "Erro ao atualizar time";
      console.error(err);
    }
  }

  async function deleteTime(timeId) {
    try {
      await TimesService.deleteTime(timeId);
      times.value = times.value.filter((t) => t.id !== timeId);
    } catch (err) {
      error.value = "Erro ao deletar time";
      console.error(err);
    }
  }

  return { times, error, fetchTimes, addTime, updateTime, deleteTime };
});
