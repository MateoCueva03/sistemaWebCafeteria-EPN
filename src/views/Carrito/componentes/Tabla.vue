<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-3"
    >
      <template v-slot:item.accion="{item}">
          <v-tooltip color ="error" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon 
                small
                class="ma-1"
                color="error"
                v-bind="attrs"
                v-on="on"
                @click="eliminar(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>
       

    </v-data-table>
    <v-card>
      <v-btn 
        style="margin-left: 5px; margin-bottom: 5px;"
        min-width
        :loading = "cargando"
        to="/comidas"
        color="success">
        Regresar
      </v-btn>
  
        </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions} from 'vuex'

export default Vue.extend({
  props:{
    items:Array
  },
  data:()=>{
    return{
      headers:[
        { text:'Nombre', value:'nombre', sortable:false},
        { text:'Precio', value:'precio', sortable:false},
        { text:'Cantidad',  value:'cantidad', sortable:false},
        { text:'Acción', value:'accion', sortable:false}
      ],
    }
  },
  methods:{
    ...mapActions('moduloPedido',['delComponente','delProducto']),
    eliminar(item:any){
      item['stock'] ? this.delProducto(item._id) : this.delComponente(item._id);
    }
  }
})
</script>