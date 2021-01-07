<template>
  <div class="shopcart-container">
    <!-- 收货地址区域 -->
    <div class="address-container">
      <div class="mui-card">
        <router-link :to="{name: 'address_select'}" replace>
          <h3>{{ address.name }} {{ address.tel }}</h3>
          <p>{{ address.area }} {{ address.detail }}</p>
        </router-link>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card">
        <div class="mui-card-content" v-for="(item) in goodslist" :key="item.id">
          <div class="mui-card-content-inner flex">
            <img :src="item.image" />
            <div class="info">
              <h1>{{ item.name }}</h1>
              <p class="flex">
                <span class="price">¥{{ item.price }}</span>
                <span>x{{ item.count }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 配送信息 -->
        <div class="process-info">
          <p>
            <strong>配送服务</strong>
            <strong>快递运输</strong>
          </p>
          <p>
            <span>中小件送货时间</span>
            <span>工作日、双休日与节假日均可送货</span>
          </p>
        </div>
        <!-- 订单备注 -->
        <div class="store-info">
          <strong>订单备注</strong>
          <textarea v-model="note" type="text" placeholder="选填，给商家留言"></textarea>
        </div>
      </div>
    </div>
    <!-- 运费信息 -->
    <ul class="fare-info mui-card">
      <li class="fare-price flex">
        <span>商品金额</span>
        <span class="red">¥{{ amount.toFixed(2) }}</span>
      </li>
      <li class="fare-price flex">
        <span>运费</span>
        <span class="red">¥0.00</span>
      </li>
      <li class="fare-price flex">
        <span>
          <strong>总价</strong>
        </span>
        <span class="red">¥{{ amount.toFixed(2) }}</span>
      </li>
      <!-- 创建订单按钮 -->
      <div class="flex">
        <button class="mui-btn mui-btn-primary mui-btn-block" @click="order">创建订单</button>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import cartApi from "../../api/cartApi";
import addressApi from "../../api/addressApi";
import orderApi from "../../api/orderApi";

export default {
  data() {
    return {
      goodslist: [],
      amount: 0,
      note: "",
      address: {},
      addressId: 0
    };
  },
  computed: {
    ...mapState("shopcart", ["buy"]),
    ...mapGetters("shopcart", ["getBuy"])
  },
  created() {
    this.getGoodsList();
    this.getAddress();
  },
  methods: {
    // 创建订单
    async order() {
      var form = {
        address: this.addressId,
        goods: this.buy,
        note: this.note
      };
      this.$indicator.open({ text: "创建订单中" });
      let res = await orderApi.getOrderData(form);
      console.log(res);
      const { data, msg, code } = res;
      this.$indicator.close();
      if (code === 0) {
        this.$toast(msg);
      } else if (code === 1) {
        this.$toast(msg);
        this.$router.replace({ name: "order_list" });
      } else if (code === 2) {
        this.$router.push("/user/login");
      }
    },

    async getGoodsList() {
      var idArr = [];
      this.buy.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        return;
      }
      var params = { ids: idArr };
      let res = await cartApi.getCartListData(params);
      const { code, data } = res;
      if (code === 1) {
        this.goodslist = data;
        var amount = 0;
        this.goodslist.forEach(item => {
          item.count = this.getBuy[item.id].count;
          amount += item.count * item.price;
        });
        this.amount = amount;
      }
    },
    async getAddress() {
      if (this.$router.history.current.params.id) {
        this.addressId = this.$router.history.current.params.id;
      }
      let res = await addressApi.defaultAddress(this.addressId);
      const { code, msg, data } = res;
      if (code === 0) {
        this.$toast(msg);
      } else if (code === 1) {
        if (data) {
          this.address = data;
          this.addressId = data.id;
        } else {
          this.$toast("请先添加收货地址");
        }
      } else if (code === 2) {
        this.$router.push("/user/login");
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.flex {
  display: flex;
}
.shopcart-container {
  background: #eee;
  // overflow: hidden;
  overflow: auto;
  position: absolute;
  left: 10px;
  right: 10px;
  top: 50px;
  height: 538px;
  // 收货地址
  .address-container {
    .mui-card {
      margin: 0;
      padding: 10px;
      h3 {
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  // 商品列表
  .goods-list {
    margin-top: 10px;
    .mui-card {
      margin: 0;
      .mui-card-content {
        border-bottom: 1px solid #eee;
        .mui-card-content-inner {
          align-items: center;
          padding: 10px;
          img {
            width: 60px;
          }
          .info {
            margin-left: 10px;
            box-sizing: border-box;
            width: 100%;
            overflow: hidden;
            h1 {
              font-size: 13px;
              font-weight: bold;
              line-height: 20px;
              padding-top: 22px;
            }
            p {
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              .price {
                font-size: 16px;
                font-weight: 700;
                color: red;
                flex: 1;
              }
            }
          }
        }
      }
      // 配送信息
      .process-info {
        padding: 10px;
        border-bottom: 1px solid #eee;
        p {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          color: #333;
          span {
            color: #999;
          }
        }
      }
      // 店铺备注
      .store-info {
        padding: 10px;
        textarea {
          font-size: 13px;
        }
      }
    }
  }
  // 运费信息
  .fare-info {
    padding: 10px;
    margin: 10px 0 0 0;
    .fare-price {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      .red {
        color: red;
        font-size: 16px;
      }
    }
  }
}
.shopcart-container::-webkit-scrollbar {
  display: none;
}
</style>