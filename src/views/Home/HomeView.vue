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
          src: 'https://scontent.fuio10-1.fna.fbcdn.net/v/t1.15752-9/332109910_1620040791776166_7532128236989991811_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFwM-XjfswwGzO4LMXWYJlpmiV9qITqhNSaJX2ohOqE1DH_xaOHibW4PfTOksZYk9wDGU-GOhTSPJi2E-olFdAP&_nc_ohc=B_n05BcXuGwAX_fUnxk&tn=RdwvPWYTySkSPDy0&_nc_ht=scontent.fuio10-1.fna&oh=03_AdTs7mRXqNN7Q4TLlrp_N668UHKVCcg7lgn2aIqgkpY4BA&oe=641C5369',

        },
        {
          src: 'https://www.epn.edu.ec/wp-content/uploads/2019/01/Captura-de-pantalla-2019-01-24-a-las-9.08.02-a.m..png',
        },
      ],
    }
  }
});
</script>
