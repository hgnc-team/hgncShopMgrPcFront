<template>
  <div class="match-result-wrapper">
    <h1>特征比对表</h1>
    <div class="result-table-wrapper">
      <el-table
        :data="tableData"
        stripe
        border
        size="medium"
        style="width: 100%">
        <el-table-column
          prop="jiancai"
          label="检材">
          <template slot-scope="scope">
            <span v-for="(imgItem,index) in scope.row.jiancai" :key="index">
              <img :src="'http://192.168.8.53:8888/' + imgItem">
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="yangben"
          label="样本">
          <template slot-scope="scope">
            <span v-for="(imgItem,index) in scope.row.yangben" :key="index">
              <img :src="'http://192.168.8.53:8888/' + imgItem">
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Handwriting',
  components: {},
  data() {
    return {
      baseUrl: 'http://192.168.8.53:8888/',
      tableData: []
    }
  },
  computed: {},
  mounted() {
    this.baseUrl = this.$route.params.baseUrl
    this.renderTable()
  },
  methods: {
    renderTable() {
      const result = []
      if (!this.$route.params.data) {
        return
      }
      // 对接检材的数据
      _.forEach(this.$route.params.data.jiancha, value => {
        const temp = {
          jiancai: []
        }
        _.forEach(value.list, v => {
          temp.jiancai.push(v)
        })
        result.push(temp)
      })

      // 对接样品的数据
      _.forEach(this.$route.params.data.yangben, (value, index) => {
        result[index].yangben = []
        _.forEach(value.list, v => {
          result[index].yangben.push(v)
        })
      })
      this.tableData = result
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.match-result-wrapper{
    padding:20px;
}
</style>
