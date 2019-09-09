<template>
  <el-container class="goods-manage-wrap contentwrapper">
    <el-main>
      <div>
        <h3 class="heading">商品管理</h3>
      </div>

      <el-form ref="mainSearchForm" :inline="true" :model="mainForm" label-width="0">
        <el-row :gutter="0" class="main-form-row">
          <el-col :span="12">
            <!--全部/已上架/未上架/自营 begin-->
            <ul class="nav nav-pills py-nav">
              <li class="active">
                <a href="javascript:void(0)">
                  全部
                  <span class="badge badge-info use-plugins-num">18</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  已上架
                  <span class="badge badge-info use-plugins-num">18</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  未上架
                  <span class="badge badge-info use-plugins-num">18</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  自营
                  <span class="badge badge-info use-plugins-num">18</span>
                </a>
              </li>
            </ul>
            <!--全部/已上架/未上架/自营 end-->
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-input
                v-model="mainForm.sellerKeyWord"
                placeholder="请输入商家关键字"
                size="mini"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="mainForm.goodsKeyWord"
                placeholder="请输入商品关键字"
                size="mini"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="mini">搜索</el-button>
            </el-form-item>
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
              <el-select
                v-model="mainForm.reviewStatus"
                size="mini"
                placeholder="请选择审核状态"
                value-key="value"
                clearable
              >
                <el-option
                  v-for="item in preList.reviewStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-select
                v-model="mainForm.seller"
                size="mini"
                placeholder="请选商家"
                value-key="value"
                clearable
              >
                <el-option
                  v-for="item in preList.sellerList"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="mini">筛选</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item>
              <cate-casecader :size="'mini'" :clearable="true" placeholder="请选择分类" />
            </el-form-item>
            <el-form-item>
              <el-select v-model="mainForm.selectedBrand" placeholder="请选择品牌" size="mini" clearable>
                <el-option
                  v-for="item in preList.brandList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
        <el-table-column type="selection" />
        <el-table-column
          v-for="item in tableSheme"
          :key="item.prop"
          :prop="item.prop"
          :label="item.name"
          :sortable="item.sortable"
        >
          <template slot-scope="scope">
            <goods-table-custom-td
              :table-user-name="'GoodsManageIndex'"
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
      <div class="pageNavWrap">
        <el-pagination
          :current-page="pageNav.pageNo"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageNav.pageSize"
          :total="pageNav.total"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>
    <router-view />
  </el-container>
</template>

<script>
import tableSheme from './goods-list-table-sheme'
// import tableDataForTest from './goods-list-table-test-data'
import goodsTableCustomTd from '../../components/pyTableCustomTd/goodsTableCustomTd'
import _ from 'lodash'
import { getProdsList } from '@/api/goodsManage'
import CateCasecader from '@/components/cateCasecader'
import { BASE_IMAGE_URL } from '@/utils/request'

