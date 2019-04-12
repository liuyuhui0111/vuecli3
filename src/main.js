
import Vue from 'vue';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import './axios';
import mixin from './mixin';

import App from './App.vue';
import './plugins/element.js'
/* eslint-disable */
if (process.env.NODE_ENV === 'development') {
    require('./mock/mock.js');
}
/* eslint-enable */
Vue.use(mixin);

Vue.config.productionTip = false;

window.vue = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
