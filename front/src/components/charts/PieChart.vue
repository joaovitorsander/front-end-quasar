<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Pie } from "vue-chartjs";
import { ref } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  chartData: Object,
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

.chart-container {
  width: 100%;
  max-width: 300px;
  height: 300px;
  margin: auto;
}
</style>
