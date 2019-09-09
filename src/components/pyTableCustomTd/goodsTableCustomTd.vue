<template>
  <div>
    <!--显示缩略图-->
    <span v-if="type === 'image'" class="thumb-img-wrap">
      <el-popover placement="right" popper-class="editablePopper" trigger="click">
        <img :src="data[prop]" style="width:180px;height:180px;z-index:11" />
        <span slot="reference" class="editable-click cursor_pointer">
          <img :src="data[prop]" />
        </span>
      </el-popover>
    </span>
    <!--带编辑功能文本字段-->
    <span v-else-if="type === 'input'">
      <el-popover placement="top" popper-class="editablePopper" trigger="click" @hide="resetData">
        <div class="editable-container">
          <h3 class="popover-title">请输入{{ name }}</h3>
          <div class="popover-content">
            <el-form :inline="true" :model="data" class="editable-form-inline">
              <el-form-item label>
                <el-input v-model="data[prop]" size="mini" clearable />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini">确定</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="default" size="mini">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span
          slot="reference"
          :title="data[prop]"
          class="editable-click cursor_pointer"
          style="display:inline-block;max-width:15em;height:2em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;"
        >{{ data[prop] }}</span>
      </el-popover>
      <br />
      <!--特殊的文本下面 展示一行操作按钮 ecjia的设计-->
      <span v-if="isRowMenuWrapCell && data.id === currentId">
        <ul v-if="tableUserName === 'GoodsManageIndex'" class="goodsOpMenu">
          <li>
            <router-link
              :to="{name:'prodEditIndex', params: data, query: {tabIndex: 0, prodId: data.id}}"
            >编辑</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'prodEditIndex', params: data, query: {tabIndex: 2, prodId: data.id}}"
            >商品属性</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'prodEditIndex', params: data, query: {tabIndex: 3, prodId: data.id}}"
            >商品相册</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'prodEditIndex', params: data, query: {tabIndex: 4, prodId: data.id}}"
            >关联商品</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'prodEditIndex', params: data, query: {tabIndex: 5, prodId: data.id}}"
            >关联文章</router-link>
          </li>
          <li>
            <a href="jvascript:void(0)">预览</a>
          </li>
          <li>
            <a href="jvascript:void(0)">导入商品库</a>
          </li>
          <li>
            <a href="jvascript:void(0)" class="py-text-danger" @click="fakeDel(data)">删除</a>
          </li>
        </ul>
        <ul v-if="tableUserName === 'GoodsRepoList'" class="goodsOpMenu">
          <li>
            <router-link
              :to="{name:'prodEditIndex', params: data, query: {tabIndex: 0, prodId: data.id}}"
            >编辑</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'prodEditIndex', params: data, query: {tabIndex: 2, prodId: data.id}}"
            >商品属性</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'prodEditIndex', params: data, query: {tabIndex: 3, prodId: data.id}}"
            >商品相册</router-link>
          </li>
          <li>
            <a href="jvascript:void(0)">预览</a>
          </li>
          <li>
            <a href="jvascript:void(0)" class="py-text-danger" @click="fakeDel(data)">删除</a>
          </li>
        </ul>
        <ul v-if="tableUserName ==='OnlineOrderDelivery'" class="goodsOpMenu">
          <li>
            <router-link :to="123">查看</router-link>
          </li>
        </ul>
      </span>
    </span>
    <!--开关式字段-->
    <span v-else-if="type === 'switch'">
      <el-form :inline="true" :model="data">
        <el-switch v-model="data[prop]" />
      </el-form>
    </span>
    <!--普通文本字段-->
    <span v-else-if="type === 'text'">
      <span :class="{'py-text-danger': linkColor === 'danger'}">{{ data[prop] }}</span>
      <br />
      <span v-if="isRowMenuWrapCell && data.id === currentId">
        <ul v-if="tableUserName ==='OnlineOrderDelivery'" class="goodsOpMenu">
          <li>
            <router-link :to="{name:'onlineOrderDetail'}">查看</router-link>
          </li>
        </ul>
      </span>
    </span>
    <!--下拉列表字段-->
    <span v-else-if="type === 'select'">
      <el-popover placement="top" popper-class="editablePopper" trigger="click" @hide="resetData">
        <div class="editable-container">
          <h3 class="popover-title">请输入{{ name }}</h3>
          <div class="popover-content">
            <el-form :inline="true" :model="data" class="editable-form-inline">
              <el-form-item label>
                <el-select
                  v-model="data.reviewStatus"
                  size="mini"
                  placeholder="请选择审核状态"
                  value-key="value"
                >
                  <el-option
                    v-for="item in preList.reviewStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini">确定</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="default" size="mini">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="reference" class="editable-click cursor_pointer">{{ data[prop] }}</span>
      </el-popover>
    </span>
  </div>
</template>

<script>
import { goodsFakeDel } from '@/api/goodsManage'
import _ from 'lodash'
export default {
  name: 'GoodsTableCustomTd',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    linkColor: {
      type: String,
      default: 'normal'
    },
    data: {
      type: Object,
      default: null
    },
    currentId: {
      type: String,
      default: ''
    },
    isRowMenuWrapCell: {
      type: Boolean,
      default: false
    },
    prop: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    tableUserName: {
      type: String,
      default: 'GoodsManageIndex'
    }
  },
  data() {
    return {
      // api接口
      goodOperMapApi: {
        fakeDel: goodsFakeDel
      },
      // 表单模型
      formModel: {},
      // data副本
      copyData: _.clone(this.data),
      // 以下内容在src\views\goods-manage\index.vue中有重复
      preList: {
        // 选择审核状态预置选项
        reviewStatusList: [
          {
            value: '-1',
            label: '请选择审核状态'
          },
          {
            value: '0',
            label: '未审核'
          },
          {
            value: '1',
            label: '审核未通过'
          },
          {
            value: '2',
            label: '已审核'
          },
          {
            value: '3',
            label: '无需审核'
          }
        ]
      }
    }
  },
  methods: {
    resetData() {},
    // 删除商品，入回收站
    fakeDel(data) {
      this.$confirm('您确定把该商品放入回收站吗？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.goodOperMapApi.fakeDel([data.id]).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功，已移入回收站'
              })
              this.$root.eventHub.$emit('refreshGoodsListEvent')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.thumb-img-wrap {
  display: inline-block;
  img {
    display: block;
    width: 60px;
    height: 60px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
    transition: all 0.2s ease-in-out;
  }
}

ul.goodsOpMenu {
  list-style: none;
  display: inline-block;
  margin: 0;
  padding-left: 0;
  word-break: keep-all;
  width: 40em;
  position: absolute;
  z-index: 10;
  li {
    float: left;
    a {
      padding: 0 0.5em;
      border-right: 1px solid #ddd;
    }
    &:last-child {
      a {
        border-right: none;
      }
    }
  }
}

.editable-click {
  text-decoration: none;
  border-bottom: 1px dotted #0088cc;
}
.cursor_pointer {
  cursor: pointer;
}

.editable-form-inline {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
