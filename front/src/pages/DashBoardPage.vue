<template>
  <q-page class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-lg custom-page">
          <q-spinner v-if="loading" size="30px" color="primary" />
          <div v-if="error" class="text-negative">{{ error }}</div>
          <div class="row q-gutter-md q-justify-center q-mt-md" v-if="!loading && !error">
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
                <q-table v-if="ranking.length > 0" :rows-per-page-options="[5]" :rows="ranking"
                  :columns="columns"></q-table>
                <div v-else>Nenhum dado disponível para o ranking.</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="row q-gutter-md q-justify-center q-mt-md" v-if="!loading && !error">
            <q-card class="col-5 custom-card">
              <q-card-section>
                <div class="text-h6 card-title">Agentes mais jogados</div>
                <q-separator class="q-mb-md" />
                <div v-if="mostPlayedAgents.length > 0">
                  <q-item-label v-for="agente in mostPlayedAgents" :key="agente.agente_id">
                    {{ agente.nome_agente }}
                  </q-item-label>
                </div>
                <div v-else>Nenhum dado disponível para agentes.</div>
              </q-card-section>
            </q-card>

            <q-card class="col-5 custom-card">
              <q-card-section>
                <div class="text-h6 card-title">Mapas mais jogados</div>
                <q-separator class="q-mb-md" />
                <div v-if="mostPlayedMaps.length > 0">
                  <q-item-label v-for="mapa in mostPlayedMaps" :key="mapa.mapa_id">
                    {{ mapa.nome_do_mapa }}
                  </q-item-label>
                </div>
                <div v-else>Nenhum dado disponível para mapas.</div>
              </q-card-section>
            </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useDashboardStore } from "src/stores/dashboardStore";

const store = useDashboardStore();

onMounted(() => {
  store.fetchDashboardData();
});

const loading = computed(() => store.loading);
const error = computed(() => store.error);
const topPlayers = computed(() => store.topPlayers);
const topTimes = computed(() => store.topTimes);
const ranking = computed(() => store.ranking);
const mostPlayedAgents = computed(() => store.mostPlayedAgents);
const mostPlayedMaps = computed(() => store.mostPlayedMaps);

const columns = [
  { name: "rank", label: "Ranking", field: "rank", align: "left" },
  { name: "time", label: "Time", field: "time", align: "left" },
  { name: "pontos", label: "Pontos", field: "pontos", align: "left" },
];
</script>

<style scoped>
.custom-drawer {
  background-color: #f7f7f7;
}

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

.q-drawer a {
  color: #333;
}

.q-drawer a:hover {
  color: #e74c3c;
}
</style>
