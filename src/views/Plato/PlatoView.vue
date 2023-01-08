<template>
  <v-container fluid class="mt-5">
    <v-row justify="center">
      <v-col v-if="!mostrarFormulario">
        <TablaPlato/>
      </v-col>
      <v-col 
        col="12"
        md="6"
        v-else>
        <FormPlato/>
      </v-col>
    </v-row>
    <ErrorSnackbar/> 
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import ErrorSnackbar from '../../components/ErrorSnackbar.vue'
import FormPlato from './componentes/FormPlato.vue'
import TablaPlato from './componentes/TablaPlato.vue'

export default Vue.extend({
  components: {ErrorSnackbar, TablaPlato, FormPlato},
  data:()=>{
    return{

    }
  },
  methods:{
    
  },
  computed:{
    ...mapGetters('moduloPlato',['mostrarFormulario'])
  }
})
</script>
