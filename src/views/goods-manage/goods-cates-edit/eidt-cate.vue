<template>
  <el-main class="cate-edit-wrap contentwrapper">
    <div>
      <h3 class="heading">编辑商品分类
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
    <el-form ref="editCateForm" :model="form" :label-position="'left'" label-width="100px;" class="commonForm">
      <el-container>
        <el-main style="padding:20px;">
          <el-form-item label="分类名称" class="custom-from-item">
            <el-input v-model="form.cateName" class="custom-input"/>
          </el-form-item>

          <el-form-item label="上级分类" class="custom-from-item">
            <el-input v-model="form.pCateName" class="custom-input" />
          </el-form-item>

          <el-form-item label="数量单位" class="custom-from-item">
            <el-input v-model="form.numUnit" class="custom-input" />
          </el-form-item>

          <el-form-item label="价格区间个数" class="custom-from-item">
            <el-input v-model="form.priceRangeNum" class="custom-input" />
          </el-form-item>

          <el-form-item label="筛选属性" class="custom-from-item">
            placeholder
          </el-form-item>

          <el-collapse v-model="activeNames[0]" class="custom-collapse">
            <el-collapse-item title="SEO优化" name="1">
              <el-form-item label="关键字">
                <el-input v-model="form.seoKeywords" />
                <small>用英文逗号分隔</small>
              </el-form-item>
              <el-form-item label="简单描述">
                <el-input v-model="form.seoDescrib" type="textarea" />
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-main>

        <el-aside style="width:350px;">
          <el-collapse v-model="activeNames[1]" class="custom-collapse">
            <el-collapse-item title="促销信息" name="1">
              <el-form-item label="排序值：">
                <el-input v-model="form.sortNum" />
              </el-form-item>

              <el-form-item label="是否显示：">
                <el-switch v-model="form.isVisible" />
              </el-form-item>

              <el-form-item label="首页推荐：">
                <el-checkbox-group v-model="form.setSuggestIndex">
                  <el-checkbox label="精品" value="0" />
                  <el-checkbox label="新品" value="1" />
                  <el-checkbox label="热销" value="2" />
                </el-checkbox-group>
                <small>设置为首页推荐</small>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" size="mini">更新</el-button>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

          <el-collapse v-model="activeNames[2]" class="custom-collapse">
            <el-collapse-item title="分类图片" name="1">
              <el-form-item label="上传商品图片" class="custom-form-item-label-top">
                <div class="fileupload-btn preview-img thumb_img">
                  <img src="../../../assets/images/goods-cate-img.png">
                </div>
              </el-form-item>

              <el-form-item>
                <el-button type="default" size="mini">修改分类图片</el-button>
                <el-button type="danger" size="mini">删除</el-button>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

          <el-collapse v-model="activeNames[3]" class="custom-collapse">
            <el-collapse-item title="分类广告" name="1">
              <el-form-item label="当前广告位" class="custom-form-item-label-top">
                未设置
                <el-input v-model="form.cateAdSearchKeyword" placeholder="请输入内容" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" />
                </el-input>
                <small>请先搜索并选择一个广告位作为此分类广告</small>
              </el-form-item>

              <el-form-item>
                <el-select v-model="form.selectedCateAd" placeholder="请选择">
                  <el-option
                    v-for="item in cateAdPreSetData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

        </el-aside>
      </el-container>
    </el-form>
  </el-main>
</template>

<script>
export default {
  name: 'GoodsCateEdit',
  data() {
    return {
      // 激活面板名称
      activeNames: [
        // seo优化
        ['1'],
        // 促销信息
        ['1'],
        // 分类图片
        ['1'],
        // 分类广告
        ['1']
      ],
      form: {
        // 分类名称
        cateName: '',
        // 上级分类名称
        pCateName: '',
        // 数量单位
        numUnit: '',
        // 价格区间个数
        priceRangeNum: '',
        // seo优化-关键字
        seoKeywords: '',
        // 分类描述
        seoDescrib: '',
        // 排序值:
        sortNum: 0,
        // 设置为首页推荐
        setSuggestIndex: [],
        // 是否显示该类别
        isVisible: true,
        // 分类广告搜索关键字
        cateAdSearchKeyword: '',
        selectedCateAd: null
      },
      cateAdPreSetData: [
        {
          label: '美妆个护分类广告位',
          value: 0
        },
        {
          label: '数码家电分类广告位',
          value: 1
        },
        {
          label: '百货家纺分类广告位',
          value: 2
        },
        {
          label: '母婴童装分类广告位',
          value: 3
        },
        {
          label: '服饰箱包分类广告位',
          value: 4
        },
        {
          label: '旅游度假分类广告位',
          value: 5
        },
        {
          label: '生活美食分类广告位',
          value: 6
        },
        {
          label: '水果生鲜分类广告位',
          value: 7
        },
        {
          label: '休闲零食分类广告位',
          value: 8
        },
        {
          label: '滋补保健分类广告位',
          value: 9
        },
        {
          label: '在线教育分类广告位',
          value: 10
        },
        {
          label: '轻奢饰品分类广告位',
          value: 11
        },
        {
          label: '酒店住宿分类广告位',
          value: 12
        },
        {
          label: '生活服务分类广告位',
          value: 13
        },
        {
          label: '热门品牌分类广告位',
          value: 14
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.cate-edit-wrap{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color:#fff;
  // 为什么是10，魔术数字
  z-index:10;
  .custom-from-item{
    .el-form-item__label{
      width:100px;
    }
  }
  .custom-input{
    &.el-input, .el-textarea{
      width:30em;
    }
  }
}
</style>
