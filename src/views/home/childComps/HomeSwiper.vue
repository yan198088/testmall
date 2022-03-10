<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
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
  },
  data(){
    return{
      isFlag:true
    }
  },
  methods:{
    imageLoad() {
      //加一层这个是为了防止发四次，只需要发一次就够了
      if(this.isFlag){
        //当轮播图加载好后发信号给父组件
        this.$emit("imageSwiperLoad")
        this.isFlag = false;
      }
    }
  }
}
</script>

<style scoped>

</style>
