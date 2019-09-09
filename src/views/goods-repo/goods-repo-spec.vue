<template>
  <el-container class="contentwrapper">
    <el-main>
      <div>
        <h3 class="heading">商品库规格列表
          <span style="float:right;margin-top:-3px;">
            <router-link to="/goodsRepo/list">
              <el-button type="default" size="mini" style="">
                <font-awesome-icon :icon="['fas', 'plus']" />
                添加商品规格
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
  name: 'GoodsRepoSpec'
}
</script>

<style>

</style>
