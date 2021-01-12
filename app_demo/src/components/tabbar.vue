<template>
  <div>
    <van-tabbar v-model="active" active-color="#ff8c00">
      <van-tabbar-item replace to="/home" icon="home-o">笑话大全</van-tabbar-item>
      <van-tabbar-item replace to="/dictionary" icon="notes-o">成语词典</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  watch: {
    "$route.path"(newVal, oldVal) {
      if (
        newVal === "/home/hot" ||
        newVal === "/home/new" ||
        newVal === "/home/random"
      ) {
        this.active = 0;
      } else if (newVal === "/dictionary") this.active = 1;
      else if (newVal === "/user") this.active = 2;
    }
  }
};
</script>


