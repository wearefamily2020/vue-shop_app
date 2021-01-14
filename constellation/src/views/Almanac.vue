<template>
  <div class="box">
    <h1>{{ this.almanacDate.yangli }} <button>选择时间</button></h1>
    <h2>{{ this.almanacDate.yinli }}</h2>

    <h3 style="color: red">吉</h3>
    <div class="box-item" style="background: crimson">
      <div class="cyan">
        <h4>宜</h4>
        {{ this.almanacDate.yi }}
      </div>
      <div class="cyan">
        <h4>吉神宜趋</h4>
        {{ this.almanacDate.jishen }}
      </div>
    </div>

    <h3 style="padding-top: 20px">凶</h3>
    <div class="box-item" style="background: #000">
      <div class="cyan">
        <h4>冲煞</h4>
        {{ this.almanacDate.chongsha }}
      </div>
      <div class="cyan">
        <h4>彭祖百忌</h4>
        {{ this.almanacDate.baiji }}
      </div>
    </div>
    <footer>
      <nav>良辰吉时</nav>
      <div v-for="item in result" :key="item.hours">
        <div style="text-align: initial; font-weight: 600; color: aqua">
          {{ item.hours + "点" }}
        </div>
        <div style="display: inline;color: #ccc">
          <span style="color: red; float: left">宜</span>:{{
            item.yi ? item.yi : "无"
          }}
        </div>
        <br />
        <div style="display: inline;color: #ccc">
          <span style="font-weight: 600;color: ghostwhite; float: left">忌</span>:{{
            item.ji ? item.ji : "无"
          }}
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import almanacApi from "../api/almanacApi";
export default {
  data() {
    return {
      almanacDate: [],
      result:[],
      // result: [
      //   {
      //     yangli: "2019-01-01",
      //     hours: "1-3",
      //     des: "冲猴 煞北 时冲戊申 不遇 三合 长生 金星",
      //     yi: "赴任 出行 祭祀 祈福 斋醮 开光",
      //     ji: " 酬神 求财 见贵 订婚 嫁娶 修造 安葬 青龙",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "3-5",
      //     des: "冲猪 煞东 时冲辛亥 旬空 大退 日禄 天赦",
      //     yi: "赴任 出行",
      //     ji: " 祈福 求嗣 订婚 嫁娶 求财 开市 交易 安床",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "5-7",
      //     des: "冲狗 煞南 时冲庚戍 日破",
      //     yi: "见贵 求财 嫁娶 进人口 安葬 求嗣 订婚",
      //     ji: " 赴任 修造 移徙 出行 词讼 祭祀 祈福 斋醮 开光",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "7-9",
      //     des: "冲马 煞南 时冲丙午 天牢 路空 唐符 大进",
      //     yi: "",
      //     ji: "见贵 求财 嫁娶 进人口 安葬 求嗣 订婚",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "9-11",
      //     des: "冲羊 煞东 时冲丁未 日刑 路空 贵人 国印",
      //     yi: "",
      //     ji: "祈福 求嗣 订婚 嫁娶 求财 开市 交易 安床 入宅 安葬",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "11-13",
      //     des: " 冲鼠 煞北 时冲壬子 六戊 三合 帝旺 贪狼",
      //     yi: "订婚 嫁娶 出行 求财 开市 交易 安床 赴任",
      //     ji: "祈福 求嗣",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "13-15",
      //     des: " 冲牛 煞西 时冲癸丑 朱雀 天乙 右弼",
      //     yi: "祈福 求嗣 出行 入宅 嫁娶 修造 安葬 赴任 见贵 求财",
      //     ji: "朱雀须用 凤凰符制 否则 诸事不宜",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "15-17",
      //     des: " 冲虎 煞南 时冲甲寅 地兵 福星 金匮 左辅",
      //     yi: "祭祀 祈福 酬神 订婚 嫁娶 出行 求财 入宅 安葬 赴任 见贵",
      //     ji: "修造 动土",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "17-19",
      //     des: " 冲兔 煞东 时冲乙卯 天贼 狗食 宝光 天德",
      //     yi: "出行 订婚 嫁娶 修造 移徙 开市 安葬",
      //     ji: "祭祀 祈福 斋醮 酬神",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "19-21",
      //     des: " 冲龙 煞北 时冲丙辰 日建 白虎 路空 武曲",
      //     yi: "求嗣 订婚 嫁娶 安葬",
      //     ji:
      //       "造船 乘船 白虎须用 麒麟符制 否则 诸事不宜 祭祀 祈福 斋醮 开光 赴任 出行",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "21-23",
      //     des: " 冲蛇 煞西 时冲丁已 路空 玉堂 少微 金堂",
      //     yi: "修造 盖屋 移徙 安床 入宅 开市 开仓 见贵 求财 订婚 嫁娶 进人口",
      //     ji: "祭祀 祈福 斋醮 开光 赴任 出行",
      //   },
      //   {
      //     yangli: "2019-01-01",
      //     hours: "23-1",
      //     des: "冲鸡 煞西 时冲己酉 勾陈 六合 太阳 天官",
      //     yi: "见贵 订婚 嫁娶 入宅 开市",
      //     ji: " 赴任 出行 求财 开光 修造 安葬",
      //   },
      // ],
      // almanacDate: {
      //   id: "1657",
      //   yangli: "2014-09-11",
      //   yinli: "甲午(马)年八月十八",
      //   wuxing: "井泉水 建执位",
      //   chongsha: "冲兔(己卯)煞东",
      //   baiji: "乙不栽植千株不长 酉不宴客醉坐颠狂",
      //   jishen: "官日 六仪 益後 月德合 除神 玉堂 鸣犬",
      //   yi: "祭祀 出行 扫舍 馀事勿取",
      //   xiongshen: "月建 小时 土府 月刑 厌对 招摇 五离",
      //   ji: "诸事不宜",
      // },
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    timestampToTime() {
      let timestamp = new Date().getTime();
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
        text: "加载中",
      });
     await almanacApi.getDate(this.timestampToTime()).then((res) => {
        if (res.error_code === 0) {
          this.almanacDate = res.result;
          console.log(this.almanacDate);
        }
      });
       this.$indicator.close();
    await almanacApi.getTime(this.timestampToTime()).then((res) => {
       console.log("11111", res);
        if (res.error_code === 0) {
          this.result = res.result;
          console.log(this.result);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  background: #17263e;
  width: vw(750);
  height: 100%;
  padding-top: 80px;
  text-align: center;
  & .cyan {
    color: cyan;

    & h4 {
      color: bisque;
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
      background: #7966ee;
      margin-left: 40px;
    }
  }
  & .box-item {
    margin: auto;
    padding-top: 15px;
    background: #ccc;
    border: 1px solid #000;
    border-radius: 30px;
    width: 300px;
    height: 180px;
  }
  & footer {
        padding: 50px 21px 60px;
    & nav {
      font-weight: 600;
      height: 60px;
      font-size: 43px;
    }
    & span {
      display: inline;
    }
  }
}
</style>
