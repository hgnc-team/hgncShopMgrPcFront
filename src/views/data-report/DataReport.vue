<template>
  <el-row class="data-report-container">
    <el-col :span="16" class="left-container">
      <div class="data-report-bar"><ve-histogram :data="chartData" :extend="chartExtend" :log="true" width="100%" height="100%"/></div>
    </el-col>
    <el-col :span="4" class="center-container">
      <div class="header">报告设置</div>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="数据" name="data">
          <el-collapse v-model="activeCollapses">
            <el-collapse-item title="X轴" name="x">
              <div
                v-for="(column, index) in xColumns"
                :key="index"
                class="table-column"
                @dragenter.stop="handleDragenter($event, column, 'x')"
                @dragover.stop="handleDragover($event)"
                @dragleave.stop="handleDragleave($event, column, 'x')"
                @drop.stop="handleDragdrop($event, index, 'x')">
                <div v-if="column.over" class="drop-line"/>
                {{ column.label }}
              </div>
              <div
                class="empty"
                @dragenter.stop="handleDragenter($event, null, 'x')"
                @dragover.stop="handleDragover($event)"
                @dragleave.stop="handleDragleave($event, null, 'x')"
                @drop.stop="handleDragdrop($event, 0, 'x')">
                <div v-if="xOver" class="drop-line"/>
                拖入字段
              </div>
            </el-collapse-item>
            <el-collapse-item title="Y轴" name="y">
              <div
                v-for="(column, index) in yColumns"
                :key="index"
                class="table-column"
                @dragenter.stop="handleDragenter($event, column, 'y')"
                @dragover.stop="handleDragover($event)"
                @dragleave.stop="handleDragleave($event, column, 'y')"
                @drop.stop="handleDragdrop($event, index, 'y')">
                <div v-if="column.over" class="drop-line"/>
                {{ column.label }}
              </div>
              <div
                class="empty"
                @dragenter.stop="handleDragenter($event,null, 'y')"
                @dragover.stop="handleDragover($event)"
                @dragleave.stop="handleDragleave($event, null, 'y')"
                @drop.stop="handleDragdrop($event, 0, 'y')">
                <div v-if="yOver" class="drop-line"/>
                拖入字段
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="样式" name="style">样式</el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="4" class="right-container">
      <div class="header">数据模型</div>
      <el-row class="dimension-area">
        <div class="head">
          <span class="title">维度</span>
        </div>
        <div class="body">
          <data-table-list :data="dimensionData" @dragend="handleDragend"/>
        </div>
      </el-row>
      <el-row class="measure-area">
        <div class="head">
          <span class="title">度量</span>
        </div>
        <div class="body">
          <data-table-list :data="measureData" @dragend="handleDragend"/>
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import VeHistogram from 'v-charts/lib/histogram.common'
import DataTableList from './components/DataTableList'

