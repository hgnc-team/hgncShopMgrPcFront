import request from '@/utils/request'
// 登录接口 2019-05-17
export function loginByUsername(name, pwd) {
  const data = {
    name,
    pwd
  }
  // 直营店店长登录
  return request({
    url: '/v1/api/user/sellerLogin',
    method: 'post',
    data
  })
}
// 登出接口 2019-05-19
export function logout() {
  return request({
    url: '/v1/api/user/adminLogout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/v1/api/user/me',
    method: 'post'
  })
}

// 2019-06-04
// http://yapi.maiyidesan.cn:3000/project/15/interface/api/435
export function refreshToken() {
  return request({
    url: '/v1/api/user/refleshToken',
    method: 'post'
  })
}
