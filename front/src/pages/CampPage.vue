<template>
  <q-page class="q-pa-md">
    <div class="layout-container">
      <div class="form-section">
        <q-card class="q-pa-md custom-card">
          <q-form @submit.prevent="submitCampeonato">
            <q-input
              filled
              v-model="nome_camp"
              label="Nome do Campeonato"
              class="q-mb-md"
            />
            <q-input filled v-model="edicao" label="Edição" class="q-mb-md" />
            <q-input
              filled
              v-model="premiacao"
              label="Premiação"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="organizacao"
              label="Organização"
              class="q-mb-md"
            />
            <q-input filled v-model="formato" label="Formato" class="q-mb-md" />

            <q-select
              filled
              v-model="time_id"
              :options="timeOptions"
              label="Selecione o Time"
              option-label="nome_time"
              option-value="id"
              class="q-mb-md"
            />

            <q-input
              filled
              v-model="data_inicio_camp"
              type="date"
              label="Data de Início"
              outlined
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
            v-if="Array.isArray(campeonatos) && campeonatos.length > 0"
            :rows="campeonatos"
            :columns="columns"
            row-key="id"
            title="Campeonatos Cadastrados"
            dense
            flat
            bordered
          >
            <template v-slot:body-cell-time="props">
              <q-td :props="props">
                {{
                  props.row.time_id
                    ? getTeamName(props.row.time_id)
                    : "Time não encontrado"
                }}
              </q-td>
            </template>

            <template v-slot:body-cell-data_inicio_camp="props">
              <q-td :props="props">{{ props.row.data_inicio_camp }}</q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn
                  flat
                  round
                  icon="edit"
                  @click="loadCampeonato(props.row)"
                />
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="deleteCampeonato(props.row.id)"
                />
              </q-td>
            </template>
          </q-table>
          <div v-else class="q-pa-md">Nenhum campeonato cadastrado</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCampeonatoStore } from "src/stores/campStore";

const store = useCampeonatoStore();

const nome_camp = ref("");
const edicao = ref("");
const premiacao = ref("");
const organizacao = ref("");
const formato = ref("");
const time_id = ref(null);
const data_inicio_camp = ref("");
const campeonatos = computed(() => store.campeonatos);
const timeOptions = computed(() => store.times);
const currentCampId = ref(null);
const editMode = ref(false);

const columns = [
  {
    name: "nome_camp",
    label: "Nome do Campeonato",
    align: "left",
    field: "nome_camp",
    sortable: true,
  },
  {
    name: "time",
    label: "Time",
    align: "left",
    field: "time_id",
    sortable: true,
  },
  {
    name: "premiacao",
    label: "Premiação",
    align: "left",
    field: "premiacao",
    sortable: true,
  },
  {
    name: "organizacao",
    label: "Organização",
    align: "left",
    field: "organizacao",
    sortable: true,
  },
  {
    name: "edicao",
    label: "Edição",
    align: "left",
    field: "edicao",
    sortable: true,
  },
  {
    name: "formato",
    label: "Formato",
    align: "left",
    field: "formato",
    sortable: true,
  },
  {
    name: "data_inicio_camp",
    label: "Data de Início",
    align: "left",
    field: "data_inicio_camp",
    sortable: true,
  },
  { name: "actions", label: "Ações", align: "center", field: "actions" },
];

onMounted(async () => {
  await store.fetchTimes();
  await store.fetchCampeonatos();
});

function getTeamName(team) {
  if (!team) return "Time não encontrado";
  return team.nome_time || "Time não encontrado";
}

function submitCampeonato() {
  const campeonato = {
    nome_camp: nome_camp.value,
    edicao: edicao.value,
    premiacao: premiacao.value,
    organizacao: organizacao.value,
    formato: formato.value,
    time_id: time_id.value,
    data_inicio_camp: data_inicio_camp.value,
  };

  if (editMode.value) {
    store.updateCampeonato(currentCampId.value, campeonato);
  } else {
    store.addCampeonato(campeonato);
  }

  resetForm();
}

function loadCampeonato(camp) {
  nome_camp.value = camp.nome_camp;
  edicao.value = camp.edicao;
  premiacao.value = camp.premiacao;
  organizacao.value = camp.organizacao;
  formato.value = camp.formato;
  time_id.value = camp.time_id;
  data_inicio_camp.value = camp.data_inicio_camp; // Mantendo o formato original (yyyy-MM-dd)
  currentCampId.value = camp.id;
  editMode.value = true;
}

function deleteCampeonato(campId) {
  store.deleteCampeonato(campId);
}

function resetForm() {
  nome_camp.value = "";
  edicao.value = "";
  premiacao.value = "";
  organizacao.value = "";
  formato.value = "";
  time_id.value = null;
  data_inicio_camp.value = "";
  editMode.value = false;
  currentCampId.value = null;
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
