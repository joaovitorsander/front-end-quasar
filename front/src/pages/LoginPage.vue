<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-md custom-card">
      <q-form @submit.prevent="handleLogin">
        <q-input
          v-model="username"
          label="Nome de Usuário"
          filled
          class="q-mb-md"
        />
        <q-input
          v-model="password"
          type="password"
          label="Senha"
          filled
          class="q-mb-md"
        />
        <q-btn
          type="submit"
          label="Login"
          color="primary"
          class="full-width q-mt-lg"
        />
        <div v-if="authStore.error" class="text-negative q-mt-md">
          {{ authStore.error }}
        </div>
        <q-btn
          label="Registrar"
          color="secondary"
          flat
          class="full-width q-mt-md"
          @click="goToRegister"
        />
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

const username = ref("");
const password = ref("");

async function handleLogin() {
  await authStore.login(username.value, password.value);

  if (!authStore.error) {
    router.push("/app/dashboard");
  }
}

function goToRegister() {
  router.push("/register");
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
