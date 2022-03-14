export default {
  //返回购物车一共有多少东西
  cartLength(state) {
    return state.cartList.length;
  },
  //返回购物车
  cartList(state) {
    return state.cartList;
  }
}
