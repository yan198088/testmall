<template>
  <div class="recommendView">
    <div v-for="item in recommends" class="recommendView-item">
      <a :href="item.link">
        <img :src="item.image" >
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .recommendView {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }

  .recommendView-item {
    flex: 1;
  }

  .recommendView-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
