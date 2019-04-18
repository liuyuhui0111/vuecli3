/* eslint-disable */
const getters = {
    token: state => state.token,

    isShowLoading: state => state.isShowLoading,

    keepAliveComponetScrolls: state => state.keepAliveComponetScrolls,

    getCurentComponetScrolls: state => (path) => {
    	//获取当前组件的滚动条位置
    	return state.keepAliveComponetScrolls[path] || 0 
    },		
};

export default getters;
