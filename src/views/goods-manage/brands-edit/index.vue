<template>
  <el-main class="brands-edit-wrap contentwrapper">
    <div>
      <h3 class="heading">{{ action === 'add' ? '添加' : '编辑' }}品牌
        <span style="float:right;margin-top:-3px;">
          <router-link to="/goodsBrands">
            <el-button type="default" size="mini" style="">
              <font-awesome-icon :icon="['fas', 'reply']" />
              返回商品品牌
            </el-button>
          </router-link>
        </span>
      </h3>
    </div>
    <el-form ref="editBrandsForm" :model="form" :label-position="'right'" label-width="120px;" class="commonForm">
      <el-container>
        <el-main style="padding:20px;">
          <el-form-item :rules="[{ required: true, message: '品牌名称不能为空' }]" label="品牌名称" prop="brandName">
            <el-input v-model="form.brandName" clearable placeholder="请输入品牌名称"/>
          </el-form-item>

          <el-form-item :rules="rules.brandWebSite" label="品牌网址" prop="brandWebSite">
            <el-input v-model="form.brandWebSite" clearable placeholder="请输入品牌网址"/>
          </el-form-item>

          <el-form-item label="品牌LOGO">
            <el-button v-if="form.brandLOGO === ''" type="default" size="mini" @click="togglePicsCenter">浏览图片上传</el-button>
            <br>
            <div v-if="form.brandLOGO !== ''" class="thumbnail">
              <img :src="form.brandLOGO">
            </div>
            <span v-if="form.brandLOGO !== ''">
              <el-button type="default" size="mini" @click="togglePicsCenter">编辑</el-button>
              <el-button type="default" size="mini" @click="delPics">删除</el-button>
            </span>
          </el-form-item>

          <el-form-item label="品牌描述">
            <el-input
              :autosize="{ minRows: 5, maxRows: 10}"
              v-model="form.brandDescrib"
              placeholder="请输入品牌描述"
              type="textarea"
              clearable />
          </el-form-item>

          <el-form-item label="排序">
            <el-input v-model="form.sort" clearable style="width:10em;"/>
          </el-form-item>

          <el-form-item label="是否显示">
            <el-radio-group v-model="form.visible">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
            <br>
            <small>当品牌下还没有商品的时候，首页及分类页的品牌区将不会显示该品牌。</small>
          </el-form-item>

          <el-form-item style="padding-left:100px;">
            <el-button type="primary" style="display:inline-block;" @click="addBrand">确 定</el-button>
          </el-form-item>
        </el-main>
      </el-container>
    </el-form>
    <pics-management :dialog-visible="visible" />
  </el-main>
</template>

<script>
import { addBrand, editBrands } from '@/api/goodsManage'
import PicsManagement from '@/components/PicsManagement'
// import { BASE_IMAGE_URL } from '@/utils/request'

