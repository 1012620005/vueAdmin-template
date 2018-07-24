import request from '@/utils/request'
export function changeRole(obj) {
    return request({
      url: '/uc/sys/role/get',
      method: 'get',
      params: obj
    })
  }
  