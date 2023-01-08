<template>
  <div>
    <v-card
      class="mx-auto mt-5"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="280px"
        :src="`http://www.epn.edu.ec/wp-content/uploads/2010/08/DSC00208.jpg`"
      >
        <v-card-title>Bienvenido {{usuario.nombre}} {{usuario.apellido}}</v-card-title>
      </v-img>

      <v-card-text class="text--primary">
        <div>{{usuario.email}}</div>

        <div>
          {{usuario.telefono}} 
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn 
          color="success" 
          @click="dialog2 = true">
          Cambiar contraseña</v-btn>
        <v-spacer></v-spacer>
        <v-btn 
          color="success"
          @click="mostrarDialog1()"
          >Actualizar Datos</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="dialog1"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          Actualizar Datos
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="procesar"
            v-model="datosValidos">
            
            <v-text-field
              v-model="datos.telefono"
              label="Teléfono"
              :rules="rules.telefono"
            ></v-text-field>

            <v-file-input
              label="Foto de perfil"
              show-size
              truncate-length="15"
              prepend-icon="mdi-camera"
              @change="obtenerArchivo"
              accept="image/*"
            ></v-file-input>

            <v-btn 
              :disabled="!datosValidos || cargando" 
              block
              :loading="cargando"
              type="submit"
              color="success">
              Actualizar
            </v-btn>
          </v-form>

        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog2"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          Actualizar Datos
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="procesar"
            v-model="datosValidos">
            
            <v-text-field
              v-model="password"
              label="Password"
              class="mb-2"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="rules.password"
              counter
              @click:append="show = !show"
            ></v-text-field>

            <v-btn 
              :disabled="!datosValidos || cargando" 
              block
              :loading="cargando"
              type="submit"
              color="success">
              Actualizar
            </v-btn>
          </v-form>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'

export default Vue.extend({
  name: 'Dashboard',
  data: ()=>{
    return {
      dialog1:false,
      dialog2: false,
      show: false,
      datosValidos: false,
      cargando: false,
      datos:{
        telefono: null,
        fotoBase64: null
      },
      password: '',
      rules:{
        telefono:[
          (v:string) => !!v || 'El teléfono es requerido',
          (v:string) => v.length == 10 || 'Deben ser 10 dígitos'
        ],
        password:[
          (v:string) => !!v || 'La contraseña es requerida',
          (v:string) => v.length >= 8 || 'Mínimo 8 caracteres'
        ],
      }
    }
  },
  methods:{
    ...mapActions('moduloUsuario',['actualizar','verificarToken']),
    mostrarDialog1(){
      this.datos.telefono = this.usuario.telefono;
      this.dialog1 = true;
    },
    obtenerArchivo(archivo:File | null){
      this.datos.fotoBase64 = archivo as any;
    },
    async procesar(){
      this.cargando = true;
      if(this.dialog1){
        await this.actualizar(this.datos);
      }else{
        await this.actualizar({password:this.password});
      }
      this.datos.fotoBase64 = null;
      this.password = '';
      await this.verificarToken();
      this.cargando = false;
      this.dialog1 = false;
      this.dialog2 = false;
    }
  },
  computed:{
    ...mapGetters('moduloUsuario',['usuario'])
  }
})
</script>