<template>
  <nav class="mui-bar mui-bar-tab">
    <router-link class="mui-tab-item-lib" to="/home">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="mui-tab-item-lib" to="/sort">
      <span class="mui-icon mui-icon-personadd"></span>
      <span class="mui-tab-label">分类</span>
    </router-link>
    <router-link class="mui-tab-item-lib" to="/cart">
      <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
        <span class="mui-badge">2</span>
      </span>
      <span class="mui-tab-label">购物车</span>
    </router-link>
    <router-link class="mui-tab-item-lib" to="/my">
      <span class="mui-icon mui-icon-gear"></span>
      <span class="mui-tab-label">我的</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  props: {}
};
</script>

<style scoped lang="scss">
</style>
