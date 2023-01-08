<template>
  <v-card>
    <v-row dense>
      <v-col cols="12">
        <v-card 
          v-for="item in componentes"
          :key="item._componente._id"
          class="mt-5"
          elevation="10">
          <v-row dense>
            <v-col cols="auto">
              <v-avatar
                class="ma-3"
                size="75"
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
                <v-spacer></v-spacer>
                Cantidad: {{item.cantidad}}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card 
          v-for="item in productos"
          :key="item._producto._id"
          class="mt-5">
          <v-row dense>
            <v-col>
              <v-card-title
                class="text-h5"
              >
              {{item._producto.nombre}}
              <v-spacer></v-spacer>
              $ {{item._producto.precio}}
              </v-card-title>

              <v-card-subtitle>
                Cantidad: {{item.cantidad}}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props:{
    componentes: Array,
    productos: Array
  },
  data:()=>{
    return{
      lista:[]
    }
  }
})
</script>