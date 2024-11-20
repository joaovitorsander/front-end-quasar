<template>
  <q-page class="q-pa-md">
    <div class="layout-container">
      <div class="form-section">
        <q-card class="q-pa-md custom-card">
          <q-form @submit.prevent="submitTime">
            <q-input
              filled
              v-model="nome_time"
              label="Nome do Time"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="sigla_time"
              label="Sigla do Time"
              class="q-mb-md"
            />
            <q-uploader
              label="Imagem do Time"
              @added="onFileAdded"
              class="q-mb-md"
              flat
              bordered
              color="primary"
            />
            <q-input
              filled
              v-model="observacao"
              label="Observação"
              type="textarea"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="data_registro"
              type="date"
              label="Data de Registro"
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
            v-if="Array.isArray(times) && times.length > 0"
            :rows="times"
            :columns="columns"
            row-key="id"
            title="Times Cadastrados"
            dense
            flat
            bordered
          >
            <template v-slot:body-cell-data_registro="props">
              <q-td :props="props">{{ props.row.data_registro }}</q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn flat round icon="edit" @click="loadTime(props.row)" />
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="deleteTime(props.row.id)"
                />
              </q-td>
            </template>
          </q-table>
          <div v-else class="q-pa-md">Nenhum time cadastrado</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTimesStore } from "src/stores/teamsStore";

const store = useTimesStore();

const nome_time = ref("");
const sigla_time = ref("");
const observacao = ref("");
const data_registro = ref("");
const selectedFile = ref(null);
const times = ref([]);
const currentTeamId = ref(null);
const editMode = ref(false);

const columns = [
  {
    name: "nome_time",
    label: "Nome do Time",
    align: "left",
    field: "nome_time",
    sortable: true,
  },
  {
    name: "sigla_time",
    label: "Sigla",
    align: "left",
    field: "sigla_time",
    sortable: true,
  },
  {
    name: "observacao",
    label: "Observação",
    align: "left",
    field: "observacao",
    sortable: true,
  },
  {
    name: "data_registro",
    label: "Data de Registro",
    align: "left",
    field: "data_registro",
    sortable: true,
  },
  { name: "actions", label: "Ações", align: "center", field: "actions" },
];

onMounted(async () => {
  await store.fetchTimes();
  times.value = store.times;
});

function onFileAdded(files) {
  if (files.length > 0) {
    selectedFile.value = files[0];
  }
}

async function submitTime() {
  const timeData = {
    nome_time: nome_time.value,
    sigla_time: sigla_time.value,
    observacao: observacao.value,
    data_registro: data_registro.value,
    imagem_time: selectedFile.value ? selectedFile.value.name : "",
  };

  if (editMode.value) {
    await store.updateTime(currentTeamId.value, timeData);
  } else {
    await store.addTime(timeData);
  }

  resetForm();
  await reloadTimes();
}

function loadTime(time) {
  nome_time.value = time.nome_time;
  sigla_time.value = time.sigla_time;
  observacao.value = time.observacao;
  data_registro.value = time.data_registro;
  currentTeamId.value = time.id;
  editMode.value = true;
}

async function deleteTime(id) {
  await store.deleteTime(id);

  if (currentTeamId.value === id) {
    resetForm();
  }

  await reloadTimes();
}

function resetForm() {
  nome_time.value = "";
  sigla_time.value = "";
  observacao.value = "";
  data_registro.value = "";
  selectedFile.value = null;
  editMode.value = false;
  currentTeamId.value = null;
}

async function reloadTimes() {
  await store.fetchTimes();
  times.value = store.times;
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
</style>
