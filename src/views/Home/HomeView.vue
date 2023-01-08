<template>
  <div>
    <v-carousel cycle height="540">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
   <div style="margin-top: 20px;">
    <p style="text-align: center;">Copyright © Comedor EPN Todos los derechos reservados</p>
    <p style="text-align: center;"> Version 1.0</p>
   </div>


  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {
    

  },
  data:()=>{
    return {
      items: [
        {
          src: 'https://www.epn.edu.ec/wp-content/uploads/2022/10/Banner-arriendo.jpg',

        },
        {
          src: 'https://www.epn.edu.ec/wp-content/uploads/2019/09/banner-ARRIENDO-comedor-cafeteria-620x279.jpg',
        },
        {
          src: 'http://www.epn.edu.ec/wp-content/uploads/COLLAGE_CAFETERIA.jpg',

        },
        {
          src: 'https://www.epn.edu.ec/wp-content/uploads/2019/01/Captura-de-pantalla-2019-01-24-a-las-9.08.02-a.m..png',
        },
      ],
    }
  }
});
</script>
