import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'home', noCache: true }
      }
    ]
  },
  {
    // 商品管理
    path: '/goodsManage',
    component: Layout,
    redirect: '/goodsManage/index',
    meta: { title: 'goodsManage', icon: 'cubes', noCache: true },
    children: [
      // 在售商品
      {
        path: 'index',
        component: () => import('@/views/goods-manage/index'),
        name: 'goodsList',
        meta: { title: '在售商品', icon: 'shopping-cart', noCache: true }
      },
      // 售罄商品
      {
        path: 'sold-out',
        component: () => import('@/views/goods-manage/goods-sold-out-list.vue'),
        name: 'goodsSoldOutList',
        meta: { title: '售罄商品', icon: 'inbox', noCache: true }
      },
      // 下架商品
      {
        path: 'goods-off-the-shelves',
        component: () => import('@/views/goods-manage/goods-off-the-shelves.vue'),
        name: 'goodsOffTheShelvesList',
        meta: { title: '下架商品', icon: 'arrow-down', noCache: true }
      },
      // 审核商品
      {
        path: 'goods-tobe-verified',
        component: () => import('@/views/goods-manage/goods-tobe-verified.vue'),
        name: 'goodsTobeVerifiedList',
        meta: { title: '审核商品', icon: 'history', noCache: true }
      }
      // // 散装商品
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '散装商品', icon: 'calendar', noCache: true }
      // },
      // // 收银台商品
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   // icon 没有empire?
      //   meta: { title: '收银台商品', icon: 'empire', noCache: true }
      // },
      // // 商品回收站
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '商品回收站', icon: 'recycle', noCache: true }
      // },
      // // 一键导入
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '一键导入', icon: 'mail-reply-all', noCache: true }
      // },
      // // 添加新商品
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '添加新商品', icon: 'plus-square-o', noCache: true }
      // },
      // // 商品分类
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '商品分类', icon: 'th-large', noCache: true }
      // },
      // // 商品规格
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '商品规格', icon: 'delicious', noCache: true }
      // },
      // // 商品参数
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '商品参数', icon: 'thumb-tack', noCache: true }
      // }
    ]
  },
  {
    // 订单管理
    path: '/ordersManage',
    component: Layout,
    redirect: '/ordersManage/index',
    meta: { title: '订单管理', icon: 'list', noCache: true },
    children: [
      // 当天订单
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '当天订单', icon: 'sun-o', noCache: true }
      // },
      // 催单提醒
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '催单提醒', icon: 'fa-bell-o', noCache: true }
      // },
      // 验单查询
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '验单查询', icon: 'check-circle', noCache: true }
      // },
      // 配送订单
      {
        path: 'index',
        component: () => import('@/views/orders-manage/index'),
        name: 'goodsList',
        meta: { title: '配送订单', icon: 'truck', noCache: true }
      },
      // 到店订单
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '到店订单', icon: 'clipboard', noCache: true }
      // },
      // 自提订单
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '自提订单', icon: 'briefcase', noCache: true }
      // },
      // 团购订单
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '团购订单', icon: 'group', noCache: true }
      // },
      // 收银台订单
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '收银台订单', icon: 'codepen', noCache: true }
      // },
      // 售后列表
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '售后列表', icon: 'institution', noCache: true }
      // },
      // 发货单列表
      {
        path: 'index',
        component: () => import('@/views/goods-manage/index'),
        name: 'goodsList',
        meta: { title: '发货单列表', icon: 'check-square', noCache: true }
      }
      // 评论列表
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '评论列表', icon: 'comment', noCache: true }
      // },
      // 申诉列表
      // {
      //   path: 'index',
      //   component: () => import('@/views/goods-manage/index'),
      //   name: 'goodsList',
      //   meta: { title: '申诉列表', icon: 'exclamation-circle', noCache: true }
      // }
    ]
  },
  // {
  //   // 买单管理
  //   path: '/buyOrderManage',
  //   component: Layout,
  //   redirect: '/buyOrderManage/index',
  //   meta: { title: '买单管理', icon: 'list', noCache: true },
  //   children: [
  //     // 优惠买单规则
  //     {
  //       path: 'index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'goodsList',
  //       meta: { title: '优惠买单规则', icon: 'cogs', noCache: true }
  //     },
  //     // 订单列表
  //     {
  //       path: 'index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'goodsList',
  //       meta: { title: '订单列表', icon: 'list-ul', noCache: true }
  //     },
  //     // 买单订单查询
  //     {
  //       path: 'index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'goodsList',
  //       meta: { title: '买单订单查询', icon: 'fa-search', noCache: true }
  //     },
  //     // 买单订单查询
  //     {
  //       path: 'index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'goodsList',
  //       meta: { title: '买单订单统计', icon: 'fa-bar-chart-o', noCache: true }
  //     },
  //     // 买单订单明细
  //     {
  //       path: 'index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'goodsList',
  //       meta: { title: '买单订单明细', icon: 'fa-list', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   // 促销
  //   path: '/promotion',
  //   component: Layout,
  //   redirect: '/promotion/index',
  //   meta: { title: '促销', icon: 'list', noCache: true },
  //   children: [
  //     // 促销活动
  //     {
  //       path: '/index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'promotionActivity',
  //       meta: { title: '促销活动', icon: 'fa-heart', noCache: true }
  //     },
  //     // 红包类型
  //     {
  //       path: '/redPacket',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'redPacket',
  //       meta: { title: '红包类型', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 优惠活动
  //     {
  //       path: '/preferentialActivity',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'preferentialActivity',
  //       meta: { title: '优惠活动', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 团购活动
  //     {
  //       path: '/groupBuy',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'groupBuy',
  //       meta: { title: '团购活动', icon: 'fa-ticket', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   // 报表
  //   path: '/report',
  //   component: Layout,
  //   redirect: '/report/index',
  //   meta: { title: '报表', icon: 'list', noCache: true },
  //   children: [
  //     // 搜索关键字
  //     {
  //       path: '/index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'keywords',
  //       meta: { title: '搜索关键字', icon: 'fa-search', noCache: true }
  //     },
  //     // 订单统计
  //     {
  //       path: '/orderStatistics',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'orderStatistics',
  //       meta: { title: '订单统计', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 销售概况
  //     {
  //       path: '/salesOverview',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'salesOverview',
  //       meta: { title: '销售概况', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 销售明细
  //     {
  //       path: '/salesDetail',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'salesDetail',
  //       meta: { title: '销售明细', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 销售排行
  //     {
  //       path: '/salesSort',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'salesSort',
  //       meta: { title: '销售排行', icon: 'fa-ticket', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   // 员工
  //   path: '/employee',
  //   component: Layout,
  //   redirect: '/employee/index',
  //   meta: { title: '员工', icon: 'list', noCache: true },
  //   children: [
  //     // 员工管理
  //     {
  //       path: '/index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'employeeManage',
  //       meta: { title: '员工管理', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 员工日志
  //     {
  //       path: '/employeeLog',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'employeeLog',
  //       meta: { title: '员工日志', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 配送员管理
  //     {
  //       path: '/distributor',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'distributor',
  //       meta: { title: '配送员管理', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 配送员资金对账
  //     {
  //       path: '/distributorCashCheck',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'distributorCashCheck',
  //       meta: { title: '配送员资金对账', icon: 'fa-ticket', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   // 会员
  //   path: '/member',
  //   component: Layout,
  //   redirect: '/member/index',
  //   meta: { title: '会员', icon: 'list', noCache: true },
  //   children: [
  //     // 商家会员
  //     {
  //       path: '/index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'customerMember',
  //       meta: { title: '商家会员', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 商家粉丝
  //     {
  //       path: '/customerFans',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'customerFans',
  //       meta: { title: '商家粉丝', icon: 'fa-ticket', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   // 结算
  //   path: '/settleAccounts',
  //   component: Layout,
  //   redirect: '/settleAccounts/index',
  //   meta: { title: '结算', icon: 'list', noCache: true },
  //   children: [
  //     // 资金管理
  //     {
  //       path: '/index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'cashManagement',
  //       meta: { title: '资金管理', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 月账单
  //     {
  //       path: '/billInMonth',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'billInMonth',
  //       meta: { title: '月账单', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 日账单
  //     {
  //       path: '/billInDay',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'billInDay',
  //       meta: { title: '日账单', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 订单分成
  //     {
  //       path: '/billPercentage',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'billPercentage',
  //       meta: { title: '订单分成', icon: 'fa-ticket', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   // 配送
  //   path: '/delivery',
  //   component: Layout,
  //   redirect: '/delivery/index',
  //   meta: { title: '配送', icon: 'list', noCache: true },
  //   children: [
  //     // 运费模板
  //     {
  //       path: '/index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'deliveryChargeTemplate',
  //       meta: { title: '运费模板', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 平台配送
  //     {
  //       path: '/deliveryByPlatform',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'deliveryByPlatform',
  //       meta: { title: '平台配送', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 商家配送
  //     {
  //       path: '/deliveryBySelf',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: '/deliveryBySelf',
  //       meta: { title: '商家配送', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 历史配送
  //     {
  //       path: '/deliveryHistory',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'deliveryHistory',
  //       meta: { title: '历史配送', icon: 'fa-ticket', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   // 店铺
  //   path: '/shopManage',
  //   component: Layout,
  //   redirect: '/shopManage/index',
  //   meta: { title: '店铺', icon: 'list', noCache: true },
  //   children: [
  //     // 店铺设置
  //     {
  //       path: '/index',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'shopSetting',
  //       meta: { title: '店铺设置', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 入驻信息
  //     {
  //       path: '/settledInfo',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: 'settledInfo',
  //       meta: { title: '入驻信息', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 收款账号
  //     {
  //       path: '/moneyInAccount',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: '/moneyInAccount',
  //       meta: { title: '收款账号', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 收款账号
  //     {
  //       path: '/shopOutOfWork',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: '/shopOutOfWork',
  //       meta: { title: '店铺打样', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 小票机
  //     {
  //       path: '/ticketMachine',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: '/ticketMachine',
  //       meta: { title: '小票机', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 店铺向导
  //     {
  //       path: '/shopGuide',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: '/shopGuide',
  //       meta: { title: '店铺向导', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 公众平台
  //     {
  //       path: '/wexinPlatform',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: '/wexinPlatform',
  //       meta: { title: '公众平台', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 小程序
  //     {
  //       path: '/weixinMicroProgram',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: '/weixinMicroProgram',
  //       meta: { title: '小程序', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 条码秤
  //     {
  //       path: '/weigherWitchCode',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: '/weigherWitchCode',
  //       meta: { title: '条码秤', icon: 'fa-ticket', noCache: true }
  //     },
  //     // 收银设备
  //     {
  //       path: '/casherMachine',
  //       component: () => import('@/views/goods-manage/index'),
  //       name: '/casherMachine',
  //       meta: { title: '收银设备', icon: 'fa-ticket', noCache: true }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
