import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Almanac from "../views/Almanac.vue";

Vue.use(VueRouter);

const routes = [{
  path: '/',
  redirect: '/home',
  meta: {
    title: '星座'
  }
},
{
  path: '/home',
  component: Home,
  name: 'home',
  meta: {
    title: '星座'
  }
},
{
  path: "/almanac",
  name: "almanac",
  component: Almanac,
  meta: {
    title: '黄历'
  }
}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'mui-active'
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router;