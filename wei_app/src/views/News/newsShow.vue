<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h1 class="title">{{ newsinfolist.title }}</h1>
    <!-- 子标题 -->
    <p class="newsinfo-nav">
      <span>发表时间：{{ newsinfolist.add_time }}</span>
      <span>点击：{{newsinfolist.click}}次</span>
    </p>
    <hr />
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfolist.content"></div>
  </div>
</template>

<script>
import homeApi from "../../api/homeApi";
export default {
  data() {
    return {
      newsinfolist: {},
      id: this.$route.params.id
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    async getNewsInfo() {
      let res = await homeApi.getNewsShowData(this.id);
      if (res.status === 0) {
        this.newsinfolist = res.message[0];
      } else {
        this.$toast("加载失败");
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.newsinfo-container {
  padding: 0 5px;
  overflow: auto;
  position: absolute;
  left: 10px;
  right: 10px;
  top: 50px;
  height: 538px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
    color: orangered;
  }
  .newsinfo-nav {
    display: flex;
    justify-content: space-between;
    color: #26a2ff;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
.newsinfo-container::-webkit-scrollbar {
  display: none;
}
</style>