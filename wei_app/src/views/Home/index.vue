<template>
  <div class="home">
    <Swiper :imgList="imgList" />
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li
          class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
          v-for="item in girdImg"
          :key="item.id"
          @click="newsList(item.id)"
        >
          <img :src="item.src" />
          <div class="mui-media-body" :style="{marginTop:'12px'}">{{item.title}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper from "../../components/swiper/index";
import homeApi from "@/api/homeApi.js";
export default {
  components: { Swiper },
  data() {
    return {
      imgList: [],
      girdImg: [
        {
          id: 1,
          src: require("../../assets/img/news_icon.png"),
          title: "新闻资讯"
        },
        {
          id: 2,
          src: require("../../assets/img/share_icon.png"),
          title: "图片分享"
        },
        {
          id: 3,
          src: require("../../assets/img/goods_icon.png"),
          title: "商品购买"
        },
        {
          id: 4,
          src: require("../../assets/img/msg_icon.png"),
          title: "留言反馈"
        },
        {
          id: 5,
          src: require("../../assets/img/video_icon.png"),
          title: "视频专区"
        },
        {
          id: 6,
          src: require("../../assets/img/contract_icon.png"),
          title: "联系我们"
        }
      ]
    };
  },
  methods: {
    newsList(id) {
      if (id === 1) {
        this.$router.push("/news/list");
      } else if (id === 2) {
        this.$router.push("/photo/list");
      }
    },
    async getSwiperImg() {
      this.$indicator.open({ text: "加载中" });
      let res = await homeApi.getSwiper();
      this.$indicator.close();
      if (res.code === 1) {
        this.imgList = res.data;
      } else {
        this.$toast("轮播图加载失败");
      }
    }
  },
  created() {
    this.getSwiperImg();
  }
};
</script>

<style scoped lang='scss'>
.home {
  width: 100%;
}
</style>