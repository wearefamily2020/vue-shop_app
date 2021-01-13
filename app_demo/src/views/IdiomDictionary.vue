<template>
  <div class="dirctionary">
    <van-search
      background="#9a9a9a1a"
      v-model="value"
      @search="onSearch"
      input-align="center"
      placeholder="请输入您要搜索的成语"
    />
    <div class="tag" v-show="searchData.length!==0">
      <h1 @click="clearHistory">清除历史</h1>
      <van-row gutter="10">
        <van-col span="6" style="margin-top:10px" v-for="item in searchData" :key="item">
          <van-tag
            @click="setInputVal(item)"
            round
            size="medium"
            color="#ff8c00"
            text-color="#fff"
          >{{item}}</van-tag>
        </van-col>
      </van-row>
    </div>
    <div class="modal" v-show="isModal">
      <van-loading color="orange" size="40" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import dictionaryApi from "../api/dictionaryApi";
export default {
  data() {
    return {
      value: "",
      searchData: JSON.parse(localStorage.getItem("searchData")) || [],
      isModal: false
    };
  },
  methods: {
    setInputVal(val) {
      this.value = val;
      this.handleSearch(val);
    },
    async handleSearch(val) {
      this.isModal = true;
      let res = await dictionaryApi.queryDictionary(val);
      if (res.error_code === 0) {
        res.result.name = val;
        this.$router.push({ name: "Detail", query: { res: res.result } });
      } else {
        this.$toast(res.reason);
      }
      this.isModal = false;
    },
    onSearch(val) {
      this.handleSearch(val);
      setTimeout(() => {
        this.searchData.push(val);
        localStorage.setItem("searchData", JSON.stringify(this.searchData));
        const arr = (this.searchData = Array.from(
          new Set(JSON.parse(localStorage.getItem("searchData")))
        ));
        this.value = "";
      }, 1000);
    },
    clearHistory() {
      this.searchData = [];
      localStorage.removeItem("searchData");
    }
  }
};
</script>

<style scoped lang='scss'>
.dirctionary {
  // padding: 20px;
  .van-search__content {
    background: #fff;
  }
  .tag {
    padding: 0 20px;
    h1 {
      width: 100%;
      text-align: right;
      margin-top: 20px;
    }
  }
  .modal {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    .van-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>