<template>
  <div class="data-table-list-container">
    <el-tree
      :data="data"
      :props="props"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      draggable
      highlight-current
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-end="handleDragEnd"/>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label'
        }
      }
    }
  },
  data() {
    return {}
  },
  activated() {},
  methods: {
    allowDrop(draggingNode, dropNode, type) {
      return false
    },
    allowDrag(draggingNode) {
      return draggingNode.level > 1
    },
    handleDragStart(node, ev) {
      ev.dataTransfer.setData('label', node.label)
    },
    handleDragEnd() {
      this.$emit('dragend')
    }
  }
}
</script>

<style lang='scss'>
.data-table-list-container {
  .el-tree {
    padding-top: 12px;
  }
}
</style>
