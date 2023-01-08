<template>
  <div>
    <v-card 
      elevation="3">
      <v-card-title class="d-flex justify-center">
        <span class="display-1">Agregar Colaborador</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent ="procesar"
          v-model="datosValidos">

          <v-text-field
            label="Nombre"
            v-model="usuario.nombre"
            :rules="rules.nombre"
            required
          ></v-text-field>

          <v-text-field
            label="Apellido"
            v-model="usuario.apellido"
            :rules="rules.apellido"
            required
          ></v-text-field>

          <v-text-field
            label="Teléfono"
            v-model="usuario.telefono"
            :rules="rules.telefono"
            counter="10"
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
            :items="['cocinero','administrador']"
            label="Rol"
          ></v-select>
          
          <v-text-field
            v-model="usuario.email"
            label="Email"
            :rules="rules.email"
            required
          ></v-text-field>

          <v-row class="mt-2">
            <v-spacer/>
            <v-btn 
              class="me-5"
              text 
              color="red darken-1"
              @click="cancelar">
              Cancelar</v-btn>
            <v-btn 
              text 
              type="submit"
              color="blue darken-1"
              :loading = "cargando"
              :disabled="!datosValidos || cargando"
            >Agregar</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapGetters} from 'vuex';

export default Vue.extend({
  name:'FormColaborador',
  data:()=>{
    return{
      usuario:{
        nombre:'',
        apellido:'',
        telefono:'',
        email:'',
        rol:'cocinero',
        foto: null,
      },
      cargando: false,
      datosValidos: false,
      rules:{
        nombre: [(v:string) => !!v || 'El nombre es requerido'],
        apellido: [(v:string) => !!v || 'El apellido es requerido'],
        telefono: [(v:string) => !!v || 'El teléfono es requerido'],
        email:[
          (v:string) => !!v || 'El email requerido',
          (v:string) => /.+@.+\..+/.test(v) || 'El email debe ser valido',
        ],
      }
    }
  },

  methods:{
    ...mapActions('moduloColaborador',['cambiarEstadoMostrarFormulario','crearColaborador']),
    cancelar(){
      (this.$refs['form'] as any).reset();
      this.cambiarEstadoMostrarFormulario(false);
    },
    async procesar(){
      this.cargando = true;
      await this.crearColaborador(this.usuario);
      this.cargando = false;
      if(!this.error.message){
        (this.$refs['form'] as any).reset();
        this.cambiarEstadoMostrarFormulario(false);
      }
    },
    obtenerArchivo(archivo:File | null){
      this.usuario.foto = archivo as any;
    },
  },
  computed:{
    ...mapGetters('moduloError',['error'])
  }
})
</script>