<template>
  <mt-swipe :continuous="false">
    <mt-swipe-item v-for="(item) in imgList" :key="item.id">
      <img :src="item.img" />
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  props: {
    imgList: { type: Array, default: () => [] }
  },
  created() {
    // console.log(this.$props.imgList, this.imgList);
  }
};
</script>

<style scoped lang='scss'>
.mint-swipe {
  height: 200px;
  color: white;
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