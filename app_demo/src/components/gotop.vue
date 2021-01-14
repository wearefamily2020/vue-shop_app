<template>
  <div>
    <div class="go-top" v-show="isTop" @click="goTop">顶部</div>
  </div>
</template>

<script>
export default {
  data() {
    return { isTop: false };
  },
  methods: {
    goTop() {
      scrollTo(0, 0);
    }
  },
  mounted() {
    // this.getData();
    window.onscroll = () => {
      // scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= 200) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
    };
  },
  destroyed() {
    window.onscroll = null;
  }
};
</script>

<style scoped lang='scss'>
.go-top {
  position: fixed;
  right: 10px;
  bottom: 64px;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: orange;
  border-radius: 50%;
  color: white;
  font-size: 14px;
}
</style>