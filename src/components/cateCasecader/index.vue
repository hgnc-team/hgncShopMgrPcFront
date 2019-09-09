<template>
  <div class="">
    <el-cascader
      v-model="currentValue"
      :clearable="clearable"
      :options="firstClass"
      :props="props"
      :size="size"
      :placeholder="placeholder"
      @change="handleValueChange"
      @active-item-change="handleItemChange" />
  </div>
</template>

<script>
import { getTopClass, getSecondClass } from '@/api/goodsManage'
import _ from 'lodash'

export default {
  name: 'CateCasecader',
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    cateId: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 当前值
      // currentValue: this.cateId,
      firstClass: [],
      clearable: false,
      props: {
        value: 'id',
        children: 'children',
        label: 'name'
      },
      // api接口
      cateCasecaderMapApi: {
        // 顶级分类
        firstClass: getTopClass,
        // 二级分类
        secondClass: getSecondClass
      }
    }
  },
  computed: {
    currentValue: {
      get: function() {
        return this.cateId
      },
      set: function(newVal) {
        this.cateId = newVal
      }
    }
  },
  mounted() {
    this.clearable = this.$attrs.clearable
    // console.log(this.size)
    setTimeout(() => {
      this.init()
    }, 0)
  },
  methods: {
    init() {
      if (_.isArray(this.cateId)) {
        this.cateCasecaderMapApi.firstClass({
          classScheme: 'cat1'
        })
          .then(res => {
            // console.log(res)
            if (res.status === 200) {
              const tempArr = []
              const children = []
              res.data.forEach(o => {
                if (o.id === this.cateId[0] && this.cateId[1]) {
                  // 获取二级分类
                  this.cateCasecaderMapApi.secondClass({
                    topClass: [this.cateId[0]]
                  })
                    .then(res => {
                      if (res.status === 200) {
                        res.data.forEach(o1 => {
                          children.push({
                            id: o1.id,
                            name: o1.name,
                            children: null
                          })
                        })
                      }
                    })
                }
                tempArr.push({
                  id: o.id,
                  name: o.name,
                  children: children
                })
              })
              this.firstClass = tempArr
            }
          })
      }
      this.currentValue = this.cateId
    },
    // 选择值发生变化
    handleValueChange() {
      this.$emit('value-change', this.currentValue)
    },
    handleItemChange(val) {
      this.cateCasecaderMapApi.secondClass({
        topClass: val
      })
        .then(res => {
          if (res.status === 200) {
            this.firstClass[_.findIndex(this.firstClass, o => { return o.id === val[0] })]
              .children = _.map(res.data, value => {
                return {
                  id: value.id,
                  name: value.name,
                  children: null
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
