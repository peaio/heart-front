import request from '@/utils/request'

export default {
    basePath:'',
    list(data) {
        return request({
            url: this.basePath,
            method: 'post',
            data
        })
    },
    get(id) {
        return request({
            url: `${this.basePath}/${id}`,
            method: 'get'
        })
    },
    save(data) {
        return request({
            url: this.basePath,
            method: 'patch',
            data
        })
    },
    del(id) {
        return request({
            url: `${this.basePath}/${id}`,
            method: 'delete'
        })
    }
}