/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

let routeConfs = [
  { title:'首页', name:'home', path:'/', view:'Home' },
  { title:'关于', name:'about', path:'/about', view:'About' },
  { title:'测试', name:'demo', path:'/demo', view:'demo/demo' },
];


let routes = [];
routeConfs.forEach(item => {
  routes.push({ 
    path: item.path,
    name: item.name,
    meta: { title: item.title }, 
    component: resolve => { require([`../views/${item.view}.vue`], resolve) }
  })
});

let router = new Router({
  // mode: 'history',
  routes: routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '加载中...'
  next();
})

router.afterEach((to, from) => {
  // ...
})

export default router