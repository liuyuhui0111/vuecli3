
import Vue from 'vue';
import store from './store';

import router from './router';
import './axios';
import mixin from './mixin';

import App from './App.vue';
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
