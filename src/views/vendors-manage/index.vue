<template>
  <el-container class="contentwrapper">
    <el-main>
      <div>
        <h3 class="heading">入驻商家列表
          <span style="float:right;margin-top:-3px;">
            <router-link to="/goodsManage/index">
              <el-button type="default" size="mini" style="">
                入驻流程
              </el-button>
            </router-link>
          </span>
          <span style="float:right;margin-top:-3px;margin-right:10px;">
            <router-link to="/goodsManage/index">
              <el-button type="default" size="mini" style="">
                结算流程
              </el-button>
            </router-link>
          </span>
        </h3>
      </div>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'VendorsManageIndex',
  components: {

  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
