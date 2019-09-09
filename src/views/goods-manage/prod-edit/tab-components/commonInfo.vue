<template>
  <el-form ref="commonInfoForm" :model="form" :label-position="'left'" label-width="100px;" class="commonForm" >
    <el-container>
      <el-main style="padding:20px;">
        <el-form-item :rules="[{required: true, message: '商品名称不能为空！'}]" label="商品名称" prop="prodName">
          <el-input v-model="form.prodName" style="width:24em;" clearable />
        </el-form-item>
        <el-form-item :rules="[{required: true, message: '商品货号不能为空！'}]" label="商品货号" prop="prodNo">
          <el-input v-model="form.prodNo" clearable />
          <small>
            如果您不输入商品货号，系统将自动生成一个唯一的货号。
          </small>
        </el-form-item>

        <el-form-item :rules="[{required: true, message: '售价不能为空！'}]" label="本店售价" prop="price">
          <div style="display:flex;">
            <el-input v-model="form.price" clearable />
            <el-button type="default" class="inline-block right-beside-btn">按市场价计算</el-button>
          </div>
        </el-form-item>

        <el-form-item label="市场售价">
          <div style="display:flex;">
            <el-input v-model="form.marketPrice" />
            <el-button type="default" class="inline-block right-beside-btn">取整数</el-button>
          </div>
        </el-form-item>

        <el-form-item label="库存数量">
          <el-input v-model="form.stock" />
        </el-form-item>

        <el-form-item label="警告数量">
          <el-input v-model="form.stockWarnNum" />
        </el-form-item>

        <el-form-item label="商品重量">
          <div style="display:flex">
            <el-input v-model="form.weight" class="input-with-select" />
            <el-select slot="append" v-model="form.unit" placeholder="请选择单位" class="right-beside-btn">
              <el-option label="克" value="g" />
              <el-option label="千克" value="kg" />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="作为商品">
          <el-checkbox v-model="form.forSale">
            打勾表示能作为普通商品销售，否则只能作为配件或赠品销售。
          </el-checkbox>
        </el-form-item>

        <el-form-item label="是否包邮">
          <el-checkbox v-model="form.freeShip">
            打勾表示此商品不会产生运费花销，否则按照正常运费计算。
          </el-checkbox>
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

        <el-collapse v-model="activeNames[1]" class="custom-collapse">
          <el-collapse-item title="备注信息" name="1">
            <el-form-item label="商家备注">
              <el-input v-model="form.remarks" type="textarea" />
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-main>

      <el-aside style="width:350px;">
        <el-collapse v-model="activeNames[2]" class="custom-collapse">
          <el-collapse-item title="发布" name="1">
            <el-form-item label="上架：">
              <el-checkbox v-model="form.onSale">
                打勾表示允许销售，否则不允许销售。
              </el-checkbox>
            </el-form-item>
            <!-- {{ form.addSuggestList }} -->
            <el-form-item label="加入推荐：">
              <!-- {{ form.addSuggestList }} -->
              <el-checkbox-group v-model="form.addSuggestList">
                <el-checkbox label="0">精品</el-checkbox>
                <el-checkbox label="1">新品</el-checkbox>
                <el-checkbox label="2">热销</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="mini" @click="editProd">更新</el-button>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>

        <el-collapse v-model="activeNames[3]" class="custom-collapse">
          <el-collapse-item title="商品分类" name="1">
            <el-form-item :rules="rules.cateId" label="选择商品分类" class="custom-form-item-label-top" prop="cateId" required style="margin-bottom:20px;">
              <cate-casecader :cate-id="form.cateId" clearable @value-change="cateCasecaderValueChangehandle" />
            </el-form-item>
          </el-collapse-item>
        </el-collapse>

        <el-collapse v-model="activeNames[4]" class="custom-collapse">
          <el-collapse-item title="商品品牌" name="1">
            <el-form-item label="选择商品品牌" class="custom-form-item-label-top">
              <el-select v-model="form.selectedBrand" placeholder="请选择...">
                <el-option v-for="item in preSetData.brandList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="text">添加商品品牌</el-button>
            </el-form-item>

          </el-collapse-item>
        </el-collapse>

        <el-collapse v-model="activeNames[5]" class="custom-collapse">
          <el-collapse-item title="商品图片" name="1">
            <el-form-item :rules="[{required: true, message: '商品图片不能为空！'}]" label="上传商品图片" class="custom-form-item-label-top" prop="imageUrl">
              <div class="upload-pic-wrap" @click="togglePicsCenter">
                <span v-if="!form.imageUrl" class="add-icon">
                  <font-awesome-icon :icon="['fas', 'plus']" style="font-size:45px;margin-top:17px;" />
                </span>
                <img v-if="form.imageUrl" :src="form.imageUrl">
              </div>
            </el-form-item>
            <el-form-item v-if="form.imageUrl" label="商品缩略图" class="custom-form-item-label-top">
              <div class="upload-pic-wrap" style="width:80px;height:80px;" @click="togglePicsCenter">
                <img v-if="form.imageUrl" :src="form.imageUrl">
              </div>
            </el-form-item>
            <small>点击更换商品图片或商品缩略图</small>
          </el-collapse-item>
        </el-collapse>

        <el-collapse v-model="activeNames[6]" class="custom-collapse">
          <el-collapse-item title="积分相关" name="1">
            <el-form-item label="赠送消费积分数：">
              <el-input v-model="form.bounds" style="width:100px;"/>
              <div>
                <small>购买该商品时赠送消费积分数,-1表示按商品价格赠送</small>
              </div>
            </el-form-item>

            <el-form-item label="赠送成长值：">
              <el-input v-model="form.growthValue" style="width:100px;"/>
              <div>
                <small>购买该商品时赠送成长值数,-1表示按商品价格赠送</small>
              </div>
            </el-form-item>

            <el-form-item label="积分购买金额：">
              <el-input v-model="form.buyUseBounds" style="width:100px;"/>
              <div>
                <small>(此处需填写金额)购买该商品时最多可以使用积分的金额</small>
              </div>
            </el-form-item>

          </el-collapse-item>
        </el-collapse>

        <el-collapse v-model="activeNames[7]" class="custom-collapse">
          <el-collapse-item title="折扣、促销价格" name="1">
            <el-form-item label="会员价格">
              注册用户 <el-input v-model="form.memberPrice" style="width:100px;"/>(50)
              <div style="line-height:1.2;margin-top:10px;">
                <small>会员价格为-1时表示会员价格按会员等级折扣率计算。你也可以为每个等级指定一个固定价格</small>
              </div>
            </el-form-item>

            <el-form-item label="优惠价格">
              <div v-for="item in form.discountPrice" :key="item.id" class="discount-set-item">
                <label>优惠数量</label>
                <el-input v-model="item.total" style="width:5em;margin-right:10px;" />
                <label>优惠价格</label>
                <el-input v-model="item.price" style="width:5em;" />
              </div>
              <el-button type="text">添加优惠价格</el-button>
              <div>
                <small>购买数量达到优惠数量时享受的优惠价格</small>
              </div>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
    </el-container>
  </el-form>
