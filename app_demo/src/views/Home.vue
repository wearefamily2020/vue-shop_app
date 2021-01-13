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
      <van-list
        v-if="list.length!==0"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="list-item" v-for="(item,index) in list" :key="index">
          <p>{{index+1}}. {{item.content}}</p>
          <span>{{item.updatetime}}</span>
        </div>
      </van-list>
      <div v-else style="margin-top:20px">暂无数据</div>
    </div>
    <totop />
  </div>
</template>

<script>
import jockApi from "../api/jockApi";
import { mapState } from "vuex";
import totop from "../components/gotop";
export default {
  components: { totop },
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
      list: [],
      loading: false,
      finished: false,
      isTop: false
    };
  },
  computed: {
    ...mapState("user", ["username"])
  },
  methods: {
    toPage(id) {
      if (this.$store.state.user.username) {
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
      } else {
        this.$toast("请先登录");
      }
    },
    onLoad() {
      this.loading = false;
      if (this.list.length >= 10) this.finished = true;
    },
    async getData() {
      let res = await jockApi.getTimeJockData();
      this.list = res.result.data;
      // console.log(this.list);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.home {
  height: 570px;
  // padding-bottom: 30px;
  // overflow: auto;
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
    .list-item {
      padding: 10px;
      background: #fff;
      span {
        display: block;
        text-align: right;
        margin-top: 10px;
      }
    }
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
  .go-top {
    position: fixed;
    right: 10px;
    bottom: 64px;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: orange;
    border-radius: 50%;
    color: white;
    font-size: 14px;
  }
}
</style>
