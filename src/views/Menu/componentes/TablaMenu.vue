<template>
  <v-card>
    <v-card-title>
      <span>Menus</span>
      <v-spacer></v-spacer>
      <v-btn 
        v-if="usuario.rol == 'administrador'"
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
      :items="menus"
      class="elevation-2"
      :loading="cargando"
      :sort-by="['fecha']"
      :sort-desc="[true]"
      multi-sort
    >
      <template v-slot:item.fecha="{item}">
        {{formatearFecha(item.fecha)}}
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
                @click="ver(item)"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>Ver</span>
          </v-tooltip>
          <v-tooltip color ="error" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                v-if="usuario.rol == 'administrador'"
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
          <p class="mx-auto">¿Eliminar "{{menuActual.titulo}}"?</p>
          </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEliminar=false">No</v-btn>
          <v-btn color="blue darken-1" text @click="eliminar()">Si</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogMostrar"
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <CardMenu :menu="menuActual"/>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex';
import moment from 'moment';
import CardMenu from './CardMenu.vue';

export default Vue.extend({
  name:'TablaMenu',
  components:{CardMenu},
  data:()=>{
    return{
      cargando:false,
      headers:[
        { text:'Titulo', value:'titulo'},
        { text:'Fecha', value:'fecha'},
        { text:'Acción', value:'accion', sortable:false}
      ],
      dialogEliminar: false,
      menuActual:{
        id:'',
        titulo:'',
        fecha:'',
        componentes:[]
      },
      dialogMostrar: false
    }
  },
  methods:{
    ...mapActions('moduloMenu',['cargarMenus','cambiarEstadoMostrarFormulario','eliminarMenu']),
    formatearFecha(fecha:string){
      return moment(fecha).utc().format('DD/MM/YYYY');
    },
    confirmar(item:any){
      this.menuActual = item;
      this.dialogEliminar = true;
    },
    async eliminar(){
      this.dialogEliminar = false;
      this.cargando = true;
      await this.eliminarMenu(this.menuActual.id)
      this.cargando = false;      
    },
    ver(item:any){
      this.menuActual = item;
      this.dialogMostrar = true;
    }
  },
  computed:{
    ...mapGetters('moduloMenu',['menus']),
    ...mapGetters('moduloUsuario',['usuario'])
  },
  async mounted(){
    this.cargando = true;
    await this.cargarMenus();
    this.cargando = false;
  }
})
</script>