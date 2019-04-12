import Vue from 'vue';
import Axios from 'axios';


const axios = Axios.create({
    timeout: 1000 * 5,
    // baseURL: '',
    withCredentials: true, // 跨域请求时，允许其他域设置自身站点下的cookie
});
/* eslint-disable */
axios.interceptors.request.use(
    (config) => {
    // 添加headers
        config.headers.Authorization = 'testToken';
        return config;
    }, error => Promise.reject(error),
);
/* eslint-enable */
axios.interceptors.response.use(
    response => response,
    error => Promise.reject(error),
);

Vue.prototype.$http = axios;
// window.$http = axios
export default axios;
