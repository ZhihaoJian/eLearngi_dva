import {
    userLogin,
    validateCaptcha,
    register
} from '../services/login';
import { message } from 'antd';

const UPDATE_NOTICES = 'updateNotices';
const UPDATE_CAPTCHA_IS_VALID = 'updateCaptchaIsValid';

export default {
    namespace: 'login',
    state: {
        notices: '', //表单提示信息
        captchaSuccess: false
    },
    reducers: {
        updateNotices(state, { payload = '' }) {
            return { ...state, notices: payload }
        },
        updateCaptchaIsValid(state, { payload }) {
            return { ...state, captchaSuccess: payload }
        }
    },
    effects: {
        *userLogin({ payload }, { put, call }) {
            const { err, username, password } = payload;
            yield put({ type: UPDATE_NOTICES })
            if (!err && username && password) {
                const res = yield call(userLogin, { username, password });
                if (res.success) {
                    window.location.href = '/classroom';
                }else{
                    message.error(res.msg);
                }
            } else {
                yield put({ type: UPDATE_NOTICES, payload: '请检查账号与密码是否正确' });
            }
        },
        *checkCaptcha({ payload }, { put, call }) {
            const { data, callback } = payload;
            const res = yield call(validateCaptcha, data);
            if (res.success) {
                yield put({ type: UPDATE_CAPTCHA_IS_VALID, payload: res.success });
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                /* eslint-disable */
                typeof callback === 'function' ? callback(res.msg) : null;
            }
        },
        *onSubmit({ payload }, { call, select }) {
            const { email, password, confirmPwd, callback } = payload;
            const captchaSuccess = yield select(state => state.login.captchaSuccess);
            if (email && password && confirmPwd && (password === confirmPwd) && captchaSuccess) {
                const { callback, ...data } = payload;
                const res = yield call(register, data);
                if (res && res.status === 0) {
                    window.location.href = '/login';
                }
            } else {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        }
    },
}