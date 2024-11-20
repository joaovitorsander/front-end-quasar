<template>
  <q-page class="q-pa-md">
    <div class="layout-container">
      <div class="form-section">
        <q-card class="q-pa-md custom-card">
          <q-form @submit.prevent="submitPartida">
            <q-select
              filled
              v-model="mapaId"
              :options="mapaOptions"
              label="Selecione o Mapa"
              option-label="nome_mapa"
              option-value="id"
              class="q-mb-md"
            />
            <q-select
              filled
              v-model="campId"
              :options="campOptions"
              label="Selecione o Campeonato"
              option-label="nome_camp"
              option-value="id"
              class="q-mb-md"
            />
            <q-select
              filled
              v-model="timeId1"
              :options="timeOptions"
              label="Time 1"
              option-label="nome_time"
              option-value="id"
              class="q-mb-md"
            />
            <q-select
              filled
              v-model="timeId2"
              :options="timeOptions"
              label="Time 2"
              option-label="nome_time"
              option-value="id"
              class="q-mb-md"
            />
            <q-input filled v-model="duracao" label="Duração" class="q-mb-md" />
            <q-input
              filled
              v-model="dataDaPartida"
              type="date"
              label="Data da Partida"
              outlined
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="roundsTime1"
              label="Rounds do Time 1"
              type="number"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="roundsTime2"
              label="Rounds do Time 2"
              type="number"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="observacao"
              label="Observação"
              type="textarea"
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
            v-if="Array.isArray(partidas) && partidas.length > 0"
            :rows="partidas"
            :columns="columns"
            row-key="id"
            title="Partidas Cadastradas"
            dense
            flat
            bordered
          >
            <template v-slot:body-cell-mapa="props">
              <q-td :props="props">
                {{
                  props.row.mapa_id && props.row.mapa_id.nome_mapa
                    ? props.row.mapa_id.nome_mapa
                    : "Mapa não encontrado"
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-camp="props">
              <q-td :props="props">
                {{
                  props.row.camp_id && props.row.camp_id.nome_camp
                    ? props.row.camp_id.nome_camp
                    : "Campeonato não encontrado"
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-time1="props">
              <q-td :props="props">
                {{
                  props.row.time_id_1 && props.row.time_id_1.nome_time
                    ? props.row.time_id_1.nome_time
                    : "Time 1 não encontrado"
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-time2="props">
              <q-td :props="props">
                {{
                  props.row.time_id_2 && props.row.time_id_2.nome_time
                    ? props.row.time_id_2.nome_time
                    : "Time 2 não encontrado"
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn flat round icon="edit" @click="loadPartida(props.row)" />
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="deletePartida(props.row.id)"
                />
              </q-td>
            </template>
          </q-table>
          <div v-else class="q-pa-md">Nenhuma partida cadastrada</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { usePartidasStore } from "src/stores/matchesStore";

const store = usePartidasStore();

const mapaId = ref(null);
const campId = ref(null);
const timeId1 = ref(null);
const timeId2 = ref(null);
const duracao = ref("");
const dataDaPartida = ref("");
const roundsTime1 = ref(0);
const roundsTime2 = ref(0);
const observacao = ref("");
const partidas = computed(() => store.partidas);
const editMode = ref(false);
const currentPartidaId = ref(null);

const mapaOptions = computed(() => store.mapas);
const campOptions = computed(() => store.campeonatos);
const timeOptions = computed(() => store.times);

const columns = [
  {
    name: "mapa",
    label: "Mapa",
    align: "left",
    field: "mapa_id",
    sortable: true,
  },
  {
    name: "camp",
    label: "Campeonato",
    align: "left",
    field: "camp_id",
    sortable: true,
  },
  {
    name: "time1",
    label: "Time 1",
    align: "left",
    field: "time_id_1",
    sortable: true,
  },
  {
    name: "time2",
    label: "Time 2",
    align: "left",
    field: "time_id_2",
    sortable: true,
  },
  {
    name: "duracao",
    label: "Duração",
    align: "left",
    field: "duracao",
    sortable: true,
  },
  {
    name: "data_da_partida",
    label: "Data da Partida",
    align: "left",
    field: "data_da_partida",
    sortable: true,
  },
  {
    name: "rounds_time_1",
    label: "Rounds Time 1",
    align: "left",
    field: "rounds_time_1",
    sortable: true,
  },
  {
    name: "rounds_time_2",
    label: "Rounds Time 2",
    align: "left",
    field: "rounds_time_2",
    sortable: true,
  },
  {
    name: "observacao",
    label: "Observação",
    align: "left",
    field: "observacao",
    sortable: true,
  },
  { name: "actions", label: "Ações", align: "center", field: "actions" },
];

onMounted(async () => {
  await store.fetchPartidas();
  await store.fetchMapas();
  await store.fetchCampeonatos();
  await store.fetchTimes();
});

async function submitPartida() {
  const partidaData = {
    mapa_id: mapaId.value,
    camp_id: campId.value,
    time_id_1: timeId1.value,
    time_id_2: timeId2.value,
    duracao: duracao.value,
    data_da_partida: dataDaPartida.value,
    rounds_time_1: roundsTime1.value,
    rounds_time_2: roundsTime2.value,
    observacao: observacao.value,
  };

  if (editMode.value) {
    await store.updatePartida(currentPartidaId.value, partidaData);
  } else {
    await store.addPartida(partidaData);
  }

  resetForm();
}

function loadPartida(partida) {
  mapaId.value = partida.mapa_id;
  campId.value = partida.camp_id;
  timeId1.value = partida.time_id_1;
  timeId2.value = partida.time_id_2;
  duracao.value = partida.duracao;
  dataDaPartida.value = partida.data_da_partida;
  roundsTime1.value = partida.rounds_time_1;
  roundsTime2.value = partida.rounds_time_2;
  observacao.value = partida.observacao;
  currentPartidaId.value = partida.id;
  editMode.value = true;
}

async function deletePartida(id) {
  await store.deletePartida(id);
}

function resetForm() {
  mapaId.value = null;
  campId.value = null;
  timeId1.value = null;
  timeId2.value = null;
  duracao.value = "";
  dataDaPartida.value = "";
  roundsTime1.value = 0;
  roundsTime2.value = 0;
  observacao.value = "";
  editMode.value = false;
  currentPartidaId.value = null;
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
