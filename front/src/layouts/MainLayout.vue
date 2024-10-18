<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-toolbar-title>Valorant</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Drawer) with mini state and hover -->
    <q-drawer v-model="leftDrawerOpen" show-if-above :mini="miniState" @mouseenter="miniState = false"
      @mouseleave="miniState = true" :width="200" :breakpoint="500" bordered class="custom-drawer">
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item-label header>Menu</q-item-label>

          <q-item clickable v-ripple tag="router-link" to="/listagem">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>Listagem</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/agent">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Agente</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/camp">
            <q-item-section avatar>
              <q-icon name="flag" />
            </q-item-section>
            <q-item-section>Camp</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/estat">
            <q-item-section avatar>
              <q-icon name="bar_chart" />
            </q-item-section>
            <q-item-section>Estat</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/jogadores">
            <q-item-section avatar>
              <q-icon name="sports_esports" />
            </q-item-section>
            <q-item-section>Jogadores</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/maps">
            <q-item-section avatar>
              <q-icon name="map" />
            </q-item-section>
            <q-item-section>Mapa</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/partida">
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>
            <q-item-section>Partida</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const miniState = ref(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.custom-drawer {
  background-color: #f7f7f7;
}
</style>
