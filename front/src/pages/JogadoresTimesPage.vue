<template>
  <q-page class="q-pa-md">
    <div class="layout-container">
      <div class="form-section">
        <q-card class="q-pa-md custom-card">
          <q-form @submit.prevent="submitJogadorTime">
            <q-select
              filled
              v-model="timeId"
              :options="timeOptions"
              label="Selecione o Time"
              option-label="nome_time"
              option-value="id"
              class="q-mb-md"
            />
            <q-select
              filled
              v-model="jogadorId"
              :options="usuarioOptions"
              label="Selecione o Jogador"
              option-label="nick_usuario"
              option-value="usuario_id"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="dataAssociacao"
              type="date"
              label="Data de Associação"
              outlined
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="dataDesligamento"
              type="date"
              label="Data de Desligamento (opcional)"
              outlined
              class="q-mb-md"
            />
            <q-input filled v-model="funcao" label="Função" class="q-mb-md" />
            <q-select
              filled
              v-model="situacao"
              :options="situacaoOptions"
              label="Situação"
              class="q-mb-md"
            />
            <div class="reserva-section">
              <q-item-label class="reserva-caption">Reserva</q-item-label>
              <q-option-group
                v-model="reserva"
                :options="[
                  { label: 'Sim', value: true },
                  { label: 'Não', value: false },
                ]"
                color="primary"
                inline
              />
            </div>
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
            v-if="Array.isArray(jogadoresTimes) && jogadoresTimes.length > 0"
            :rows="jogadoresTimes"
            :columns="columns"
            row-key="id"
            title="Jogadores dos Times Cadastrados"
            dense
            flat
            bordered
          >
            <template v-slot:body-cell-jogador="props">
              <q-td :props="props">
                {{
                  props.row.jogador_id && props.row.jogador_id.nick_usuario
                    ? props.row.jogador_id.nick_usuario
                    : "Jogador não encontrado"
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-time="props">
              <q-td :props="props">
                {{ props.row.time_id.nome_time }}
              </q-td>
            </template>
            <template v-slot:body-cell-situacao="props">
              <q-td :props="props">
                {{ props.row.situacao.value }}
              </q-td>
            </template>
            <template v-slot:body-cell-reserva="props">
              <q-td :props="props">{{
                props.row.reserva ? "Sim" : "Não"
              }}</q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn
                  flat
                  round
                  icon="edit"
                  @click="loadJogadorTime(props.row)"
                />
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="deleteJogadorTime(props.row.id)"
                />
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
import { ref, onMounted, computed } from "vue";
import { useJogadoresTimesStore } from "src/stores/JogadoresTimesStore";

const store = useJogadoresTimesStore();

const timeId = ref(null);
const jogadorId = ref(null);
const dataAssociacao = ref("");
const dataDesligamento = ref("");
const funcao = ref("");
const situacao = ref("");
const reserva = ref(false);
const jogadoresTimes = computed(() => store.jogadoresTimes);
const currentJogadorTimeId = ref(null);
const editMode = ref(false);

const situacaoOptions = [
  { label: "Ativo", value: "Ativo" },
  { label: "Inativo", value: "Inativo" },
];

const timeOptions = computed(() => store.times);
const usuarioOptions = computed(() => store.usuarios);

const columns = [
  {
    name: "jogador",
    label: "Jogador",
    align: "left",
    field: (row) => row.jogador_id.nick_usuario,
    sortable: true,
  },
  {
    name: "time",
    label: "Time",
    align: "left",
    field: (row) => row.time_id.nome_time,
    sortable: true,
  },
  {
    name: "data_associacao",
    label: "Data de Associação",
    align: "left",
    field: "data_associacao",
    sortable: true,
  },
  {
    name: "data_desligamento",
    label: "Data de Desligamento",
    align: "left",
    field: "data_desligamento",
    sortable: true,
  },
  {
    name: "funcao",
    label: "Função",
    align: "left",
    field: "funcao",
    sortable: true,
  },
  {
    name: "situacao",
    label: "Situação",
    align: "left",
    field: (row) => row.situacao.value,
    sortable: true,
  },
  {
    name: "reserva",
    label: "Reserva",
    align: "center",
    field: "reserva",
    sortable: true,
  },
  {
    name: "actions",
    label: "Ações",
    align: "center",
    field: "actions",
  },
];

onMounted(async () => {
  await store.fetchJogadoresTimes();
  await store.fetchTimes();
  await store.fetchUsuarios();
});

async function submitJogadorTime() {
  const jogadorTimeData = {
    time_id: timeId.value,
    jogador_id: jogadorId.value,
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
}

function loadJogadorTime(jogadorTime) {
  timeId.value = jogadorTime.time_id.id;
  jogadorId.value = jogadorTime.jogador_id.usuario_id;
  dataAssociacao.value = jogadorTime.data_associacao; // Certifique-se de que a data esteja no formato yyyy-MM-dd
  dataDesligamento.value = jogadorTime.data_desligamento; // Certifique-se de que a data esteja no formato yyyy-MM-dd
  funcao.value = jogadorTime.funcao;
  situacao.value = jogadorTime.situacao;
  reserva.value = jogadorTime.reserva;
  currentJogadorTimeId.value = jogadorTime.id;
  editMode.value = true;
}

async function deleteJogadorTime(id) {
  await store.deleteJogadorTime(id);
}

function resetForm() {
  timeId.value = null;
  jogadorId.value = null;
  dataAssociacao.value = "";
  dataDesligamento.value = "";
  funcao.value = "";
  situacao.value = "";
  reserva.value = false;
  editMode.value = false;
  currentJogadorTimeId.value = null;
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

.reserva-section {
  margin-bottom: 16px;
}

.reserva-caption {
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.q-mt-lg {
  margin-top: 16px;
}

.q-mt-md {
  margin-top: 10px;
}
</style>
