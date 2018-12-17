import request from '../utils/request';

export async function fetchProvinceList() {
    return request({
        url: `/province/getProvincePage`,
        methods: 'get',
        params: {
            pageSize: 10,
            status: 1,
            current: 0
        }
    })
}