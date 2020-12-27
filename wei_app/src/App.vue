<template>
  <div id="app">
    <mt-header :title="$route.meta.title"></mt-header>
    <tabbar></tabbar>
    <router-view />
  </div>
</template>
<script>
import tabbar from "./components/tabbar";
export default {
  components: {
    tabbar
  },
  mounted() {}
};
</script>
<style lang="scss">
@import url("./assets/base2.css");
</style>
