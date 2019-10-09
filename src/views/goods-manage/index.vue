<template>
  <el-container class="goods-manage-wrap contentwrapper">
    <el-main>
      <div>
        <h3 class="heading">在售商品列表(SPU)</h3>
      </div>

      <el-form ref="mainSearchForm" :inline="true" :model="mainForm" label-width="0">
        <el-row :gutter="0" class="main-form-row">
          <el-col :span="12">
            <!--出售中 begin-->
            <ul class="nav nav-pills py-nav">
              <li class="active">
                <a href="javascript:void(0)">
                  出售中
                  <span class="badge badge-info use-plugins-num">18</span>
                </a>
              </li>
            </ul>
            <!--出售中 end-->
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
          </el-col>

          <el-col :span="12">
            <el-form-item>
              <cate-casecader :size="'mini'" :clearable="true" placeholder="请选择分类" />
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
        // 批量操作
        batchOp: {
          value: '-1',
          label: '批量操作',
          icon: ''
        },
        // 商品关键字
        goodsKeyWord: '',
        selectedType: '0'
      },
      preList: {
        // 营销分类列表
        typeList: [
          {
            value: '0',
            label: '全部'
          },
          {
            value: '1',
            label: '精品'
          },
          {
            value: '2',
            label: '新品'
          },
          {
            value: '3',
            label: '热销'
          }
        ],
        // 批量操作列表（可用）
        batchOpList: [
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
            value: '0',
            label: '移至回收站',
            iconType: 'fas',
            icon: 'archive'
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
