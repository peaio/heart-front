import request from '@/utils/request'

const restfulPath = 'teacher'

export function list(data) {
    return request({
        url: restfulPath,
        method: 'post',
        data
    })
}
export function get(id) {
    return request({
        url: `${restfulPath}/${id}`,
        method: 'get'
    })
}
export function save(data) {
    return request({
        url: restfulPath,
        method: 'patch',
        data
    })
}
export function del(id) {
    return request({
        url: `${restfulPath}/${id}`,
        method: 'delete'
    })
}