import Axios from "axios";
import { message } from 'antd';
import Utils from "./utils";

/**
 * 30分钟刷新一次token验证
 */
const refreshToken = () => {
  return Axios.get(`/login/flushToken`).then(res => {
    console.log(res);
  })
}

const rq = ({ method, url, params, token, data, ...restParams }) => {
  return Axios({
    method,
    url,
    params,
    data: method !== 'get' ? data : null,
    headers: {
      Authorization: `Bearer${token}`
    },
    ...restParams
  })
    .then(response => {
      /**
       * http 状态码 在 200下正常返回服务端内容, 304读缓存
       * 501 是服务端无数据，默认返回服务端的success字段，前端需要做处理
       * 其余情况报错处理
       * 
       */
      if ((response.status === 200 || response.status === 304) && response.data.status === 200) {
        return response.data.results;
      } else if (response.data.status === 501) {
        return response.data.success;
      } else {
        throw new Error(response.data.msg);
      }
    })
    .catch(err => {
      message.error(err.message || 'Oops, 网络出错了! 刷新试试?');
    })
}


const request = ({ url = '', method = 'get', data = {}, params = {}, ...restParams }) => {
  //发送请求前检查token是否过期，若过期则刷新token
  const tokenInfo = JSON.parse(Utils.getItemFromLocalStorage('token'));
  let token, setTime, now, isTokenIsExpired;
  if (tokenInfo) {
    token = tokenInfo.token;
    setTime = tokenInfo.setTime;
    now = Date.now();
    isTokenIsExpired = (now - setTime) > 30 * 60 * 1000;
    if (isTokenIsExpired) {
      // return refreshToken().then((token) => rq({
      //     method, url, params, token, data, restParams
      // }));
      return rq({ method, url, params, token, data, restParams });
    } else {
      return rq({ method, url, params, token, data, restParams });
    }
  } else {
    return rq({ method, url, params, token, data, restParams });
  }
  // return Axios({
  //     method,
  //     url,
  //     params,
  //     data: method !== 'get' ? data : null,
  //     headers: {
  //         Authorization: `Bearer${token}`
  //     },
  //     ...restParams
  // })
  //     .then(response => {
  //         if (response.status === 200 && response.data.status === 0) {
  //             return response.data.result;
  //         } else {
  //             throw new Error(response.data.msg);
  //         }
  //     })
  //     .catch(err => {
  //         message.error(err.message || 'Oops, 网络出错了! 刷新试试?')
  //     })
}

export default request;