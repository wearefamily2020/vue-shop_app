<template>
  <div class="mui-content">
    <form class="mui-input-group">
      <div class="mui-input-row">
        <label>账号</label>
        <input
          id="account"
          type="text"
          v-model="regForm.username"
          class="mui-input-clear mui-input"
          placeholder="请输入账号"
        />
      </div>
      <div class="mui-input-row">
        <label>密码</label>
        <input
          id="password"
          type="password"
          v-model="regForm.password"
          class="mui-input-clear mui-input"
          placeholder="请输入密码"
        />
      </div>
      <div class="mui-input-row">
        <label>确认</label>
        <input
          id="password_confirm"
          type="password"
          class="mui-input-clear mui-input"
          placeholder="请确认密码"
          ref="pwdConfirm"
        />
      </div>
      <div class="mui-input-row">
        <label>邮箱</label>
        <input
          id="email"
          v-model="regForm.email"
          type="email"
          class="mui-input-clear mui-input"
          placeholder="请输入邮箱"
        />
      </div>
    </form>
    <div class="mui-content-padded">
      <button id="reg" @click="register" class="mui-btn mui-btn-block mui-btn-primary">注册</button>
    </div>
  </div>
</template>

<script>
import registerApi from "../../api/register";
export default {
  data() {
    return {
      regForm: {
        username: "",
        password: "",
        email: ""
      }
    };
  },
  methods: {
    async register() {
      let pwdConfirm = this.$refs.pwdConfirm.value;
      const { username, password, email } = this.regForm;
      if (!username) {
        this.$toast("账号不能为空");
        return;
      } else if (!password || password.length < 6) {
        this.$toast("密码不能为空且长度不能小于6位");
        return;
      } else if (password !== pwdConfirm) {
        this.$toast("密码两次输入不一致");
        return;
      } else if (!email) {
        this.$toast("邮箱不能为空");
        return;
      } else if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email)
      ) {
        this.$toast("邮箱格式不正确");
        return;
      }

      // 发送请求
      try {
        let res = await registerApi.isRegister(this.regForm);
        if (res.code === 1) {
          this.$toast(res.msg);
          this.$router.replace("/user/login");
        } else {
          this.$toast(res.msg);
        }
      } catch (err) {
        console.log(err);
        this.$toast("注册失败");
      }
    }
  }
};
</script>

<style scoped lang='scss'>
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
.mui-checkbox input[type="checkbox"],
.mui-radio input[type="radio"] {
  top: 6px;
}
.mui-content-padded {
  margin-top: 25px;
}
.mui-btn {
  padding: 10px;
}
</style>
