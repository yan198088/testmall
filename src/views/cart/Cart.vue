<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center" >购物车({{ cartLength }})</div>
    </nav-bar>
<!--    商品栏汇总-->
    <cart-list />
<!--    底部信息-->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import {mapGetters} from "vuex"

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed:{
      //第一种写法
      // cartLength(){
      //   return this.$store.getters.cartLength;
      // },
      //第二种写法,这样的写法可以直接取出里面的方法，数组里面可以写getters的多个方法名，
       ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
.cart {
  /*height: 100vh;*/
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
