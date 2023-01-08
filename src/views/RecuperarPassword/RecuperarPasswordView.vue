<template>
  <v-container fluid class="fill-height" style="background-image: url('http://www.epn.edu.ec/wp-content/uploads/2016/02/IMG_2650-espacio-de-construcci%C3%B3n-epn-biblitoeca.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover; opacity: 0.7;">
    <v-row justify="center">
      <v-col cols="10" md="5">
        <v-card elevation="5">
          <v-card-title>
            Recuperar contraseña
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form 
              @submit.prevent ="procesar"
              v-model="datosValidos">
              <v-text-field
                label="Ingresa tu correo electrónico"
                :disabled="codigoEnviado"
                v-model="datos.email"
                :rules="rules.emailRules"
              ></v-text-field>
              
              <v-row 
                v-if="codigoEnviado" 
                justify="center">
                <v-col cols="8">
                  <v-otp-input
                    v-model="datos.codigo"
                    length="6"
                    :rules="rules.codigoRules"
                    type="number"
                  ></v-otp-input>
                </v-col>
              </v-row>

              <v-text-field
                v-model="datos.password"
                v-if="codigoEnviado"
                label="Password"
                class="mb-2"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="rules.passwordRules"
                counter
                @click:append="show = !show"
              ></v-text-field>

              <v-btn
                class="white--text mt-5" 
                large block rounded 
                type="submit"
                color="blue"
                :loading="cargando"
                :disabled="!datosValidos || cargando">
                Enviar
              </v-btn>
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
import ErrorScnackbar from '../../components/ErrorSnackbar.vue'
import {mapActions, mapGetters} from 'vuex'
import router from '../../router'

export default Vue.extend({
  components:{ErrorScnackbar},
  data:()=>{
    return{
      datos:{
        email:'',
        codigo:'',
        password: ''
      },
      show:false,
      codigoEnviado:false,
      datosValidos:false,
      cargando: false,
      rules:{
        emailRules:[
          (v:string) => !!v || 'El email requerido',
          (v:string) => /.+@.+\..+/.test(v) || 'El email debe ser válido',
        ],
        passwordRules:[
          (v:string) => !!v || 'La contraseña es requerida',
          (v:string) => v.length >= 8 || 'Mínimo 8 caracteres'
        ],
        codigoRules:[
          (v:string) => v.length == 6 || 'Debe ingresar 6 dígitos'
        ]
      }
    }
  },
  methods:{
    ...mapActions('moduloRecovery',['enviarCodigo','enviarPassword']),
    async procesar(){
      this.cargando = true;
      if(!this.codigoEnviado){
        await this.enviarCodigo(this.datos.email)
        if(!this.error.message){
          this.codigoEnviado = true;
        }
      }
      else{
        await this.enviarPassword(this.datos);
        if(!this.error.message){
          router.push('/login')
        }
      }
      this.cargando = false;
    }
  },
  computed:{
    ...mapGetters('moduloError',['error'])
  }
})
</script>