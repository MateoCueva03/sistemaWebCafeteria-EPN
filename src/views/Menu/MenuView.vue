<template>
  <v-container fluid class="mt-5">
    <v-row justify="center">
      <v-col v-if="!mostrarFormulario">
        <TablaMenu/>
      </v-col>
      <v-col 
        col="12"
        md="6"
        v-else>
        <FormMenu/>
      </v-col>
    </v-row>
    <ErrorSnackbar/> 
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import ErrorSnackbar from '../../components/ErrorSnackbar.vue'
import FormMenu from './componentes/FormMenu.vue'
import TablaMenu from './componentes/TablaMenu.vue'

export default Vue.extend({
  components: {ErrorSnackbar, TablaMenu, FormMenu},
  data:()=>{
    return{

    }
  },
  methods:{
    
  },
  computed:{
    ...mapGetters('moduloMenu',['mostrarFormulario'])
  }
})
</script>
