<template>
  <div class="box">
    <mt-button @click.native="open('picker')" size="large">{{pickerValue | formatDate}}</mt-button>
    <mt-datetime-picker
      class="picker_show"
      ref="picker"
      type="date"
      v-model="pickerValue"
      @confirm="handleConfirm"
    ></mt-datetime-picker>
    <div style="margin-top:20px">
      <div style="display: flex;align-items: center;border-bottom: 1px solid #eee;">
        <h2 class="yinli">阴历：</h2>
        <span class="yinli-desc">{{ almanacDate.yinli }}</span>
      </div>
      <div class="date">
        <div class="day">
          <h3 style="color: red">吉</h3>
          <div class="box-item" style="background:#9a9a9a1a">
            <div class="cyan">
              <h4>宜</h4>
              <p class="text">{{ almanacDate.yi }}</p>
            </div>
            <div class="cyan">
              <h4>吉神宜趋</h4>
              <p class="text">{{ almanacDate.jishen }}</p>
            </div>
          </div>
        </div>
        <div class="day">
          <h3>凶</h3>
          <div class="box-item" style="background:#9a9a9a1a">
            <div class="cyan">
              <h4>冲煞</h4>
              <p class="text">{{ almanacDate.chongsha }}</p>
            </div>
            <div class="cyan">
              <h4>彭祖百忌</h4>
              <p class="text">{{ almanacDate.baiji }}</p>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <nav>良辰吉时</nav>
        <div v-for="item in result" :key="item.hours">
          <div class="list-item">
            <div>{{ item.hours + "点" }}</div>
            <p>
              <span>宜</span>
              {{ item.yi ? item.yi : "无"}}
            </p>
            <p>
              <span>忌</span>
              {{ item.ji ? item.ji : "无"}}
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import almanacApi from "../api/almanacApi";
import { formatDate } from "../assets/js/date";
export default {
  data() {
    return {
      almanacDate: [],
      pickerValue: new Date(), //定义显示时间
      visible: false,
      // result:[],
      result: [
        {
          yangli: "2019-01-01",
          hours: "1-3",
          des: ":冲猴 煞北 时冲戊申 不遇 三合 长生 金星",
          yi: "：赴任 出行 祭祀 祈福 斋醮 开光",
          ji: " 酬神 求财 见贵 订婚 嫁娶 修造 安葬 青龙"
        },
        {
          yangli: "2019-01-01",
          hours: "3-5",
          des: "冲猪 煞东 时冲辛亥 旬空 大退 日禄 天赦",
          yi: "赴任 出行",
          ji: " 祈福 求嗣 订婚 嫁娶 求财 开市 交易 安床"
        },
        {
          yangli: "2019-01-01",
          hours: "5-7",
          des: "冲狗 煞南 时冲庚戍 日破",
          yi: "见贵 求财 嫁娶 进人口 安葬 求嗣 订婚",
          ji: " 赴任 修造 移徙 出行 词讼 祭祀 祈福 斋醮 开光"
        }
      ],
      almanacDate: {
        id: "1657",
        yangli: "2014-09-11", // 阳历
        yinli: "甲午(马)年八月十八", // 阴历
        wuxing: "井泉水 建执位", // 五行
        chongsha: "冲兔(己卯)煞东", // 冲煞
        baiji: "乙不栽植千株不长 酉不宴客醉坐颠狂", // 彭祖百济
        jishen: "官日 六仪 益後 月德合 除神 玉堂 鸣犬", // 吉神宜趋
        yi: "祭祀 出行 扫舍 馀事勿取", // 宜
        xiongshen: "月建 小时 土府 月刑 厌对 招摇 五离", // 凶神宜忌
        ji: "诸事不宜" // 忌
      }
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    handleConfirm() {
      this.pickerValue = this.timestampToTime();
      console.log(this.pickerValue);
      this.getdata();
    },
    timestampToTime() {
      let timestamp = this.pickerValue.getTime();
      var date = new Date(timestamp);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate();
      return Y + M + D;
    },
    async getdata() {
      this.$indicator.open({
        text: "加载中"
      });
      await almanacApi.getDate(this.pickerValue).then(res => {
        if (res.error_code === 0) {
          this.almanacDate = res.result;
          console.log(this.almanacDate);
        }
      });
      this.$indicator.close();
      await almanacApi.getTime(this.pickerValue).then(res => {
        console.log("11111", res);
        if (res.error_code === 0) {
          this.result = res.result;
          console.log(this.result);
        }
      });
    },
    open(picker) {
      this.$refs[picker].open(); //设置开始
    }
  },
  filters: {
    //时间转换
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  // background: #17263e;
  width: vw(750);
  height: 100%;
  padding-top: 42px;
  text-align: center;
  background: #fff;
  & .cyan {
    color: cyan;

    & h4 {
      color: #333;
      text-align: left;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
    }
    & .text {
      text-align: left;
      padding: 0 10px;
      color: #888;
    }
  }
  & h2 {
    font-weight: 700;
    font-size: 40px;
    padding: 20px 0 30px;
  }
  & h3 {
    padding: 10px;
    font-weight: 700;
  }
  & h1 {
    font-weight: 700;
    > button {
      margin-left: 40px;
      border-radius: 10px;
      border: 1px solid #000;
    }
  }
  & .box-item {
    margin: auto;
    padding: 15px 0;
    background: #9a9a9a1a;
    border-radius: 30px;
    height: 205px;
  }
  & footer {
    padding: 30px 0 60px;
    & nav {
      // font-weight: 600;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      text-align: left;
      padding: 0 20px;
      border-bottom: 1px solid #eee;
      background: #fff;
    }
    & span {
      display: inline;
    }
  }
  .yinli {
    height: 40px;
    line-height: 40px;
    font-size: 24px;
    text-align: left;
    padding: 0 20px;
    font-weight: 400;
  }
  .yinli-desc {
    margin-left: -20px;
  }
  .date {
    display: flex;
    justify-content: space-around;
    .day {
      width: 170px;
    }
  }
  .list-item {
    text-align: left;
    background: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    p {
      margin: 0;
      span {
        color: #333;
        line-height: 25px;
        height: 25px;
        display: inline-block;
      }
    }
  }
}
.mui-table h4,
.mui-table h5,
.mui-table .mui-h5,
.mui-table .mui-h6,
.mui-table p {
  margin-top: 0;
}
.mui-table h4 {
  line-height: 21px;
  font-weight: 500;
}

.mui-table .oa-icon {
  position: absolute;
  right: 0;
  bottom: 0;
}
.mui-table .oa-icon-star-filled {
  color: #f14e41;
}
</style>
