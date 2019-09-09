<template>
  <el-container class="contentwrapper">
    <el-main>
      <div>
        <h3 class="heading">添加商品库商品
          <span style="float:right;margin-top:-3px;">
            <router-link to="/goodsRepo/list">
              <el-button type="default" size="mini" style="">
                <font-awesome-icon :icon="['fas', 'reply']" />
                返回商品列表
              </el-button>
            </router-link>
          </span>
        </h3>
      </div>

      <el-form ref="commonInfoForm" :model="form" :label-position="'left'" label-width="100px;" class="commonForm" >
        <el-container>
          <el-main style="padding:20px;">
            <el-form-item :rules="[ { required: true, message: '商品名称不能为空！' } ]" label="商品名称：" prop="prodName">
              <el-input v-model="form.prodName" clearable />
            </el-form-item>

            <el-form-item label="商品货号：">
              <el-input v-model="form.prodNo" clearable />
              <small>
                如果您不输入商品货号，系统将自动生成一个唯一的货号。
              </small>
            </el-form-item>

            <el-form-item :rules="[ { required: true, message: '市场售价不能为空！' } ]" prop="price" label="本店售价：">
              <div style="display:flex;">
                <el-input v-model="form.price" clearable />
                <el-button type="default" class="inline-block right-beside-btn">按市场价计算</el-button>
              </div>
            </el-form-item>

            <el-form-item label="市场售价：">
              <div style="display:flex;">
                <el-input v-model="form.marketPrice" clearable />
                <el-button type="default" class="inline-block right-beside-btn">取整数</el-button>
              </div>
            </el-form-item>
            <el-form-item label="商品重量：">
              <div style="display:flex">
                <el-input v-model="form.weight" class="input-with-select" clearable />
                <el-select slot="append" v-model="form.unit" placeholder="请选择单位" class="right-beside-btn">
                  <el-option label="克" value="g" />
                  <el-option label="千克" value="kg" />
                </el-select>
              </div>
            </el-form-item>

            <el-form-item label="上架：">
              <el-checkbox v-model="form.forSale">
                打勾表示商家可见此商品，并允许商家将此商品导入店铺，否则不显示并不可导入
              </el-checkbox>
            </el-form-item>
            <!--SEO优化 start-->
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
            <!--SEO优化 end-->

            <el-form-item>
              <el-button type="primary" @click="addProdToRepo">下一步</el-button>
            </el-form-item>
          </el-main>
          <el-aside style="width:350px;">
            <!--选择商品分类 start-->
            <el-collapse v-model="activeNames[1]" class="custom-collapse">
              <el-collapse-item title="商品分类" name="1">
                <el-form-item :rules="rules.cateId" label="选择商品分类" class="custom-form-item-label-top" prop="cateId" required>
                  <cate-casecader :cate-id="form.cateId" clearable @value-change="cateCasecaderValueChangehandle" />
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
            <!--选择商品分类 end-->

            <!--选择品牌 start-->
            <el-collapse v-model="activeNames[2]" class="custom-collapse">
              <el-collapse-item title="商品品牌" name="1">
                <el-form-item label="选择商品品牌" class="custom-form-item-label-top">
                  <el-select v-model="form.selectedBrand" placeholder="请选择">
                    <el-option v-for="item in preSetData.brandList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
            <!--选择品牌 end-->

            <!--添加产品封面图 start-->
            <el-collapse v-model="activeNames[3]" class="custom-collapse">
              <el-collapse-item title="商品图片" name="1">
                <el-form-item :rules="[ { required: true, message: '必须上传商品首图！' } ]" prop="imageUrl" label="上传商品图片" class="custom-form-item-label-top" >
                  <div class="upload-pic-wrap" @click="togglePicsCenter()">
                    <span v-if="!form.imageUrl" class="add-icon">
                      <font-awesome-icon :icon="['fas', 'plus']" style="font-size:45px;margin-top:17px;" />
                    </span>
                    <img v-if="form.imageUrl" :src="form.imageUrl">
                  </div>
                </el-form-item>
                <el-form-item v-if="form.imageUrl" label="商品缩略图" class="custom-form-item-label-top">
                  <div class="upload-pic-wrap" style="width:80px;height:80px;" @click="togglePicsCenter()">
                    <img v-if="form.imageUrl" :src="form.imageUrl">
                  </div>
                </el-form-item>
                <small>点击更换商品图片或商品缩略图</small>
              </el-collapse-item>
            </el-collapse>
            <!--添加产品封面图 end-->
          </el-aside>
        </el-container>
      </el-form>
    </el-main>
    <pics-management :dialog-visible="visible" />
  </el-container>
