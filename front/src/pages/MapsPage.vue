<template>
  <q-page class="q-pa-md">
    <div class="layout-container">
      <!-- Formulário de Cadastro/Editar Mapa -->
      <div class="form-section">
        <q-card class="q-pa-md custom-card">
          <q-form @submit.prevent="submitMap">
            <q-input filled v-model="mapName" label="Nome do Mapa" class="q-mb-md" />
            <q-input filled v-model="description" label="Descrição" type="textarea" class="q-mb-md" />
            <q-uploader label="Imagem do Mapa" @added="onFileAdded" class="q-mb-md" flat bordered color="primary" />
            <q-input filled v-model="releaseDate" mask="##/##/####" label="Data de Lançamento" class="q-mb-md">
              <template v-slot:append>
                <q-icon name="event" />
              </template>
            </q-input>
            <div class="map-pool-section">
              <q-item-label class="map-pool-caption">Map Pool</q-item-label>
              <q-option-group v-model="mapPool"
                :options="[{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }]" color="primary" inline />
            </div>
            <q-btn type="submit" :label="editMode ? 'ATUALIZAR' : 'SALVAR'" color="primary"
              class="full-width q-mt-lg save-button" />
            <q-btn @click="resetForm" label="NOVO" color="secondary" class="full-width q-mt-md save-button" />
          </q-form>
        </q-card>
      </div>

      <!-- Listagem de Mapas -->
      <div class="list-section">
        <q-card class="q-pa-md custom-card">
          <q-table :rows="maps" :columns="columns" row-key="id" title="Mapas Cadastrados" dense flat bordered>
            <template v-slot:body-cell-map_pool="props">
              <q-td :props="props">
                {{ props.row.map_pool === 'sim' ? 'Sim' : 'Não' }}
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn flat round icon="edit" @click="loadMap(props.row)" />
                <q-btn flat round icon="delete" color="negative" @click="deleteMap(props.row.id)" />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMapStore } from 'src/stores/mapStore';

const store = useMapStore();

const mapName = ref('');
const description = ref('');
const releaseDate = ref('');
const mapPool = ref('sim');
const selectedFile = ref(null);
const maps = ref([]);
const currentMapId = ref(null);
const editMode = ref(false);

const columns = [
  { name: 'nome_mapa', label: 'Nome', align: 'left', field: 'nome_mapa', sortable: true },
  { name: 'descricao', label: 'Descrição', align: 'left', field: 'descricao', sortable: true },
  { name: 'data_lancamento', label: 'Data de Lançamento', align: 'left', field: 'data_lancamento', sortable: true },
  { name: 'map_pool', label: 'Map Pool', align: 'left', field: 'map_pool', sortable: true },
  { name: 'actions', label: 'Ações', align: 'center', field: 'actions' }
];

onMounted(async () => {
  await store.fetchMaps();
  maps.value = store.maps;
});

function onFileAdded(files) {
  if (files.length > 0) {
    selectedFile.value = files[0];
  }
}

async function submitMap() {
  const mapData = {
    nome_mapa: mapName.value,
    descricao: description.value,
    data_lancamento: releaseDate.value,
    map_pool: mapPool.value,
    imagem_mapa: selectedFile.value ? selectedFile.value.name : ''
  };

  if (editMode.value) {
    await store.updateMap(currentMapId.value, mapData);
  } else {
    await store.addMap(mapData);
  }

  resetForm();
  await reloadMaps();
}

function loadMap(map) {
  mapName.value = map.nome_mapa;
  description.value = map.descricao;
  releaseDate.value = map.data_lancamento;
  mapPool.value = map.map_pool;
  currentMapId.value = map.id;
  editMode.value = true;
}

async function deleteMap(id) {
  await store.deleteMap(id);
  await reloadMaps();
}

function resetForm() {
  mapName.value = '';
  description.value = '';
  releaseDate.value = '';
  mapPool.value = 'sim';
  selectedFile.value = null;
  editMode.value = false;
  currentMapId.value = null;
}

async function reloadMaps() {
  await store.fetchMaps();
  maps.value = store.maps;
}
</script>

<style scoped>
.layout-container {
  display: flex;
  gap: 20px;
}

.form-section,
.list-section {
  flex: 1;
}

.custom-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.map-pool-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.map-pool-caption {
  font-weight: bold;
  font-size: 1em;
  color: #333;
}

.save-button {
  font-weight: bold;
  font-size: 1.1em;
}
</style>