export default {
  components: { VeHistogram, DataTableList },
  data() {
    return {
      activeName: 'data',
      chartData: {
        columns: ['class_name', 'value'],
        rows: [
          { class_name: '小二班', value: 5 },
          { class_name: '小一班', value: 8 },
          { class_name: '中二班', value: 6 },
          { class_name: '中一班', value: 7 }
        ]
      },
      chartExtend: {
        series(v) {
          v.forEach(i => {
            i.barWidth = 20
          })
          return v
        }
      },
      activeCollapses: ['x', 'y'],
      dimensionData: [
        {
          label: 'class',
          children: [
            {
              label: 'class_id',
              children: []
            },
            {
              label: 'class_name',
              children: []
            },
            {
              label: 'class_number',
              children: []
            }
          ]
        },
        {
          label: 'student',
          children: [
            {
              label: 'student_id',
              children: []
            },
            {
              label: 'student_name',
              children: []
            }
          ]
        }
      ],
      xColumns: [],
      xOver: false,
      yColumns: [],
      yOver: false,
      measureData: [
        {
          label: 'class',
          children: [
            {
              label: 'create_user',
              children: []
            },
            {
              label: 'update_user',
              children: []
            }
          ]
        },
        {
          label: 'student',
          children: [
            {
              label: 'age',
              children: []
            },
            {
              label: 'height',
              children: []
            }
          ]
        }
      ]
    }
  },
  activated() {},
  methods: {
    handleDragenter($event, column, place) {
      if (!column) {
        // 拖入空白
        if (place === 'x') {
          // 拖入x
          this.xOver = true
        } else {
          // 拖入y
          this.yOver = true
        }
      } else {
        column.over = true
      }
    },
    handleDragover(event) {
      event.preventDefault()
    },
    handleDragleave($event, column, place) {
      if (!column) {
        // 拖入空白
        if (place === 'x') {
          // 拖入x
          this.xOver = false
        } else {
          // 拖入y
          this.yOver = false
        }
      } else {
        column.over = false
      }
    },
    handleDragdrop(event, index, place) {
      event.preventDefault()
      const label = event.dataTransfer.getData('label')
      const columns = place === 'x' ? this.xColumns : this.yColumns
      const column = columns[index]
      if (column) {
        column.over = false
      }
      if (this.isColumnExist(columns, label)) {
        this.$message({
          message: '该字段已存在',
          type: 'warning'
        })
        return
      }
      columns.splice(index, 0, { label: label, over: false })
    },
    handleDragend() {
      this.xOver = false
      this.yOver = false
    },
    isColumnExist(columns, label) {
      let result = false
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        if (column.label === label) {
          result = true
        }
      }

      return result
    }
  }
}
</script>

<style lang='scss'>
$defaultColor: #42a0f8;
.data-report-container {
  width: 100%;
  height: calc(100vh - 84px);
  position: relative;

  .left-container {
    height: 100%;

    .data-report-bar {
      width: 400px;
      height: 300px;
      padding: 16px;
    }
  }

  .center-container {
    height: 100%;
    border-left: 1px solid #ddd;

    .header {
      padding: 8px 0;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    .el-tab-pane {
      height: calc(100vh - 190px);

      .el-collapse-item {
        .table-column {
          position: relative;
          margin-top: 8px;
          border: 1px dotted #ddd;
          height: 18px;
          line-height: 18px;
          background-color: $defaultColor;
          color: #fff;
          text-align: center;
          -moz-border-radius: 100px;
          border-radius: 100px;

          .drop-line {
            width: 100%;
            height: 2px solid $defaultColor;
            border: 1px solid $defaultColor;
            position: absolute;
            top: -6px;
          }
        }

        .empty {
          position: relative;
          margin-top: 8px;
          border: 1px dotted #ddd;
          height: 28px;
          line-height: 28px;
          background-color: #fff;
          text-align: center;
          -moz-border-radius: 100px;
          border-radius: 100px;

          .drop-line {
            width: 100%;
            height: 2px solid $defaultColor;
            border: 1px solid $defaultColor;
            position: absolute;
            top: -6px;
          }
        }
      }
    }
  }

  .right-container {
    height: 100%;
    border-left: 1px solid #ddd;

    .header {
      padding: 8px 0;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    .dimension-area {
      position: relative;
      padding-bottom: 8px;
      border-top: 1px solid #ddd;
      height: 50%;
      overflow: hidden;

      .head {
        position: relative;

        .title {
          display: inline-block;
          padding-top: 8px;
          padding-left: 16px;
        }
      }

      .body {
        height: calc(100% - 36px);
      }
    }

    .measure-area {
      position: relative;
      padding-bottom: 8px;
      border-top: 1px solid #ddd;
      height: 50%;
      overflow: hidden;

      .head {
        position: relative;

        .title {
          display: inline-block;
          padding-top: 8px;
          padding-left: 16px;
        }
      }

      .body {
        height: calc(100% - 36px);
      }
    }
  }
}
</style>
