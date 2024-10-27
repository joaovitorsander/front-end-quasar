<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md custom-card">
      <q-form @submit.prevent="submitTime">
        <q-input filled v-model="nome_time" label="Nome do Time" class="q-mb-md" />
        <q-input filled v-model="sigla_time" label="Sigla do Time" class="q-mb-md" />
        <q-uploader label="Imagem do Time" @added="onFileAdded" flat bordered color="primary" class="q-mb-md" />
        <q-input filled v-model="observacao" label="Observação" type="textarea" class="q-mb-md" />

        <q-input filled v-model="data_registro" mask="##/##/####" label="Data de Início" class="q-mb-md">
          <template v-slot:append>
            <q-icon name="event" />
          </template>
        </q-input>

        <q-btn type="submit" label="Salvar Time" color="primary" class="full-width q-mt-md" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useTimesStore } from 'src/stores/teamStore';

const store = useTimesStore();

const nome_time = ref('');
const sigla_time = ref('');
const observacao = ref('');
const data_registro = ref('');
const selectedFile = ref(null);


function submitTime() {
  const time = {
    nome_time: nome_time.value,
    sigla_time: sigla_time.value,
    observacao: observacao.value,
    data_registro: data_registro.value,
    imagem_time: selectedFile.value ? selectedFile.value.name : ''
  };

  store.addTime(time);

  // Limpa os campos após o envio
  nome_time.value = '';
  sigla_time.value = '';
  observacao.value = '';
  data_registro.value = '';
  selectedFile.value = null;
}

function onFileAdded(files) {
  if (files.length > 0) {
    selectedFile.value = files[0];
  }
}
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
