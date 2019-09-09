<template>
  <el-container class="contentwrapper">
    <el-main>
      <div>
        <h3 class="heading">商品库商品(SPU)
          <span style="float:right;margin-top:-3px;">
            <router-link to="/goodsRepo/list">
              <el-button type="default" size="mini" style="">
                <font-awesome-icon :icon="['fas', 'file-download']" />
                导出结果
              </el-button>
            </router-link>
            <router-link to="/goodsRepo/list">
              <el-button type="default" size="mini" style="">
                <font-awesome-icon :icon="['fas', 'file-upload']" />
                批量导入
              </el-button>
            </router-link>
            <router-link to="/goodsRepo/list">
              <el-button type="default" size="mini" style="">
                <font-awesome-icon :icon="['fas', 'plus']" />
                添加商品
              </el-button>
            </router-link>
          </span>
        </h3>
      </div>

      <el-form ref="mainSearchForm" :inline="true" :model="mainForm" label-width="0">
        <el-row :gutter="0" class="main-form-row">
          <el-col :span="12">
            <el-form-item>
              <el-dropdown @command="handleCommand">
                <el-button type="default" size="mini">
                  <font-awesome-icon :icon="['fas', 'cog']" fixed-width />批量操作<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown" size="mini">
                  <el-dropdown-item v-for="item in preList.batchOpList" :command="item" :key="item.value">
                    <font-awesome-icon :icon="[item.iconType, item.icon]" fixed-width />
                    {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item>
              <cate-casecader :size="'mini'" :clearable="true"/>
            </el-form-item>
            <el-form-item>
              <el-select v-model="mainForm.selectedBrand" placeholder="请选择" size="mini" clearable>
                <el-option v-for="item in preList.brandList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini">筛选</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-form-item>
                <el-input v-model="mainForm.goodsKeyWord" placeholder="请输入商品关键字" size="mini" clearable/>
              </el-form-item>
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
        @cell-mouse-leave="handleCellMouseLeave">
        <el-table-column type="selection" />
        <el-table-column v-for="item in tableSheme" :key="item.prop" :prop="item.prop" :label="item.name" :sortable="item.sortable">
          <template slot-scope="scope">
            <goods-table-custom-td :table-user-name="'GoodsRepoList'" :current-id="currentId" :prop="item.prop" :name="item.name" :link-color="item.linkColor" :type="item.type" :data="scope.row" :is-row-menu-wrap-cell="item.isRowMenuWrapCell || false"/>
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
          @current-change="handleCurrentChange" />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import tableSheme from './goods-repo-list-table-sheme'
import goodsTableCustomTd from '../../components/pyTableCustomTd/goodsTableCustomTd'
import _ from 'lodash'
import { getProdsList } from '@/api/goodsManage'
import CateCasecader from '@/components/cateCasecader'
import { BASE_IMAGE_URL } from '@/utils/request'

export default {
  name: 'GoodsRepoList',
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
      // 搜索表单
      mainForm: {
        // 商品关键字
        goodsKeyWord: '',
        // 选择的品牌
        selectedBrand: ''
      },
      // 商品列表sheme
      tableSheme: tableSheme,
      // 当前选中商品的id
      currentId: '',
      // 表格数据
      tableData: [],
      // 接口api
      goodsRepoMapApi: {
        query: getProdsList
      },
      // 预设置数据
      preList: {
        // 批处理命令列表
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
  mounted() {
    this.getProdsListByPageNo()
  },
  methods: {
    getProdsListByPageNo() {
      this.goodsRepoMapApi.query({
        page: this.pageNav.pageNo,
        pageSize: this.pageNav.pageSize
      }).then(res => {
        const tempArr = []
        if (res.status === 200) {
          res.data.data.forEach(o => {
            // 设置分页
            this.pageNav.total = res.data.total
            tempArr.push(
              {
                id: o.id,
                thumb: `${BASE_IMAGE_URL}goods/${o.id}/${o.imageUrl}`,
                goodName: o.title,
                type: o.type.split(';'),
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
              }
            )
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
      console.log(command)
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

<style>

</style>
