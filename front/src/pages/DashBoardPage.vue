<template>
  <q-page class="q-pa-md custom-page">
    <q-spinner v-if="loading" size="30px" color="primary" />
    <div v-if="error" class="text-negative">{{ error }}</div>

    <div
      class="row q-gutter-md q-justify-center q-mt-md"
      v-if="!loading && !error"
    >
      <q-card class="col-4 custom-card">
        <q-card-section>
          <div class="text-h6 card-title">Top 3 Players</div>
          <q-separator class="q-mb-md" />
          <div v-if="topPlayers.length > 0">
            <q-item-label v-for="player in topPlayers" :key="player.usuario_id">
              {{ player.nick_usuario || "Nome não disponível" }}
            </q-item-label>
          </div>
          <div v-else>Nenhum dado disponível para jogadores.</div>
        </q-card-section>
      </q-card>

      <q-card class="col-4 custom-card">
        <q-card-section>
          <div class="text-h6 card-title">Top 3 Times</div>
          <q-separator class="q-mb-md" />
          <div v-if="topTimes.length > 0">
            <q-item-label v-for="time in topTimes" :key="time.time_id">
              {{ time.nome_time || "Nome do time não disponível" }}
            </q-item-label>
          </div>
          <div v-else>Nenhum dado disponível para times.</div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 custom-card">
        <q-card-section>
          <div class="text-h6 card-title">Ranking do Campeonato</div>
          <q-separator class="q-mb-md" />
          <q-table
            v-if="ranking.length > 0"
            :rows-per-page-options="[5]"
            :rows="ranking"
            :columns="columns"
          ></q-table>
          <div v-else>Nenhum dado disponível para o ranking.</div>
        </q-card-section>
      </q-card>
    </div>

    <div
      class="row q-gutter-md q-justify-center q-mt-md"
      v-if="!loading && !error"
    >
      <q-card class="col-5 custom-card">
        <q-card-section>
          <div class="text-h6 card-title">Agentes mais jogados</div>
          <q-separator class="q-mb-md" />
          <div v-if="mostPlayedAgents.length > 0">
            <BarChart :chartData="barChartData" />
          </div>
          <div v-else>Nenhum dado disponível para agentes.</div>
        </q-card-section>
      </q-card>

      <q-card class="col-5 custom-card">
        <q-card-section>
          <div class="text-h6 card-title">Mapas mais jogados</div>
          <q-separator class="q-mb-md" />
          <div v-if="mostPlayedMaps.length > 0">
            <div class="chart-container">
              <PieChart :chartData="pieChartData" />
            </div>
          </div>
          <div v-else>Nenhum dado disponível para mapas.</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useDashboardStore } from "src/stores/dashboardStore";
import BarChart from "src/components/charts/BarChart.vue";
import PieChart from "src/components/charts/PieChart.vue";

const store = useDashboardStore();

onMounted(() => {
  store.fetchDashboardData();
});

const loading = computed(() => store.loading);
const error = computed(() => store.error);
const topPlayers = computed(() => store.topPlayers);
const topTimes = computed(() => store.topTimes);
const mostPlayedAgents = computed(() => store.mostPlayedAgents);
const mostPlayedMaps = computed(() => store.mostPlayedMaps);

const pieChartData = computed(() => {
  return {
    labels: mostPlayedMaps.value.map((mapa) => mapa.nome_mapa),
    datasets: [
      {
        label: "",
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffcd56"],
        data: mostPlayedMaps.value.map((mapa) => mapa.quantidade || mapa.jogos),
      },
    ],
  };
});

const barChartData = computed(() => {
  return {
    labels: mostPlayedAgents.value.map((agente) => agente.nome_agente),
    datasets: [
      {
        label: "",
        backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726", "#ab47bc"],
        data: mostPlayedAgents.value.map((agente) => agente.quantidade),
      },
    ],
  };
});

// Dados fictícios para o ranking
const ranking = ref([
  { rank: 1, time: "Time A", pontos: 100 },
  { rank: 2, time: "Time B", pontos: 90 },
  { rank: 3, time: "Time C", pontos: 85 },
  { rank: 4, time: "Time D", pontos: 80 },
  { rank: 5, time: "Time E", pontos: 75 },
  { rank: 6, time: "Time F", pontos: 70 },
  { rank: 7, time: "Time G", pontos: 65 },
  { rank: 8, time: "Time H", pontos: 60 },
]);

const columns = [
  { name: "rank", label: "Ranking", field: "rank", align: "left" },
  { name: "time", label: "Time", field: "time", align: "left" },
  { name: "pontos", label: "Pontos", field: "pontos", align: "left" },
];
</script>

<style scoped>
.custom-page {
  background-color: #f0f0f0;
}

.custom-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin: 15px;
}

.card-title {
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
}

.chart-container {
  height: 250px;
}
</style>
