<template>
  <q-card-section>
    <h3 class="chart-title">Agentes mais jogados</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </q-card-section>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { ref } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = ref({
  labels: ["Agente 1", "Agente 2", "Agente 3"],
  datasets: [
    {
      label: "Quantidade de Jogos",
      backgroundColor: "#3b82f6",
      data: [10, 20, 30],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<style scoped>
.chart-title {
  text-align: center;
  color: #e74c3c;
  font-weight: bold;
}
</style>
