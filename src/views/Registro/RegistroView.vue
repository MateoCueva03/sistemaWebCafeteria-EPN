<template>
  <v-container fluid class="fill-height" style="background-image: url('http://www.epn.edu.ec/wp-content/uploads/2016/02/IMG_2650-espacio-de-construcci%C3%B3n-epn-biblitoeca.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover; opacity: 0.7;">
     <v-row  justify="center">
      <v-col cols="12" sm="10" md="6">
        <v-card 
          elevation="5">
          <v-card-title class="d-flex justify-center">
            <h1 class="display-1">Registro</h1>
          </v-card-title>
          <v-card-text>
            <v-form
              @submit.prevent ="procesar"
              v-model="datosValidos">

              <v-text-field
                label="Nombre"
                v-model="usuario.nombre"
                :rules="[v => !!v || 'El nombre es requerido']"
                required
              ></v-text-field>

              <v-text-field
                label="Apellido"
                v-model="usuario.apellido"
                :rules="[v => !!v || 'El apellido es requerido']"
                required
              ></v-text-field>

              <v-text-field
                label="Teléfono"
                v-model="usuario.telefono"
                :rules="rules.telefonoRules"
                required
              ></v-text-field>

              <v-file-input
                  label="Foto de perfil"
                  show-size
                  truncate-length="15"
                  prepend-icon="mdi-camera"
                  @change="obtenerArchivo"
                  accept="image/*"
                ></v-file-input>

              <v-select
                v-model="usuario.rol"
                :items="['cliente','administrador']"
                label="Rol"
              ></v-select>
              
              <v-text-field
                v-model="usuario.email"
                label="Correo electrónico"
                :rules="rules.emailRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.password"
                label="Contraseña"
                class="mb-2"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="rules.passwordRules"
                counter
                @click:append="show = !show"
              ></v-text-field>

              <v-btn 
                class="white--text" 
                large block rounded 
                type="submit"
                color="blue"
                :loading="cargando"
                :disabled="!datosValidos || cargando"
              >Registrarse</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <ErrorScnackbar/>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapGetters} from 'vuex'
import ErrorScnackbar from '../../components/ErrorSnackbar.vue';

export default Vue.extend({
  components: { ErrorScnackbar },
  name:'Registro',
  data: ()=>{
    return{
      usuario:{
        nombre:'',
        apellido:'',
        telefono:'',
        email:'',
        password:'',
        rol:'cliente',
        foto: null,
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
        ],
        telefonoRules:[
          (v:string) => !!v || 'El teléfono es requerido',
          (v:string) => v.length == 10 || 'Deben ser 10 dígitos'
        ]
      }
    }
  },
  methods:{
    ...mapActions('moduloUsuario',['registrar']),
    ...mapActions('moduloError',['restablecerError']),
    async procesar(){
      this.cargando = true;
      await this.registrar(this.usuario);
      this.cargando = false;
    },
    obtenerArchivo(archivo:File | null){
      this.usuario.foto = archivo as any;
    },
  },
  computed:{
    ...mapGetters('moduloError',['error'])
  },
  created(){
    this.restablecerError();
  }
})
</script>