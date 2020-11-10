import request from "../utils/request";

export function listByCollege(college) {
    return request({
        url: '/lanqiao?college=' + college,
        method: 'GET',
    })
}

export function apply(data) {
    return request({
        url: '/lanqiao/apply',
        method: 'POST',
        data: data,
    })
}


export function deleteById(id) {
    return request({
        url: `/lanqiao/${id}`,
        method: 'DELETE',
    })
}
