import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Sort from '@/views/Sort'
import Cart from '@/views/Cart'
import My from '@/views/My'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: { title: '首页' }
  },
  {
    path: '/home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/sort',
    component: Sort,
    meta: { title: '分类' }
  },
  {
    path: '/cart',
    component: Cart,
    meta: { title: '购物车' }
  }, {
    path: '/my',
    component: My,
    meta: { title: '我的' }
  },

]


const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'mui-active'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})

export default router
