<template>
  <div>
    <div
      class="mui-numbox"
      data-numbox-min="1"
      :data-numbox-max="max"
      :style="myStyle"
    >
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        class="mui-input-numbox"
        type="number"
        :value="initcount"
        @change="countChanged"
        ref="num"
      />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myStyle: {},
    };
  },
  mounted() {
    this.$mui(".mui-numbox").numbox();
    if (this.$props.size === "min") {
      this.myStyle = { height: "25px", margin: "0 6px", width: "100px" };
    }
  },
  methods: {
    countChanged() {
      var count = parseInt(this.$refs.num.value);
      this.$emit("count", { id: this.goodsid, count: count });
      return
    },
  },
  props: ["initcount", "max", "goodsid", "size"],
  watch: {
    max(newVal) {
      mui(".mui-numbox").numbox().setOption("max", newVal);
    },
  },
};
</script>

<style scoped lang='scss'>
.mui-numbox {
  padding: 0 30px;
&.mui-input-numbox {
  margin: 0 -7px;
}
& [class*=btn-numbox]{
  width: 30px;
}
}
</style>