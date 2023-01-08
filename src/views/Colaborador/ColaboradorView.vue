<template>
  <v-container fluid class="mt-5">
    <v-row justify="center">
      <v-col v-if="!mostrarFormulario">
        <TablaColaborador/>
      </v-col>
      <v-col 
        col="12"
        md="6"
        v-else>
        <FormColaborador/>
      </v-col>
    </v-row>
    <ErrorSnackbar/> 
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'
import ErrorSnackbar from '../../components/ErrorSnackbar.vue'
import FormColaborador from './componentes/FormColaborador.vue'

import TablaColaborador from './componentes/TablaColaborador.vue'
export default Vue.extend({
  components: { TablaColaborador, FormColaborador, ErrorSnackbar },
  data:()=>{
    return{

    }
  },
  methods:{
    
  },
  computed:{
    ...mapGetters('moduloColaborador',['mostrarFormulario'])
  }
})
</script>
