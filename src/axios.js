import Vue from 'vue';
import Axios from 'axios';
// import qs from 'qs';
import store from './store';

const axios = Axios.create({
    timeout: 1000 * 5,
    // baseURL: '',
    withCredentials: false, // 跨域请求时，允许其他域设置自身站点下的cookie
});


/* eslint-disable */
/**
      * 全局请求拦截器
*/
axios.interceptors.request.use(
    (config) => {
        // 添加headers "application/x-www-form-urlencoded"
        //如果是formdata格式 自动格式化数据
        if(config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
          const formData = new FormData();
          let data = config.data
          for(key in data){
            formData.append(key,data[key])
          }
          config.data = formData
          // config.data = qs.stringify(config.data);
        }
        store.commit('setShowLoading', { isShowLoading:true });
        // config.headers.Authorization = 'testToken';
        return config;
    }, (error) => {
        if (process.env.NODE_ENV === 'development') {
            return Promise.reject(error)
        }else{
            return Promise.reject('请求出错，请稍后再试')
        }
    },
);

/**
      * 全局响应拦截器
*/
axios.interceptors.response.use(
    (response) => {
            store.commit('setShowLoading', { isShowLoading:false });
            return response;
    },
    (error) => {
        store.commit('setShowLoading', { isShowLoading:false });
        if (process.env.NODE_ENV === 'development') {
            return Promise.reject(error);
        }
        return Promise.reject('请求出错，请稍后再试');
    },
);
/* eslint-enable */
Vue.prototype.$http = axios;
// window.$http = axios
export default axios;
