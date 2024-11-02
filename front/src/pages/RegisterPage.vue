<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="max-width: 400px">
      <q-card-section>
        <div class="text-h4 text-center">Criar Conta</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleRegister">
          <q-input v-model="username" filled label="Nome de Usuário" prepend-icon="person"
            :rules="[val => !!val || 'Nome de usuário é obrigatório']" class="q-mb-md" />

          <q-input v-model="nickname" filled label="Nick de Usuário" prepend-icon="person_outline"
            :rules="[val => !!val || 'Nick é obrigatório']" class="q-mb-md" />

          <q-input v-model="password" type="password" filled label="Senha" prepend-icon="lock"
            :rules="[val => !!val || 'Senha é obrigatória']" class="q-mb-md" />

          <q-btn label="Registrar" type="submit" color="primary" class="full-width q-mb-sm" />
        </q-form>

        <div class="text-center">
          <q-btn flat label="Já tem uma conta? Entrar" color="secondary" @click="goToLogin" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const nickname = ref('')
const password = ref('')
const router = useRouter()

const handleRegister = () => {
  if (!username.value || !nickname.value || !password.value) {
    return
  }
  console.log('Registro:', username.value, nickname.value, password.value)
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.q-pa-md {
  background-color: #f5f5f5;
}

.full-width {
  width: 100%;
}
</style>
