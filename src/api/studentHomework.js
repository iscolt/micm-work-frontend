import request from "../utils/request";

export function changeStatus(sHId) {
    return request({
        url: `/student/homework/status/${sHId}`,
        method: 'GET',
    })
}


