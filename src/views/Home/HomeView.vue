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
          src: 'https://scontent.fuio10-1.fna.fbcdn.net/v/t1.15752-9/332517639_600440745283131_7166996402478704597_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGnWlmB-2sSj7Put-E27LvqY6lzJbH5ardjqXMlsflqtzc10Qbk1spo2pjvle7H_w8SqEP_0sjMuTvdRPtFKTuI&_nc_ohc=J9VjWeZDuC0AX9MvC-J&_nc_ht=scontent.fuio10-1.fna&oh=03_AdRIDPoUkam-P_jbe18QSSeox4lML591nuynrgwkRQq7gw&oe=641C686B',

        },
        {
          src: 'https://www.epn.edu.ec/wp-content/uploads/2019/01/Captura-de-pantalla-2019-01-24-a-las-9.08.02-a.m..png',
        },
      ],
    }
  }
});
</script>
