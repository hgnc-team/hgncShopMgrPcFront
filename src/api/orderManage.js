import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: '/v1/api/order/all',
    method: 'post',
    data: data
  })
}
