import request from '../utils/request';
import { Utils } from '../utils/utils';


/**
 * 修改班级信息
 * @param {Object} data 班级信息
 */
export async function modifyClassInfo(data) {
    return request({
        url: `/grade/updateGrade`,
        data,
        method: 'post'
    })
}

/**
 * 获取班级列表
 */
export async function getClass(data) {
    return request({
        url: `/grade/getGradePage`,
        params: data,
        method: 'get'
    })
}

/**
 * 删除班级
 * @param {String} id 班级识别号
 */
export async function deleteClass(id) {
    return request({
        url: `/grade/delGrade/${id}`,
        method: 'delete'
    })
}

/**
 * 新增班级
 * @param {Object} data 班级信息
 */
export async function addClass(data) {
    return request({
        url: `/grade/addGrade`,
        method: 'post',
        data
    })
}

/**
 * 模糊搜索
 * @param {String} keyword 
 */
export async function searchClass(keyword) {
    return request({
        url: `/grade/fuzzySearchByGradeName/${keyword}`,
        method: 'get'
    })
}

/**
 * 根据省份加载学校列表
 * @param {string} province 省份
 */
export async function updateSchoolList(province) {
    return request({
        url: `/school/searchByProvince/${province}`,
        method: 'get'
    })
}