<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//下面这个没有写index.js的原因是因为vue会自动去这个文件夹里找index的文件，
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default(){
        return [];
      }
    }
  }
}
</script>

<style scoped>

</style>
