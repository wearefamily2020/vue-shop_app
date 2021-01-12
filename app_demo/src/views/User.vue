<template>
  <div class="user">
    <div class="user-info">
      <img src="../assets/image/avatar5.jpg" width="80" height="80" />
      <p>
        <span @click="toLogin">登录</span> /
        <span @click="toRegister">注册</span>
      </p>
    </div>
    <van-list>
      <van-cell v-for="item in userlist" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlist: ["个人中心", "退出登录"]
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "Login" });
    },
    toRegister() {
      this.$router.push({ name: "Register" });
    }
  }
};
</script>

<style scoped lang='scss'>
.user {
  background: #9a9a9a1a;
  width: 100%;
  height: 100vh;
  position: fixed;
  .user-info {
    height: 140px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: #fff;
    border-bottom: 1px solid #eee;
    img {
      border-radius: 50%;
      border: 2px solid #eee;
    }
    p {
      margin-left: 20px;
      font-size: 18px;
      color: orange;
    }
  }
}
</style>