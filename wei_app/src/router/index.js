import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Sort from '@/views/Sort.vue'
import Cart from '@/views/Cart.vue'
import My from '@/views/My.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
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
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})

export default router
