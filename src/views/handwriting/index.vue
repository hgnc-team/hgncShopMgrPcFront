<template>
  <div ref="contextMenuTarget" class="upload-wrapper">
    <!-- {{ contextMenuVisible }} -->
    <div class="img-preview">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-card class="box-card">
            <!-- {{ leftPic }} -->
            <div slot="header" class="clearfix">
              <span>选择检材：</span>
              <span>{{ leftPic.fileName }}</span>
              <el-upload
                :on-success="onLeftSuccess"
                :show-file-list="false"
                :action="leftPicActionUrlWithArgs"
                class="upload-demo"
                style="display:inline-block;">
                <el-button size="small">{{ leftPic.btnTxt }}</el-button>
              </el-upload>
              <el-button size="small" type="primary" @click="doMatch">开始比对</el-button>
              <span style="float: right;">
                <el-button @click="checkOrigin('leftPic')">查看原图</el-button>
                <el-popover placement="bottom" width="400" trigger="hover">
                  <el-form ref="ybform" :model="leftPic.argForm" label-width="150px">
                    <el-form-item label="单字笔划间距">
                      <el-input v-model="leftPic.argForm.arg1" />
                    </el-form-item>
                    <el-form-item label="切片最小边长">
                      <el-input v-model="leftPic.argForm.arg2" />
                    </el-form-item>
                    <el-form-item label="切片最大边长">
                      <el-input v-model="leftPic.argForm.arg3" />
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="doSlice('leftPic')">提交</el-button>
                      <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                  </el-form>
                  <el-button slot="reference" @click="cutText('leftPic')">文字切片</el-button>
                </el-popover>
                <el-button @click="clearImg('leftPic')">清除图片</el-button>
              </span>
            </div>
            <div class="oringinImgWrapper">
              <div ref="leftPic" class="oringinImgWrapperInner" />
              <div class="slices-layer">
                <!-- <span v-for="(item,index) in leftPic.rects" :key="index">{{ index }}</span> -->
                <VueDragResize
                  v-for="(item,index) in leftPic.rects"
                  v-show="item.isShow"
                  :parent-limitation="true"
                  :is-active="item.isActive"
                  :key="index"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  @resizing="resize"
                  @dragging="resize"
                  @clicked="selectDragSlice">
                  <div :data-index="index" data-flag="leftPic" class="filler"/>
                </VueDragResize>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>选择样本：</span>
              <span>{{ rightPic.fileName }}</span>
              <el-upload
                :on-success="onRightSuccess"
                :show-file-list="false"
                :action="rightPicActionUrlWithArgs"
                class="upload-demo"
                style="display:inline-block;">
                <el-button size="small">{{ rightPic.btnTxt }}</el-button>
              </el-upload>
              <span style="float: right;">
                <el-button @click="checkOrigin('rightPic')">查看原图</el-button>
                <el-popover placement="bottom" width="400" trigger="hover">
                  <el-form ref="ybform" :model="rightPic.argForm" label-width="120px">
                    <el-form-item label="单字笔划间距">
                      <el-input v-model="rightPic.argForm.arg1" />
                    </el-form-item>
                    <el-form-item label="切片最小边长">
                      <el-input v-model="rightPic.argForm.arg2" />
                    </el-form-item>
                    <el-form-item label="切片最大边长">
                      <el-input v-model="rightPic.argForm.arg3" />
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="doSlice('rightPic')">提交</el-button>
                      <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                  </el-form>
                  <el-button slot="reference" @click="cutText('rightPic')">文字切片</el-button>
                </el-popover>
                <el-button @click="clearImg('rightPic')">清除图片</el-button>
              </span>
            </div>
            <div class="oringinImgWrapper">
              <div ref="rightPic" class="oringinImgWrapperInner" />
              <div class="slices-layer">
                <!-- <span v-for="(item,index) in leftPic.rects" :key="index">{{ index }}</span> -->
                <VueDragResize
                  v-for="(item,index) in rightPic.rects"
                  v-show="item.isShow"
                  :parent-limitation="true"
                  :is-active="item.isActive"
                  :key="index"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  @resizing="resize"
                  @dragging="resize"
                  @clicked="selectDragSlice">
                  <div :data-index="index" data-flag="rightPic" class="filler" />
                </VueDragResize>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!--进度弹窗-->
    <el-dialog
      :visible.sync="progressDialogVisible"
      :show-close="false"
      :close-on-click-modal = "false"
      custom-class="custom-progress-wrap"
      width="30%"
      append-to-body>
      <div class="progressWrapper">
        <h3>{{ showTxt }}</h3>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="currentPogressValue" status="success" />
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="progressDialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
    <vue-context-menu
      v-if="contextMenuVisible"
      :target="contextMenuTarget"
      :show="contextMenuVisible"
      class="right-menu"
      @update:show="(show) => contextMenuVisible = show">
      <a href="javascript:;" >锁定</a>
      <a href="javascript:;" @click="removeSlice">删除</a>
    </vue-context-menu>
  </div>
