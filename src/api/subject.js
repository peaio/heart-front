import commonApi from '@/api/common-api'
import request from '@/utils/request'

const subjectApi = { ...commonApi }
subjectApi.setApiName('subjects')
subjectApi.tree = () => {
  return request({
    url: `${subjectApi.apiName}/tree`,
    method: 'get'
  })
}
export default subjectApi
