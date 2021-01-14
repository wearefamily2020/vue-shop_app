<template>
  <div></div>
</template>

<script>
import almanacApi from "../api/almanacApi";
export default {
  data() {
    return {};
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
    getdata() {
      // this.$indicator.open({
      //   text: "加载中",
      // });
      let res = almanacApi.getDate(this.timestampToTime() );
      console.log(res);
      // this.$indicator.close();
    },
  },
};
</script>
