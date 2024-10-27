<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md custom-card">
      <q-form @submit.prevent="submitCampeonato">
        <q-input filled v-model="nome_camp" label="Nome do Campeonato" class="q-mb-md" />
        <q-input filled v-model="edicao" label="Edição" class="q-mb-md" />
        <q-input filled v-model="premiacao" label="Premiação" class="q-mb-md" />
        <q-input filled v-model="organizacao" label="Organização" class="q-mb-md" />
        <q-input filled v-model="formato" label="Formato" class="q-mb-md" />

        <q-select filled v-model="time_id" :options="timeOptions" label="Selecione o Time" option-label="nome_time"
          option-value="id" class="q-mb-md" />

        <q-input filled v-model="data_inicio_camp" mask="##/##/####" label="Data de Início" class="q-mb-md">
          <template v-slot:append>
            <q-icon name="event" />
          </template>
        </q-input>

        <q-btn type="submit" label="Salvar Campeonato" color="primary" class="full-width q-mt-md" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCampeonatoStore } from 'src/stores/campStore';

const store = useCampeonatoStore();

const nome_camp = ref('');
const edicao = ref('');
const premiacao = ref('');
const organizacao = ref('');
const formato = ref('');
const time_id = ref(null);
const data_inicio_camp = ref('');

const timeOptions = computed(() => store.times);

onMounted(() => {
  store.fetchCampeonatos();
  store.fetchTimes();
});

const submitCampeonato = () => {
  const campeonato = {
    nome_camp: nome_camp.value,
    edicao: edicao.value,
    premiacao: premiacao.value,
    organizacao: organizacao.value,
    formato: formato.value,
    time_id: time_id.value,
    data_inicio_camp: data_inicio_camp.value
  };

  store.addCampeonato(campeonato);

  // Limpa os campos do formulário após o envio
  nome_camp.value = '';
  edicao.value = '';
  premiacao.value = '';
  organizacao.value = '';
  formato.value = '';
  time_id.value = null;
  data_inicio_camp.value = '';
};
</script>

<style scoped>
.custom-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.q-btn {
  font-weight: bold;
  font-size: 1.1em;
}
</style>
