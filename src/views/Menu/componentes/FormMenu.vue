<template>
  <div>
    <v-card 
      elevation="3">
      <v-card-title class="d-flex justify-center">
        <span class="display-1">Agregar Menú</span>
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent ="procesar"
          v-model="datosValidos">

          <v-text-field
            label="Título"
            v-model="menu.titulo"
            :rules="rules.titulo"
            required
          ></v-text-field>

          <v-menu
            v-model="mostrarMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="menu.fecha"
                label="Fecha"
                persistent-hint
                prepend-icon="mdi-calendar"
                :rules="rules.fecha"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="menu.fecha"
              no-title
              @input="mostrarMenu = false"
            ></v-date-picker>
          </v-menu>
          
          <v-select
            v-model="menu.componentes"
            :items="platos"
            label="Platos"
            multiple
            chips
            :item-text="textItem"
            :item-value="textValue"
            :rules="rules.platos"
          />

          <v-row class="mt-2">
            <v-spacer/>
            <v-btn 
              class="me-5"
              text 
              color="red darken-1"
              @click="cancelar">
              Cancelar</v-btn>
            <v-btn 
              text 
              type="submit"
              color="blue darken-1"
              :loading = "cargando"
              :disabled="!datosValidos || cargando"
            >Agregar</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import {mapActions,mapGetters} from 'vuex'
import moment from 'moment';

export default Vue.extend({
  name:'FormMenu',
  data:()=>{
    return{
      mostrarMenu: false,
      menu:{
        titulo: '',
        fecha: '',
        componentes:[]
      },
      cargando: false,
      datosValidos: false,
      rules:{
        titulo: [(v:string) => !!v || 'El título es requerido',
        (v:string) => v.length <= 35 || 'Solo se permiten 35 caracteres' 
        ],
        platos: [
          (v:[]) => v.length > 0 || 'Debe escojer platos',
        ],
        fecha:[
          (v: string) => !!v || 'Debe escojer una fecha',
          (v: string) => moment(v).isSameOrAfter(moment().format('YYYY-MM-DD')) || 'Debe escojer una fecha mayor o igual a la actual'
        ]
      }
    }
  },
  methods:{
    ...mapActions('moduloMenu',['cambiarEstadoMostrarFormulario','crearMenu']),
    ...mapActions('moduloPlato',['cargarPlatos']),
    cancelar(){
      (this.$refs['form'] as any).reset();
      this.cambiarEstadoMostrarFormulario(false);
    },
    async procesar(){
      this.cargando = true;
      let data:any[] = [];
      this.menu.componentes.forEach((x:any) => {
        data.push({_componente: x})
      });
      await this.crearMenu({titulo: this.menu.titulo, fecha:this.menu.fecha, componentes: data});
      this.cargando = false;
      if(!this.error.message){
        (this.$refs['form'] as any).reset();
        this.cambiarEstadoMostrarFormulario(false);
      }
    },
    textItem(item:any){
      return item.nombre    
    },
    textValue(item:any){
      return item._id
    }
  },
  computed:{
    ...mapGetters('moduloError',['error']),
    ...mapGetters('moduloPlato',['platos']),
  },
  async mounted(){
    await this.cargarPlatos();
  }
})
</script>

