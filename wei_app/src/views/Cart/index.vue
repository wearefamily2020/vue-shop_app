<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content" v-for="(item,i) in goodslist" :key="item.id">
          <div class="mui-card-content-inner flex">
            <!-- 复选框 -->
            <div class="mui-input-row mui-checkbox mui-left">
              <label>&nbsp;</label>
              <input
                type="checkbox"
                v-model="getGoodsSelected[item.id]"
                @change="selectedChange(item.id,getGoodsSelected[item.id])"
              />
            </div>
            <!-- 中间商品图片 -->
            <img :src="item.image" />
            <!-- 右侧部分 -->
            <div class="info">
              <h1>{{ item.name }}</h1>
              <p class="flex">
                <span class="price">¥{{ item.price }}</span>
                <numbox
                  v-if="item.num"
                  @count="countChange"
                  :initcount="getGoodsCount[item.id]"
                  :max="item.num"
                  :goodsid="item.id"
                  size="min"
                  :disabled="item.num == 0"
                ></numbox>
                <span v-else style="margin-right:20px;">该商品暂时无货</span>
                <span @click="delGoods(item.id,i)">删除</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品结算 -->
      <div class="mui-card bottom">
        <div class="mui-card-content">
          <div class="mui-card-content-inner balance">
            <div class="left">
              <p>总计不含运费</p>
              <p>
                已勾选商品
                <span class="red">{{ getSelectedCount }}</span> 件，总价
                <span class="red">¥{{ getSelectedAmount }}</span>
              </p>
            </div>
            <mt-button type="primary">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import cartApi from "../../api/cartApi";
import numbox from "../../components/numberbox";
export default {
  components: { numbox },
  data() {
    return {
      goodslist: []
    };
  },
  computed: {
    // ...mapState({ car: state => state.shopcart.car })
    ...mapState("shopcart", ["car"]),
    ...mapGetters("shopcart", [
      "getGoodsCount",
      "getGoodsSelected",
      "getSelectedCount",
      "getSelectedGoods"
    ]),
    // 计算总价
    getSelectedAmount() {
      var goods = this.getSelectedGoods;
      console.log(goods);

      var amount = 0;
      this.goodslist.forEach(item => {
        console.log(goods, goods[item.id]);
        if (goods[item.id]) {
          amount += item.price * goods[item.id].count;
        }
      });
      return amount;
    }
  },
  methods: {
    // 删除商品
    delGoods(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("shopcart/removeCar", id);
    },
    // 改变复选框状态值
    selectedChange(id, selected) {
      this.$store.commit("shopcart/updateGoodsSelected", { id, selected });
    },
    countChange(goodsinfo) {
      // 获取加入购物车的数量
      this.$store.commit("shopcart/updateGoodsInfo", goodsinfo);
    },
    async getCartDataList() {
      // let arrID = [];
      // 获取每个商品id，根据id发送请求获取数据渲染页面
      // this.car.forEach(item => arrID.push(item.id));
      let cartList = [];
      let src = "http://tpadmin.test/static/uploads/";
      // let res = await cartApi.getCartListData(arrID);
      let res = JSON.parse(localStorage.getItem("car"));
      res.forEach(item => cartList.push(item.goodsinfo));
      cartList.forEach(item => {
        if (item.image) item.image = src + item.image;
        else item.image = require("../../assets/img/avatar3.jpg");
      });
      this.goodslist = cartList;
      this.goodslist.forEach(item => {
        if (item.num == 0) {
          this.selectedChange(item.id, false);
        }
      });
    }
  },
  created() {
    this.getCartDataList();
  }
};
</script>

<style scoped lang='scss'>
.flex {
  display: flex;
}
.shopcar-container {
  background: #eee;
  overflow: auto;
  position: absolute;
  left: 10px;
  right: 10px;
  top: 50px;
  height: 487px;
  .goods-list {
    .mui-card-content-inner {
      align-items: center;
      padding: 10px;
      .mui-checkbox.mui-left input[type="checkbox"] {
        left: 0px;
      }
      .mui-radio.mui-left label,
      .mui-checkbox.mui-left label {
        padding-left: 20px;
        padding-right: 35px;
        padding-bottom: 22px;
      }
    }
    img {
      width: 60px;
    }
    .info {
      margin-left: 10px;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      h1 {
        font-size: 13px;
        font-weight: bold;
        line-height: 20px;
        padding-top: 10px;
      }
      p {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .price {
          text-align: left;
          font-size: 16px;
          font-weight: 700;
          color: red;
          flex: 1;
        }
        a {
          line-height: 25px;
        }
      }
    }
    .bottom {
      position: fixed;
      bottom: 50px;
      left: 0;
      width: 100%;
      margin: 0;
    }
  }
  .balance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}

.shopcar-container::-webkit-scrollbar {
  display: none;
}
</style>
