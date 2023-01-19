<template>
  <v-card>
    <v-card-title>
      <span>Pedidos</span>
    </v-card-title>
    <v-data-table
      :headers="headers()"
      :items="usuario.rol == 'cocinero' ? pedidosVerificados : pedidos"
      class="elevation-2"
      :loading="cargando"
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
      
      <template v-slot:item.accion="{item}">
          <v-tooltip color ="yellow darken-2" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon 
                small
                color="yellow darken-2"
                class="ma-1"
                v-bind="attrs"
                v-on="on"
                @click="mostrarDetalles(item)"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>Ver detalles</span>
          </v-tooltip>
          <v-tooltip color ="green" top v-if="mostrarIconosAdmin(item)">
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon 
                small
                class="ma-1"
                color="green"
                v-bind="attrs"
                v-on="on"
                @click="mostrarVerificar(item)"
              >
                <v-icon>mdi-currency-usd</v-icon>
              </v-btn>
            </template>
            <span>Verificar Pago</span>
          </v-tooltip>
          
          <v-tooltip color ="red" top v-if="mostrarIconosAdmin(item)">
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon 
                small
                class="ma-1"
                color="red"
                v-bind="attrs"
                v-on="on"
                @click="denegar(item)"
              >
                <v-icon>mdi-close-outline</v-icon>
              </v-btn>
            </template>
            <span>Declinar pago</span>
          </v-tooltip>

          <v-tooltip color ="green" top v-if="mostrarIconosCocinero(item)">
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon 
                small
                class="ma-1"
                color="green"
                v-bind="attrs"
                v-on="on"
                @click="completar(item)"
              >
                <v-icon>mdi-check-outline</v-icon>
              </v-btn>
            </template>
            <span>Completar pedido</span>
          </v-tooltip>
        </template>
    </v-data-table>
    <v-dialog 
      v-model="verDetalles" 
      max-width="600px"
      >
      <Detalles 
        :componentes="pedidoActual.componentes" 
        :productos="pedidoActual.productos" />
    </v-dialog>
    <v-dialog 
      v-model="verCocineros" 
      max-width="600px"
      >
      <v-card>
        <v-card-title>
          Asignar cocinero
        </v-card-title>
        <v-card-text>
          <v-select
            :items="cocineros"
            v-model="cocinero"
            label="Cocinero"
            :item-text="textItem"
            :item-value="textValue"
          >
          <template v-slot:item="{item}">
            <v-badge>
              <span slot="badge">{{item.pedidosPendientes}}</span>
              {{item.nombre}}
            </v-badge>
          </template>
          </v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn 
            block 
            color="primary"
            @click="verificar()"
            :disabled="!cocinero">
            Asignar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters,mapActions} from 'vuex';
import Detalles from './Detalles.vue';

export default Vue.extend({
  components:{Detalles},
  data:()=>{
    return{
      idPedido:'',
      verCocineros:false,
      cargando: false,
      verDetalles: false,
      pedidoActual:{
        componentes:[],
        productos:[]
      },
      cocinero: null,
    }
  },
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
            { text:'Acción', value:'accion', sortable:false}
          ]
      }
      return [
            { text:'Cliente', value:'_cliente'},
            { text:'Fecha de creación',  value:'fechaCreacion' },
            { text:'Comprobante', value:'urlComprobante'},
            { text:'Estado', value:'estado'},
            { text:'Total', value:'total'},
            { text:'Acción', value:'accion', sortable:false}
          ]
    },
    formatearFecha(fecha:string){
      return new Date(fecha).toLocaleString();
    },
    mostrarDetalles(item:any){
      this.pedidoActual = item;
      this.verDetalles = true;
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
    async denegar(item:any){
      this.cargando = true;
      await this.actualizarEstado({id: item._id, estado:'denegado'});
      await this.cargarPedidos();
      this.cargando = false;
    },
    mostrarVerificar(item:any){
      this.cocinero = null;
      this.verCocineros = true;
      this.idPedido = item._id;
    },
    async verificar(){
      this.verCocineros = false;
      this.cargando = true;
      await this.actualizarEstado({id: this.idPedido, estado:'verificado', cocinero: this.cocinero});
      await this.cargarPedidos();
      this.cargando = false;
    },
    async  completar(item:any){
      this.cargando = true;
      await this.actualizarEstado({id: item._id, estado:'completado'});
      await this.cargarPedidos();
      this.cargando = false;
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
    ...mapGetters('moduloPedido',['pedidos','pedidosVerificados']),
    ...mapGetters('moduloColaborador',['cocineros'])
  },

  async mounted(){
    this.cargando = true;
    await this.cargarPedidos();
    if(this.usuario.rol == 'administrador'){
      await this.cargarCocineros();
    }
    this.cargando = false;
  }
})
</script>