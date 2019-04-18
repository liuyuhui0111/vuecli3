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

// 获取url中的参数
function getUrlParam(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}

export {
    setCookie,
    getCookie,
    delCookie,
    getScrollTop,
    setScrollTop,
    getUrlParam,
};
