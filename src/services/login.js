import request from '../utils/request';
import Utils from '../utils/utils';

/**
 * 用户注册
 * @param {Object} data 
 */
export async function register(data) {
    return request({
        url: '/authority/register',
        data,
        method: 'post'
    }).then(res => {
        if (res) {
            Utils.setItemToLocalStorage({ userid: res.id });
            return res;
        }
    })
}

/**
 * 验证码异步验证
 * @param {String} captcha 
 */
export async function validateCaptcha(captcha) {
    return request({
        url: `/authority/verify/${captcha}`,
        method: 'post',
    }).then(res => {
        return res.data
    });
}

/**
 * 用户登录 
 * @param {Object} data 
 */
export async function userLogin(data) {
    return request({
        url: '/authority/login',
        data,
        method: 'post'
    }).then(res => {
        if (res) {
            const { user } = res;
            const token = JSON.stringify({ token: res.token, setTime: Date.now() });
            Utils.setItemToLocalStorage({ token }, { user: JSON.stringify(user) });
            return user;
        }
    })
}

/**
 * 用户登出
 */
export async function userLogout() {
    return request({
        url: `/authority/quit`,
        method: 'post'
    })
}