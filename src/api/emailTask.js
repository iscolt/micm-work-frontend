import request from "../utils/request";

export function listByStatus(status) {
    return request({
        url: `/email/task/${status}`,
        method: 'GET',
    })
}

/**
 * 订阅提醒
 * @param data {homework, hour}
 * @returns {AxiosPromise}
 */
export function rss(data) {
    return request({
        url: `/email/task/rss?hour=`+data.hour,
        method: 'POST',
        data: data.homework
    })
}

export function del(taskId) {
    return request({
        url: `/email/task/${taskId}`,
        method: 'DELETE',
    })
}

/**
 * 冻结/解冻
 * @param taskId
 * @returns {AxiosPromise}
 */
export function freeze(taskId) {
    return request({
        url: `/email/task/freeze/${taskId}`,
        method: 'GET',
    })
}
