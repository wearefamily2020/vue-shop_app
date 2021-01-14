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
        gridList:[{
            id:1,
            src:require("../assets/emmm/baiyangzuo.png"),
            to:"baiyangzuo"
        },{
            id:2,
            src:require("../assets/emmm/chunvzuo.png"),
            to:"chunvzuo"
        },{
            id:3,
            src:require("../assets/emmm/jinniuzuo.png"),
            to:"jinniuzuo"
        },{
            id:4,
            src:require("../assets/emmm/juxiezuo.png"),
            to:"juxiezuo"
        },{
            id:5,
            src:require("../assets/emmm/mojiezuo.png"),
            to:"mojiezuo"
        },{
            id:6,
            src:require("../assets/emmm/shaungyuzuo.png"),
            to:"shaungyuzuo"
        },{
            id:7,
            src:require("../assets/emmm/sheshouzuo.png"),
            to:"sheshouzuo"
        },{
            id:8,
            src:require("../assets/emmm/shhizizuo.png"),
            to:"shhizizuo"
        },{
            id:9,
            src:require("../assets/emmm/shuaungzizuo.png"),
            to:"shuaungzizuo"
        },{
            id:10,
            src:require("../assets/emmm/shuipingzuo.png"),
            to:"shuipingzuo"
        },{
            id:11,
            src:require("../assets/emmm/tianchengzuo.png"),
            to:"tianchengzuo"
        },{
            id:12,
            src:require("../assets/emmm/tianxiezuo.png"),
            to:"tianxiezuo"
        },
        ]
    };
  },

  components: {},

  methods: {
      tolink(link){
          console.log(link);
      }
  },

};
</script>

<style scoped lang="scss">
.grid{
    margin: 4px 13px 0 13px;
}
.grid-item {
    margin: 6px 8px;

    float: left;
  & img {
    width: 100px;
    height: 80px;
  }
}
</style>;
