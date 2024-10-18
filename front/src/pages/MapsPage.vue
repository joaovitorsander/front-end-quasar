<template>
  <q-page class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <!-- Cabeçalho -->
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title class="text-white">
            Cadastrar Novo Mapa
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <!-- Formulário de cadastro de mapa -->
      <q-page-container>
        <q-page class="q-pa-lg custom-page">
          <q-card class="q-pa-md custom-card">
            <q-form @submit="onSubmit">
              <q-input filled v-model="mapName" label="Nome do Mapa" class="q-mb-md" />

              <q-input filled v-model="description" label="Descrição" type="textarea" class="q-mb-md" />

              <!-- Custom File Upload -->
              <q-uploader label="Imagem do Mapa" @added="onFileAdded" class="q-mb-md" flat bordered color="primary" />

              <q-input filled v-model="releaseDate" mask="##/##/####" label="Data de Lançamento" class="q-mb-md">
                <template v-slot:append>
                  <q-icon name="event" />
                </template>
              </q-input>

              <!-- Seletor de Map Pool -->
              <q-option-group v-model="mapPool" label="Map Pool" :options="[
                { label: 'Sim', value: 'sim' },
                { label: 'Não', value: 'nao' }
              ]" color="primary" inline class="q-mb-md" />

              <!-- Botão de Salvar -->
              <q-btn type="submit" label="SALVAR" color="primary" class="full-width q-mt-lg" />
            </q-form>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const mapName = ref('')
const description = ref('')
const releaseDate = ref('')
const mapPool = ref('')
const selectedFile = ref(null)

const onFileAdded = (files) => {
  if (files.length > 0) {
    selectedFile.value = files[0]
  }
}

const onSubmit = () => {
  console.log('Formulário enviado!')
}
</script>

<style scoped>
.custom-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.custom-page {
  background-color: #f0f0f0;
}

.q-btn {
  font-weight: bold;
  font-size: 1.1em;
}

.q-toolbar-title {
  font-weight: bold;
}

.q-input {
  background-color: #fff;
  border-radius: 8px;
}

.q-uploader {
  background-color: #fff;
  border-radius: 8px;
}

.bg-primary {
  background-color: #04442C;
}
</style>
