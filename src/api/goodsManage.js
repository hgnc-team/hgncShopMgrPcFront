import request from '@/utils/request'

// 2019-05-19
export function getProdsList(data) {
  return request({
    url: '/v1/api/goods/list',
    method: 'post',
    data: data
  })
}

// 商品分类管理相关接口
// 获取顶级分类
export function getTopClass(data) {
  return request({
    url: '/v1/api/goods/topClass',
    method: 'post',
    data
  })
}

// 获取商品二级分类
export function getSecondClass(data) {
  return request({
    url: '/v1/api/goods/secondClass',
    method: 'post',
    data
  })
}

// 2019-05-21
// http://yapi.maiyidesan.cn:3000/project/24/interface/api/471
// 商品库中新建商品
export function addProdToRepo(data) {
  return request({
    url: '/v1/api/goods/create',
    method: 'post',
    data
  })
}

// 2019-05-22
// http://yapi.maiyidesan.cn:3000/project/24/interface/api/461
// 回收站商品列表
export function getGoodsRecycleBinList(data) {
  return request({
    url: '/v1/api/goods/recycle/list',
    method: 'post',
    data
  })
}

// 2019-05-24
// http://yapi.maiyidesan.cn:3000/project/24/interface/api/467
// 商品列表中删除商品(移入回收站)
export function goodsFakeDel(ids) {
  return request({
    url: '/v1/api/goods/del',
    method: 'post',
    data: {
      ids
    }
  })
}

// 2019-05-26
// http://yapi.maiyidesan.cn:3000/project/15/interface/api/455
// oss上传图片
export function uploadImagesToOSS(data) {
  return request({
    url: '/v1/api/user/images/upload',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 2019-05-26
// http://yapi.maiyidesan.cn:3000/project/15/interface/api/457
// 存储到oss上我的图片列表
export function getOSSImagesList(data) {
  return request({
    url: '/v1/api/user/images/myImages',
    method: 'post',
    data
  })
}

// 2019-05-26
// http://yapi.maiyidesan.cn:3000/project/15/interface/api/459
// 删除存储到oss上的图片
export function delOSSImage(ids) {
  return request({
    url: '/v1/api/user/images/delete',
    method: 'post',
    data: {
      ids
    }
  })
}

// 2019-05-27
// http://yapi.maiyidesan.cn:3000/project/24/interface/api/465
// 删除回收站中的商品
// /v1/api/goods/recycle/clear
export function delRecycleBinGoods(ids) {
  return request({
    url: '/v1/api/goods/recycle/clear',
    method: 'post',
    data: {
      ids
    }
  })
}

// 2019-05-27
// http://yapi.maiyidesan.cn:3000/project/24/interface/api/463
// 恢复回收站中的商品到商品库中
// /v1/api/goods/recycle/recover
export function recoverRecycleBinGoods(ids) {
  return request({
    url: '/v1/api/goods/recycle/recover',
    method: 'post',
    data: {
      ids
    }
  })
}

// 2019-05-29
// http://yapi.maiyidesan.cn:3000/project/24/interface/api/469
// 编辑商品
export function editProd(data) {
  return request({
    url: '/v1/api/goods/edit',
    method: 'post',
    data
  })
}

// 2019-06-04
//  http://yapi.maiyidesan.cn:3000/project/24/interface/api/473
// 添加品牌
export function addBrand(data) {
  return request({
    url: '/v1/api/brand/add',
    method: 'post',
    data
  })
}

// http://yapi.maiyidesan.cn:3000/project/24/interface/api/477
// 获取品牌列表
export function getBrandsList(data) {
  return request({
    url: '/v1/api/brand/list',
    method: 'post',
    data
  })
}

// http://yapi.maiyidesan.cn:3000/project/24/interface/api/479
// 删除品牌
export function delBrands(ids) {
  return request({
    url: '/v1/api/brand/delete',
    method: 'post',
    data: {
      ids
    }
  })
}

// http://yapi.maiyidesan.cn:3000/project/24/interface/api/475
// 编辑品牌
export function editBrands(data) {
  return request({
    url: '/v1/api/brand/edit',
    method: 'post',
    data
  })
}