export default {
  name: 'GoodsManageIndex',
  components: {
    goodsTableCustomTd,
    CateCasecader
  },
  data() {
    return {
      // 分页导航
      pageNav: {
        total: 0,
        pageNo: 1,
        pageSize: 10
      },
      goodsManageMapApi: {
        query: getProdsList
      },
      // 一个蹩脚的办法，当前商品列表 和 编辑商品被组成了父子路由关系
      // 为的是在面包屑导航上显示出"首页/商品列表/编辑商品"的效果
      // 引起另一个问题，父子路由同时显示在页面上，
      // currentLevel 指定当前页面显示的路由深度 0 代表父 1 代表子 2代表孙依次类推
      currentLevel: 0,
      // 商品列表sheme
      tableSheme: tableSheme,
      // 当前选中商品的id
      currentId: '',
      // 表格数据
      tableData: [],
      mainForm: {
        // 审核状态
        reviewStatus: {
          value: '-1',
          label: '请选择审核状态'
        },
        // 商家
        seller: {
          value: '-1',
          label: '请选择商家'
        },
        // 批量操作
        batchOp: {
          value: '-1',
          label: '批量操作',
          icon: ''
        },
        // 商家关键字
        sellerKeyWord: '',
        // 商品关键字
        goodsKeyWord: '',
        // 品牌
        selectedBrand: ''
      },
      preList: {
        // 选择审核状态预置选项
        reviewStatusList: [
          {
            value: '0',
            label: '未审核'
          },
          {
            value: '1',
            label: '审核未通过'
          },
          {
            value: '2',
            label: '已审核'
          },
          {
            value: '3',
            label: '无需审核'
          }
        ],
        // 选择商家预置选项
        sellerList: [
          {
            value: '0',
            label: '天天果园'
          },
          {
            value: '1',
            label: '测试入住店铺'
          }
        ],
        // 批量操作列表（可用）
        batchOpList: [
          {
            value: '0',
            label: '移至回收站',
            iconType: 'fas',
            icon: 'archive'
          },
          {
            value: '1',
            label: '上架',
            iconType: 'fas',
            icon: 'arrow-alt-circle-up'
          },
          {
            value: '2',
            label: '下架',
            iconType: 'fas',
            icon: 'arrow-alt-circle-down'
          },
          {
            value: '3',
            label: '精品',
            iconType: 'fas',
            icon: 'star'
          },
          {
            value: '4',
            label: '取消精品',
            iconType: 'far',
            icon: 'star'
          },
          {
            value: '5',
            label: '新品',
            iconType: 'fas',
            icon: 'flag'
          },
          {
            value: '6',
            label: '取消新品',
            iconType: 'far',
            icon: 'flag'
          },
          {
            value: '7',
            label: '热销',
            iconType: 'fas',
            icon: 'thumbs-up'
          },
          {
            value: '8',
            label: '取消热销',
            iconType: 'far',
            icon: 'thumbs-up'
          },
          {
            value: '9',
            label: '转移到分类',
            iconType: 'fas',
            icon: 'share'
          },
          {
            value: '10',
            label: '审核通过',
            iconType: 'fas',
            icon: 'check-circle'
          },
          {
            value: '11',
            label: '审核未通过',
            iconType: 'fas',
            icon: 'times-circle'
          },
          {
            value: '12',
            label: '设为未审核',
            iconType: 'fas',
            icon: 'question-circle'
          },
          {
            value: '13',
            label: '无需审核',
            iconType: 'fas',
            icon: 'dot-circle'
          }
        ],
        // 品牌列表
        brandList: [
          {
            value: '0',
            label: '尤妮佳'
          },
          {
            value: '1',
            label: '香奈儿'
          },
          {
            value: '2',
            label: 'SKII'
          },
          {
            value: '3',
            label: '华为'
          },
          {
            value: '4',
            label: '海尔'
          }
        ]
      }
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to)
  //   console.log(from)
  //   if (to.name === 'prodEditIndex') {
  //     this.currentLevel = 1
  //     // alert(1)
  //   }
  //   next()
  // },
  mounted() {
    this.$root.eventHub.$on('refreshGoodsListEvent', this.getProdsListByPageNo)
    this.getProdsListByPageNo()
  },
  methods: {
    getProdsListByPageNo() {
      this.goodsManageMapApi
        .query({
          // type: "39",
          page: this.pageNav.pageNo,
          pageSize: this.pageNav.pageSize
          // 一下排序字段要么传，要么不传
          // orderBy: [
          //   [
          //     'price',
          //     'desc'
          //   ]
          // ]
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
                thumb: `${BASE_IMAGE_URL}goods/${o.id}/${o.imageUrl}`,
                type: o.type.split(';'),
                goodName: o.title,
                sellerName: '后台无此列数据', // to do
                reviewStatus: 1,
                goodsNo: o.id,
                price: o.price,
                onSale: o.alive === 1, // 1 上架 0下架
                prime: true,
                new: true,
                hot: true,
                inventory: o.inventory,
                sort: 0
              })
            })
            this.tableData = tempArr
          }
        })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageNav.pageSize = val
      this.getProdsListByPageNo()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pageNav.pageNo = val
      this.getProdsListByPageNo()
    },
    handleCommand(command) {
      // console.log(command)
      this.mainForm.batchOp = command
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
    handleCellMouseLeave(row, column, cell, event) {
      _.forEach(this.tableSheme, (value, index) => {
        if ('isRowMenuWrapCell' in value) {
          value.isRowMenuWrapCell = false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
