<template>
  <div class="home">
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swiperImg" :key="item.id">
          <img :src="item.img" width="375" height="208" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="cell">
      <van-grid :column-num="3">
        <van-grid-item
          @click="toPage(item.id)"
          v-for="item in gird"
          :key="item.id"
          :icon="item.icon"
          :text="item.text"
        ></van-grid-item>
      </van-grid>
    </div>
    <div class="list">
      <h2>热门</h2>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
import jockApi from "../api/jockApi";
export default {
  data() {
    return {
      swiperImg: [
        { id: 0, img: require("../assets/image/swiper1.png") },
        { id: 1, img: require("../assets/image/swiper2.png") },
        { id: 2, img: require("../assets/image/swiper3.png") }
      ],
      gird: [
        {
          id: 0,
          text: "最热笑话",
          icon: require("../assets/image/time_icon.png"),
          path: "/home/hot"
        },
        {
          id: 1,
          text: "最新笑话",
          icon: require("../assets/image/new_icon.png"),
          path: "/home/new"
        },
        {
          id: 2,
          text: "随机获取笑话",
          icon: require("../assets/image/random_icon.png"),
          path: "/home/random"
        }
      ],
      list: [1, 2],
      loading: false,
      finished: false
    };
  },
  methods: {
    toPage(id) {
      switch (id) {
        case 0:
          this.$router.push({ name: "HotJoke" });
          break;
        case 1:
          this.$router.push({ name: "NewJoke" });
          break;
        case 2:
          this.$router.push({ name: "RandomJoke" });
          break;
      }
    },
    onLoad() {
      this.loading = false;
      if (this.list.length >= 2) this.finished = true;
    },
    async getData() {
      // let res = await jockApi.getJockData();
      // console.log(res);
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.home {
  .van-swipe {
    height: 208px;
    border: 2px solid orange;
    margin-top: 2px;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #fff;
  }
  .list {
    margin-top: 10px;
    padding: 0 20px;
    h2 {
      height: 40px;
      padding: 0 10px;
      font-size: 18px;
      color: orange;
      font-weight: 600;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
    }
  }
}
</style>
