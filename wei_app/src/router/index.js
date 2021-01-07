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
import Address from '@/views/Address'
import AddressEdit from '@/views/AddressEdit'
import orderCreate from '@/views/Order/orderCreate'
import OrderList from '@/views/Order/orderList'
import OrderShow from '@/views/Order/orderShow'
import NewsList from '@/views/News/newsList'
import NewsShow from '@/views/News/newsShow'
import PhotoList from '@/views/Photo/photoList'
import PhotoInfo from '@/views/Photo/photoInfo'


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
    path: '/news/list',
    component: NewsList,
    name: 'news_list',
    meta: { title: '新闻资讯列表' }
  }, {
    path: '/news/show/:id',
    component: NewsShow,
    props: true,
    name: 'news_show',
    meta: { title: '查看新闻资讯' }
  }, {
    path: '/photo/list',
    component: PhotoList,
    name: 'photo_list',
    meta: { title: '图片分享列表' }
  }, {
    path: '/photo/show/:id',
    component: PhotoInfo,
    props: true,
    name: 'photo_show',
    meta: { title: '查看图片' }
  }, {
    path: '/order/create',
    component: orderCreate,
    name: 'order_create',
    meta: { title: '创建订单' }
  },
  {
    path: '/order/list',
    component: OrderList,
    name: 'order_list',
    meta: { title: '我的订单' }
  }, {
    path: '/order/show/:id',
    component: OrderShow,
    props: true,
    name: 'order_show',
    meta: { title: '查看订单' }
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
      {
        path: '/user/address',
        component: Address,
        meta: { title: '收货地址' },
        children: [
          {
            path: '/user/address/add',
            component: AddressEdit,
            meta: { title: '新增收货地址' },
          },
          {
            path: '/user/address/edit/:id',
            component: AddressEdit,
            props: true,
            name: 'address_edit',
            meta: { title: '编辑收货地址' },
          },

        ]
      },

    ]
  },
  {
    path: '/user/address/select',
    component: Address,
    name: 'address_select',
    meta: { title: '选择收货地址' }
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
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'mui-active'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})

export default router
