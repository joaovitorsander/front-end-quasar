<template>
  <q-page class="q-pa-md flex-center">
    <q-card class="q-pa-lg custom-card">
      <div class="image-container">
        <img
          src="/src/assets/ícone valorant.png"
          alt="Logo"
          class="form-image"
        />
      </div>
      <q-form @submit.prevent="handleLogin">
        <q-input
          v-model="username"
          label="Nome de Usuário"
          filled
          class="q-mb-md large-input"
        />
        <q-input
          v-model="password"
          type="password"
          label="Senha"
          filled
          class="q-mb-md large-input"
        />
        <q-btn
          type="submit"
          label="Login"
          color="primary"
          class="full-width q-mt-lg large-btn"
        />
        <q-btn
          flat
          label="Registrar"
          color="primary"
          class="full-width q-mt-md link-btn"
          @click="$router.push('/register')"
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
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.custom-card {
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.image-container {
  text-align: center;
  margin-bottom: 20px;
}

.form-image {
  max-width: 150px;
  height: auto;
}

.large-input {
  font-size: 1.1em;
}

.large-btn {
  font-size: 1.1em;
}

.link-btn {
  font-size: 1em;
  color: #3c6e71;
  text-decoration: underline;
  text-align: center;
}
</style>
