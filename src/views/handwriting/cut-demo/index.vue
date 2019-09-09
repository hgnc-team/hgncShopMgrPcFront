<template>
  <div class="upload-wrapper">
    <div class="img-preview">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>选择检材：</span>
              <span>{{ leftPic.fileName }}</span>
              <el-button size="small" type="primary">开始比对</el-button>
              <span style="float: right;">
                <el-button>查看原图</el-button>
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
                      <el-button type="primary">提交</el-button>
                    </el-form-item>
                  </el-form>
                  <el-button slot="reference">文字切片</el-button>
                </el-popover>
                <el-button>清除图片</el-button>
              </span>
            </div>
            <div ref="leftPic" class="oringinImgWrapper"><img src="static/handwritting/images/jiancai.jpg"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>选择样本：</span>
              <span>{{ rightPic.fileName }}</span>
              <span style="float: right;">
                <el-button>查看原图</el-button>
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
                      <el-button type="primary">提交</el-button>
                    </el-form-item>
                  </el-form>
                  <el-button slot="reference">文字切片</el-button>
                </el-popover>
                <el-button>清除图片</el-button>
              </span>
            </div>
            <div ref="rightPic" class="oringinImgWrapper"><img src="static/handwritting/images/yangben.jpg">
              <div class="slices-layer">
                <VueDragResize :is-active="true" :w="200" :h="200" @resizing="resize" @dragging="resize">
                  <div class="filler" />
                </VueDragResize>

                <VueDragResize :is-active="true" :w="100" :h="50" @resizing="resize" @dragging="resize">
                  <div class="filler" />
                </VueDragResize>

                <VueDragResize :is-active="true" :w="30" :h="300" @resizing="resize" @dragging="resize">
                  <div class="filler" />
                </VueDragResize>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'
import VueDragResize from 'vue-drag-resize'

const baseUrl = 'http://192.168.8.53:8888/' // 约比上面的地址快20倍
export default {
  name: 'Handwriting',
  components: {
    VueDragResize
  },
  data() {
    return {
      showTxt: '正在加紧比对，请稍后...',
      currentPogressValue: 0,
      progressDialogVisible: false,
      actionUrl: baseUrl + 'api/v1/picture/upload',
      leftPic: {
        originImgUrl: '',
        fileName: '',
        btnTxt: '上传图片',
        argForm: {
          arg1: 20,
          arg2: 30,
          arg3: 200
        }
      },
      rightPic: {
        originImgUrl: '',
        fileName: '',
        btnTxt: '上传图片',
        argForm: {
          arg1: 20,
          arg2: 30,
          arg3: 200
        }
      },
      // 切片相关
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  },
  computed: {},
  mounted() {},
  methods: {
    resize(newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.filler{
  border:2px dashed red;
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
}
.upload-wrapper{
  padding:20px 30px;
}
.oringinImgWrapper{
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
</style>
