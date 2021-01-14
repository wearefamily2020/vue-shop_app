<template>
  <div class="box">
    <mt-navbar>
      <div
        v-for="(item, index) in tablist"
        :key="item.name"
        :class="{ cur: iscur === index }"
        @click="getdata((type = item.src), index)"
      >
        {{ item.name }}
      </div>
    </mt-navbar>
    <main>
      <h1>{{ dateList.name }}</h1>
      <div>日期:{{ dateList.datetime || dateList.date }}</div>
      <div v-if="dateList.all">
        综合指数:<span>{{ dateList.all }}</span>
      </div>
      <div v-if="dateList.color">
        幸运色:<span>{{ dateList.color }}</span>
      </div>
      <div>
        健康指数:<span>{{ dateList.health }}</span>
      </div>
      <div>
        爱情指数:<span>{{ dateList.love }}</span>
      </div>
      <div v-if="dateList.money">
        财运指数:<span>{{ dateList.money }}</span>
      </div>
      <div v-if="dateList.number">
        幸运指数:<span>{{ dateList.number }}</span>
      </div>
      <div v-if="dateList.QFriend">
        速配星座:<span>{{ dateList.QFriend }}</span>
      </div>
      <div v-if="dateList.work">
        工作指数:<span>{{ dateList.work }}</span>
      </div>
      <div v-if="dateList.summary">
        今日描述:<span>{{ dateList.summary }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import grilApi from "../api/grilApi";
export default {
  data() {
    return {
      iscur: 0,
      consName: "",
      type: "",
      tablist: [
        {
          name: "今天",
          src: "today",
        },
        {
          name: "明天",
          src: "tomorrow",
        },
        {
          name: "一周",
          src: "week",
        },
        {
          name: "一月",
          src: "month",
        },
        {
          name: "一年",
          src: "year",
        },
      ],
      //   dateList: [],
      dateList: {
        date: 20210114,
        name: "双子座",
        QFriend: "金牛座",
        color: "柠檬黄色",
        datetime: "2021年01月14日",
        health: "70",
        love: "80",
        work: "65",
        money: "70",
        number: 5,
        summary:
          "双子座今天突然看开了许多，也放下了许多。你不再像从前那样对自己想要的东西过分执着，一切随意，这样的心态反而会让你更幸运，得到一些意料之外的收获。",
        all: "80",
        resultcode: "200",
        error_code: 0,
      },
    };
  },

  created() {
    this.consName = this.$route.params.consName;
    this.type = this.$route.params.type;
    // this.$indicator.open({
    //   text: "加载中",
    // });
  },
  mounted() {
    // this.getdata();
  },

  methods: {
    async api(consName, type) {
      await grilApi.getConstellation(consName, type).then((res) => {
        if (res.error_code === 0) {
          this.dateList = res;
          console.log(res);
          this.$indicator.close();
        }
      });
    },
    getdata(type, index) {
      console.log(type, index);
      this.iscur = index;
      this.type = type;
      this.api(this.consName, this.type);
    },
  },
};
</script>

<style scoped lang='scss'>
.box {
  padding-top: 40px;
}
.cur {
  color: skyblue;
  border-bottom: 2px solid skyblue;
}
.mint-navbar{
display: flex;
width: vw(750);
& div{
    flex: 1;
    width: vw(750/5);
    height: 40px;
    line-height: 40px;
}
}
</style>