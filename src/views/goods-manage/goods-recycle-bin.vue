<template>
  <el-container class="goods-recycle-bin-wrap contentwrapper">
    <el-main>
      <div>
        <h3 class="heading">商品管理
          <span style="float:right;margin-top:-3px;">
            <router-link to="/goodsManage/index">
              <el-button type="default" size="mini" style="">
                <font-awesome-icon :icon="['fas', 'reply']" />
                返回商品列表
              </el-button>
            </router-link>
          </span>
        </h3>
      </div>

      <el-form ref="mainSearchForm" :inline="true" :model="mainForm" label-width="0">
        <el-row :gutter="0" class="main-form-row">
          <el-col :span="12">
            <!--全部/已上架/未上架/自营 begin-->
            <ul class="nav nav-pills py-nav">
              <li class="active">
                <a href="javascript:void(0)">全部
                  <span class="badge badge-info use-plugins-num">18</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">自营
                  <span class="badge badge-info use-plugins-num">18</span>
                </a>
              </li>
            </ul>
            <!--全部/已上架/未上架/自营 end-->
          </el-col>
          <el-col :span="12">
            &nbsp;
          </el-col>
        </el-row>

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
          </el-col>

          <el-col :span="12">
            <el-form-item>
              <cate-casecader :size="'mini'" :placeholder="'所有分类'" :clearable="true"/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="mainForm.sellerKeyWord" placeholder="请输入商家关键字" size="mini" clearable/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="mainForm.goodsKeyWord" placeholder="请输入商品关键字" size="mini" clearable/>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="mini">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- {{ multipleSelection }} -->
      <el-table
        :data="tableData"
        style="width:100%;"
        header-row-class-name="py-table-header"
        stripe
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column v-for="item in tableSheme" :key="item.prop" :prop="item.prop" :label="item.name" :sortable="item.sortable" :width="item.width">
          <template slot-scope="scope">
            {{ scope.row[item.prop] }}
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="90">
          <template slot-scope="scope">
            <div>
              <el-button size="medium" type="text" title="还原" @click="recoverGoods(scope.row)">
                <font-awesome-icon :icon="['fas', 'share-square']" size="lg" fixed-width/>
              </el-button>
              <el-button size="medium" type="text" title="删除" @click="delGoods(scope.row)">
                <font-awesome-icon :icon="['fas', 'trash-alt']" size="lg" fixed-width class="py-text-danger"/>
              </el-button>
            </div>
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
import tableSheme from '@/views/goods-manage/goods-recycle-bin-table-sheme'
import tableData from '@/views/goods-manage/goods-recycle-bin-table-test-data'
import CateCasecader from '@/components/cateCasecader'
import { getGoodsRecycleBinList, delRecycleBinGoods, recoverRecycleBinGoods } from '@/api/goodsManage'
import _ from 'lodash'

export default {
  name: 'GoodsRecycleBin',
  components: {
    CateCasecader
  },
  data() {
    return {
      // 选中的表格行
      multipleSelection: [],
      // 分页导航
      pageNav: {
        total: 0,
        pageNo: 1,
        pageSize: 10
      },
      // 表头字段
      tableSheme: tableSheme,
      // 表格数据
      tableData: tableData,
      preList: {
        batchOpList: [
          {
            value: '0',
            label: '还原',
            iconType: 'fas',
            icon: 'share-square'
          },
          {
            value: '1',
            label: '删除',
            iconType: 'far',
            icon: 'trash-alt'
          }
        ]
      },
      mainForm: {
        // 商家关键字
        sellerKeyWord: '',
        // 商品关键字
        goodsKeyWord: ''
      },
      // api接口调用
      goodsRecycleBinMapApi: {
        query: getGoodsRecycleBinList,
        del: delRecycleBinGoods,
        recover: recoverRecycleBinGoods
      }
    }
  },
  mounted() {
    this.renderList()
  },
  methods: {
    // 选中表格行发生变化事件处理
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 恢复商品至商品库
    recoverGoods(data) {
      const tempArr = []
      const recover = (tempArr, title) => {
        this.$confirm(title, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.goodsRecycleBinMapApi.recover(tempArr)
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    type: 'success',
                    message: '恢复成功！'
                  })
                  // 刷新列表
                  this.renderList()
                }
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
      // 兼容单个操作和批量操作,通过参数类型判断
      if (data && _.isObject(data)) {
        // 当前页的单个操作
        tempArr.push(data.prodId)
        recover(tempArr, '您确定要把该商品还原吗？')
      } else {
        // 当前页面批量操作
        this.multipleSelection.forEach(o => {
          tempArr.push(o.prodId)
          recover(tempArr, '您确定要把选中商品还原吗？')
        })
      }
    },
    // 删除商品
    delGoods(data) {
      const tempArr = []
      const del = (tempArr, title) => {
        this.$confirm(title, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.goodsRecycleBinMapApi.del(tempArr)
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    type: 'success',
                    message: '删除成功！'
                  })
                  // 刷新列表
                  this.renderList()
                }
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
      // 兼容单个操作和批量操作,通过参数类型判断
      if (data && _.isObject(data)) {
        // 当前页的单个操作
        tempArr.push(data.prodId)
        del(tempArr, '您确定删除该商品吗？')
      } else {
        // 当前页面批量操作
        this.multipleSelection.forEach(o => {
          tempArr.push(o.prodId)
          del(tempArr, '您确定批量删除选中商品吗？')
        })
      }
    },
    // 加载、刷新列表
    renderList() {
      this.goodsRecycleBinMapApi.query({
        // type: "39",
        page: this.pageNav.pageNo,
        pageSize: this.pageNav.pageSize
      })
        .then(res => {
          if (res.status === 200) {
            const tempArr = []
            res.data.data.forEach((o, index) => {
              tempArr.push({
                no: (this.pageNav.pageNo - 1) * this.pageNav.pageSize + index + 1,
                storeName: '后台未提供',
                prodName: o.title,
                prodId: o.id,
                price: o.price
              })
            })
            this.tableData = tempArr
            this.pageNav.total = res.data.total
            this.pageNav.pageSize = res.data.pageSize
            this.pageNav.pageNo = res.data.page
          }
        })
    },
    handleSizeChange(val) {
      this.pageNav.pageSize = val
      this.renderList()
    },
    handleCurrentChange(val) {
      this.pageNav.pageNo = val
      this.renderList()
    },
    handleCommand(command) {
      // console.log(command)
      this.mainForm.batchOp = command
      // 批量还原操作
      if (command.value === '0') {
        this.recoverGoods()
      } else if (command.value === '1') {
        this.delGoods()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.goods-recycle-bin-wrap{}
</style>
