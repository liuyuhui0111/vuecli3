// h5相关页面
const h5Routes = [{
  title: '财税课堂',
  name: 'h5-index',
  path: '/h5/index',
  view: () => import(/* webpackChunkName: "group-h5" */ '@/views/h5/index.vue'),
}, {
  title: '在线报名',
  name: 'h5-signup',
  path: '/h5/signup',
  view: () => import(/* webpackChunkName: "group-h5" */ '@/views/h5/signup.vue'),
}, {
  title: '报名成功',
  name: 'h5-success',
  path: '/h5/success',
  view: () => import(/* webpackChunkName: "group-h5" */ '@/views/h5/success.vue'),
}, {
  title: '签到',
  name: 'h5-signin',
  path: '/h5/signin',
  view: () => import(/* webpackChunkName: "group-h5" */ '@/views/h5/signin.vue'),
}];
export default h5Routes;
