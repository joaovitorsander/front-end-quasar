<template>
  <q-page class="q-pa-md">
    <div class="layout-container">
      <div class="form-section">
        <q-card class="q-pa-md custom-card">
          <q-form @submit.prevent="submitJogadorTime">
            <q-input filled v-model="jogadorId" label="ID do Jogador" class="q-mb-md" />
            <q-input filled v-model="timeId" label="ID do Time" class="q-mb-md" />
            <q-input filled v-model="dataAssociacao" mask="##/##/####" label="Data de Associação" class="q-mb-md">
              <template v-slot:append>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-input filled v-model="dataDesligamento" mask="##/##/####" label="Data de Desligamento (opcional)"
              class="q-mb-md">
              <template v-slot:append>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-input filled v-model="funcao" label="Função" class="q-mb-md" />
            <q-select filled v-model="situacao" :options="situacaoOptions" label="Situação" class="q-mb-md" />
            <q-option-group v-model="reserva" :options="[{ label: 'Sim', value: true }, { label: 'Não', value: false }]"
              label="Reserva" color="primary" inline />
            <q-btn type="submit" :label="editMode ? 'ATUALIZAR' : 'SALVAR'" color="primary"
              class="full-width q-mt-lg save-button" />
            <q-btn @click="resetForm" label="NOVO" color="secondary" class="full-width q-mt-md save-button" />
          </q-form>
        </q-card>
      </div>

      <div class="list-section">
        <q-card class="q-pa-md custom-card">
          <q-table v-if="Array.isArray(jogadoresTimes) && jogadoresTimes.length > 0" :rows="jogadoresTimes"
            :columns="columns" row-key="id" title="Jogadores dos Times Cadastrados" dense flat bordered>
            <template v-slot:body-cell-reserva="props">
              <q-td :props="props">
                {{ props.row.reserva ? 'Sim' : 'Não' }}
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn flat round icon="edit" @click="loadJogadorTime(props.row)" />
                <q-btn flat round icon="delete" color="negative" @click="deleteJogadorTime(props.row.id)" />
              </q-td>
            </template>
          </q-table>
          <div v-else class="q-pa-md">Nenhum jogador cadastrado em times</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useJogadoresTimesStore } from 'src/stores/JogadoresTimesStore';

const store = useJogadoresTimesStore();

const jogadorId = ref('');
const timeId = ref('');
const dataAssociacao = ref('');
const dataDesligamento = ref('');
const funcao = ref('');
const situacao = ref('');
const reserva = ref(false);
const jogadoresTimes = ref([]);
const currentJogadorTimeId = ref(null);
const editMode = ref(false);

const situacaoOptions = [
  { label: 'Ativo', value: 'Ativo' },
  { label: 'Inativo', value: 'Inativo' }
];

const columns = [
  { name: 'jogador_id', label: 'ID do Jogador', align: 'left', field: 'jogador_id', sortable: true },
  { name: 'time_id', label: 'ID do Time', align: 'left', field: 'time_id', sortable: true },
  { name: 'data_associacao', label: 'Data de Associação', align: 'left', field: 'data_associacao', sortable: true },
  { name: 'data_desligamento', label: 'Data de Desligamento', align: 'left', field: 'data_desligamento', sortable: true },
  { name: 'funcao', label: 'Função', align: 'left', field: 'funcao', sortable: true },
  { name: 'situacao', label: 'Situação', align: 'left', field: 'situacao', sortable: true },
  { name: 'reserva', label: 'Reserva', align: 'left', field: 'reserva', sortable: true },
  { name: 'actions', label: 'Ações', align: 'center', field: 'actions' }
];

onMounted(async () => {
  await store.fetchJogadoresTimes();
  jogadoresTimes.value = store.jogadoresTimes;
});

async function submitJogadorTime() {
  const jogadorTimeData = {
    jogador_id: jogadorId.value,
    time_id: timeId.value,
    data_associacao: dataAssociacao.value,
    data_desligamento: dataDesligamento.value,
    funcao: funcao.value,
    situacao: situacao.value,
    reserva: reserva.value,
  };

  if (editMode.value) {
    await store.updateJogadorTime(currentJogadorTimeId.value, jogadorTimeData);
  } else {
    await store.addJogadorTime(jogadorTimeData);
  }

  resetForm();
  await reloadJogadoresTimes();
}

function loadJogadorTime(jogadorTime) {
  jogadorId.value = jogadorTime.jogador_id;
  timeId.value = jogadorTime.time_id;
  dataAssociacao.value = jogadorTime.data_associacao;
  dataDesligamento.value = jogadorTime.data_desligamento;
  funcao.value = jogadorTime.funcao;
  situacao.value = jogadorTime.situacao;
  reserva.value = jogadorTime.reserva;
  currentJogadorTimeId.value = jogadorTime.id;
  editMode.value = true;
}

async function deleteJogadorTime(id) {
  await store.deleteJogadorTime(id);
  await reloadJogadoresTimes();
}

function resetForm() {
  jogadorId.value = '';
  timeId.value = '';
  dataAssociacao.value = '';
  dataDesligamento.value = '';
  funcao.value = '';
  situacao.value = '';
  reserva.value = false;
  editMode.value = false;
  currentJogadorTimeId.value = null;
}

async function reloadJogadoresTimes() {
  await store.fetchJogadoresTimes();
  jogadoresTimes.value = store.jogadoresTimes;
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