export default {
  name: 'GoodsBrandsEdit',
  components: {
    PicsManagement
  },
  data() {
    function validateWebSite(rule, value, callback) {
      const regFormat = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/
      if (value !== '' && !(regFormat.test(value))) {
        callback(new Error('网址格式不对!'))
      } else {
        callback()
      }
    }
    return {
      // 是编辑 还是 新增
      action: 'add',
      // 表单验证规则
      rules: {
        brandWebSite: { validator: validateWebSite, trigger: 'blur' }
      },
      // 是否显示素材中心弹窗
      visible: false,
      // api映射
      brandEditMapApi: {
        add: addBrand,
        edit: editBrands
      },
      // 表单字段
      form: {
        // 品牌
        id: '',
        // 品牌名称
        brandName: '',
        // 品牌网址
        brandWebSite: '',
        // 品牌LOGO
        brandLOGO: '',
        // 选中图片文件名
        brandLOGOFileName: '',
        // 品牌描述
        brandDescrib: '',
        // 排序
        sort: 0,
        // 是否显示
        visible: true
      }
    }
  },
  mounted() {
    // 读取路由带过来的参数
    this.logoData = this.$route.params
    // 如果有参数传来，则为编辑某个品牌
    if (this.logoData.id) {
      this.initForm()
    }
    // 根据路由中的查询字符串定位到对应的tab选项上
    this.action = this.$route.query.action

    // 监听素材中心弹窗打开事件
    this.$root.eventHub.$on('togglePicsCenterEvent', () => {
      this.visible = !this.visible
    })

    // 监听素材中心组件中选中图片事件
    this.$root.eventHub.$on('selectPicsCenterEvent', data => {
      this.form.brandLOGO = data.url
      this.form.brandLOGOFileName = data.fileName
      this.visible = false
    })
  },
  methods: {
    // 编辑
    doEdit() {
      console.log('edit')
      this.brandEditMapApi.edit({
        id: this.form.id,
        name: this.form.brandName,
        site: this.form.brandWebSite,
        logo: this.form.brandLOGOFileName,
        description: this.form.brandDescrib,
        order: this.form.sort,
        active: this.form.visible
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '编辑成功！'
          })
        }
      })
    },
    // 新增
    doAdd() {
      this.brandEditMapApi.add({
        name: this.form.brandName,
        site: this.form.brandWebSite,
        logo: this.form.brandLOGOFileName,
        description: this.form.brandDescrib,
        order: this.form.sort,
        active: this.form.visible
      })
        .then(res => {
          // console.log(res)
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '添加品牌成功！'
            })
            // 弹窗提示用户添加成功，可以继续添加商品，或返回商品列表
            this.$confirm('是否继续添加品牌?', '', {
              confirmButtonText: '继续添加',
              cancelButtonText: '返回品牌列表',
              type: 'warning'
            }).then(() => {
              // 清空表单
              this.form.brandLOGO = ''
              this.form.brandLOGOFileName = ''
              this.form.brandDescrib = ''
              this.form.sort = 0
              this.form.visible = true
              this.$refs.editBrandsForm.resetFields()
            }).catch(() => {
              // 跳转路由
              this.$router.push({ path: '/goodsBrands' })
            })
          }
        })
    },
    // 初始化表单
    initForm() {
      const tempArr = this.logoData.brandLogo.split('/')
      this.form.id = this.logoData.id
      this.form.brandName = this.logoData.brandName
      this.form.brandLOGO = this.logoData.brandLogo
      this.form.brandLOGOFileName = tempArr[tempArr.length - 1]
      this.form.brandWebSite = this.logoData.brandWebsiteAddress
      this.form.brandDescrib = this.logoData.brandDescrib
      this.form.sort = this.logoData.sort
      this.form.visible = this.logoData.visible
      // console.log(this.form)
    },
    // 删除logo图片
    delPics() {
      this.form.brandLOGO = ''
      this.form.brandLOGOFileName = ''
    },
    // 切换素材中心弹窗显示状态
    togglePicsCenter() {
      this.$root.eventHub.$emit('togglePicsCenterEvent')
    },
    // 新增或编辑品牌
    addBrand() {
      this.$refs.editBrandsForm.validate(valid => {
        if (valid) {
          if (this.action === 'add') {
            // 新增
            this.doAdd()
          } else if (this.action === 'edit') {
            // 编辑
            this.doEdit()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.brands-edit-wrap{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color:#fff;
  // 为什么是10，魔术数字
  z-index:10;
  .el-form-item__label{
    width:100px;
  }
  .el-input, .el-textarea{
    width:30em;
  }

  // 上传logo图片预览
  .thumbnail{
    width: 50px;
    height:50px;
    line-height:50px;
    vertical-align:middle;
    overflow:hidden;
    display:inline-block;
    text-align:center;
    padding:4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.055);
    transition: all .2s ease-in-out;
    margin-bottom:0;
    img{
      display:block;
      width:100%;
    }
  }
}
</style>
