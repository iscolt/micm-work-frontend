import request from "../utils/request";

export function listByStatus(status) {
    return request({
        url: `/homework/${status}`,
        method: 'GET',
    })
}

export function bindEmail(data) {
    return request({
        url: '/student/bind/email',
        method: 'GET',
        data: data,
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
