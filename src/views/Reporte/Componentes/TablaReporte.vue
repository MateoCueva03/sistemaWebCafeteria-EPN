<template>
    <v-card>
      <v-card-title>
        <span>Reporte de pedidos completados</span>
      </v-card-title>
      <v-data-table
        :headers="headers()"
        :items="usuario.rol == 'administrador' ? pedidosCompletados : pedidos"
        class="elevation-2"
        :sort-by="['fechaCreacion']"
        :sort-desc="[true]"
        multi-sort
      >
        <template v-slot:item._cliente="{item}">
            {{`${item._cliente.nombre} ${item._cliente.apellido}`}}
        </template>
  
        <template v-slot:item.estado="{item}">
          {{item.estado[item.estado.length - 1]}}
        </template>
  
        <template v-slot:item.fechaCreacion="{item}">
          {{formatearFecha(item.fechaCreacion)}}
        </template>
  
        <template v-slot:item.urlComprobante="{item}">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                target="_blank"
                :href="item.urlComprobante"
                color="blue darken-1"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-file
                </v-icon>
              </v-btn>
            </template>
            <span>Comprobante</span>
          </v-tooltip>
        </template>
                  
      </v-data-table>
  
    
    </v-card>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  import {mapGetters,mapActions} from 'vuex';
  
  export default Vue.extend({
   
    methods:{
      ...mapActions('moduloPedido',['cargarPedidos','actualizarEstado']),
      ...mapActions('moduloColaborador',['cargarCocineros']),
      headers(){
        if(this.usuario.rol == 'cliente'){
          return [
              { text:'Cliente', value:'_cliente'},
              { text:'Fecha de creación',  value:'fechaCreacion' },
              { text:'Comprobante', value:'urlComprobante'},
              { text:'Estado', value:'estado'},
              { text:'Total', value:'total'},
            ]
        }
        return [
              { text:'Cliente', value:'_cliente'},
              { text:'Fecha de creación',  value:'fechaCreacion' },
              { text:'Comprobante', value:'urlComprobante'},
              { text:'Estado', value:'estado'},
              { text:'Total', value:'total'},
            ]
      },
      formatearFecha(fecha:string){
        return new Date(fecha).toLocaleString();
      },
      
      mostrarIconosAdmin(item:any){
        if(this.usuario.rol == 'administrador' && item.estado[item.estado.length-1] == 'pendiente'){
          return true;
        }
        return false;
      },
      mostrarIconosCocinero(item:any){
        if(this.usuario.rol == 'cocinero' && item.estado[item.estado.length-1] == 'verificado'){
          return true;
        }
        return false;
      },
     
     
   
      textItem(item:any){
        return item.nombre    
      },
      textValue(item:any){
        return item._id
      }
    },
    
    computed:{
      ...mapGetters('moduloUsuario',['usuario']),
      ...mapGetters('moduloPedido',['pedidos','pedidosVerificados', 'pedidosCompletados']),
      ...mapGetters('moduloColaborador',['cocineros'])
    },
  
   
  })
  </script>