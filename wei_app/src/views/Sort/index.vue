<template>
  <div class="menu">
    <div class="menu-left" ref="mleft">
      <ul>
        <li
          @click="curIndexList(index)"
          :class="{'current':curIndex===index,'menu-item':true}"
          v-for="(menu,index) in menus"
          :key="index"
          ref="menuList"
        >
          <p class="text">{{ menu.name }}</p>
        </li>
      </ul>
    </div>
    <div class="menu-right" ref="itemList">
      <ul>
        <li class="cate" v-for="(menu, index1) in menus" :key="index1">
          <h4 class="cate-title">{{ menu.name }}</h4>
          <ul class="cate-item">
            <li v-for="(item, index2) in menu.sub" :key="index2">
              <div class="cate-item-wrapper" @click="goGoodsList(item.id)">
                <div class="cate-item-img">
                  <img :src="item.image" alt />
                </div>
                <span>{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </li>
        <li class="cate-bottom"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import sortApi from "../../api/sortApi";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      menus: [],
      rightLiTops: [], // 存入右菜单每项的高度
      scrollY: 0 // 记住右菜单滚动距离
    };
  },
  computed: {
    curIndex() {
      const { scrollY, rightLiTops } = this;
      return rightLiTops.findIndex((top, index) => {
        if (index === rightLiTops.length - 2) {
          return true;
        }
        if (scrollY >= top && scrollY < rightLiTops[index + 1]) {
          this.initLeftScroll(index);
          return true;
        }
      });
    }
  },
  methods: {
    goGoodsList(id) {
      this.$router.push("/goodslist/" + id);
    },
    async getCategory() {
      this.$indicator.open({ text: "加载中" });
      let res = await sortApi.getCategoryData();
      this.$indicator.close();
      if (res.code === 1) {
        this.menus = res.data;
      }
    },
    // 右菜单滚动时，左菜单联动
    initLeftScroll(index) {
      let menu = this.$refs.menuList;
      // scrollToElement(el, time, offsetX, offsetY, easing)
      this.leftBscroll.scrollToElement(menu[index], 300, 0, -100);
    },

    curIndexList(i) {
      // this.curIndex = i;
      this.scrollY = this.rightLiTops[i];
      // 单击左菜单中的某一项后，将右菜单切换到对应项下面
      this.rightBscroll.scrollTo(0, -this.scrollY);
    },
    initScroll() {
      // ps: 当 需要滚动区域 的高度不超过父容器的高度，是不能滚动的，
      this.leftBscroll = new BScroll(this.$refs.mleft, {
        click: true,
        mouseWheel: true
      });
      this.rightBscroll = new BScroll(this.$refs.itemList, {
        probeType: 3, // 实时派发scroll事件
        click: true,
        mouseWheel: true
      });

      this.rightBscroll.on("scroll", position => {
        this.scrollY = Math.abs(position.y);
      });
    },
    // 初始化右边高度
    initRightHeight() {
      let itemArray = [];
      let top = 0;
      itemArray.push(top);
      // 获取每个li
      let allList = this.$refs.itemList.getElementsByClassName("cate");
      Array.from(allList).forEach(ele => {
        // 获取当前li所在的位置
        top += ele.clientHeight;
        itemArray.push(top);
      });
      let bottom = this.$refs.itemList.getElementsByClassName("cate-bottom")[0];
      bottom.style.height = this.$refs.itemList.clientHeight / 1.2 + "px";
      // console.log(bottom);
      this.rightLiTops = itemArray;
    }
  },
  created() {
    this.getCategory();
  },
  watch: {
    menus() {
      // $nextTick用来在下次DOM更新循环结束之后执行延迟回调
      this.$nextTick(() => {
        this.initScroll();
        this.initRightHeight(); // 初始化右边菜单的高度
      });
    }
  }
};
</script>

<style scoped lang='scss'>
ul {
  margin: 0;
  padding: 0;
}

.menu {
  position: absolute;
  text-align: center;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  .menu-left {
    width: 80px;
    background: #f3f5f7;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    .menu-item {
      height: 54px;
      width: 100%;
      .text {
        width: 100%;
        line-height: 54px;
        margin-bottom: 0;
      }
    }
    .current {
      width: 100%;
      background: #fff;
      .text {
        color: #26a2ff;
      }
    }
  }
  .menu-right {
    background: #fff;
    position: absolute;
    top: 0;
    left: 80px;
    height: 100%;
    .cate {
      height: 100%;
      .cate-title {
        margin: 0;
        text-align: left;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        padding: 10px;
      }
      .cate-item {
        padding: 7px 10px 10px;
        display: flex;
        overflow: hidden;
        flex-flow: row wrap;
        li {
          width: 33.3%;
          .cate-item-wrapper {
            .cate-item-img {
              width: 100%;
              img {
                width: 70px;
                height: 70px;
              }
            }
            span {
              display: inline-block;
              font-size: 14px;
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>