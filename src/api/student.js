import request from "../utils/request";

export function login(data) {
    return request({
        url: '/student/login',
        method: 'POST',
        data: data,
    })
}

export function importFormExcel(data) {
    return request({
        url: '/student/import/excel',
        method: 'POST',
        data: data,
    })
}

export function list(data) {
    return request({
        url: '/student',
        method: 'GET',
        data: data,
    })
}

export function bindEmail(email) {
    return request({
        url: '/student/bind/email?email=' + email,
        method: 'GET',
    })
}

/**
 * 冻结/解冻
 * @param stuId
 * @returns {AxiosPromise}
 */
export function freeze(stuId) {
    return request({
        url: `/student/freeze/${stuId}`,
        method: 'GET',
    })
}
