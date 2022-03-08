<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :title="['销量','排行','价格']"
                 class="tab-control"
                  @tabClick="tabClick"
    ></tab-control>
<!--    因为这个太长了，所以直接使用计算属性-->
    <good-list :goods="showGoods"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodsList";

import {getHomeMultidata,getHomeGoods} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType:'pop'
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell')
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
  methods:{
    //点击事件的代码
    tabClick(index){
      //这个为啥不直接使用下标呢，因为使用下标的话，他是一个字符串形式，
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    // 网络请求的代码
    getHomeMultidata(){
      getHomeMultidata()
        .then(res=>{
          console.log(res)
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1;
      getHomeGoods(type,page)
        .then(res=>{
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page+=1;
        })
    }


  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;

  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 43px;
    z-index: 9;
  }

</style>
