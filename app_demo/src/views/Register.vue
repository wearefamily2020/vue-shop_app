<template>
  <div class="register">
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
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        style="margin-top:20px"
      />
      <van-field
        v-model="tel"
        name="tel"
        label="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' },{pattern, message: '请输入正确手机号'}]"
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
      password: "",
      tel: "",
      pattern: /^[1][3,4,5,7,8][0-9]{9}$/
    };
  },
  methods: {
    onSubmit(values) {
      const userdata = storage.getItem("user-demo");
      let res = userdata.some((item, index) => {
        return this.username === item.username;
      });
      if (res) {
        this.$toast.fail("注册失败，用户名已存在");
      } else {
        storage.setItem("user-demo", values);
        this.$toast.success("注册成功，即将跳转登录页");
        this.$router.replace({ name: "Login" });
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.register {
  background: #9a9a9a1a;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top:45px;
}
</style>