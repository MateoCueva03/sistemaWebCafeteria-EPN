<template>
  <v-card 
    class="mt-5">
    <v-row dense>
      <v-col>
        <v-card-title
          class="text-h5"
        >
        {{item.nombre}}
        <v-spacer></v-spacer>
        $ {{item.precio}}
        </v-card-title>

        <v-card-actions>
          <v-row dense>
            <v-col cols="4" md="3">
              <v-select
                v-model="cantidad"
                :items="items"
                label="Cantidad"
                dense
                solo
                :disabled="desabilitarBoton()"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn  
                @click="agregarAlCarrito()"
                :disabled="desabilitarBoton()"
                color="warning">
                Agregar al pepido
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapGetters} from 'vuex';

export default Vue.extend({
  props:{
    item:Object
  },
  data:()=>{
    return{
      cantidad: 1
    }
  },
  methods:{
    ...mapActions('moduloPedido',['addProducto']),
    agregarAlCarrito(){
      this.addProducto({
        producto: this.item,
        cantidad: this.cantidad
      })
    },
    desabilitarBoton(){
      const item = this.carrito.productos.find((x:any) => x.producto._id == this.item._id)
      if(item){
        this.cantidad = item.cantidad;
      }
      return !!item;
    }
  },
  computed:{
    ...mapGetters('moduloPedido',['carrito']),
    items(){
      let numeros = [];
      for (let i = 1; i <= this.item.stock; i++) {
        numeros.push(i);
      }
      return numeros;
    }
  }
})
</script>