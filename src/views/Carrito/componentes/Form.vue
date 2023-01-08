<template>
  <v-card 
    elevation="3">
    <v-card-title>
      Confirmación del pedido
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-file-input
        label="Comprobante"
        show-size
        truncate-length="10"
        prepend-icon="mdi-camera"
        @change="obtenerArchivo"
        accept="image/*"
      ></v-file-input>
      <v-row class="text-h6 text--primary">
        <v-col>
        <span>Total del pedido: </span>
        </v-col>
        <v-col cols="auto">
          <span>$ {{total()}}</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn 
        :loading = "cargando"
        block
        @click="procesar()"
        :disabled ="comprobante == null || cargando"
        color="warning">
        Pagar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import router from '../../../router';
import {mapGetters, mapActions} from 'vuex'

export default Vue.extend({
  data:()=>{
    return{
      comprobante: null,
      cargando: false
    }
  },
  methods:{
    ...mapActions('moduloPedido',['crearPedido']),
    total(){
      let resultado = 0;
      this.carrito.componentes.forEach((x:any) => resultado += x.componente.precio * x.cantidad);
      this.carrito.productos.forEach((x:any) => resultado += x.producto.precio * x.cantidad);
      return resultado;
    },
    obtenerArchivo(archivo:File | null){
      this.comprobante = archivo as any;
    },
    async procesar(){
      this.cargando = true;
      const pedido = {
        total: this.total(),
        componentes: this.carrito.componentes.map((x:any) => {
          return {
            _componente: x.componente._id,
            cantidad: x.cantidad
          }
        }),
        productos: this.carrito.productos.map((x:any) => {
          return {
            _producto: x.producto._id,
            cantidad: x.cantidad
          }
        }),
        comprobante: this.comprobante
      }
      await this.crearPedido(pedido);
      this.cargando = false;
      router.push('/pedido')
    }
  },
  computed:{
    ...mapGetters('moduloPedido',['carrito']),
  }
})
</script>