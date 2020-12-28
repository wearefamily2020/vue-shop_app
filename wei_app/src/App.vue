<template>
  <div id="app">
    <!-- 头部 -->
    <mt-header fixed :title="$route.meta.title">
      <span slot="left">
        <mt-button icon="back" @click="goBack" v-show="showBack">返回</mt-button>
      </span>
    </mt-header>
    <!-- 底部导航 -->
    <tabbar></tabbar>
    <!-- 内容 -->
    <div class="container">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import tabbar from "./components/tabbar";
export default {
  data() {
    return {
      showBack: true
    };
  },
  components: {
    tabbar
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.showBack = this.$route.path !== "/home";
  },
  watch: {
    // 监听路由
    $route(newVal, oldVal) {
      this.showBack = this.$route.path !== "/home";
    }
  }
};
</script>
<style lang="scss">
// @import url("./style/base2.css");
@media screen and (min-width: 320px) {
  html {
    font-size: 21.33px;
  }
}
@media screen and (min-width: 750px) {
  html {
    font-size: 50px;
  }
}
#app {
  width: w(375);
  .container {
    position: absolute;
    top: 40px;
    // height: 100vh;
  }
  // .fade-enter {
  //   opacity: 0;
  //   transform: translateX(100%);
  // }
  // .fade-leave-to {
  //   opacity: 0;
  //   transform: translateX(-100%);
  //   position: absolute;
  // }
  // .fade-enter-active .fade-leave-active {
  //   transition: all 2s ease;
  // }
}
</style>
