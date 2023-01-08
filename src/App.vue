<template>
  <v-app>
    <Navbar style="background-color:#001F3E;"/>
    <NavigationDrawer v-if="usuario.token" />
    <v-main>
      <router-view v-if="!cargando" /> 
      <v-overlay v-else>
			<v-progress-circular
				indeterminate
				size="64"
			></v-progress-circular>
		</v-overlay> 
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import {mapActions, mapGetters} from 'vuex';
import Navbar from "./components/Navbar.vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";

export default Vue.extend({
  components: { Navbar, NavigationDrawer },
  name: "App",

  data: () => {
    return {
      cargando:false
    }
  },
  methods:{
    ...mapActions('moduloUsuario',['verificarToken']),
  },
  computed:{
    ...mapGetters('moduloUsuario',['usuario'])
  },
  async created(){
    this.cargando = true;
    await this.verificarToken();
    this.cargando = false;
  }
});
</script>
