import commonApi from '@/api/common-api'
import request from '@/utils/request'

const courseApi = { ...commonApi }.setApiName('course')
courseApi.publish = id => {
  return request({
    url: `${courseApi.apiName}/publish/${id}`,
    method: 'put'
  })
}
export default courseApi
