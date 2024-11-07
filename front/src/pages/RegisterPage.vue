<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-md custom-card">
      <q-form @submit.prevent="handleRegister">
        <q-input
          v-model="newUser.nome_de_usuario"
          label="Nome de Usuário"
          filled
          class="q-mb-md"
        />
        <q-input
          v-model="newUser.nick_usuario"
          label="Nick"
          filled
          class="q-mb-md"
        />
        <q-input
          v-model="newUser.senha"
          type="password"
          label="Senha"
          filled
          class="q-mb-md"
        />
        <q-btn
          type="submit"
          label="Registrar"
          color="primary"
          class="full-width q-mt-lg"
        />
        <div v-if="authStore.error" class="text-negative q-mt-md">
          {{ authStore.error }}
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const newUser = ref({
  nome_de_usuario: "",
  nick_usuario: "",
  senha: "",
  data_registro: new Date().toISOString().split("T")[0],
});

async function handleRegister() {
  await authStore.register(newUser.value);
  if (!authStore.error) {
    router.push("/app/dashboard");
  }
}
</script>

<style scoped>
.custom-card {
  max-width: 400px;
  margin: auto;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
