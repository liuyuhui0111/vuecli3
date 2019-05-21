
/* eslint-disable */
let COMMON_ENV = {
  SSO_URL: 'http://wxkf.5ifapiao.com', // 单点登录相关地址
};

if (process.env.NODE_ENV === 'production') {
	// 生产环境
  COMMON_ENV.SSO_URL = 'http://wx.5ifapiao.com';

} else if (process.env.NODE_ENV === 'development') {
	// 开发环境
  COMMON_ENV.SSO_URL = 'http://wxkf.5ifapiao.com';
  
} else if (process.env.NODE_ENV === 'test') {
	// 测试环境
	COMMON_ENV.SSO_URL = 'http://apptest.5ifapiao.com';
}

export default COMMON_ENV;
