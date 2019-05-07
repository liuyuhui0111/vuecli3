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
    loginout,
} from '@/api/apis';
import { replaceCode, getUrlParam } from '@/assets/utils/util';

export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    // token: '',
                };
            },
            mounted() {
            },

            computed: {
                ...mapGetters([
                    // 映射 this.count 为 store.state.count
                    'isShowLoading', // 是否显示全局Loading
                    'token', // 是否显示全局Loading
                    'commonUserData', // 用户相关信息
                ]),
            },
            methods: {

                login() {
                    // 去登录
                    goLogin();
                },
                loginout() {
                    // 退出登录，清空cookie
                    if (this.token) {
                        this.setToken('');
                        window.localStorage.removeItem('REDIRECT_URI');
                        window.location.replace(replaceCode());
                        this.$nextTick(() => {
                            loginout();
                        });
                    }
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
                            this.getUserInfoFn()
                            typeof (fn) === 'function' && fn();
                            /* eslint-enable */
                        }).catch((err) => {
                            console.log(err);
                            // 获取token 失败  退出登录 提示重新登录
                            this.loginout();
                            this.$message({
                                message: '登录状态失效,请重新登录',
                                type: 'warning',
                            });
                        });
                    }
                },
                getUserInfoFn() {
                    // 如果token 存在获取用户信息
                    if (this.token) {
                        getUserInfo({ token: this.token }).then((res) => {
                            // 设置用户信息
                            // console.log('user===================',res);
                            if (res.data.code === '0000') {
                                let user = res.data.leaguerList;
                                if (!user) {
                                    this.setToken('');
                                    this.$message({
                                        message: '获取个人信息失败，请重新登录',
                                        type: 'warning',
                                    });
                                    return;
                                }
                                let userData = {
                                    userName: user.userName, // 用户名
                                    managerUserId: user.managerUserId, // 管理员id
                                    userId: user.userId, // 用户id
                                    leaguerLevelId: user.leaguerLevelId, // 会员等级
                                    source: user.source, // 渠道
                                    leaguerLevelName: user.leaguerLevelName, // 会员等级名称
                                };
                                this.setUsers(userData);
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                },

                ...mapMutations([
                    'setToken',
                ]),
                ...mapMutations('user', [
                    'setUsers',
                ]),
            },
        });
    },
};
