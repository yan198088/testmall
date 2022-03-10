<template>
<!--  注意。这个class和下面的class是必须有的，否则不出效果，这个在第三方官方网站上有-->
<!--  ref是标记的，会返回找到这个对象，-->
<!--  ref如果是绑定在组件中的, 那么通过**this.$refs.refname**获取到的是一个组件对象.-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data(){
    return{
      scroll:null,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  //需要使用mounter而不是created
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //当里面有点击事件时
      click: true,
      // probe 侦测
      // 0,1都是不侦测实时的位置
      // 2: 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测.
      // 3: 只要是滚动, 都侦测.
      probeType: this.probeType,
      //上拉事件  true或者false
      pullUpLoad: this.pullUpLoad
    })
    // 2.监听滚动的位置
    if(this.probeType==2 || this.probeType==3){
      this.scroll.on('scroll', (position) => {
        //把滚动的位置发射出去
        this.$emit('scroll', position)
      })
    }
    // 3.监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }

  },
  methods: {
    //传进来位置和延迟毫秒数
    scrollTo(x, y, time=300) {
      //因为 可能Home.vue调用这个方法的时候  scroll还没有被加载出来，所以要先判断一下
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      //当每完成一次上拉加载之后，都要使用这个方法来处理一下，使得下次可以再次上拉加载
      this.scroll && this.scroll.finishPullUp()
    },
    //图片加载完成调用这个方法，刷新总体的高度，防止上拉卡顿
    refresh(){
      this.scroll && this.scroll.refresh();
    },
    getSaveY(){
      return this.scroll ? this.scroll.y:0;
    },
  }

}
</script>

<style scoped>

</style>
<!--
// 默认情况下BScroll是不可以实时的监听滚动位置
  // probe 侦测
  // 0,1都是不侦测实时的位置
  // 2: 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测.
  // 3: 只要是滚动, 都侦测.
  const bscroll = new BScroll(document.querySelector('.content'), {
    probeType: 3,
    click: true,
    pullUpLoad: true
  })

  bscroll.on('scroll', (position) => {
    // console.log(position);
  })

  bscroll.on('pullingUp', () => {
    console.log('上拉加载更多');
    // 发送网络请求, 请求更多页的数据

    // 等数据请求完成, 并且将新的数据展示出来后
    setTimeout(() => {
      bscroll.finishPullUp()
    }, 2000)
  })

-->
