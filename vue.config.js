module.exports = {
    // 基本路径
    // baseUrl: '/abtest/',
    publicPath: process.env.NODE_ENV === 'production' ? '/fatsclassroom-web/' : '/',
    // lintOnSave: false,
    devServer: {
        proxy: {
            '/oauth/token': {
                target: 'http://fatc:fatc@wxkf.5ifapiao.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/oauth/token': '/oauth/token', // 需要rewrite重写的,
                },
            },
        },
    },
};
// http://test-activity.iqianjindai.com/
// http://test-activity.iqianjindai.com
// http://10.3.101.177:8080/
