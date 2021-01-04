<template>
  <div class="mui-content">
    <form id="login-form" class="mui-input-group">
      <div class="mui-input-row">
        <label>账号</label>
        <input
          id="account"
          type="text"
          v-model="loginForm.username"
          class="mui-input-clear mui-input"
          placeholder="请输入账号"
        />
      </div>
      <div class="mui-input-row">
        <label>密码</label>
        <input
          id="password"
          type="password"
          v-model="loginForm.password"
          class="mui-input-clear mui-input"
          placeholder="请输入密码"
        />
      </div>
    </form>
    <div class="mui-content-padded">
      <button
        id="login"
        @click="login"
        type="button"
        class="mui-btn mui-btn-block mui-btn-primary"
      >登录</button>
      <div class="link-area">
        <span class="reg-color" @click="register">还没有账号？前往注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import loginApi from "../../api/loginApi";
import auth from "../../utils/auth";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      const { username, password } = this.loginForm;
      if (!username || !password) {
        this.$toast("账号或密码不能为空");
      } else {
        try {
          let res = await loginApi.login(this.loginForm);
          const { msg, data, code } = res;
          if (code === 1) {
            // 登录成功
            this.$toast(msg);
            this.$store.commit("user/setUser", data);
            // 路由跳转
            this.$router.replace("/user");
            // 将session_id存入本地localstorage中 放入请求头中 判断是否成功登录 返回信息
            auth.setAuthorization(data.session_id);
          } else {
            this.$toast(msg);
          }
        } catch (err) {
          this.$toast("登录失败");
          console.log(err);
        }
      }
    },
    register() {
      this.$router.push("/user/register");
    }
  }
};
</script>

<style scoped lang='scss'>
.mui-input-group {
  margin-top: 10px;
}
.mui-input-group:first-child {
  margin-top: 20px;
}
.mui-input-group label {
  width: 22%;
}
.mui-input-row label ~ input,
.mui-input-row label ~ select,
.mui-input-row label ~ textarea {
  width: 78%;
}
.mui-content-padded {
  margin-top: 25px;
}
.mui-btn {
  padding: 10px;
}
.link-area {
  display: block;
  margin-top: 25px;
  text-align: center;
}
.reg-color {
  color: #007aff;
}
</style>
