<template>
  <q-page class="q-pa-md flex-center">
    <q-card class="q-pa-lg custom-card">
      <div class="image-container">
        <img
          src="/src/assets/ícone valorant.png"
          alt="Logo"
          class="form-image"
        />
        <h2 class="form-title">VavaChamp</h2>
      </div>
      <q-form @submit.prevent="handleRegister">
        <q-input
          v-model="newUser.nome_de_usuario"
          label="Nome de Usuário"
          filled
          class="q-mb-md large-input"
        />
        <q-input
          v-model="newUser.nick_usuario"
          label="Nick"
          filled
          class="q-mb-md large-input"
        />
        <q-input
          v-model="newUser.senha"
          type="password"
          label="Senha"
          filled
          class="q-mb-md large-input"
        />
        <q-btn
          type="submit"
          label="Registrar"
          color="primary"
          class="full-width q-mt-lg large-btn"
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

.form-title {
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}

.large-input {
  font-size: 1.1em;
}

.large-btn {
  font-size: 1.1em;
}
</style>