</template>

<script>
import { editProd } from '@/api/goodsManage'
import CateCasecader from '@/components/cateCasecader'
import _ from 'lodash'

export default {
  name: 'CommonInfo',
  components: {
    CateCasecader
  },
  props: {
    // 商品名称
    goodName: {
      type: String,
      default: ''
    },
    // 货号/商品id
    goodsNo: {
      type: String,
      default: ''
    },
    // 目前同货号相同
    id: {
      type: String,
      default: ''
    },
    type: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 库存
    inventory: {
      type: Number,
      default: 0
    },
    // 价格
    price: {
      type: Number,
      default: 0
    },
    // 排序
    sort: {
      type: Number,
      default: 0
    },
    // 商品首图
    thumb: {
      type: String,
      default: ''
    },
    // 销售商家名称
    sellerName: {
      type: String,
      default: ''
    },
    // 商家状态
    onSale: {
      type: Boolean,
      default: true
    },
    // 是否精品
    prime: {
      type: Boolean,
      default: false
    },
    // 是否新品
    new: {
      type: Boolean,
      default: false
    },
    // 是否热销
    hot: {
      type: Boolean,
      default: false
    },
    // 审核状态
    reviewStatus: {
      type: Number,
      default: 1
    }
  },
  data() {
    // 商品分类字段自定义校验
    function checkCateId(rule, value, callback) {
      if (_.isArray(value) && value.length === 0) {
        callback(new Error('分类不能为空'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        cateId: { validator: checkCateId }
      },
      commonInfoMapApi: {
        edit: editProd
      },
      // 激活面板名称
      activeNames: [
        // seo优化
        ['1'],
        // 备注信息
        ['1'],
        // 发布
        ['1'],
        // 商品分类
        ['1'],
        // 商品品牌
        ['1'],
        // 商品图片
        ['1'],
        // 积分相关
        ['1'],
        // 折扣、促销价格
        ['0']
      ],
      form: {
        // 商品首图url
        imageUrl: '',
        // 商品首图在素材库中的id
        imageId: '',
        // 商品名称
        prodName: '',
        // 商品货号
        prodNo: '',
        // 本店售价
        price: 0,
        // 市场售价
        marketPrice: 0,
        // 库存数量
        stock: 0,
        // 当前分类
        cateId: [],
        // 警告数量
        stockWarnNum: 1,
        // 商品重量
        weight: '',
        // 重量单位
        unit: 'g',
        // 作为商品
        forSale: true,
        // 上架
        onSale: true,
        // 是否包邮
        freeShip: false,
        // seo优化-关键字
        seoKeywords: '',
        // seo优化-简单描述
        seoDescrib: '',
        // 商家备注
        remarks: '',
        // 加入推荐数组
        addSuggestList: [],
        // 选择的品牌
        selectedBrand: null,
        // 赠送消费积分数
        bounds: -1,
        // 赠送成长值
        growthValue: -1,
        // 积分购买金额
        buyUseBounds: 0,
        // 会员价格
        memberPrice: 0,
        // 优惠价格
        discountPrice: [
          {
            id: '0',
            total: 0,
            price: 0
          }
        ]
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
    this.$nextTick(() => {
      this.initForm()
      // console.log(this.type)
      // 监听素材中心组件中选中图片事件
      this.$root.eventHub.$on('selectPicsCenterEvent', data => {
        this.form.imageUrl = data.url
        this.form.imageId = data.id
        // 关闭素材中心弹窗
        this.togglePicsCenter()
      })
    })
  },
  methods: {
    // 分类发生变化
    cateCasecaderValueChangehandle(val) {
      this.form.cateId = val
      // 触发验证
      this.$refs.commonInfoForm.validateField('cateId', () => {})
    },
    // 编辑更新商品
    editProd() {
      // 校验表单
      this.$refs.commonInfoForm.validate(valid => {
        if (valid) {
          this.commonInfoMapApi.edit({
            id: this.id,
            title: this.form.prodName,
            type: this.form.cateId.join(';'),
            price: this.form.price,
            standardTitle: '',
            // pointRate缺失
            // pointRate: this.,
            inventory: this.form.stock,
            detail: '',
            flowImages: [],
            detailImages: [],
            titleImage: this.form.imageId ? [this.form.imageId] : undefined
          })
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '商品通用信息编辑成功！'
                })
              }
            })
        }
      })
    },
    // 打开素材中心
    togglePicsCenter() {
      this.$root.eventHub.$emit('togglePicsCenterEvent')
    },
    initForm() {
      // 商品名称
      this.form.prodName = this.goodName
      // 商品分类
      this.form.cateId = this.type
      // 商品价格
      this.form.price = this.price
      // 商品库存
      this.form.stock = this.inventory
      // 商品货号
      this.form.prodNo = this.goodsNo
      // 是否上架销售
      this.form.onSale = this.onSale
      // 商品首图
      this.form.imageUrl = this.thumb
      // 新品、热销、精品 数据处理
      if (this.prime) {
        this.form.addSuggestList.push('0')
      } else if (this.new) {
        this.form.addSuggestList.push('1')
      } else if (this.hot) {
        this.form.addSuggestList.push('2')
      }
    }
  }
}
</script>

<style lang="scss"></style>
