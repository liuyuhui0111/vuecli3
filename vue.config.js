let baseProxyUrl = '';
/*eslint-disable*/
// 线下课相关接口
// let apiOffline = ['/offline', 'offlineUnLogin', '/orderUnLogin', '/orderInfo', '/orderId'];
// // 个人中心相关
// let apiCenter = ['personalorder-web', '/classpower-web', '/membercenter', '/myapplication-web', '/personal-web', '/myClass-web', '/mycollection-web', '/mycollection-web'];
// // 线上课程相关
// let apiOnline = ['/course-web', '/courseUnlogin-web', '/category-web', '/searchword-web', '/searchword-web', '/evaluate', '/review'];
let proxyData = {
    'http://wxkf.5ifapiao.com': ['/authentication', '/api-gateway'],
    'http://10.1.31.140:9983': ['/fatscourse'],
    // 'http://10.1.29.53:9983': ['/fatscourse'],
    // 'http://10.1.28.167:9983': ['/fatscourse'],
};

let proxy = {};
Object.keys(proxyData).forEach((key) => {
    let target = key;
    if (baseProxyUrl) {
        // 存在 统一使用这个
        target = baseProxyUrl;
    }
    let arr = proxyData[key];
    arr.forEach((item) => {
        let pathRewrite = `^${item}`;
        proxy[item] = {
            target,
            changeOrigin: true,
            pathRewrite: {},
        };
        proxy[item].pathRewrite[pathRewrite] = item;
    });
});


module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/course/',
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        proxy,
    },
    // 生产环境是否需要sourcemap
    productionSourceMap:false,
    chainWebpack: config => {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch');
    },
    configureWebpack: config => {
      // 去除生产环境console.log
      if (process.env.NODE_ENV === 'production') {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      }
      
    }
};

// http://wxkf.5ifapiao.com/api-gateway/fatscourse/fatscourse
// http://10.1.31.140  陈埼
// 10.1.28.167:9983  赵聪
