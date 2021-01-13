<template>
  <div class="login">
    <van-form @submit="onSubmit" style="{margin-top:20px}">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        style="margin-top:20px"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import storage from "../utils/localoage";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      let userData = storage.getItem("user-demo");
      let isUsername = userData.some(item => {
        return item.username === this.username;
      });
      if (isUsername) {
        let res = userData.some((item, index) => {
          localStorage.setItem("user_index", index);
          return (
            item.username === this.username && item.password === this.password
          );
        });
        if (res) {
          this.$toast.success("登录成功");
          this.$router.replace({ name: "User" });
          this.$store.commit("user/setUser", { username: this.username });
        } else {
          this.$toast.fail("登录失败，用户名或密码错误");
        }
      } else {
        this.$toast.fail("用户名不存在，将跳往注册页面");
        this.$router.replace({ name: "Register" });
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.login {
  background: #9a9a9a1a;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
}
</style>