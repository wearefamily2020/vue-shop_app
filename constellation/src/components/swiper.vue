<template>
  <mt-swipe :auto="3000">
    <!-- <mt-swipe-item v-for="item in imgList" :key="item.id">
      <img :src="item.img">
    </mt-swipe-item>-->
    <mt-swipe-item>
      <img src="../assets/1.jpg" />
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="../assets/3.jpg" />
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  props: ["imgList"]
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  background: #fff;
  color: #000;
  margin-top: 40px;
  .mint-swipe-items-wrap {
    .mint-swipe-item {
      text-align: center;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
