<template>
  <el-main class="transfer-prods-wrap contentwrapper">
    <div>
      <el-alert
        title="提示：什么是转移商品分类？"
        type="info"
        description="在添加商品或者在商品管理中，如果需要对商品的分类进行变更，那么你可以通过此功能，正确管理你的商品分类。"
        show-icon />
      <h3 class="heading">转移商品
        <span style="float:right;margin-top:-3px;">
          <router-link to="/goodsCates">
            <el-button type="default" size="mini" style="">
              <font-awesome-icon :icon="['fas', 'reply']" />
              返回商品分类
            </el-button>
          </router-link>
        </span>
      </h3>
    </div>

    <el-form ref="transferProdsForm" :model="form" :label-position="'left'" label-width="100px;" class="commonForm">
      <el-form-item label="从此分类">
        placeholder
      </el-form-item>

      <el-form-item label="转移到">
        placeholder
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="mini">开始转移</el-button>
      </el-form-item>

    </el-form>
  </el-main>
</template>

<script>
export default {
  name: 'TransferProds',
  data() {
    return {
      form: {

      }
    }
  }
}
</script>

<style lang="scss">
.transfer-prods-wrap{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color:#fff;
  // 为什么是10，魔术数字
  z-index:10;
}
</style>
