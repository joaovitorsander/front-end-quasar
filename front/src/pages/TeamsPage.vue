<template>
  <q-page class="q-pa-md">
    <q-page-container>
      <q-page class="q-pa-lg custom-page">
        <q-card class="q-pa-md custom-card">
          <q-form @submit="onSubmit">
            <div class="form-group">
              <!-- Campo Nome do Time -->
              <q-input
                filled
                v-model="nomeTime"
                label="Nome do Time"
                class="q-mb-md"
              />

              <!-- Campo Sigla do Time -->
              <q-input
                filled
                v-model="siglaTime"
                label="Sigla do Time"
                class="q-mb-md"
              />

              <!-- Upload de Imagem do Time -->
              <q-uploader
                label="Imagem do Time"
                @added="onFileAdded"
                class="q-mb-md"
                flat
                bordered
                color="primary"
              />

              <!-- Campo Observação -->
              <q-input
                filled
                v-model="observacao"
                label="Observação"
                type="textarea"
                class="q-mb-md"
              />

              <!-- Campo Data de Registro -->
              <q-input
                filled
                v-model="dataRegistro"
                mask="##/##/####"
                label="Data de Registro"
                class="q-mb-md"
              >
                <template v-slot:append>
                  <q-icon name="event" />
                </template>
              </q-input>

              <!-- Botão de Salvar -->
              <q-btn
                type="submit"
                label="SALVAR"
                color="primary"
                class="full-width q-mt-lg save-button"
              />
            </div>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const nomeTime = ref("");
const siglaTime = ref("");
const observacao = ref("");
const dataRegistro = ref("");
const selectedFile = ref(null);

const onFileAdded = (files) => {
  if (files.length > 0) {
    selectedFile.value = files[0];
  }
};

const onSubmit = () => {
  // Aqui é onde você pode fazer a lógica para enviar o time ao JSON Server.
  console.log("Formulário de Times enviado!");
};
</script>

<style scoped>
.custom-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
}

.custom-page {
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.save-button {
  font-weight: bold;
  font-size: 1.1em;
}

.q-input,
.q-uploader {
  background-color: #fff;
  border-radius: 8px;
}
</style>
