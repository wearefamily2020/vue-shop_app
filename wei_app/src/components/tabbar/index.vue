<template>
  <nav class="mui-bar mui-bar-tab">
    <router-link class="mui-tab-item-lib" to="/home">
      <span class="mui-icon mui-icon-home" />
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="mui-tab-item-lib" to="/sort">
      <span class="mui-icon mui-icon-extra mui-icon-extra-class" />
      <span class="mui-tab-label">分类</span>
    </router-link>
    <router-link class="mui-tab-item-lib" to="/cart">
      <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
        <span class="mui-badge">2</span>
      </span>
      <span class="mui-tab-label">购物车</span>
    </router-link>
    <router-link class="mui-tab-item-lib" to="/my">
      <span class="mui-icon mui-icon-gear" />
      <span class="mui-tab-label">我的</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  props: {}
};
</script>

<style scoped>
.mui-bar-tab .mui-tab-item-lib.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-lib {
  font-size: 11px;
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon {
  display: block;
  margin: auto;
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon .mui-tab-labe {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
