<template>
  <v-card>
    <v-card-title>{{menu.titulo}}</v-card-title>
    <v-card-subtitle>
      {{formatearFecha(menu.fecha)}}
    </v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="item in menu.componentes"
          :key="item._componente.id"
        >
          <v-list-item-avatar>
            <v-img
              :alt="`${item._componente.nombre} avatar`"
              :src="item._componente.urlFoto"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{item._componente.nombre}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{item._componente.tipo}}
              <v-spacer></v-spacer>
              <span v-if="item.estado">Disponible</span>
              <span v-else>No Disponible</span>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
            $ {{item._componente.precio}}
          </v-list-item-icon>

          <v-list-item-action>
            <v-btn 
              icon 
              @click="actualizarEstado({_id:menu._id, _componente:item._componente._id})"
              :color="item.estado ? 'red':'green'">
              <v-icon>{{item.estado ? 'mdi-close':'mdi-check'}}</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import {mapActions} from 'vuex'

export default Vue.extend({
  name:'CardMenu',
  props:{
    menu: Object
  },
  data:()=>{
    return{

    }
  },
  methods:{
    ...mapActions('moduloMenu',['actualizarEstado']),
    formatearFecha(fecha:string){
      return moment(fecha).utc().format('DD/MM/YYYY');
    },
  }
})
</script>