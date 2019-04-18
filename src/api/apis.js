import {
    post, get,
} from './fetch';
// 登录 token 相关18911413287 a123456
const LOGIN_URL = 'http://wxkf.5ifapiao.com/oauth/authorize';
// const TOKEN_URL = 'http://wxkf.5ifapiao.com/oauth/token';
// const USER_INFO_URL = 'http://wxkf.5ifapiao.com';

// const REDIRECT_URI = encodeURI('http://10.1.31.83:8080/index');
const CLIENT_ID = 'fatc';

function goLogin() {
    const REDIRECT_URI = encodeURI(window.location.href);
    // 去登录页 去登录的时候本地缓存 REDIRECT_URI
    window.localStorage.setItem('REDIRECT_URI', REDIRECT_URI);
    const params = `?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
    window.location.href = LOGIN_URL + params;
}

function getToken(params) {
    const url = 'http://wxkf.5ifapiao.com/oauth/token';
    // // 获取token 从本地获取上一次REDIRECT_URI
    const formData = {
        client_id: CLIENT_ID, // 为client_id:secret，分配一个即可
        grant_type: 'authorization_code', // 固定取值authorization_code
        redirect_uri: window.localStorage.getItem('REDIRECT_URI'), // 重定向地址,跟登录重定向地址保持一致
        code: params.code, // 登录成功后，重定向回来的页面url中获取
        client_secret: CLIENT_ID,
    };
    return post(url, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        dataType: 'JSON',
    });
}


function getUserInfo(params) {
    // 获取验证码
    const url = '';
    return get(url, params || {});
}

export {
    goLogin,
    getToken,
    getUserInfo,
};
