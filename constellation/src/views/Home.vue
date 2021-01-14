<template>
  <div class="home">
    <Swiper />
    <Grid />
  </div>
</template>

<script>
import Swiper from "@/components/swiper.vue";
import Grid from "@/components/grid.vue";
export default {
  name: "Home",
  components: {
    Swiper,
    Grid,
  },
};
</script>
