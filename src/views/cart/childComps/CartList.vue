<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item,index) in cartList"
        :item-info="item"
        :key="index"
      />
    </scroll>
  </div>
</template>

<script>
import CartListItem from "@/views/cart/childComps/CartListItem";
// import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import {mapGetters} from "vuex";

export default {
  name: "CartList",
  components:{
    CartListItem,
    // CartBottomBar,
    Scroll,
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  //路由活跃的时候
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
  /*position: relative;*/
}

.content {
  height: calc(100vh - 44px - 49px - 40px);
  overflow-y: hidden;
}
</style>
