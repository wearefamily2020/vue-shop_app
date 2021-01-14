<template>
  <div class="joke">
    <div>
      <van-list
        v-if="list.length!==0"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="list-item" v-for="(item,index) in list" :key="item.hashId">
          <p>{{index+1}}. {{item.content}}</p>
          <span>{{item.updatetime}}</span>
        </div>
        <div class="more" v-show="!finished" @click="onloadMore">加载更多</div>
      </van-list>
      <div v-else style="margin-top:20px">暂无数据</div>
    </div>
    <div class="modal" v-show="isModal">
      <van-loading color="orange" size="40" vertical>加载中...</van-loading>
    </div>
    <totop />
  </div>
</template>

<script>
import jockApi from "../api/jockApi";
import totop from "../components/gotop";
export default {
  components: { totop },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      pageSize: 10,
      isModal: false
    };
  },
  methods: {
    onloadMore() {
      this.page++;
      this.getData();
    },
    onLoad() {
      this.loading = false; //加载状态结束
      if (this.list.length >= 200) this.finished = true;
    },
    async getData() {
      this.isModal = true;
      let res = await jockApi.getTimeJockData(this.page, this.pageSize);
      if (res.error_code === 0) {
        const { data } = res.result;
        this.list = [...this.list, ...data];
        console.log(this.list);
      } else {
        this.$toast("请求失败");
      }
      this.isModal = false;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang='scss'>
.joke {
  width: 100%;
  height: 570px;
  background: #9a9a9a1a;
  // overflow-y: auto;
  padding-bottom: 20px;
  margin-top: 40px;
  .list-item {
    padding: 10px;
    background: #fff;
    span {
      display: block;
      text-align: right;
    }
  }
  .more {
    height: 30px;
    margin-top: 10px;
    background: #fff;
    line-height: 30px;
    text-align: center;
    margin-bottom: 70px;
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