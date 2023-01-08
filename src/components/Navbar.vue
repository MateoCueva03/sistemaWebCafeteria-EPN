<template>
  <v-app-bar 
    v-if="usuario.token"
    app>
    <img class="me-2" src="https://www.epn.edu.ec/wp-content/uploads/2019/02/logo-EPN-blanco.png" alt="" style="width: 85px; height: 45px;">
      <v-toolbar-title>
        <router-link to="/dashboard" class="text-decoration-none text-h6" style="color: white;">
          {{nombreApp}}
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-badge
        v-if="usuario.rol == 'cliente'"
        :content="cantidad()"
        :value="cantidad()"
        overlap
        class="me-5"
      >
       <v-btn 
        to="/carrito"
        text>
          <v-icon large color="white">
            mdi-content-paste          
          </v-icon>
          <span style="color: white;">Detalle pedido</span>
        </v-btn>
      </v-badge>

      <v-btn
        text
        color="white"
        @click="cerrarSesion()"
      >
      <v-icon large>
        mdi-logout
      </v-icon>
      </v-btn>
    </v-app-bar>
  <v-app-bar 
    v-else
    app>
    <img class="me-2" src="https://www.epn.edu.ec/wp-content/uploads/2019/02/logo-EPN-blanco.png" alt="" style="width: 85px; height: 45px;">    
      <v-toolbar-title>
        <router-link to="/" class="text-decoration-none text-h6" style="color: white;">
          {{nombreApp}}
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        color="white"
        to="/login"
        class="me-2"
      >
        <span>Iniciar Sesión</span>
      </v-btn>
      <v-btn
        text
        color="white"
        to="/registro"
      >
        <span>Registro</span>
      </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'

export default Vue.extend({
  name:'Navbar',
  data: () => {
    return{
      nombreApp: 'Comedor EPN'
    }
  },
  methods:{
    ...mapActions('moduloUsuario',['cerrarSesion']),
    cantidad(){
      return this.carrito.componentes.length + this.carrito.productos.length;
    }
  },
  computed:{
    ...mapGetters('moduloUsuario',['usuario']),
    ...mapGetters('moduloPedido',['carrito'])
  }
})
</script>