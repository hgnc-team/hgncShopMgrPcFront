<template>
  <el-main class="prod-edit-wrap">
    <div>
      <h3 class="heading">编辑商品
        <router-link to="/goodsManage/index">
          <el-button type="default" size="mini" style="float:right;margin-top:-3px;">
            <font-awesome-icon :icon="['fas', 'reply']" />
            返回商品列表
          </el-button>
        </router-link>
      </h3>
    </div>

    <el-tabs v-model="currentTabVal" type="card">
      <el-tab-pane
        v-for="item in prodEditTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name">
        <component :is="item.component" v-bind="prodData"/>
      </el-tab-pane>
    </el-tabs>
    <pics-management :dialog-visible="visible" />
  </el-main>
</template>

<script>
import articles from './tab-components/articles.vue'
import commonInfo from './tab-components/commonInfo.vue'
import goodsManage from './tab-components/goodsManage.vue'
import prodDescrib from './tab-components/prodDescrib.vue'
import prodPhotos from './tab-components/prodPhotos.vue'
import prodProperty from './tab-components/prodProperty.vue'
import associateProd from './tab-components/associateProd.vue'
import PicsManagement from '@/components/PicsManagement'

export default {
  name: 'ProdEditIndex',
  components: {
    PicsManagement
  },
  data() {
    return {
      // 当前选中tab
      currentTabVal: '1',
      prodData: null,
      // 素材中心弹窗初始状态
      visible: false,
      prodEditTabs: [
        {
          title: '通用信息',
          name: '1',
          component: commonInfo
        },
        {
          title: '商品描述',
          name: '2',
          component: prodDescrib
        },
        {
          title: '商品属性',
          name: '3',
          component: prodProperty
        },
        {
          title: '商品相册',
          name: '4',
          component: prodPhotos
        },
        {
          title: '关联商品',
          name: '5',
          component: associateProd
        },
        {
          title: '关联文章',
          name: '6',
          component: articles
        },
        {
          title: '货品管理',
          name: '7',
          component: goodsManage
        }
      ]
    }
  },
  mounted() {
    // 监听素材中心弹窗打开事件
    this.$root.eventHub.$on('togglePicsCenterEvent', () => {
      this.visible = !this.visible
    })
    // 读取路由带过来的参数
    this.prodData = this.$route.params
    // console.log(this.prodData)
    // 根据路由中的查询字符串定位到对应的tab选项上
    this.currentTabVal = (this.$route.query.tabIndex + 1) + ''
  }
}
</script>
<style lang="scss">
.prod-edit-wrap{
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
