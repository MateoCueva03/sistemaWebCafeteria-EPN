<template>
  <v-snackbar
    :v-model="true"
    absolute
    top
    right
    color="red accent-2"
    timeout="5000"
    :multi-line="true"
    :value="error.message">
      {{error.message}}
    </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default Vue.extend({
  name: 'ErrorSnackbar',
  data: ()=>{
    return{
      
    }
  },
  computed:{
    ...mapGetters('moduloError',['error'])
  }
})
</script>