</template>

<script>
// function createObjectURL(object) {
//   return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
// }
import CateCasecader from '@/components/cateCasecader'
import { addProdToRepo } from '@/api/goodsManage'
import PicsManagement from '@/components/PicsManagement'
import _ from 'lodash'

export default {
  name: 'GoodsRepoAdd',
  components: {
    CateCasecader,
    PicsManagement
  },
  data() {
    function checkCateId(rule, value, callback) {
      if (_.isArray(value) && value.length === 0) {
        callback(new Error('分类不能为空'))
      } else {
        callback()
      }
    }
    return {
      // 素材中心弹窗可见状态
      visible: false,
      // 数据交互api
      prodRepoAddMapApi: {
        add: addProdToRepo
      },
      // 激活面板名称
      activeNames: [
        // seo优化
        ['1'],
        // 商品分类
        ['1'],
        // 商品品牌
        ['1'],
        // 商品图片
        ['1']
      ],
      // 新增商品表单
      form: {
        // 商品名称
        prodName: '',
        // 商品货号
        prodNo: '',
        // 本店售价
        price: 0,
        // 市场售价
        marketPrice: 0,
        // 商品重量
        weight: 0,
        // 重量单位
        unit: 'g',
        // 是否可以导入店铺
        forSale: false,
        // 选择的品牌
        selectedBrand: null,
        // 上传文件句柄
        uploadFile: null,
        // 上传缩略图句柄
        uploadFileThumb: null,
        // 当前上传文件对象
        uploadFileInstance: null,
        // 商品封面图
        imageUrl: '',
        // 商品封面首图在素材库中的id
        imageId: '',
        // 商品封面图名称
        fileName: '',
        // 商品分类id,包含多级因此是一个array
        cateId: []
      },
      rules: {
        cateId: { validator: checkCateId }
      },
      preSetData: {
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
    // 监听素材中心弹窗打开事件
    this.$root.eventHub.$on('togglePicsCenterEvent', () => {
      this.visible = !this.visible
    })
    // 监听素材中心组件中选中图片事件
    this.$root.eventHub.$on('selectPicsCenterEvent', data => {
      this.form.imageUrl = data.url
      this.form.imageId = data.id
      this.visible = false
    })
  },
  methods: {
    // 分类级联菜单发生变化
    cateCasecaderValueChangehandle(data) {
      this.form.cateId = data
      // 触发验证
      this.$refs.commonInfoForm.validateField('cateId', () => {})
    },
    // 切换素材中心弹窗显示状态
    togglePicsCenter() {
      this.$root.eventHub.$emit('togglePicsCenterEvent')
    },
    // 添加商品
    addProdToRepo() {
      this.$refs.commonInfoForm.validate(valid => {
        if (valid) {
          this.prodRepoAddMapApi.add({
            title: this.form.prodName,
            type: this.form.cateId,
            price: this.form.price,
            pointRate: 0,
            detail: '',
            titleImage: [this.form.imageId]
          })
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '添加商品成功！'
                })
                // 弹窗提示用户添加成功，可以继续添加商品，或返回商品列表
                this.$confirm('是否继续添加商品?', '', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '返回商品列表',
                  type: 'warning'
                }).then(() => {
                  this.form.cateId = []
                  // 清空表单
                  this.$refs.commonInfoForm.resetFields()
                }).catch(() => {
                  // 跳转路由
                  this.$router.push({ path: '/goodsRepo/list' })
                })
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
