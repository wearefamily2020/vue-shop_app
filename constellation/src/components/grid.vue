<template>
  <div>
    <div class="grid">
      <li class="grid-item" v-for="item in gridList" :key="item.id">
        <img :src="item.src" @click="tolink(item.to)" />
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridList: [
        {
          id: 1,
          src: require("../assets/emmm/baiyangzuo.png"),
          to: "白羊座",
        },
        {
          id: 2,
          src: require("../assets/emmm/chunvzuo.png"),
          to: "处女座",
        },
        {
          id: 3,
          src: require("../assets/emmm/jinniuzuo.png"),
          to: "金牛座",
        },
        {
          id: 4,
          src: require("../assets/emmm/juxiezuo.png"),
          to: "巨蟹座",
        },
        {
          id: 5,
          src: require("../assets/emmm/mojiezuo.png"),
          to: "摩羯座",
        },
        {
          id: 6,
          src: require("../assets/emmm/shaungyuzuo.png"),
          to: "双鱼座",
        },
        {
          id: 7,
          src: require("../assets/emmm/sheshouzuo.png"),
          to: "射手座",
        },
        {
          id: 8,
          src: require("../assets/emmm/shhizizuo.png"),
          to: "狮子座",
        },
        {
          id: 9,
          src: require("../assets/emmm/shuaungzizuo.png"),
          to: "双子座",
        },
        {
          id: 10,
          src: require("../assets/emmm/shuipingzuo.png"),
          to: "水瓶座",
        },
        {
          id: 11,
          src: require("../assets/emmm/tianchengzuo.png"),
          to: "天秤座",
        },
        {
          id: 12,
          src: require("../assets/emmm/tianxiezuo.png"),
          to: "天蝎座",
        },
      ],
    };
  },

  components: {},

  methods: {
    tolink(link) {
      console.log(link);
    },
  },
};
</script>

<style scoped lang="scss">
.grid {
  margin: 4px 13px 0 0;
  padding-left: 13px;
  width: 100%;
  height: 728px;
  background: #17263e;
}
.grid-item {
  margin: 6px 8px;

  float: left;
  & img {
    width: 157px;
    height: 100px;
    border-radius: 20px;
  }
}
</style>;
