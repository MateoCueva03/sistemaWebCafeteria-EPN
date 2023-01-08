<template>
  <v-container fluid class="fill-height" style="background-image: url('http://www.epn.edu.ec/wp-content/uploads/2016/02/IMG_2650-espacio-de-construcci%C3%B3n-epn-biblitoeca.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover; opacity: 0.7;">
     <v-row  justify="center">
      <v-col cols="12" sm="10" md="6">
        <v-card 
          elevation="5">
          <v-card-title class="d-flex justify-center">
            <h1 class="display-1">Iniciar Sesión</h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form
              @submit.prevent ="procesar"
              v-model="datosValidos">

              <v-text-field
                v-model="usuario.email"
                label="Ingrese su correo electrónico"
                :rules="rules.emailRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.password"
                label="Ingrese su contraseña"
                class="mb-2"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="rules.passwordRules"
                counter
                @click:append="show = !show"
              ></v-text-field>
              
              <v-card-actions>
            <router-link class="mx-2" to="/recuperar-password">
            ¿Olvidaste tu contraseña?
            </router-link>
         </v-card-actions>
              <v-btn 
                class="white--text" 
                large block rounded 
                type="submit"
                color="blue"
                :loading="cargando"
                :disabled="!datosValidos || cargando"
              >Ingresar</v-btn>
            </v-form>
          </v-card-text>
         
        </v-card>
      </v-col>
    </v-row>
    <ErrorSnackbar/>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapGetters} from 'vuex'
import ErrorSnackbar from '../../components/ErrorSnackbar.vue';

export default Vue.extend({
  name:'Login',
  components: { ErrorSnackbar },
  data: ()=>{
    return{
      usuario:{
        email:'',
        password:''
      },
      show:false,
      cargando: false,
      datosValidos: false,
      rules:{
        emailRules:[
          (v:string) => !!v || 'El email requerido',
          (v:string) => /.+@.+\..+/.test(v) || 'El email debe ser valido',
        ],
        passwordRules:[
          (v:string) => !!v || 'La contraseña es requerida',
          (v:string) => v.length >= 8 || 'Mínimo 8 caracteres'
        ]
      }
    }
  },
  methods:{
    ...mapActions('moduloUsuario',['iniciarSesion']),
    ...mapActions('moduloError',['restablecerError']),
    async procesar(){
      this.cargando = true;
      await this.iniciarSesion(this.usuario);
      this.cargando = false;
    }
  },
  computed:{
    ...mapGetters('moduloError',['error'])
  },
  created(){
    this.restablecerError();
  }
})
</script>