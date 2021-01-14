<template>
  <nav class="mui-bar mui-bar-tab">
    <router-link class="mui-tab-item-lib boder" :to="{ name: 'home' }">
      <span class="mui-tab-label">星座运势</span>
    </router-link>
    <router-link class="mui-tab-item-lib" :to="{ name: 'almanac' }">
      <span class="mui-tab-label">老黄历</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {},
};
</script>
<style  lang="scss" scoped>
.mui-bar-tab .mui-tab-item-lib.mui-active {
  color: #9966ff;
}
.mui-bar-tab .mui-tab-item-lib {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;

  & .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  & .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.boder {
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}
</style>

