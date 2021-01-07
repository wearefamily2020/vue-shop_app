<template>
  <div class="address-container">
    <div v-if="isAdd">
      <div class="mui-card" v-for="item in addressList" :key="item.id">
        <ul class="selected">
          <li class="title" @click="select(item.id)">
            <strong>{{ item.name }}</strong>&nbsp;
            <strong>{{ item.tel }}</strong>
          </li>
          <li @click="select(item.id)">{{ item.area }} {{ item.detail }}</li>
          <li>
            <router-link class="edit" :to="{name: 'address_edit', params: {id: item.id}}">编辑</router-link>
          </li>
        </ul>
      </div>
      <div class="mod_btns fixed" v-show="showAdd">
        <div class="mod_btn" @click="goAddressEdit">新增收货地址</div>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import addressApi from "../../api/addressApi";
export default {
  data() {
    return {
      isAdd: true,
      addressList: [],
      showAdd: false
    };
  },
  methods: {
    select(id) {
      if (this.$route.name !== "address_select") {
        return;
      }
      this.$router.replace({ name: "order_create", params: { id: id } });
    },

    goAddressEdit() {
      this.$router.push("/user/address/add");
      this.isAdd = false;
    },
    async getAddress() {
      this.$indicator.open({ text: "加载中" });
      let res = await addressApi.getAddress();
      this.$indicator.close();
      this.showAdd = true;
      if (res.code === 1) this.addressList = res.data;
    }
  },
  created() {
    this.getAddress();
  },
  watch: {
    $route(newVal, oldVal) {
      this.isAdd = newVal.path === "/user/address";
      if (newVal.path === "/user/address") {
        this.getAddress();
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.address-container {
  background: #eee;
  overflow: hidden;
  .mod_btn {
    font-size: 16px;
    line-height: 46px;
    height: 46px;
    text-align: center;
    background: #3884ff;
    flex: 1;
    display: block;
    color: #fff;
  }
  .mod_btns .fixed {
    display: flex;
    overflow: hidden;
  }
  .mui-card {
    padding: 7px 40px;
    position: relative;
    overflow: hidden;
    padding: 15px;
    color: #666;
    .selected {
      margin: 0;
      padding: 0;
      list-style: none;
      padding-right: 50px;
      .title {
        font-size: 16px;
      }
      .edit {
        color: #e93b3d;
        width: 50px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>