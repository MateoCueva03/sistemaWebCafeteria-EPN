<template>
  <div>
    <v-card 
      elevation="3">
      <v-card-title class="d-flex justify-center">
        <span class="display-1">{{titulo()}}</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent ="procesar"
          v-model="datosValidos">

          <v-text-field
            label="Nombre"
            v-model="platoActual.nombre"
            :rules="rules.nombre"
            required
          ></v-text-field>

          <v-text-field
            label="Descripción"
            v-model="platoActual.descripcion"
            :rules="rules.nombre"
            required
          ></v-text-field>

          <v-text-field
            label="Precio"
            v-model="platoActual.precio"
            :rules="rules.precio"
            type="number"
            prefix="$"
            required
          ></v-text-field>
          
          <!-- <v-select
            v-model="platoActual.medida"
            :items="['plato','vaso','porcion']"
            label="Unidad"
          ></v-select> -->

          <v-select
            v-model="platoActual.tipo"
            :items="['sopa','segundo','bebida','extra']"
            label="Tipo"
          ></v-select>

          <v-file-input
            v-if="!editar"
            label="Foto"
            show-size
            truncate-length="15"
            prepend-icon="mdi-camera"
            @change="obtenerArchivo"
            accept="image/*"
          ></v-file-input>

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

export default Vue.extend({
  name:'FormPlato',
  data:()=>{
    return{
      cargando: false,
      datosValidos: false,
      rules:{
        nombre: [(v:string) => !!v || 'Es requerido',
        (v:string) => v.length <= 35 || 'Solo se permiten 35 caracteres' 
        ],
        precio: [
          (v:string) => !!v || 'El precio es requerido',
          (v:number) => v > 0 || 'El precio debe ser positivo',
          (v:string) => v.length <= 5 || 'Deben ser 4 dígitos'
        ]
      }
    }
  },
  methods:{
    ...mapActions('moduloPlato',['cambiarEstadoMostrarFormulario','crearPlato','actualizarPlato','setEditar','setPlatoActual']),
    cancelar(){
      (this.$refs['form'] as any).reset();
      this.cambiarEstadoMostrarFormulario(false);
      this.setEditar(false);
      this.setPlatoActual({
        id: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        medida: 'plato',
        urlFoto: null,
        tipo: 'caldo'
      })
    },
    async procesar(){
      this.cargando = true;
      if(this.editar){
        await this.actualizarPlato(this.platoActual);
      }else{
        await this.crearPlato(this.platoActual);
      }
      
      this.cargando = false;
      if(!this.error.message){
        (this.$refs['form'] as any).reset();
        this.cambiarEstadoMostrarFormulario(false);
        this.setEditar(false);
        this.setPlatoActual({
          id: '',
          nombre: '',
          descripcion: '',
          precio: 0,
          medida: 'plato',
          urlFoto: null,
          tipo: 'caldo'
        })
      }
    },
    obtenerArchivo(archivo:File | null){
      this.platoActual.foto = archivo as any;
    },
    titulo(){
      return this.editar ? 'Editar Plato' : 'Agregar Plato';
    }
  },
  computed:{
    ...mapGetters('moduloError',['error']),
    ...mapGetters('moduloPlato',['editar','platoActual']),
  }
})
</script>
