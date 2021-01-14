<template>
  <div id="app">
    <mt-header fixed :title="$route.meta.title" />
    <router-view />
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "./components/tabbar";
export default {
  components: {
    Tabbar,
  },
};
</script>
<style lang="scss" scoped>
#app{
  background: #333333;
}
.mint-header {
  background: #9966ff;
}
</style>
