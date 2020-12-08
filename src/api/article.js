import request from "../utils/request";

export function list() {
    return request({
        url: `/article`,
        method: 'GET',
    })
}

export function add(data) {
    return request({
        url: `/article/add`,
        method: 'POST',
        data
    })
}
