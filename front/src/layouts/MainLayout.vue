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
            to="/app/dashboard"
            :active-class="isActive('/app/dashboard') ? 'text-red' : ''"
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
            to="/app/agentes"
            :active-class="isActive('/app/agentes') ? 'text-red' : ''"
            @click="updateTitle('Agentes')"
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Agentes</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/app/campeonatos"
            :active-class="isActive('/app/campeonatos') ? 'text-red' : ''"
            @click="updateTitle('Campeonatos')"
          >
            <q-item-section avatar>
              <q-icon name="flag" />
            </q-item-section>
            <q-item-section>Campeonatos</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/app/jogadores"
            :active-class="isActive('/app/jogadores') ? 'text-red' : ''"
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
            to="/app/mapas"
            :active-class="isActive('/app/mapas') ? 'text-red' : ''"
            @click="updateTitle('Mapas')"
          >
            <q-item-section avatar>
              <q-icon name="map" />
            </q-item-section>
            <q-item-section>Mapas</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/app/partidas"
            :active-class="isActive('/app/partidas') ? 'text-red' : ''"
            @click="updateTitle('Partidas')"
          >
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>
            <q-item-section>Partidas</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/app/times"
            :active-class="isActive('/app/times') ? 'text-red' : ''"
            @click="updateTitle('Times')"
          >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>Times</q-item-section>
          </q-item>
        </q-list>

        <div class="user-info">
          <q-item>
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "src/stores/authStore";

const leftDrawerOpen = ref(false);
const miniState = ref(true);
const pageTitle = ref("Dashboard");

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const username = computed(() => authStore.user?.nick_usuario || "Visitante");

function updateTitle(title) {
  pageTitle.value = title;
}

function isActive(path) {
  return route.path === path;
}

function logout() {
  authStore.logout();
  router.push("/login");
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
