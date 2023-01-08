<template>
  <div>
    <v-row justify="center" v-if="menuDelDia" class="ma-5">
      <v-col 
        cols="12"
        md="8">
        <h1>{{menuDelDia.titulo}}</h1>
          <Card 
            v-for="item in menuDelDia.componentes"
            :key="item._componente._id"
            class="mt-5"
            :item="item" />
          <card-producto 
            v-for="item in productosConStock"
            :key="item._id"
            class="mt-5"
            :item="item"/>
      </v-col>
    </v-row>
    <v-row justify="center" style="text-align: center;" class="mt-5" v-else>
      <h2>No hay menu para hoy!</h2>
    </v-row>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapGetters} from 'vuex';
import Card from './componentes/Card.vue';
import CardProducto from './componentes/CardProducto.vue';

export default Vue.extend({
  components: {Card, CardProducto},
  data:()=>{
    return{

    }
  },
  methods:{
    ...mapActions('moduloMenu',['cargarMenus']),
    ...mapActions('moduloProducto',['cargarProductos']),
  },
  computed:{
    ...mapGetters('moduloMenu',['menuDelDia']),
    ...mapGetters('moduloProducto',['productosConStock']),
  },
  async mounted(){
    await this.cargarMenus();
    await this.cargarProductos();
  }
})
</script>