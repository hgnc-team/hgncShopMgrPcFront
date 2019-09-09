<template>
  <el-main class="contentwrapper">
    <div>
      <h3 class="heading">商品分类
        <span style="float:right;margin-top:-3px;">
          <router-link to="/goodsCates/transferProds">
            <el-button type="default" size="mini" style="" @click="returnSupperClass()">
              <font-awesome-icon :icon="['fas', 'reply']" />
              上级分类
            </el-button>
          </router-link>
          <router-link to="/goodsCates/goodsCateEdit">
            <el-button type="default" size="mini" style="">
              <font-awesome-icon :icon="['fas', 'plus']" />
              添加商品分类
            </el-button>
          </router-link>
        </span>
      </h3>
    </div>
    <el-table
      :data="tableData"
      style="width:100%;"
      header-row-class-name="py-table-header"
      stripe>
      <el-table-column v-for="item in tableSheme" :key="item.prop" :prop="item.prop" :label="item.name" :sortable="item.sortable" :width="item.width">
        <template slot-scope="scope">
          <span v-if="item.prop === 'cateName'">
            <router-link to="" @click.native="getSubClass(scope.row)">
              <font-awesome-icon :icon="['far', 'minus-square']" style="margin-right:5px;"/>{{ scope.row[item.prop] }}
            </router-link>
          </span>
          <span v-else-if="item.prop !== 'cateName'">
            <goods-table-custom-td :prop="item.prop" :name="item.name" :link-color="item.linkColor" :type="item.type" :data="scope.row" :is-row-menu-wrap-cell="item.isRowMenuWrapCell || false"/>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作" width="130">
        <template slot-scope="scope">
          <div>
            <el-button size="medium" type="text" title="进入子分类" @click="getSubClass(scope.row)">
              <font-awesome-icon :icon="['fas', 'sign-in-alt']" size="lg" fixed-width/>
            </el-button>
            <router-link to="/goodsCates/goodsCateEdit">
              <el-button size="medium" type="text" title="编辑">
                <font-awesome-icon :icon="['fas', 'edit']" size="lg" fixed-width/>
              </el-button>
            </router-link>
            <el-button size="medium" type="text" title="删除">
              <font-awesome-icon :icon="['fas', 'trash-alt']" size="lg" fixed-width class="py-text-danger"/>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <router-view />
  </el-main>
</template>

<script>
import tableSheme from './goods-cate-table-sheme'
// import tableDataForTest from './goods-cate-table-test-data'
import goodsTableCustomTd from '../../components/pyTableCustomTd/goodsTableCustomTd'
// import _ from 'lodash'
import { getTopClass, getSecondClass } from '@/api/goodsManage'

export default {
  name: 'GoodsCates',
  components: {
    goodsTableCustomTd
  },
  data() {
    return {
      tableData: [],
      tableSheme: tableSheme,
      // api接口
      goodsCateMapApi: {
        // 顶级分类
        firstClass: getTopClass,
        // 二级分类
        secondClass: getSecondClass
      }
    }
  },
  mounted() {
    this.goodsCateMapApi.firstClass({
      classScheme: 'cat1'
    })
      .then(res => {
        if (res.status === 200) {
          this.renderTable(res.data)
        }
      })
  },
  methods: {
    renderTable(data) {
      // console.log(data)
      // 子分类数据为空，则提示用户
      if (data.length === 0) {
        this.$message({
          type: 'info',
          message: '此分类下数据为空！'
        })
        return
      }
      const tempArr = []
      data.forEach(o => {
        tempArr.push({
          cateName: o.name,
          cateId: o.id,
          pId: o.pid ? o.pid : -1,
          goodsNum: 1,
          numUnit: '',
          priceGrade: 0,
          sort: 1,
          visible: true,
          operate: ''
        })
      })
      this.tableData = tempArr
    },
    // 查看下一级分类
    getSubClass(classItem) {
      // console.log(classItem)
      this.goodsCateMapApi.secondClass({
        topClass: [classItem.cateId]
      })
        .then(res => {
          if (res.status === 200) {
            this.renderTable(res.data)
          }
        })
    },
    // 返回上一级
    returnSupperClass() {
      console.log('返回上一级')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
