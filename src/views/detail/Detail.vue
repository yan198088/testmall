<template>
  <div id="detail" name="Detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images = "topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>

  </div>
</template>

<script>

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";

import Scroll from "@/components/common/scroll/Scroll";

import {getDetail,Goods,Shop,GoodsParam} from "@/network/detail";

export default {
  name: "Detail",
  components:{
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
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
      })
  },
  methods: {
    //调用scroll里面的刷新函数
    detailImageLoad(){
      this.$refs.scroll.refresh();
    }
  },
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
    height: calc(100% - 44px);
  }
</style>
