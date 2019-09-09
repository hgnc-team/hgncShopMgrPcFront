<template>
  <el-container class="dashboard-wrap">
    <el-main>
      <div class="kanban-wrap">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="py-card-header green">
                <span>30天新增商品</span>
              </div>
              <div class="box-card-body">
                <span class="number"><a>1</a></span>
                <span class="unit">件</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="py-card-header yellow">
                <span>30天新增会员</span>
              </div>
              <div class="box-card-body">
                <span class="number"><a>0</a></span>
                <span class="unit">个</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="py-card-header red">
                <span>30天新增订单</span>
              </div>
              <div class="box-card-body">
                <span class="number"><a>2</a></span>
                <span class="unit">单</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="py-card-header purple">
                <span>30天新增入驻商</span>
              </div>
              <div class="box-card-body">
                <span class="number"><a>1</a></span>
                <span class="unit">个</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'DashboardAdmin',
  components: {

  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-wrap{
  background-color:#fff;
  // border:1px solid red;
  padding:20px;
  .box-card{
    // border-color:red;
    .el-card__header{
      padding:0;
      .py-card-header{
        padding:20px 10px;
        color:#fff;
        text-align:center;
        &.green{
          background-color:#2fc1a5;
        }

        &.yellow{
          background-color:#efbc2e;
        }

        &.red{
          background-color:#f44775;
        }

        &.purple{
          background-color:#7a31ec;
        }
      }
    }

    .box-card-body{
      text-align:center;
      span{
        &.number{
          font-size:30px;
        }
      }
    }
  }
}
</style>
