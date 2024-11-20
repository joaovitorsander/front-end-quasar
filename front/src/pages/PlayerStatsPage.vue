<template>
  <q-page class="q-pa-md">
    <div class="layout-container">
      <div class="form-section">
        <q-card class="q-pa-md custom-card">
          <q-form @submit.prevent="submitEstatistica">
            <q-select
              filled
              v-model="jogadorId"
              :options="jogadorOptions"
              label="Selecione o Jogador"
              option-label="nome_jogador"
              option-value="id"
              class="q-mb-md"
            />
            <q-select
              filled
              v-model="partidaId"
              :options="partidaOptions"
              label="Selecione a Partida"
              option-label="data_da_partida"
              option-value="id"
              class="q-mb-md"
            />
            <q-select
              filled
              v-model="agenteId"
              :options="agenteOptions"
              label="Selecione o Agente"
              option-label="nome_agente"
              option-value="id"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="kills"
              label="Kills"
              type="number"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="mortes"
              label="Mortes"
              type="number"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="assistencias"
              label="Assistências"
              type="number"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="plants"
              label="Plants"
              type="number"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="defuses"
              label="Defuses"
              type="number"
              class="q-mb-md"
            />
            <q-btn
              type="submit"
              :label="editMode ? 'ATUALIZAR' : 'SALVAR'"
              color="primary"
              class="full-width q-mt-lg save-button"
            />
            <q-btn
              @click="resetForm"
              label="NOVO"
              color="secondary"
              class="full-width q-mt-md save-button"
            />
          </q-form>
        </q-card>
      </div>

      <div class="list-section">
        <q-card class="q-pa-md custom-card">
          <q-table
            v-if="estatisticas && estatisticas.length"
            :rows="estatisticas"
            :columns="columns"
            row-key="id"
            title="Estatísticas dos Jogadores"
            dense
            flat
            bordered
          >
            <template v-slot:body-cell-jogador="props">
              <q-td :props="props">{{ props.row.jogador.nick_usuario }}</q-td>
            </template>
            <template v-slot:body-cell-partida="props">
              <q-td :props="props">{{ props.row.partida.nome_partida }}</q-td>
            </template>
            <template v-slot:body-cell-agente="props">
              <q-td :props="props">{{ props.row.agente.nome_agente }}</q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn
                  flat
                  round
                  icon="edit"
                  @click="loadEstatistica(props.row)"
                />
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="deleteEstatistica(props.row.id)"
                />
              </q-td>
            </template>
          </q-table>
          <div v-else class="q-pa-md">Nenhuma estatística cadastrada</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useEstatisticasJogadorStore } from "@/stores/playerStatsStore";

const store = useEstatisticasJogadorStore();

const jogadorId = ref(null);
const partidaId = ref(null);
const agenteId = ref(null);
const kills = ref(0);
const mortes = ref(0);
const assistencias = ref(0);
const plants = ref(0);
const defuses = ref(0);
const editMode = ref(false);
const currentEstatisticaId = ref(null);

const columns = [
  {
    name: "jogador",
    label: "Jogador",
    align: "left",
    field: "jogador",
    sortable: true,
  },
  {
    name: "partida",
    label: "Partida",
    align: "left",
    field: "partida",
    sortable: true,
  },
  {
    name: "agente",
    label: "Agente",
    align: "left",
    field: "agente",
    sortable: true,
  },
  {
    name: "kills",
    label: "Kills",
    align: "left",
    field: "kills",
    sortable: true,
  },
  {
    name: "mortes",
    label: "Mortes",
    align: "left",
    field: "mortes",
    sortable: true,
  },
  {
    name: "assistencias",
    label: "Assistências",
    align: "left",
    field: "assistencias",
    sortable: true,
  },
  {
    name: "plants",
    label: "Plants",
    align: "left",
    field: "plants",
    sortable: true,
  },
  {
    name: "defuses",
    label: "Defuses",
    align: "left",
    field: "defuses",
    sortable: true,
  },
  { name: "actions", label: "Ações", align: "center", field: "actions" },
];

const jogadorOptions = computed(() => store.jogadores);
const partidaOptions = computed(() => store.partidas);
const agenteOptions = computed(() => store.agentes);
const estatisticas = computed(() => store.estatisticas);

onMounted(async () => {
  await store.fetchEstatisticas();
  await store.fetchJogadores();
  await store.fetchPartidas();
  await store.fetchAgentes();
});

function submitEstatistica() {
  const estatisticaData = {
    jog_id: jogadorId.value,
    partida_id: partidaId.value,
    agente_id: agenteId.value,
    kills: kills.value,
    mortes: mortes.value,
    assistencias: assistencias.value,
    plants: plants.value,
    defuses: defuses.value,
  };

  if (editMode.value) {
    store.updateEstatistica(currentEstatisticaId.value, estatisticaData);
  } else {
    store.addEstatistica(estatisticaData);
  }

  resetForm();
}

function loadEstatistica(estatistica) {
  jogadorId.value = estatistica.jog_id;
  partidaId.value = estatistica.partida_id;
  agenteId.value = estatistica.agente_id;
  kills.value = estatistica.kills;
  mortes.value = estatistica.mortes;
  assistencias.value = estatistica.assistencias;
  plants.value = estatistica.plants;
  defuses.value = estatistica.defuses;
  currentEstatisticaId.value = estatistica.id;
  editMode.value = true;
}

function deleteEstatistica(id) {
  store.deleteEstatistica(id);
}

function resetForm() {
  jogadorId.value = null;
  partidaId.value = null;
  agenteId.value = null;
  kills.value = 0;
  mortes.value = 0;
  assistencias.value = 0;
  plants.value = 0;
  defuses.value = 0;
  editMode.value = false;
  currentEstatisticaId.value = null;
}
</script>

<style scoped>
.layout-container {
  display: flex;
  gap: 20px;
}

.form-section,
.list-section {
  flex: 1;
}

.custom-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.save-button {
  font-weight: bold;
  font-size: 1.1em;
}

.q-mt-lg {
  margin-top: 16px;
}

.q-mt-md {
  margin-top: 10px;
}
</style>
