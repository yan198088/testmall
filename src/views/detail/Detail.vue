<template>
  <div id="detail" name="Detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images = "topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar  @addCart="addToCart"/>

  </div>
</template>

<script>

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "@/network/detail";
import {debounce} from "@/common/utils";
import {mapActions} from "vuex" //注意这个是从vuex里面导入的，而不是从store里面的actions导入的

export default {
  name: "Detail",
  components:{
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      isShowBackTop:false
    }
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid)
      .then(res=>{
        // 1.获取顶部的图片轮播数据
        console.log(res);
        const data = res.data.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4、详细信息
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6、获取评论的信息
        if(data.rate.CRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

    //3、请求推荐数据
    getRecommend()
      .then(res => {
        // console.log(res)
        this.recommends = res.data.data.list;
    });
    //4、给getthemeTopY赋值(进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);
    }, 500);

  },
  methods: {
    //映射store下的actions里面的addCart方法到这个里面
    ...mapActions(['addCart']),
    //调用scroll里面的刷新函数
    detailImageLoad(){
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500);
    },
    contentScroll(position) {
      //position是Scroll组件传过来的位置，注意是负数
      // console.log(position);
      const positionY = -position.y ;
      for (let i= this.themeTopYs.length-1;i>=0;i--){
        //从后往前，如果大于等于这个数，那么直接赋值
        if(positionY >= this.themeTopYs[i]){
          this.currentIndex = i;
          // console.log(i);
          this.$refs.detailnav.currentIndex = i;
          break;
        }
      }

      //是否显示回到顶部
      this.isShowBackTop = positionY>=1000;
    },
    //点击回到顶部图片
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);
    },
    addToCart(){

      //1、获取购物车需要展示的信息加入购物车
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      product.realPrice = this.goods.realPrice;

      //这种方法采用的是映射的形式，而下面注释中的方法是正常的通过store来调用的
      this.addCart(product).then(res=>{
         // 这个是调用toast弹窗
        this.$toast.show(res,2000)
      })
      // this.$store.dispatch("addCart",product).then(res=>{
      //   console.log(res);
      // })

    }

  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,50);
    //因为 放在created里面可能监听不到refs所以放在了mounted里面
    //监听图片加载完成
    this.$bus.$on("detailItemImgLoad",()=>{
      //调用Scroll里面的这个方法
      // this.$refs.scroll.refresh();
      refresh();
    })
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /*display: flex;*/
    /*top: 44px;*/
    /*bottom: 58px;*/
    height: calc(100% - 44px - 49px);
  }
</style>
