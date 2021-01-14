<template>
  <div id="app">
    <div class="nav">
      <van-nav-bar
        v-if="isShowBack"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        :title="$route.meta.title"
        :style="{color:'#fff'}"
        :fixed="true"
      />
      <van-nav-bar v-else :title="$route.meta.title" />
    </div>
    <tabbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import tabbar from "./components/tabbar";
export default {
  components: { tabbar },
  data() {
    return {
      isShowBack: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path"(newVal, oldVal) {
      if (
        newVal === "/home/hot" ||
        newVal === "/home/new" ||
        newVal === "/home/random" ||
        newVal === "/login" ||
        newVal === "/register" ||
        newVal === "/dictionary/detail"
      ) {
        this.isShowBack = true;
      } else {
        this.isShowBack = false;
      }
    }
  }
};
</script>
<style lang="scss">
#app {
  .container {
    width: vw(750);
    height: 100%;
    // background: #9a9a9a1a;
  }
  .nav {
    .van-nav-bar {
      background: rgb(255, 165, 0);
    }
    .van-nav-bar__text {
      color: white !important;
    }
    .van-nav-bar__title {
      color: white !important;
    }
    .van-icon-arrow-left::before {
      color: #fff !important;
    }
  }
}
</style>
