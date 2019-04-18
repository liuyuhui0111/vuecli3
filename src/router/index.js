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

const defaultChildrens = [
  // { title:'测试', name:'demo', path:'/demo', view:'demo/demo', savedPosition:false },
  // { title:'测试详情', name:'detail', path:'/detail', view:'demo/detail', keepAlive:false },
  { title:'首页', name:'index', path:'/index', view:'web/index/index' },
  { title:'财税公开课', name:'open-class', path:'/open-class', view:'web/open-class/index' },
  { title:'课程详情', 
    name: 'detail-class', 
    path: '/detail', 
    view: 'web/open-class/detail',
    meta: {
      navIndex:1,   //导航位置
    } 
  },
  { title:'搜索结果', name:'search', path:'/search', view:'web/search/index' },

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
console.log(routes);
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