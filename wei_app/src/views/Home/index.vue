<template>
  <div class="home">
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.home {
  background: pink;
  width: 100%;
}
.mint-swipe {
  height: 200px;
  color: black;
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