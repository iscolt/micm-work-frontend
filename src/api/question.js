import request from "../utils/request";

export function listBySubject(subject) {
    return request({
        url: `/question?subject=${subject}`,
        method: 'GET',
    })
}

export function listSubject() {
    return request({
        url: `/question/subject`,
        method: 'GET',
    })
}

