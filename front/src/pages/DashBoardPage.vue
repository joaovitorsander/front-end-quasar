<template>
  <q-page class="q-pa-md custom-page">
    <q-spinner v-if="loading" size="30px" color="primary" />
    <div v-if="error" class="text-negative">{{ error }}</div>

    <div
      class="row q-gutter-md q-justify-center q-mt-md"
      v-if="!loading && !error"
    >
      <!-- Top 3 Players -->
      <q-card class="col-5 custom-card">
        <q-card-section>
          <div class="text-h6 card-title">🏆 Top 3 Players</div>
          <q-separator class="q-mb-md" />
          <div v-if="topPlayers.length > 0">
            <div
              v-for="(player, index) in topPlayers"
              :key="player.usuario_id"
              class="team-card"
            >
              <div class="team-header">
                <q-avatar :color="getPlayerMedalColor(index)" size="md">{{
                  index + 1
                }}</q-avatar>
                <div class="team-name">{{ player.nick_usuario }}</div>
              </div>
              <div class="team-info">
                <div>🏅 <span>Total de Vitórias:</span> {{ player.wins }}</div>
                <div>⚔️ <span>KDA:</span> {{ player.kda }}</div>
                <div>🏟️ <span>Equipe Atual:</span> {{ player.team }}</div>
                <div>
                  📅 <span>Última Partida:</span> {{ player.lastMatch }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            Nenhum dado disponível para jogadores.
          </div>
        </q-card-section>
      </q-card>

      <!-- Top 3 Times -->
      <q-card class="col-5 custom-card">
        <q-card-section>
          <div class="text-h6 card-title">🥇 Top 3 Times</div>
          <q-separator class="q-mb-md" />
          <div v-if="topTimes.length > 0">
            <div
              v-for="(time, index) in topTimes"
              :key="time.time_id"
              class="team-card"
            >
              <div class="team-header">
                <q-avatar :color="getTeamMedalColor(index)" size="md">
                  {{ index + 1 }}
                </q-avatar>
                <div class="team-name">{{ time.nome_time }}</div>
              </div>
              <q-separator />
              <div class="team-info">
                <div>
                  🏆 Partidas Vencidas no Ano: <span>{{ time.wins }}</span>
                </div>
                <div>
                  📊 Porcentagem de Vitórias: <span>{{ time.winRate }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>Nenhum dado disponível para times.</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Gráficos e Ranking -->
    <div
      class="row q-gutter-md q-justify-center q-mt-md"
      v-if="!loading && !error"
    >
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
// Os dados fictícios e métodos continuam
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
const topPlayers = ref([
  {
    usuario_id: 1,
    nick_usuario: "Vinix",
    wins: 25,
    kda: "3.5",
    team: "Fnatic",
    lastMatch: "2024-11-18",
  },
  {
    usuario_id: 2,
    nick_usuario: "Carool",
    wins: 18,
    kda: "2.9",
    team: "Sentinels",
    lastMatch: "2024-11-15",
  },
  {
    usuario_id: 3,
    nick_usuario: "joaodagios",
    wins: 12,
    kda: "2.1",
    team: "LOUD",
    lastMatch: "2024-11-10",
  },
]);

const topTimes = ref([
  {
    time_id: 1,
    nome_time: "Fnatic",
    wins: 45,
    winRate: 80,
  },
  {
    time_id: 2,
    nome_time: "Sentinels",
    wins: 40,
    winRate: 75,
  },
  {
    time_id: 3,
    nome_time: "LOUD",
    wins: 35,
    winRate: 70,
  },
]);

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

const ranking = ref([
  { rank: 1, time: "Fnatic", pontos: 100 },
  { rank: 2, time: "Sentinels", pontos: 90 },
  { rank: 3, time: "DRX", pontos: 85 },
  { rank: 4, time: "Team Liquid", pontos: 80 },
  { rank: 5, time: "LOUD", pontos: 75 },
]);

const columns = [
  { name: "rank", label: "Ranking", field: "rank", align: "left" },
  { name: "time", label: "Time", field: "time", align: "left" },
  { name: "pontos", label: "Pontos", field: "pontos", align: "left" },
];

const getPlayerMedalColor = (index) => {
  if (index === 0) return "gold";
  if (index === 1) return "silver";
  if (index === 2) return "bronze";
  return "grey";
};

const getTeamMedalColor = (index) => {
  if (index === 0) return "gold";
  if (index === 1) return "silver";
  if (index === 2) return "bronze";
  return "grey";
};
</script>

<style scoped>
.custom-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  margin: 15px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.custom-card:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
}

.card-title {
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
}

/* Aplicando o mesmo estilo do card de times para jogadores */
.team-card {
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
}

.team-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.team-header .team-name {
  margin-left: 15px;
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.team-info div {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.team-info span {
  font-weight: bold;
  margin-left: 5px;
}

.q-avatar {
  font-size: 14px;
  color: white;
  font-weight: bold;
}

.no-data {
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-top: 15px;
}
</style>
