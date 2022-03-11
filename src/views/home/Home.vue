<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 class="tabControl"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @imageSwiperLoad="imageSwiperLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :title="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"/>
      <!--因为这个太长了，所以直接使用计算属性-->
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodsList";
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {debounce} from "@/common/utils";

import {getHomeMultidata,getHomeGoods} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
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
      currentType:'pop',
      isShowBackTop: false,
      imageOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  //活跃的状态调用
  activated() {
    //拿出存的位置，直接到那个位置
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh();
  },
  //离开的状态调用
  deactivated() {
    this.saveY = this.$refs.scroll.getSaveY()
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,50);
    //因为 放在created里面可能监听不到refs所以放在了mounted里面
    //监听图片加载完成
    this.$bus.$on("homeItemImgLoad",()=>{
      //调用Scroll里面的这个方法
      // this.$refs.scroll.refresh();
      refresh();
    })
  },

  methods:{
    //点击事件的代码
    imageSwiperLoad(){
      //获取这个里面的offsetTop，因为refs不能在created里面调用，而且调用子组件的方法时，要使用$el  再调用
      this.imageOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    //滚动的位置
    contentScroll(position) {
      //显示backTop
      this.isShowBackTop = (-position.y) > 1000;
      //显示homeSwiper
      this.isTabFixed = (-position.y)>this.imageOffsetTop;
    },
    //上拉加载
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    // 网络请求的代码
    getHomeMultidata(){
      getHomeMultidata()
        .then(res=>{
          // console.log(res)
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

          this.$refs.scroll.finishPullUp();
        })
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
}
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /*因为使用了BScroll框架，直接指定了要滚动的面积，所以就不需要这个样式了*/
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tabControl{
    position: relative;
    z-index: 9;
  }

  /*.content {*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/
</style>
