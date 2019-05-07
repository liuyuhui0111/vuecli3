/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import center from './modules/center';
import getters from './getters'
import {getTokenFn, setTokenFn} from '@/assets/utils/util'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isShowLoading: false,		//全局loading
		keepAliveComponetScrolls: {},		//keepAlive 组件记录滚动条 path:scrolly
		token:getTokenFn() ? getTokenFn() : '',		//token
	},
	getters: {},
	actions: {},
	mutations: {
		setShowLoading(state, { isShowLoading }) {
	    state.isShowLoading = isShowLoading;
	  },
	  loginout(state,loginout){

	  },
	  setToken(state,token) {
	  	// 设置token  同步到cookie 有效期默认7天
	  	//如果token不存在 默认清空token
	  	setTokenFn(token);
	    state.token = token;
	  },
    setKeepAliveComponetScrolls(state, { path , scroll }) {
    	if(!path || !scrollY){
    		return false;
    	}
        state.keepAliveComponetScrolls[path] = scrollY;
    },
	},
    modules: {
        user,
        center
    },
    getters
});
