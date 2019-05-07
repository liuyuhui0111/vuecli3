/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router);


NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})

// 个人中心子页面
const centerChildrens = [
  { title:'个人中心', name: 'center-preson', path: '/center/preson', view: 'web/center/preson'},
  { title:'我的课程', name: 'center-myclass', path: '/center/myclass', view: 'web/center/myclass'},
  { title:'我的收藏', name: 'center-mycol', path: '/center/mycol', view: 'web/center/mycol'},
  { title:'我的报名', name: 'center-signin', path: '/center/signin', view: 'web/center/signin'},
  { title:'我的订单', name: 'center-myorder', path: '/center/myorder', view: 'web/center/myorder'},
  { title:'我的订单', name: 'center-myorder-detail', path: '/center/detail', view: 'web/center/detail'},
  { title:'个人设置', name: 'center-myset', path: '/center/myset', view: 'web/center/myset'},
]

const defaultChildrens = [
  // { title:'测试', name:'demo', path:'/demo', view:'demo/demo', savedPosition:false },
  // { title:'测试详情', name:'detail', path:'/detail', view:'demo/detail', keepAlive:false },
  { title:'首页', name:'index', path:'/index', view:'web/index/index' },
  { title:'财税公开课', name:'open-class', path:'/open-class', view:'web/open-class/index' },
  { title:'公开课详情', name: 'detail-class', path: '/detail', view: 'web/open-class/detail',
    meta: {
      navIndex:1,   //导航位置
    } 
  },
  { title:'报名成功', name:'success', path:'/success', view:'web/open-class/success' },
  { title:'在线学习', name:'online-class', path:'/online-class', view:'web/online-class/index' },
  { title:'在线学习详情', name:'online-detail', path:'/online-detail', view:'web/online-class/detail',
    meta: {
      navIndex:2,   //导航位置
    } 
  },
  
  { title:'搜索', name:'search', path:'/search', view:'web/search/index' },
  // 订单相关
  { title:'订单', name:'order', path:'/order', view:'web/order/index' },
  { title:'支付订单', name: 'pay-order', path: '/pay-order', view: 'web/order/pay-order'},
  { title:'个人中心', name: 'center', path: '/center',redirect:'/center/preson',view:'web/center/index',children:centerChildrens},
  { title:'会员权益', name: 'interests', path: '/interests', view: 'web/center/interests'},
]

// h5相关页面
const h5Routes = [
  { title:'财税课堂', name:'h5-index', path:'/h5/index', view:'h5/index' },
  { title:'在线报名', name:'h5-signup', path:'/h5/signup', view:'h5/signup' },
  { title:'报名成功', name:'h5-success', path:'/h5/success', view:'h5/success' },
  { title:'签到', name:'h5-signin', path:'/h5/signin', view:'h5/signin' },
]

const routeConfs = [
  { title:'404', name:'404', path:'*', view:'404' },
  { title:'index', name:'首页', path:'/', redirect:'/index' },
  { title:'首页', 
    name:'default',
    path:'/default',
    view:'default',
    children:defaultChildrens,
  },
  ...h5Routes,
];



function initRoutes(routers){
  let arr = [];
  routers.forEach(item => {
    let router = {
      path: item.path,
      name: item.name,
      redirect: item.redirect || '',
      children: item.children && item.children.length>0 ? initRoutes(item.children) : [],
       meta: { 
          title: item.title,
          ...item.meta
      }, 
      component: resolve => { item.view ? require([`../views/${item.view}.vue`], resolve) : '' }
    }
    arr.push(router)
  })
  return arr
}

let routes = initRoutes(routeConfs);
let router = new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition && to.meta.savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '加载中...'
  NProgress.start();
  next();
})

router.afterEach((to, from) => {
  NProgress.done();
  // ...
})

export default router