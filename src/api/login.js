import request from '@/utils/request'
export function login(obj) {
  return request({
    url: '/uc/oauth/token',
    method: 'post',
    data: obj,
    headers: {
      'grant_type': 'password',
      'authorization': 'Basic cmM6cmNw'
    },
  })
}

export function getInfo(token) {
  return request({
    url: '/uc/sys/user/getCurrentUser',
    method: 'get',
    params: { 'access_token': token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
