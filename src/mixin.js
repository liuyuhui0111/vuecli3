/*
 *
 *全局mixins
 */
import {
    mapGetters,
    mapMutations,
} from 'vuex';

import {
    getToken,
    getUserInfo,
    goLogin,
} from '@/api/apis';
import { getUrlParam } from '@/assets/utils/util';

export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    // token: '',
                };
            },

            computed: {
                ...mapGetters([
                    // 映射 this.count 为 store.state.count
                    'isShowLoading', // 是否显示全局Loading
                    'token', // 是否显示全局Loading
                ]),
            },
            methods: {

                login() {
                    // 去登录
                    goLogin();
                },
                loginout() {
                    // 退出登录，清空cookie
                    this.setToken('');
                    window.localStorage.removeItem('REDIRECT_URI');
                },
                getTokenByCode(fn) {
                    // return;
                    const code = getUrlParam('code');
                    if (code && !this.token) {
                        // code 存在  通过code获取token
                        getToken({ code }).then((res) => {
                            // 设置token
                            /* eslint-disable */
                            let token = res.data['access_token']
                            this.setToken(token)
                            typeof (fn) === 'function' && fn();
                            /* eslint-enable */
                        }).catch((err) => {
                            console.log(err);
                            // 获取token 失败  退出登录 提示重新登录
                            this.loginout();
                            this.$alert('登录状态失效,请重新登录', '提示', {
                                type: 'warning',
                                center: true,
                            }).then(() => {
                                this.loginout();
                                this.$router.push({ path: '/index' });
                            }).catch(() => {
                                console.log('取消');
                            });
                        });
                    }
                },
                getUserInfoFn() {
                    // 如果token 存在获取用户信息
                    if (this.token) {
                        getUserInfo({ token: this.token }).then((res) => {
                            // 设置token
                            console.log(res);
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                },

                ...mapMutations([
                    'setToken',
                ]),
            },
        });
    },
};
