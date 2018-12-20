import request from '../utils/request';

export async function fetchRootNode(courseId) {
    return request({
        url: `/courseNode/findCourseNodeByIsRoot/true/${courseId}`,
        method: 'post'
    })
}

export async function dynamicLoadNode({ parentKey, courseId }) {
    return request({
        url: `/courseNode/findCourseNode/${parentKey}/${courseId}`,
        method: 'post'
    })
}

export async function deleteNode(id) {
    return request({
        url: `/courseNode/delCourseNode/${id}`,
        method: 'post'
    })
}

export async function addCourseNode(data) {
    return request({
        url: `/courseNode/addCourseNode`,
        method: 'post',
        data
    })
}

export async function loadFile(id) {
    return request({
        url: `/courseNode/loadFile/${id}`,
        method: 'get'
    })
}

export async function updateFileContent(data) {
    return request({
        url: `/courseNode/updateContentById`,
        method: 'post',
        data
    })
}

export async function updateNodeName(data) {
    return request({
        url: `/courseNode/updateCourseNodeName`,
        method: 'post',
        data
    })
}