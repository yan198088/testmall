<template>
  <div class="tabControl">
    <div v-for="(item,index) in title" class="tabControl-item"
      :class="{active:index==currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit("tabClick",index)
    }
  },
  props:{
    title:{
      type:Array,
      default(){
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .tabControl{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tabControl-item{
    flex: 1;
  }

  .tabControl-item span {
    padding: 5px;
  }

  .active{
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
