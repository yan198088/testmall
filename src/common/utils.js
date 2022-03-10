//对refresh进行一个防抖操作，就是减少请求次数

export function  debounce(func,delay){
  let timer = null;
  return function (...args){
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      func.apply(this,args);
    },delay)
  }
}
