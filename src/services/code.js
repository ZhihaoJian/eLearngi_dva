import request from '../utils/request';

/**
 * 轮询相似度检测
 * @param {string} url 轮询地址
 */
export async function fetchProcessQueryStatus(url) {
    return request({
        url,
        method: 'get'
    })
}

export async function detectCode(formData) {
    return request({
        method: 'post',
        url: `/detect`,
        data: formData
    })
}