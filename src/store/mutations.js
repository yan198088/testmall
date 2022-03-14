import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutation-types";

export default {
  [ADD_COUNTER](state,payload){
    payload.count+=1
  },
  [ADD_TO_CART](state,payload){
    //默认在购物车是选中状态
    payload.checked=true;
    state.cartList.push(payload);
  }
}
