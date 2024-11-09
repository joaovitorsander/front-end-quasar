<template>
  <q-page class="q-pa-md">
    <div class="layout-container">
      <div class="form-section">
        <q-card class="q-pa-md custom-card">
          <q-form @submit.prevent="submitAgent">
            <q-input
              filled
              v-model="agentName"
              label="Nome do Agente"
              class="q-mb-md"
            />
            <q-select
              filled
              v-model="sexo"
              :options="sexoOptions"
              label="Sexo"
              option-label="label"
              option-value="value"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="habilidade1"
              label="Habilidade 1"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="habilidade2"
              label="Habilidade 2"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="habilidade3"
              label="Habilidade 3"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="ultimate"
              label="Ultimate"
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
            v-if="Array.isArray(agentes) && agentes.length > 0"
            :rows="agentes"
            :columns="columns"
            row-key="id"
            title="Agentes Cadastrados"
            dense
            flat
            bordered
          >
            <template v-slot:body-cell-sexo="props">
              <q-td :props="props">
                {{ props.row.sexo.value }}
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn flat round icon="edit" @click="loadAgent(props.row)" />
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="deleteAgent(props.row.id)"
                />
              </q-td>
            </template>
          </q-table>
          <div v-else class="q-pa-md">Nenhum agente cadastrado</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAgentStore } from "src/stores/agentStore";

const store = useAgentStore();

const agentName = ref("");
const sexo = ref("");
const habilidade1 = ref("");
const habilidade2 = ref("");
const habilidade3 = ref("");
const ultimate = ref("");
const agentes = ref([]);
const currentAgentId = ref(null);
const editMode = ref(false);

const columns = [
  {
    name: "nome_agente",
    label: "Nome",
    align: "left",
    field: "nome_agente",
    sortable: true,
  },
  { name: "sexo", label: "Sexo", align: "left", field: "sexo", sortable: true },
  {
    name: "habilidade1",
    label: "Habilidade 1",
    align: "left",
    field: "habilidade1",
    sortable: true,
  },
  {
    name: "habilidade2",
    label: "Habilidade 2",
    align: "left",
    field: "habilidade2",
    sortable: true,
  },
  {
    name: "habilidade3",
    label: "Habilidade 3",
    align: "left",
    field: "habilidade3",
    sortable: true,
  },
  {
    name: "ultimate",
    label: "Ultimate",
    align: "left",
    field: "ultimate",
    sortable: true,
  },
  { name: "actions", label: "Ações", align: "center", field: "actions" },
];

const sexoOptions = [
  { label: "Masculino", value: "masculino" },
  { label: "Feminino", value: "feminino" },
];

onMounted(async () => {
  await store.fetchAgents();
  agentes.value = store.agentes;
});

async function submitAgent() {
  const agentData = {
    nome_agente: agentName.value,
    sexo: sexo.value,
    habilidade1: habilidade1.value,
    habilidade2: habilidade2.value,
    habilidade3: habilidade3.value,
    ultimate: ultimate.value,
  };

  if (editMode.value) {
    await store.updateAgent(currentAgentId.value, agentData);
  } else {
    await store.addAgent(agentData);
  }

  resetForm();
  await reloadAgents();
}

function loadAgent(agent) {
  agentName.value = agent.nome_agente;
  sexo.value = agent.sexo;
  habilidade1.value = agent.habilidade1;
  habilidade2.value = agent.habilidade2;
  habilidade3.value = agent.habilidade3;
  ultimate.value = agent.ultimate;
  currentAgentId.value = agent.id;
  editMode.value = true;
}

async function deleteAgent(id) {
  await store.deleteAgent(id);
  await reloadAgents();
}

function resetForm() {
  agentName.value = "";
  sexo.value = "";
  habilidade1.value = "";
  habilidade2.value = "";
  habilidade3.value = "";
  ultimate.value = "";
  editMode.value = false;
  currentAgentId.value = null;
}

async function reloadAgents() {
  await store.fetchAgents();
  agentes.value = store.agentes;
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
