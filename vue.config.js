let baseProxyUrl = '';
//
// 线下课相关接口
let apiOffline = ['/offline', 'offlineUnLogin', '/orderUnLogin', '/orderInfo', '/orderId'];
// 个人中心相关
let apiCenter = ['/classpower-web', '/membercenter', '/myapplication-web', '/personal-web', '/myClass-web', '/mycollection-web', '/mycollection-web'];
// 线上课程相关
let apiOnline = ['/course-web', '/category-web', '/searchword-web', '/searchword-web', '/evaluate', '/review'];
let proxyData = {
    'http://wxkf.5ifapiao.com': ['/oauth', '/api-gateway'],
    'http://10.1.31.140:9983/fatscourse/': [...apiOffline, ...apiOnline],
    'http://10.1.29.53:9983/fatscourse': [...apiCenter],
    // 'http://10.1.28.167:9983/fatscourse/': [...apiOnline],
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
    // baseUrl: '/abtest/',
    publicPath: process.env.NODE_ENV === 'production' ? '/fatsclassroom-web/' : '/',
    // lintOnSave: false,
    devServer: {
        proxy,
    },
};

// http://wxkf.5ifapiao.com/api-gateway/fatscourse/fatscourse
// http://10.1.31.140  陈埼
// 10.1.28.167:9983  赵聪
