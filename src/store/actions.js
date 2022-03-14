import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutation-types";


export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      let i  = 0;
      for(i = 0;i<context.state.cartList.length;i++){
        if(context.state.cartList[i].iid === payload.iid){
          //这个地方有一个致命错误，就是不能直接把payload传过去，否则修改的值不是数组里面的，
          context.commit(ADD_COUNTER,context.state.cartList[i]);
          resolve('当前的商品数量加一');
          break;
        }
      }
      //如果查找了一圈还没找到就直接添加进去
      if(i >= context.state.cartList.length){
        payload.count=1;
        context.commit(ADD_TO_CART,payload);
        resolve('添加了一件新商品');
      }
    })
  }
}
