<template>
  <div class="ma-5">
    <v-row 
      v-if="carrito.componentes.length > 0 || carrito.productos.length > 0"
      justify = "center">
      <v-col 
        cols="12"
        md="7">
        <Tabla :items="itemsTabla()"/>
      </v-col>
      <v-col 
        cols="8"
        md="5">
        <Form/>
      </v-col>
    </v-row>
    <v-row v-else>
      <h4>El carrito esta vacío</h4>
    </v-row>
    <ErrorSnackbar />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import Tabla from './componentes/Tabla.vue'
import Form from './componentes/Form.vue'
import ErrorSnackbar from '../../components/ErrorSnackbar.vue';

export default Vue.extend({
  components: { Tabla, Form, ErrorSnackbar},
  data:()=>{
    return{
      
    }
  },
  methods:{
    itemsTabla(){
      let componentes = this.carrito.componentes.map((x:any) => {
        return{
          ...x.componente,
          cantidad: x.cantidad
        }
      });
      let productos = this.carrito.productos.map((x:any) => {
        return{
          ...x.producto,
          cantidad: x.cantidad
        }
      });
      return [...componentes, ...productos]
    }
  },
  computed:{
    ...mapGetters('moduloPedido',['carrito'])
  }
})
</script>