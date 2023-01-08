<template>
  <v-card 
    class="mt-5">
    <v-row dense>
      <v-col cols="auto">
        <v-avatar
          class="ma-3"
          size="125"
          tile
        >
          <v-img :src="item._componente.urlFoto"></v-img>
        </v-avatar>
      </v-col>
      <v-col>
        <v-card-title
          class="text-h5"
        >
        {{item._componente.nombre}}
        <v-spacer></v-spacer>
        $ {{item._componente.precio}}
        </v-card-title>

        <v-card-subtitle>
          {{item._componente.descripcion}}
        </v-card-subtitle>

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
                :disabled="desabilitarBoton() || !item.estado"
                color="warning">
                Agregar al pedido
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
    ...mapActions('moduloPedido',['addComponente']),
    agregarAlCarrito(){
      this.addComponente({
        componente: this.item._componente,
        cantidad: this.cantidad
      })
    },
    desabilitarBoton(){
      const item = this.carrito.componentes.find((x:any) => x.componente._id == this.item._componente._id)
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
      for (let i = 1; i <= 50; i++) {
        numeros.push(i);
      }
      return numeros;
    }
  }
})
</script>