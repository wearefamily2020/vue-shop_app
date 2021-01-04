import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Sort from '@/views/Sort'
import Cart from '@/views/Cart'
import User from '@/views/User'
import Login from '@/views/Login'
import Register from '@/views/Register'
import GoodsList from '@/views/GoodsList'
import GoodsInfo from '@/views/GoodsInfo'



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
  }, {
    path: '/sort',
    component: Sort,
    meta: { title: '分类' }
  }, {
    path: '/goodslist/:id',
    component: GoodsList,
    meta: { title: '商品列表' }
  }, {
    path: '/goodsinfo/:id',
    component: GoodsInfo,
    meta: { title: '商品信息' }
  }, {
    path: '/cart',
    component: Cart,
    meta: { title: '购物车' }
  }, {
    path: '/user',
    component: User,
    meta: { title: '我的' },
    children: [
      {
        path: '/user/login',
        component: Login,
        meta: { title: '登录' }
      },
      {
        path: '/user/register',
        component: Register,
        meta: { title: '注册' }
      },
    ]
  },
]

/* 当前页面已经在跳转的路由中，会出现报红 避免到当前位置的冗余导航 */
// 解决办法：
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
