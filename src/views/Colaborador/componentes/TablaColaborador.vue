<template>
  <v-card>
    <v-card-title>
      <span>Colaboradores</span>
      <v-spacer></v-spacer>
      <v-btn 
        dark 
        fab 
        color="indigo" 
        elevation="3"
        @click="cambiarEstadoMostrarFormulario(true)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="colaboradores"
      class="elevation-2"
      :loading="cargando"
      multi-sort
    >
      <template v-slot:item.fechaCreacion="{item}">
        {{formatearFecha(item.fechaCreacion)}}
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex';

export default Vue.extend({
  name:'TablaColaborador',
  data:()=>{
    return{
      cargando:false,
      headers:[
        { text:'Nombre', value:'nombre'},
        { text:'Apellido', value:'apellido'},
        { text:'Teléfono',  value:'telefono', sortable:false },
        { text:'Email', value:'email', sortable:false },
        { text:'Rol',  value:'rol' },
        { text:'Fecha de creación',  value:'fechaCreacion' },
     ]
    }
  },
  methods:{
    ...mapActions('moduloColaborador',['cargarColaboradores','cambiarEstadoMostrarFormulario']),
    formatearFecha(fecha:string){
      return new Date(fecha).toLocaleString();
    }
  },
  computed:{
    ...mapGetters('moduloColaborador',['colaboradores'])
  },
  async mounted(){
    this.cargando = true;
    await this.cargarColaboradores();
    this.cargando = false;
  }
})
</script>