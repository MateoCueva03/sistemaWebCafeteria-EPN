<template>
  <v-container fluid class="mt-5">
    <v-row justify="center">
      <v-col v-if="!mostrarFormulario">
        <TablaProducto/>
      </v-col>
      <v-col 
        col="12"
        md="6"
        v-else>
        <FormProducto/>  
      </v-col>
    </v-row>
    <ErrorSnackbar/> 
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import ErrorSnackbar from '../../components/ErrorSnackbar.vue'
import FormProducto from './componentes/FormProducto.vue'
import TablaProducto from './componentes/TablaProducto.vue'

export default Vue.extend({
  components: {ErrorSnackbar, TablaProducto, FormProducto},
  data:()=>{
    return{

    }
  },
  methods:{
    
  },
  computed:{
    ...mapGetters('moduloProducto',['mostrarFormulario'])
  }
})
</script>
