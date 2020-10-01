import request from "../utils/request";

export function listByStatus(status) {
    return request({
        url: `/homework/${status}`,
        method: 'GET',
    })
}

export function add(data) {
    return request({
        url: '/homework',
        method: 'POST',
        data: data,
    })
}

export function del(id) {
    return request({
        url: '/homework/' + id,
        method: 'DELETE',
    })
}

export function subDetail(id) {
    return request({
        url: `/homework/student/${id}`,
        method: 'GET',
    })
}
