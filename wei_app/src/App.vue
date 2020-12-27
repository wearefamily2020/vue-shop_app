<template>
  <div id="app">
    <!-- 头部 -->
    <mt-header fixed :title="$route.meta.title"></mt-header>
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
  components: {
    tabbar
  },
  mounted() {}
};
</script>
<style lang="scss">
@import url("./assets/base2.css");
#app {
  .container {
    position: absolute;
    top: 40px;
    height: 100vh;
    .fade-enter {
      opacity: 0;
      transform: translateX(100%);
    }
    .fade-leave-to {
      opacity: 0;
      transform: translateX(-100%);
      position: absolute;
    }
    .fade-enter-active .fade-leave-active {
      transition: all 0.5s ease;
    }
  }
}
</style>
