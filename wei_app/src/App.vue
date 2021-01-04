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
import loginApi from "./api/loginApi";
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
    },
    async checkLogin() {
      // 获取用户是否已经登录
      this.$indicator.open({
        text: "加载中"
      });
      let res = await loginApi.checkLogin();
      const { data, msg, code } = res;
      if (code === 1) {
        this.$store.commit("user/setUser", data);
      }
      this.$indicator.close();
    }
  },
  created() {
    this.showBack = this.$route.path !== "/home";
    this.checkLogin();
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
#app {
  .container {
    width: vw(750);
    position: absolute;
    top: 40px;
    left: 0;

    height: 100%;
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
