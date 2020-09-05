<template>
  <div class="top-swipe" v-divHeight>
    <mt-swipe :auto="4000" >
      <mt-swipe-item><img :src="img1" ></mt-swipe-item>
      <mt-swipe-item><img :src="img2" ></mt-swipe-item>
      <mt-swipe-item><img :src="img3" ></mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from "mint-ui";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  data() {
    return {
      img1:'/images/topImg/banner.jpg',
      img2:'/images/topImg/banner.jpg',
      img3:'/images/topImg/banner.jpg'
    }
  },
  directives:{
    divHeight:{
      bind(el){
        let windowWidth = document.body.offsetWidth//窗口宽度
        let imgWH = 760 / 250                      //图片的宽高比
        el.style.height = windowWidth / imgWH + 'px'
      } 
    },
  }
};
</script>
<style lang="css" scoped>

</style>