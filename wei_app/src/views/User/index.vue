<template>
  <div class="user">
    <div class="user-info" v-if="noShowLogin">
      <div class="avatar">
        <!-- 头像 -->
        <div class="avatar-con">
          <img src="../../assets/img/avatar1.jpg" />
        </div>
        <!-- 登录 / 注册 -->
        <div class="person-con">
          <div v-if="!isLogin">
            <span @click="toLogin">登录</span> /
            <span @click="toRegister">注册</span>
          </div>
          <span v-else>{{username}}</span>
        </div>
      </div>
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell mui-media">
          <router-link :to="{ name: 'order_list' }" class="mui-navigate-right">
            <!-- <img class="mui-media-object mui-pull-left" src="../../assets/img/avatar1.jpg" /> -->
            <div class="mui-media-body">我的订单</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media">
          <div class="mui-navigate-right" @click="goAddress">
            <!-- <img class="mui-media-object mui-pull-left" /> -->
            <div class="mui-media-body">收货地址</div>
          </div>
        </li>
        <li class="mui-table-view-cell mui-media">
          <div @click="logout" class="mui-navigate-right">
            <!-- <img class="mui-media-object mui-pull-left" src="../assets/images/avatar1.jpg" /> -->
            <div class="mui-media-body">退出登录</div>
          </div>
        </li>
      </ul>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import loginApi from "../../api/loginApi";
export default {
  data() {
    return {
      noShowLogin: true
    };
  },
  computed: {
    // 获取state: this.$store.state.user.username  getters:this.$store.getters["user/isLogin"]
    // 辅助函数
    ...mapState({ username: state => state.user.username }),
    ...mapGetters("user", ["isLogin"])
  },
  updated() {
    // console.log("state", this.$store.state.user.username); // 'state',this.username
    // console.log("getters", this.$store.getters["user/isLogin"]);
  },
  methods: {
    // 跳转收获地址
    goAddress() {
      this.$router.push({ path: "/user/address" });
    },
    // 跳转登录
    toLogin() {
      this.$router.push({ path: "/user/login" });
      this.noShowLogin = false;
    },
    // 跳转注册
    toRegister() {
      this.$router.push({ path: "/user/register" });
      this.noShowLogin = false;
    },
    // 退出
    async logout() {
      let res = await loginApi.logout();
      if (!this.$store.state.user.username) {
        this.$toast(res.msg);
      } else {
        this.$toast("退出成功");
        this.$store.commit("user/logout");
      }
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.noShowLogin = newVal.path === "/user";
    }
  }
};
</script>


<style lang="scss" scoped>
.user {
  .user-info {
    padding: 10px;
    background: #fff;
    .avatar {
      position: relative;
      height: 120px;
      background: linear-gradient(90deg, #28a2ff, #ffd787);
      box-shadow: 0 0.1rem 0.25rem #f8e3c6;
      overflow: hidden;
      .avatar-con {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid hsla(0, 0%, 100%, 0.4);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .person-con {
        position: absolute;
        left: 90px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
      }
    }
    .mui-table-view .mui-media,
    .mui-table-view .mui-media-body {
      line-height: 42px;
    }
    .mui-table-view-cell:after {
      left: 0px;
    }
  }
}
</style>