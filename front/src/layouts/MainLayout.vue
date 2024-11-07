<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      class="custom-drawer"
    >
      <div class="drawer-content">
        <q-list padding>
          <q-item-label header>Menu</q-item-label>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/"
            :active-class="isActive('/') ? 'text-red' : ''"
            @click="updateTitle('Dashboard')"
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/agent"
            :active-class="isActive('/agent') ? 'text-red' : ''"
            @click="updateTitle('Agente')"
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Agente</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/camp"
            :active-class="isActive('/camp') ? 'text-red' : ''"
            @click="updateTitle('Camp')"
          >
            <q-item-section avatar>
              <q-icon name="flag" />
            </q-item-section>
            <q-item-section>Camp</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/jogadores"
            :active-class="isActive('/jogadores') ? 'text-red' : ''"
            @click="updateTitle('Jogadores')"
          >
            <q-item-section avatar>
              <q-icon name="sports_esports" />
            </q-item-section>
            <q-item-section>Jogadores</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/maps"
            :active-class="isActive('/maps') ? 'text-red' : ''"
            @click="updateTitle('Mapa')"
          >
            <q-item-section avatar>
              <q-icon name="map" />
            </q-item-section>
            <q-item-section>Mapa</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/partida"
            :active-class="isActive('/partida') ? 'text-red' : ''"
            @click="updateTitle('Partida')"
          >
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>
            <q-item-section>Partida</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/time"
            :active-class="isActive('/time') ? 'text-red' : ''"
            @click="updateTitle('Time')"
          >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>Time</q-item-section>
          </q-item>
        </q-list>

        <!-- User Info at the Bottom -->
        <div class="user-info">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ username }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-btn
            flat
            label="Sair"
            color="negative"
            class="logout-btn"
            @click="logout"
          />
        </div>
      </div>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const leftDrawerOpen = ref(false);
const miniState = ref(true);
const pageTitle = ref("Dashboard");

// Exemplo de nome de usuário; substitua pelo dado real
const username = ref("Usuário Logado");

const route = useRoute();

function updateTitle(title) {
  pageTitle.value = title;
}

function isActive(path) {
  return route.path === path;
}

function logout() {
  // Função de logout - substitua pela lógica real
  console.log("Logout triggered");
}
</script>

<style scoped>
.custom-drawer {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.text-red {
  color: #e74c3c;
}

.user-info {
  padding: 16px;
  background-color: #ffffff;
  text-align: center;
}
.logout-btn {
  width: 100%;
  margin-top: 8px;
}
</style>