</template>

<script>
// 路径规则
// http://10.90.131.72:8888/media/img/lafeillou_1551783530245.jpg
// http://10.90.131.72:8888/media/lafeillou_1551783530245/8.jpg
// http://10.90.131.72:8888/media/rect_Suc_yxh_1029_2_1551783989468.jpg

// todo
// 1.查看原图按钮改成  查看原图/查看切片 文字toggle (先不改)
// 2.文字切片 为动词 可以通过popover出一个表单 设置切片动作的参数 done
// 3.切出来的小文字图片怎么展示 done
import axios from 'axios'
import $ from 'jquery'
import VueDragResize from 'vue-drag-resize'
import _ from 'lodash'
import { component as VueContextMenu } from '@xunlei/vue-context-menu'

// const baseUrl = 'http://10.90.131.72:8888/'
// const baseUrl = 'http://192.168.8.53:8888/' // 约比上面的地址快20倍
const baseUrl = 'http://10.90.131.219:8888/' // 罗鸣锐后台
export default {
  name: 'Handwriting',
  components: { VueDragResize, 'vue-context-menu': VueContextMenu },
  data() {
    return {
      // 右键菜单可见性
      contextMenuVisible: false,
      contextMenuTarget: null,
      currentSlice: null,
      showTxt: '正在加紧比对，请稍后...',
      currentPogressValue: 0,
      progressDialogVisible: false,
      // actionUrl: baseUrl + 'api/v1/picture/upload',
      // 已下是罗鸣锐修改的接口
      actionUrl: baseUrl + 'api/v1/picture/uploadAndPreview',
      leftPic: {
        originImgUrl: '',
        fileName: '',
        btnTxt: '上传图片',
        argForm: {
          arg1: 20,
          arg2: 30,
          arg3: 200
        },
        // real width/height
        w: 0,
        h: 0,
        // view height/width
        vw: 0,
        vh: 0,
        // 比例尺
        scaleRate: 1,
        rects: []
      },
      rightPic: {
        originImgUrl: '',
        fileName: '',
        btnTxt: '上传图片',
        argForm: {
          arg1: 20,
          arg2: 30,
          arg3: 200
        },
        // real width/height
        w: 0,
        h: 0,
        // view height/width
        vw: 0,
        vh: 0,
        // 比例尺
        scaleRate: 1,
        rects: []
      }
    }
  },
  computed: {
    leftPicActionUrlWithArgs: function() {
      return this.actionUrl + `?fileName=${this.leftPic.fileName}&kernelSize=${this.leftPic.argForm.arg1}&min_width=${this.leftPic.argForm.arg2}&max_width=${this.leftPic.argForm.arg3}`
    },
    rightPicActionUrlWithArgs: function() {
      return this.actionUrl + `?fileName=${this.rightPic.fileName}&kernelSize=${this.rightPic.argForm.arg1}&min_width=${this.rightPic.argForm.arg2}&max_width=${this.rightPic.argForm.arg3}`
    }
  },
  mounted() {
    // this.createImgToAppend('leftPic')
    // this.$nextTick(() => {
    //   this.contextMenuTarget = this.$refs.contextMenuTarget
    // })
    // $('body').on('click', (e) => {
    //   alert(1)
    //   this.contextMenuVisible = false
    // })
  },
  methods: {
    // 删除切片
    removeSlice() {
      console.log('delete')
      // 不能简单的这样删除,数组里面顺序就是id,破坏了顺序就破坏了索引id
      // this[this.currentSlice.flag].rects.splice(this.currentSlice.index, 1)
      this[this.currentSlice.flag].rects[this.currentSlice.index].isShow = false
      this.contextMenuVisible = false
    },
    // 选中某个切片，一次只能选择一个切片，且将切片调整到最顶层
    selectDragSlice($event) {
      // $event.stopImmediatePropagation()
      // $event.preventDefault()
      // setTimeout(() => {
      console.log($event)
      const flag = $event.target.dataset['flag']
      const index = $event.target.dataset['index']
      // this[flag].rects.splice(index, 1)
      _.forEach(this[flag].rects, (value, index) => {
        this[flag].rects[index].isActive = false
      })
      this[flag].rects[index].isActive = true
      // }, 3000)
      // 绑定右键菜单
      this.contextMenuVisible = false
      this.$nextTick(() => {
        this.contextMenuVisible = true
        this.contextMenuTarget = $event.target
      })
      this.currentSlice = {
        flag: flag,
        index: index
      }
    },
    resize(newRect) {
      this[this.currentSlice.flag].rects[this.currentSlice.index].w = newRect.width
      this[this.currentSlice.flag].rects[this.currentSlice.index].h = newRect.height
      this[this.currentSlice.flag].rects[this.currentSlice.index].x = newRect.left
      this[this.currentSlice.flag].rects[this.currentSlice.index].y = newRect.top
    },
    createImgToAppend(flag, fileName, action, data) {
      const $picWrapperDom = $(this.$refs[flag])
      // 原图
      const orginString = `${baseUrl}media/img/${fileName}?timestamp=${+new Date()}`
      // 切后图
      const cutPicString = `${baseUrl}media/rect_Suc_${fileName}?timestamp=${+new Date()}`
      if (action === 'view') {
        $picWrapperDom.html($(`<img style="display:block;width:100%;" src="${orginString}" />`))
      } else if (action === 'cut') {
        $picWrapperDom.html($(`<img style="display:block;width:100%;" src="${cutPicString}" />`))
        console.log(cutPicString)
      } else if (action === 'init') {
        $picWrapperDom.html($(`<img style="display:block;width:100%;" src="${orginString}" />`))
      } else if (action === 'clear') {
        $picWrapperDom.html('')
      }
      // 如果有传入切片结果数据，没有data，则单纯更新图片
      if (data) {
        // 这里必须要异步一下，已获得图片的准确宽度，便于计算图像缩放的比例
        setTimeout(() => {
          const $img = $picWrapperDom.find('img')
          this.getSrcOriginSize($img.attr('src'), (w, h) => {
            this[flag].w = w
            this[flag].h = h
            this[flag].vw = $img.width()
            this[flag].vh = $img.height()
            this[flag].scaleRate = this[flag].vw / w * 1
            this.renderSlice(flag, data)
          })
        }, 0)
      }
    },
    onLeftSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.createImgToAppend('leftPic', response.data.fileName, 'init', response.data)
        this.leftPic.fileName = response.data.fileName
        this.leftPic.btnTxt = '重新上传'
      }
    },
    onRightSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.createImgToAppend('rightPic', response.data.fileName, 'init', response.data)
        this.rightPic.fileName = response.data.fileName
        this.rightPic.btnTxt = '重新上传'
      }
    },
    // 查看原图
    checkOrigin(flag) {
      if (!this[flag].fileName) {
        this.$message.warning(`请先上传一个${flag === 'leftPic' ? '检材' : '样本'}`)
        return
      }
      this.createImgToAppend(flag, this[flag].fileName, 'view')
    },
    // 清除图片
    clearImg(flag) {
      this[flag].fileName = ''
      this[flag].originImgUrl = ''
      this[flag].btnTxt = '上传图片'
      this[flag].rects = []
      this.createImgToAppend(flag, this[flag].fileName, 'clear')
    },

    // 图片切字
    cutText(flag) {
      if (!this[flag].fileName) {
        this.$message.warning(`请先上传一个${flag === 'leftPic' ? '检材' : '样本'}`)
        return
      }
      // 还原参数
      this[flag].argForm = {
        arg1: 20,
        arg2: 30,
        arg3: 200
      }
      this.doSliceAfterAdjust(flag)
      // this.doSlice(flag)
    },

    // 重新切割
    doSlice(flag) {
      if (!this[flag].fileName) {
        this.$message.warning(`请先上传一个${flag === 'leftPic' ? '检材' : '样本'}`)
        return
      }
      return new Promise((resolve, reject) => {
        axios.post(this.actionUrl + `?fileName=${this[flag].fileName}&kernelSize=${this[flag].argForm.arg1}&min_width=${this[flag].argForm.arg2}&max_width=${this[flag].argForm.arg3}`, {}, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then(response => {
            if (response.data.code === 200) {
              this.createImgToAppend(flag, this[flag].fileName, 'cut')
              resolve(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 手动调整切片之后，再切割
    doSliceAfterAdjust(flag) {
      const newRectData = []
      if (!this[flag].fileName) {
        this.$message.warning(`请先上传一个${flag === 'leftPic' ? '检材' : '样本'}`)
        return
      }

      _.forEach(this[flag].rects, (value, index) => {
        const temp = {}
        if (value.isShow) {
          temp.h = Math.round(value.h * 1 / this[flag].scaleRate)
          temp.w = Math.round(value.w * 1 / this[flag].scaleRate)
          temp.x = Math.round(value.x * 1 / this[flag].scaleRate)
          temp.y = Math.round(value.y * 1 / this[flag].scaleRate)
          newRectData.push(temp)
          console.log(temp)
        }
      })
      return new Promise((resolve, reject) => {
        // ?fileName=${this[flag].fileName}&kernelSize=${this[flag].argForm.arg1}&min_width=${this[flag].argForm.arg2}&max_width=${this[flag].argForm.arg3}
        axios.post(baseUrl + `api/v1/picture/slice`, {
          fileName: this[flag].fileName,
          rects: newRectData
        }, {
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => {
            if (response.data.code === 200) {
              console.log(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取图片原始大小
    getSrcOriginSize(url, callback) {
      const img = new Image()
      img.src = url
      // 如果图片被缓存，则直接返回缓存数据
      if (img.complete) {
        callback(img.width, img.height)
      } else {
      // 完全加载完毕的事件
        img.onload = function() {
          callback(img.width, img.height)
        }
      }
    },

    // 渲染后台的切片结果
    renderSlice(flag, data) {
      // setTimeout(() => {
      const temp = []
      _.forEach(data.rects, (o, i) => {
        temp.push({ x: Math.round(o.x * 1 * this[flag].scaleRate), y: Math.round(o.y * 1 * this[flag].scaleRate), w: Math.round(o.w * 1 * this[flag].scaleRate), h: Math.round(o.h * 1 * this[flag].scaleRate), isActive: false, isShow: true })
      })
      // console.log(temp)
      this[flag].rects = temp
      // }, 3000)
    },
    // 比对操作
    doMatch() {
      // 还原进度显示弹窗状态
      this.currentPogressValue = 0
      this.showTxt = '正在加紧比对，请稍后...'
      this.progressDialogVisible = true
      // 假进度
      const timer = setInterval(() => {
        this.currentPogressValue += parseInt(10 * Math.random())
        if (this.currentPogressValue > 100) {
          this.currentPogressValue = 100
          clearInterval(timer)
          setTimeout(() => {
            this.progressDialogVisible = false
            this.showTxt = '对比完成'
          }, 3000)
        }
      }, 1000)

      axios.post(baseUrl + 'api/v1/picture/wordMatch')
        .then(res => {
          console.log(res.data)
          this.currentPogressValue = 100
          clearInterval(timer)
          setTimeout(() => {
            this.progressDialogVisible = false
            this.showTxt = '对比完成'
            this.$router.push({ name: 'Handwriting.result', params: { data: res.data, baseUrl: baseUrl }})
          }, 1000)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.filler{
  border:2px dashed red;
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
}

.oringinImgWrapper{
  box-sizing:border-box;
  position:relative;
    img{
        display:block;
        width:100%;
    }
    .slices-layer{
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      // background-color:red;
    }
}
.upload-wrapper{
  padding:20px 30px;
}

.custom-progress-wrap{
  padding:20px;
  h3{
    text-align:center;
    margin:0;
    margin-bottom:20px;
  }
  //隐藏头部
  .el-dialog__header{
    display:none;
    padding:0;
  }
  .el-dialog__body{
    padding:0;
  }
}

.right-menu {
  position: fixed;
  background: #fff;
  border: solid 1px rgba(0, 0, 0, .2);
  border-radius: 3px;
  z-index: 999;
  display: none;
}
.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: block;
  color: #1a1a1a;
}
.right-menu a:hover {
  background: #eee;
  color: #fff;
}
.right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
    border-radius: 1px;
}
a {
    text-decoration: none;
}
.right-menu a {
    padding: 2px;
}
.right-menu a:hover {
    background: #42b983;
}
</style>
