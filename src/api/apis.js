import {
    post, get,
} from './fetch';

export function getCode(params) {
    // 获取验证码
    const url = '/apis/getcode';
    return post(url, params || {});
}

export function login(params) {
    // 获取验证码
    const url = '/apis/login';
    return get(url, params || {});
}
