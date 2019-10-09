<template>
  <el-container class="goods-manage-wrap contentwrapper">
    <el-main>
      <div>
        <h3 class="heading">配送订单</h3>
      </div>

      <el-form ref="mainSearchForm" :inline="true" :model="mainForm" label-width="0">
        <el-row :gutter="0" class="main-form-row">
          <el-col :span="12">
            <!--筛选按钮 begin-->
            <ul class="nav nav-pills py-nav">
              <li class="active">
                <a href="javascript:void(0)">
                  全部
                  <span class="badge badge-info use-plugins-num">18</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  待付款
                  <span class="badge badge-info use-plugins-num">0</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  待接单
                  <span class="badge badge-info use-plugins-num">0</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  待发货
                  <span class="badge badge-info use-plugins-num">0</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  待收货
                  <span class="badge badge-info use-plugins-num">0</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  已完成
                  <span class="badge badge-info use-plugins-num">0</span>
                </a>
              </li>
            </ul>
            <!--筛选按钮 end-->
          </el-col>
        </el-row>

        <el-row :gutter="0" class="main-form-row">
          <el-col :span="12">
            <el-form-item>
              <el-dropdown @command="handleCommand">
                <el-button type="default" size="mini">
                  <font-awesome-icon :icon="['fas', 'cog']" fixed-width />批量操作
                  <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown" size="mini">
                  <el-dropdown-item
                    v-for="item in preList.batchOpList"
                    :command="item"
                    :key="item.value"
                  >
                    <font-awesome-icon :icon="[item.iconType, item.icon]" fixed-width />
                    {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item>
              <cate-casecader :size="'mini'" :clearable="true" placeholder="请选择订单状态" />
            </el-form-item>
            <el-form-item>
              <el-select v-model="mainForm.selectedType" size="mini" clearable>
                <el-option
                  v-for="item in preList.typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item>
              <el-input
                v-model="mainForm.orderKeyWord"
                placeholder="请输入订单编号或购买者信息"
                size="mini"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        :data="tableData"
        style="width:100%;"
        header-row-class-name="py-table-header"
        stripe
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
      >
        <el-table-column
          v-for="item in tableSheme"
          :key="item.prop"
          :prop="item.prop"
          :label="item.name"
          :sortable="item.sortable"
        >
          <template slot-scope="scope">
            <goods-table-custom-td
              :table-user-name="'OnlineOrderDelivery'"
              :current-id="currentId"
              :prop="item.prop"
              :name="item.name"
              :link-color="item.linkColor"
              :type="item.type"
              :data="scope.row"
              :is-row-menu-wrap-cell="item.isRowMenuWrapCell || false"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import tableSheme from './delivery-orders-list-sheme.js'
import goodsTableCustomTd from '@/components/pyTableCustomTd/goodsTableCustomTd'
import { getOrderList } from '@/api/orderManage'

export default {
  components: {
    goodsTableCustomTd
  },
  data() {
    return {
      // 当前选择的记录id
      currentId: '',
      // 分页导航
      pageNav: {
        total: 0,
        pageNo: 1,
        pageSize: 10
      },
      // 列表数据
      tableData: [],
      // 订单列表sheme
      tableSheme: tableSheme,
      orderManageMapApi: {
        query: getOrderList
      },
      // 主表单
      mainForm: {
        // 批量操作
        batchOp: {
          value: '-1',
          label: '批量操作',
          icon: ''
        },
        // 订单关键字
        orderKeyWord: '',
        selectedType: '-1'
      },
      preList: {
        // 订单状态列表
        typeList: [
          {
            value: '-1',
            label: '订单状态'
          },
          {
            value: '0',
            label: '待付款'
          },
          {
            value: '1',
            label: '待接单'
          },
          {
            value: '2',
            label: '待发货'
          },
          {
            value: '3',
            label: '已发货'
          },
          {
            value: '4',
            label: '已完成'
          },
          {
            value: '5',
            label: '取消'
          },
          {
            value: '6',
            label: '退货'
          },
          {
            value: '7',
            label: '部分发货'
          }
        ],
        // 批量操作列表（可用）
        batchOpList: [
          {
            value: '0',
            label: '接单',
            iconType: 'fas',
            icon: 'arrow-alt-circle-down'
          },
          {
            value: '1',
            label: '删除',
            iconType: 'fas',
            icon: 'arrow-alt-circle-down'
          },
          {
            value: '2',
            label: '取消',
            iconType: 'fas',
            icon: 'arrow-alt-circle-down'
          },
          {
            value: '3',
            label: '打印订单',
            iconType: 'fas',
            icon: 'arrow-alt-circle-down'
          }
        ]
      }
    }
  },
  mounted() {
    this.geOrdersListByPageNo()
  },
  methods: {
    // 翻页动作
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageNav.pageSize = val
      this.geOrdersListByPageNo()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pageNav.pageNo = val
      this.geOrdersListByPageNo()
    },
    // 鼠标经过单元格
    handleCellMouseEnter(row, column, cell, event) {
      _.forEach(this.tableSheme, (value, index) => {
        if ('isRowMenuWrapCell' in value) {
          value.isRowMenuWrapCell = true
          this.currentId = row.id
        }
      })
    },
    // 鼠标离开
    handleCellMouseLeave(row, column, cell, event) {
      _.forEach(this.tableSheme, (value, index) => {
        if ('isRowMenuWrapCell' in value) {
          value.isRowMenuWrapCell = false
        }
      })
    },
    handleCommand(command) {
      // console.log(command)
      this.mainForm.batchOp = command
    },
    geOrdersListByPageNo() {
      this.orderManageMapApi
        .query({
          page: this.pageNav.pageNo,
          pageSize: this.pageNav.pageSize
        })
        .then(res => {
          // console.log(res)
          const tempArr = []
          if (res.status === 200) {
            // 设置分页
            this.pageNav.total = res.data.total
            res.data.data.forEach(o => {
              tempArr.push({
                id: o.id,
                sellerName: '无此数据记录',
                orderTime: o.timestamp,
                buyerInfo: `收件人： ${o.receiver}    联系电话： ${o.phone}    收件地址: ${o.province +
                  o.city +
                  o.region +
                  o.detail}`,
                totalPrice: o.totalPrice,
                totalPay: o.totalPrice,
                status: o.status
              })
            })
            this.tableData = tempArr
          }
        })
    }
  }
}
</script>

<style lang="scss"></style>
