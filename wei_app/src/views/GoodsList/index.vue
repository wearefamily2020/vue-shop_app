<template>
  <div class="goods-list" ref="goodswrapper">
    <div
      class="goods-item"
      @click="toGoodsInfo(item.id)"
      v-for="(item,index) in goodsList"
      :key="index"
    >
      <div>
        <img :src="item.image" />
        <h1 class="title">{{ item.name }}</h1>
        <p class="info">
          <span class="price">¥{{ item.price }}</span>
          <span class="sell">剩余 {{ item.num }} 件</span>
        </p>
      </div>
    </div>
    <mt-button class="more" v-if="goodsList.length !== 0" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import goodsApi from "../../api/goodsApi";
export default {
  data() {
    return {
      goodsList: [],
      last_id: 0
    };
  },
  methods: {
    // 跳转商品信息页
    toGoodsInfo(id) {
      this.$router.push("/goodsinfo/" + id);
    },
    // 加载更多
    getMore() {
      this.getGoodsList();
    },
    async getGoodsList() {
      const { id } = this.$router.history.current.params;
      this.$indicator.open({ text: "加载中" });
      let res = await goodsApi.getGoodsListData(id);
      this.$indicator.close();
      const { code, data } = res;
      if (code === 1) {
        if (data.length > 0) {
          this.goodsList = [...data, ...this.goodsList];
          this.last_id = data[data.length - 1].id;
        } else {
          this.$toast("列表为空");
        }
      }
    }
  },
  created() {
    this.getGoodsList();
    // window.onscroll = () => {
    //   // scrollTop是滚动条滚动时，距离顶部的距离
    //   var scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   // windowHeight是可视区的高度
    //   var windowHeight =
    //     document.documentElement.clientHeight || document.body.clientHeight;
    //   // scrollHeight是滚动条的总高度
    //   var scrollHeight =
    //     document.documentElement.scrollHeight || document.body.scrollHeight;
    //   // 滚动条到底部
    //   if (scrollTop + windowHeight == scrollHeight) {
    //     // 到了底部之后想做的操作,如到了底部之后加载
    //     this.$toast({ message: "已经到达底部了", duration: 1000 });
    //   }
    // };
  },
  mounted() {
    // window.onscroll = null;
  }
};
</script>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-bottom: 50px;
  .goods-item {
    width: calc(calc(100% / 2) - 10px);
    margin: 10px 10px 0 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      color: #333;
      margin: 10px 0;
    }
    .info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
      .price {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
      .sell {
        font-size: 13px;
      }
    }
  }
  .more {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>