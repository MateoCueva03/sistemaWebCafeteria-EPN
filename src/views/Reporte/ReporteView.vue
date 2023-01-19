<template>
    <v-row justify="center" class="ma-5">
      <v-col>
        <Tabla/>
      </v-col>
    </v-row>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  import Tabla from './Componentes/TablaReporte.vue';
  
  export default Vue.extend({
    components:{Tabla}
  })
  </script>