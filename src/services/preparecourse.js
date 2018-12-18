import request from '../utils/request';

export async function fetchPrepareCourseList(data = {}) {
    return request({
        url: `/course/getCourseListByStatus`,
        method: 'get',
        params: { ...data, status: 1 }
    })
}

export async function deleteCourse(id) {
    return request({
        url: `/course/delCourse/${id}`,
        method: 'delete'
    })
}

export async function addCourse(data) {
    return request({
        url: `/course/addCourse`,
        method: 'post',
        data
    })
}