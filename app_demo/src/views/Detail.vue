<template>
  <div class="box">
    <h1 class="title">{{result.name}}</h1>
    <div class="list-item">
      <p class="text">【拼音】</p>
      <p class="content">{{result.pinyin}}</p>
    </div>
    <div class="list-item">
      <p class="text">【成语解释】</p>
      <p class="content">{{result.chengyujs}}</p>
    </div>
    <div class="list-item">
      <p class="text">【成语出处】</p>
      <p class="content">{{result.from_}}</p>
    </div>
    <div class="list-item">
      <p class="text">【举例】</p>
      <p class="content">{{result.example}}</p>
    </div>
    <div class="list-item">
      <p class="text">【语法】</p>
      <p class="content">{{result.yufa}}</p>
    </div>
    <div class="list-item">
      <p class="text">【引证解释】</p>
      <p class="content">{{result.yinzhengjs}}</p>
    </div>
    <div class="list-item">
      <p class="text">【同义词】</p>
      <p class="content" v-for="item in result.tongyi" :key="item">{{item}}</p>
    </div>
    <div class="list-item">
      <p class="text">【反义词】</p>
      <p class="content" v-for="item in result.fanyi" :key="item">{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: {}
    };
  },
  created() {
    this.result = this.$route.query.res;
  }
};
</script>

<style scoped lang='scss'>
.box {
  overflow: auto;
  /* height: 100vh; */
  padding-bottom: 68px;
  background: #9a9a9a1a;
  .title {
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-weight: 600;
    // color: rgb(245, 159, 0);
    font-size: 22px;
    padding: 20px 0;
  }
  .list-item {
    padding: 20px;
    .text {
      font-size: 18px;
      font-weight: 600;
    }
    .content {
      text-indent: 2em;
      color: 17px;
    }
  }
}
</style>