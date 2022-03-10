<template>
  <div id="app">
<!--    注意 这个exclude就是去除的意思，把Detail模快整个去除，但是注意了，这个后面的值应该和模板里面name的值保持一致-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar ></main-tab-bar>
  </div>
</template>

<script>

import MainTabBar from "@/components/content/mainTabBar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";

</style>
