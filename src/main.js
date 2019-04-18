
import Vue from 'vue';
import store from './store';
import router from './router';
import './axios';
import mixin from './mixin';

import App from './App.vue';
import './plugins/element';
// swiper 样式文件
/* eslint-disable */
import 'swiper/dist/css/swiper.css';
/* eslint-enable */
// 全局公共样式文件,element-ui,swiper 样式调整文件
require('@/assets/styles/common.css');
require('@/assets/styles/reset-elementui.css');
require('@/assets/styles/reset-swiper.css');

/* eslint-disable */
if (process.env.NODE_ENV === 'development') {
    // require('./mock/mock.js');
}
/* eslint-enable */
Vue.use(mixin);

Vue.config.productionTip = false;

window.vue = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
