import request from '@/utils/request'

export default {
  apiName: '',
  setApiName(apiName) {
    this.apiName = apiName
    return this
  },
  list(data = {}) {
    return request({
      url: this.apiName,
      method: 'post',
      data
    })
  },
  get(id) {
    return request({
      url: `${this.apiName}/${id}`,
      method: 'get'
    })
  },
  save(data) {
    return request({
      url: this.apiName,
      method: 'patch',
      data
    })
  },
  del(id) {
    return request({
      url: `${this.apiName}/${id}`,
      method: 'delete'
    })
  }
}
