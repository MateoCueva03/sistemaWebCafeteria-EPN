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
            v-model="productoActual.nombre"
            :rules="rules.nombre"
            required
          ></v-text-field>

          <v-text-field
            label="Precio"
            v-model="productoActual.precio"
            :rules="rules.precio"
            type="number"
            prefix="$"
            required
          ></v-text-field>

          <v-text-field
            label="Stock"
            v-model="productoActual.stock"
            :rules="rules.stock"
            type="number"
            required
          ></v-text-field>

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
  name:'FormProducto',
  data:()=>{
    return{
      producto:{
        nombre:'',
        precio: 0,
        stock: 10
      },
      cargando: false,
      datosValidos: false,
      rules:{
        nombre: [(v:string) => !!v || 'El nombre es requerido'],
        precio: [
          (v:string) => !!v || 'El precio es requerido',
          (v:number) => v > 0 || 'El precio debe ser positivo'
        ],
        stock: [
          (v:string) => !!v || 'El stock es requerido',
          (v:number) => v > 0 || 'El stock debe ser positivo',
          (v:number) => v % 1 == 0 || 'El stock debe ser entero'
        ],
      }
    }
  },
  methods:{
    ...mapActions('moduloProducto',['cambiarEstadoMostrarFormulario','crearProducto','cambiarEstadoEditar','setProductoActual','actualizarProducto']),
    cancelar(){
      (this.$refs['form'] as any).reset();
      this.cambiarEstadoMostrarFormulario(false);
      this.cambiarEstadoEditar(false);
      this.setProductoActual({
        _id:'',
        id:'',
        nombre:'',
        stock:10,
        precio:0
      })
    },
    async procesar(){
      this.cargando = true;
      if(this.editar){
        await this.actualizarProducto(this.productoActual);
      }else{
        await this.crearProducto(this.productoActual);
      }
      this.cargando = false;
      if(!this.error.message){
        (this.$refs['form'] as any).reset();
        this.cambiarEstadoMostrarFormulario(false);
        this.cambiarEstadoEditar(false);
        this.setProductoActual({
          _id:'',
          id:'',
          nombre:'',
          stock:10,
          precio:0
        })
      }
    },
    titulo(){
      return this.editar ? 'Editar Producto' : 'Agregar Producto';
    }
  },
  computed:{
    ...mapGetters('moduloError',['error']),
    ...mapGetters('moduloProducto',['editar','productoActual']),
  },
})
</script>
