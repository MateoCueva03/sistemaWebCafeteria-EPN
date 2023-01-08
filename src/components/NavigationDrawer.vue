<template>
  <v-navigation-drawer 
    style="background-color: #001F3E;"
    permanent
    app
    :mini-variant.sync="mini"
    >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img :src="traerFoto()"></v-img>
      </v-list-item-avatar>

      <v-list-item-title style="color: white;">{{usuario.nombre}}</v-list-item-title>

      <v-btn
        icon
        @click.stop="mini = !mini"
      >
        <v-icon style="color: white;">mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in itemsPermitidos()"
        :key="item.titulo"
        link
        :to="item.path"
      >
        <v-list-item-icon>
          <v-badge left color="primary" v-if="usuario.rol == 'cocinero' && item.titulo == 'Pedidos'">
            <span slot="badge">{{pedidosVerificados.length}}</span>
            <v-icon large color="primary">{{ item.icono }}</v-icon>
          </v-badge>
          <v-icon v-else style="color: white;">{{ item.icono }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title style="color: white;">{{ item.titulo }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'

export default Vue.extend({
  name: 'NavigationDrawer',
  data:()=>{
    return {
      drawer:true,
      mini:true,
      items:[
        {
          titulo:'Configuración',
          icono: 'mdi-cog',
          path:'/dashboard',
          roles:['administrador','cliente','cocinero']
        },
        {
          titulo:'Colaboradores',
          icono: 'mdi-account-group',
          path:'/colaborador',
          roles:['administrador']
        },
        {
          titulo:'Productos',
          icono: 'mdi-muffin',
          path:'/producto',
          roles:['administrador']
        },
        {
          titulo:'Platos',
          icono: 'mdi-food',
          path:'/plato',
          roles:['administrador']
        },
        {
          titulo:'Menú',
          icono: 'mdi-silverware',
          path:'/menu',
          roles:['administrador','cocinero']
        },
        {
          titulo:'Pedidos',
          icono: 'mdi-cube-send',
          path:'/pedido',
          roles:['administrador','cliente','cocinero'],
          badget: true
        },
        {
          titulo:'Menú',
          icono: 'mdi-food',
          path:'/comidas',
          roles:['cliente']
        },
      ]
    }
  },
  methods:{
    ...mapActions('moduloPedido',['cargarPedidos']),
    itemsPermitidos(){
      const data:any = [];
      this.items.forEach(x =>{
        if(x.roles.indexOf(this.usuario.rol) != -1){
          data.push(x);
        }
      })
      return data;
    },
    traerFoto(){
      return this.usuario.urlFoto ?? "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"
    }
  },
  computed:{
    ...mapGetters('moduloUsuario',['usuario']),
    ...mapGetters('moduloPedido',['pedidosVerificados']),
  },
  async mounted(){
    await this.cargarPedidos();
    
  }
})
</script>