const COMMON_TOKEN = 'token'; // token 字段名称
const COMMON_TOKEN_DAY = 7; // token失效时间7天

function setCookie(name, value, day) {
    console.log(name, value, day);
    // 写cookies
    if (!value) {
        return null;
    }
    try {
        const Days = day || 30;
        const exp = new Date();
        let val = value;
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        if (typeof (val) !== 'string') {
            val = JSON.stringify(value);
        }
        document.cookie = `${name}=${escape(val)};expires=${exp.toGMTString()}`;
    } catch (e) {
        return null;
    }
    return true;
}

function getCookie(name) {
    // 读cookie
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) { return unescape(arr[2]); }
    return null;
}

function delCookie(name) {
    // 删除cookie
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null) { document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`; }
}

function getScrollTop() {
    // 获取当前滚动条高度
    return document.documentElement.scrollTop || document.body.scrollTop;
}

function setScrollTop(top) {
    // 设置当前滚动条高度
    if (document.documentElement) {
        document.documentElement.scrollTop = top;
    } else {
        document.body.scrollTop = top;
    }
}
// 将url中code=xxx 替换成空字符串
function replaceCode() {
    /*eslint-disable*/
    const reg = /code\=\w*(&|$)/;
    /* eslint-enable */
    let href = window.location.href.replace(reg, '');
    if (href.substr(href.length - 1, 1) === '?') {
        // 如果最后一个字符是？
        href = href.substring(0, href.length - 1);
    }
    return href;
}

// 获取url中的参数
function getUrlParam(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}


function initList(arr, arrnum) {
    /**
          * 数组补位
          * @desc arr 要补位的数组 num 要补的位数
          * @author liuyuhui
          * @date 2019年4月19日17:33:59
    */
    const num = arrnum - (arr.length % arrnum); // 计算需要补位的数量
    if (num !== 0) {
    // 如果能被4整除且当前页条数小于当页最大条数，开始补位
        for (let i = 0; i < num; i += 1) {
            arr.push(null);
        }
    }
    return arr;
}

function getTokenFn() {
    return getCookie(COMMON_TOKEN);
}

function setTokenFn(token) {
    console.log(token);
    if (token) {
        setCookie(COMMON_TOKEN, token, COMMON_TOKEN_DAY);
    } else {
        delCookie(COMMON_TOKEN);
        // 清除本地缓存信息
        window.localStorage.removeItem('commonUserData');
    }
}


function transferString(content) {
    // 替换回车
    let string = content;
    try {
        string = string.replace(/\r\n/g, '<br>');
        string = string.replace(/\n/g, '<br>');
    } catch (e) {
        console.log(e.message);
    }
    return string;
}

export {
    setTokenFn,
    getTokenFn,
    setCookie,
    getCookie,
    delCookie,
    getScrollTop,
    setScrollTop,
    replaceCode,
    getUrlParam,
    initList,
    transferString,
};
