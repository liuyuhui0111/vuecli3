module.exports = {
    // 基本路径
    // baseUrl: '/abtest/',
    publicPath: process.env.NODE_ENV === 'production' ? '/fatsclassroom-web/' : '/',
    // lintOnSave: false,
    devServer: {
        proxy: {
            '/apis': {
                target: '/test/',
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': '/apis', // 需要rewrite重写的,
                },
            },
        },
    },
};
// http://test-activity.iqianjindai.com/
// http://test-activity.iqianjindai.com
// http://10.3.101.177:8080/
