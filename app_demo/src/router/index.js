import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import HotJoke from '../views/HotJoke'
import NewJoke from '../views/NewJoke'
import RandomJoke from '../views/RandomJoke'
import IdiomDictionary from '../views/IdiomDictionary'
import Login from '../views/Login'
import Register from '../views/Register'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: { title: '笑话大全' }
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '笑话大全' },
  }, {
    path: '/home/hot',
    name: 'HotJoke',
    component: HotJoke,
    meta: { title: '最热笑话大全' }
  }, {
    path: '/home/new',
    name: 'NewJoke',
    component: NewJoke,
    meta: { title: '最新笑话大全' }
  }, {
    path: '/home/random',
    name: 'RandomJoke',
    component: RandomJoke,
    meta: { title: '随机笑话大全' }
  }, {
    path: '/dictionary',
    name: 'IdiomDictionary',
    component: IdiomDictionary,
    meta: { title: '成语词典' }
  }, {
    path: '/user',
    name: 'User',
    component: User,
    meta: { title: '我的' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: '注册' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: '#ff8c00'
})

/* 当前页面已经在跳转的路由中，会出现报红 避免到当前位置的冗余导航 */
// 解决办法：
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})



export default router
