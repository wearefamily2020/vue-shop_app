<template>
  <div>goodsinfo</div>
</template>

<script>
import goodsApi from "../../api/goodsApi";
export default {
  data() {
    return {};
  },
  methods: {
    async getGoodsInfo() {
      const { id } = this.$router.history.current.params;
      let res = await goodsApi.getGoodsInfoData(id);
      console.log(res);
    }
  },
  created() {
    this.getGoodsInfo();
  }
};
</script>

<style scoped lang=''>
</style>
