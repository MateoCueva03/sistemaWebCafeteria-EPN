<template>
  <v-card>
    <v-card-title>
      <span>Platos</span>
      <v-spacer></v-spacer>
      <v-btn 
        dark 
        fab 
        color="indigo" 
        @click="cambiarEstadoMostrarFormulario(true)"
        elevation="3">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="platos"
      class="elevation-2"
      :loading="cargando"
      multi-sort
    >
      <template v-slot:item.fechaCreacion="{item}">
        {{formatearFecha(item.fechaCreacion)}}
      </template>
      <template v-slot:item.accion="{item}">
          <v-tooltip color ="yellow darken-2" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon 
                small
                color="yellow darken-2"
                class="ma-1"
                v-bind="attrs"
                v-on="on"
                @click="editar(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip color ="error" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon 
                small
                class="ma-1"
                color="error"
                v-bind="attrs"
                v-on="on"
                @click="confirmar(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>
    </v-data-table>
    <v-dialog 
      v-model="dialogEliminar" 
      max-width="500px"
      >
      <v-card>
        <v-card-title class="text-h5">
          <p class="mx-auto">¿Eliminar el plato {{platoActual.nombre}}?</p>
          </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEliminar=false">No</v-btn>
          <v-btn color="blue darken-1" text @click="eliminar()">Si</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex';

export default Vue.extend({
  name:'TablaPlato',
  data:()=>{
    return{
      cargando:false,
      headers:[
        { text:'Nombre', value:'nombre'},
        { text:'Descripción', value:'descripcion', sortable:false},
        { text:'Precio', value:'precio'},
        { text:'Medida',  value:'medida'},
        { text:'Tipo', value:'tipo'},
        { text:'Fecha de creación',  value:'fechaCreacion' },
        { text:'Acción', value:'accion', sortable:false}
      ],
      dialogEliminar: false,
      platoActual:{
        id:'',
        nombre:''
      },
    }
  },
  methods:{
    ...mapActions('moduloPlato',['cargarPlatos','cambiarEstadoMostrarFormulario','eliminarPlato','setPlatoActual','setEditar']),
    formatearFecha(fecha:string){
      return new Date(fecha).toLocaleString();
    },
    confirmar(item:any){
      this.platoActual = item;
      this.dialogEliminar = true;
    },
    async eliminar(){
      this.dialogEliminar = false;
      this.cargando = true;
      await this.eliminarPlato(this.platoActual.id)
      this.cargando = false;      
    },
    editar(item:any){
      this.cambiarEstadoMostrarFormulario(true);
      this.setEditar(true);
      this.setPlatoActual(item);
    }
  },
  computed:{
    ...mapGetters('moduloPlato',['platos'])
  },
  async mounted(){
    this.cargando = true;
    await this.cargarPlatos();
    this.cargando = false;
  }
})
</script>