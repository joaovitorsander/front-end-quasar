<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="max-width: 400px">
      <q-card-section>
        <div class="text-h4 text-center">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleLogin">
          <q-input v-model="username" filled label="Usuário" prepend-icon="person"
            :rules="[val => !!val || 'Usuário é obrigatório']" class="q-mb-md" />

          <q-input v-model="password" type="password" filled label="Senha" prepend-icon="lock"
            :rules="[val => !!val || 'Senha é obrigatória']" class="q-mb-md" />

          <q-btn label="Entrar" type="submit" color="primary" class="full-width q-mb-sm" />
        </q-form>

        <div class="text-center">
          <q-btn flat label="Esqueceu sua senha?" color="secondary" class="q-pa-none" />
        </div>

        <q-separator class="q-mt-md q-mb-md" />

        <div class="text-center">
          <q-btn outline label="Criar Conta" color="primary" @click="goToRegister" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  if (!username.value || !password.value) {
    return
  }
  console.log('Login:', username.value, password.value)
}

const goToRegister = () => {
  router.push('/register')
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
