<template>
  <div id="wrap">
    <div class="stamp-show"><img v-if="isShowLeft" src="../../assets/images/hide.png" alt="" @click="isShow($event)">
      <img v-if="!isShowLeft" src="../../assets/images/show.png" alt="" @click="isShow($event)">
    </div>
    <div class="content">
      <transition name="fade-transform" mode="in-out">
        <div v-if="isShowLeft" class="content-left">
          <div>
            <p>1.选择印章形状</p>
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" class="el-radio-group-stamp" @change="updateType">
              <el-radio-button :label="false">椭圆</el-radio-button>
              <el-radio-button :label="true">圆形</el-radio-button>
            </el-radio-group>
          </div>
          <div class="seal-base">
            <p>2.选择原始印章图片</p>
            <p class="prompt">上传一张包含印章的图片作为印章对比对象</p>
            <div class="imgContent">
              <img :src="baseImg" alt="" >
            </div>
            <el-upload
              :on-success="onLeftSuccess"
              :show-file-list="false"
              :action="`/seal/discern/origSealUpload?shape=${selectVal}`"
              class="upload-demo"
              style="display:inline-block;">
              <el-button size="small" class="upload-stamp" type="primary">上传</el-button>
            </el-upload>
          </div>
          <div class="seal-base">
            <p>3.上传对比印章图片</p>
            <p class="prompt">上传需要与原始印章进行对比的图片(图片数量为1~9张)</p>
            <el-upload
              :on-success="onRightSuccess"
              :show-file-list="false"
              :action="`/seal/discern/destSealUpload?fileName=${fileName}&shape=${selectVal}`"
              multiple
              class="upload-demo"
              style="display:inline-block;">
              <el-button :disabled="!fileName" class="upload-stamp" size="small" type="primary">上传</el-button>
            </el-upload>
          </div>
        </div>
      </transition>
      <div id="imgList" class="imgList" >
        <div v-for="(item,index) in list" :key="index">
          <p class="img-title">{{ item.fileName }}<span>{{ item.similarScore.toFixed(3) }}</span><span>相似度值:</span></p>
          <el-row>
            <el-col :span="8" class="img-border">
              <img :src="item.origImg.fileByte" :class="`origImg_${index}`" class="demo-img pos-center">
            </el-col>
            <el-col :span="8" class="col-md-4 img-border" style="border-left:none;">
              <img :src="item.collectImg.fileByte" :class="`collectImg_${index}`" class="demo-img pos-center" alt="" >
            </el-col>
            <el-col :span="8" class="col-md-4 img-border">
              <img :src="item.overlapImg.fileByte" :class="`overlapImg_${index}`" class="demo-img pos-center" alt="" >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <p style="text-align:center;width:100%">{{ item.origImg.showName }}</p>
            </el-col>
            <el-col :span="8">
              <p style="text-align:center;width:100%">{{ item.collectImg.showName }}</p>
            </el-col>
            <el-col :span="8">
              <p style="text-align:center;width:100%">{{ item.overlapImg.showName }}</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Stamp',
  components: {},
  data() {
    return {
      isShowLeft: true,
      isCollapse: true,
      selectVal: 'circle',
      fileName: '',
      baseImg: '',
      list: []
    }
  },
  methods: {
    updateType() {
      this.selectVal = this.isCollapse ? 'circle' : 'ellipse'
    },
    isShow(e) {
      console.log(e)
      this.isShowLeft = !this.isShowLeft
    },
    onLeftSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.baseImg = response.data.fileByte
        this.fileName = response.data.fileName
      }
    },
    onRightSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.list.push(response.data[0])
        setTimeout(() => {
          this.list.forEach((value, key) => {
            this.blowup(
              {
                background: '#FCEBB6'
              },
              `.origImg_${key}`
            )
            this.blowup(
              {
                background: '#FCEBB6'
              },
              `.collectImg_${key}`
            )
            this.blowup(
              {
                background: '#FCEBB6'
              },
              `.overlapImg_${key}`
            )
          })
        }, 500)
      }
    },
    blowup(attributes, str) {
      const $element = $(str)
      console.log(str, $element)
      // If the target element is not an image
      if (!$element.is('img')) {
        console.log(
          '%c Blowup.js Error: ' + '%cTarget element is not an image.',
          'background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;',
          'background: #FCEBB6; color: #F07818; font-size: 17px;'
        )
        return
      }

      // Constants
      var $IMAGE_URL = $element.attr('src')
      var NATIVE_IMG = new Image()
      NATIVE_IMG.src = $element.attr('src')

      // Default attributes
      var defaults = {
        round: true,
        width: 200,
        height: 200,
        background: '#FFF',
        shadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)',
        border: '6px solid #FFF',
        cursor: true,
        zIndex: 999999,
        scale: 1
      }

      // Update defaults with custom attributes
      var $options = $.extend(defaults, attributes)

      // Modify target image
      $element.on('dragstart', function(e) {
        e.preventDefault()
      })
      $element.css('cursor', $options.cursor ? 'crosshair' : 'none')

      // Create magnification lens element
      var lens = document.createElement('div')
      lens.id = 'BlowupLens'

      // Attack the element to the body
      $('body').append(lens)

      // Updates styles

      $('#BlowupLens').css({
        position: 'absolute',
        visibility: 'hidden',
        'pointer-events': 'none',
        zIndex: $options.zIndex,
        width: $options.width,
        height: $options.height,
        border: $options.border,
        background: $options.background,
        'border-radius': $options.round ? '50%' : 'none',
        'box-shadow': $options.shadow,
        'background-repeat': 'no-repeat'
      })

      // Show magnification lens
      $element.mouseenter(function() {
        $('#BlowupLens').css('visibility', 'visible')
      })

      // Mouse motion on image
      $element.mousemove(function(e) {
        // Lens position coordinates
        var lensX = e.pageX - $options.width / 2
        var lensY = e.pageY - $options.height / 2

        // Relative coordinates of image
        var relX = e.pageX - $(this).offset().left
        var relY = e.pageY - $(this).offset().top
        // Zoomed image coordinates
        var zoomX = -Math.floor((relX / $element.width()) * (NATIVE_IMG.width * $options.scale) - $options.width / 2)
        var zoomY = -Math.floor((relY / $element.height()) * (NATIVE_IMG.height * $options.scale) - $options.height / 2)

        var backPos = zoomX + 'px ' + zoomY + 'px'
        var backgroundSize = NATIVE_IMG.width * $options.scale + 'px ' + NATIVE_IMG.height * $options.scale + 'px'

        // Apply styles to lens
        $('#BlowupLens').css({
          left: lensX,
          top: lensY,
          'background-image': 'url(' + $IMAGE_URL + ')',
          'background-size': backgroundSize,
          'background-position': backPos
        })
        var scale = $options.scale
        $element.on('mousewheel DOMMouseScroll', onMouseScroll)
        function onMouseScroll(e) {
          e.preventDefault()
          var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail
          var delta = Math.max(-1, Math.min(1, wheel))
          if (delta < 0) {
            scale += 0.2
            $options.scale = scale
            doSomething(scale)
          } else {
            scale -= 0.2
            $options.scale = scale
            doSomething(scale)
          }
        }
        function doSomething(scale) {
          var zoomX = -Math.floor((relX / $element.width()) * (NATIVE_IMG.width * scale) - $options.width / 2)
          var zoomY = -Math.floor((relY / $element.height()) * (NATIVE_IMG.height * scale) - $options.height / 2)

          var backPos = zoomX + 'px ' + zoomY + 'px'
          var backgroundSize = NATIVE_IMG.width * scale + 'px ' + NATIVE_IMG.height * scale + 'px'

          // Apply styles to lens
          $('#BlowupLens').css({
            'background-size': backgroundSize,
            'background-position': backPos
          })
        }
      })
      // Hide magnification lens
      $element.mouseleave(function() {
        $options.scale = 1
        $('#BlowupLens').css('visibility', 'hidden')
      })
    }
  }
}
</script>
<style>
.el-radio-group-stamp .el-radio-button--medium .el-radio-button__inner {
  padding: 10px 65px !important;
}
.upload-stamp {
  padding: 10px 146px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-demo {
  width: 100%;
  .el-upload--text {
    width: 100% !important;
  }
}
#wrap {
  width: 100%;
  height: calc(100vh - 100px);
  position: relative;
  .stamp-show {
    position: absolute;
    left: 0;
    top: 50%;
    cursor: pointer;
    margin-top: -69px;
  }
}

#wrap .page-header {
  background: #555555;
  text-align: center;
  color: #fff;
}
#wrap .page-header p {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 0;
}

#wrap .content {
  /* padding: 20px; */
  display: flex;
}

.content .selectRadio .optionsRadios1 {
  margin-right: 20px;
}

.content .content-left {
  width: 360px;
  padding: 20px;
  flex: 0 0 360px;
  height: calc(100vh - 50px);
  background: #fff;
  box-sizing: border-box;
}
.btn-new {
  width: 152px;
  height: 40px;
  text-align: center;
  border-radius: 0;
  box-sizing: border-box;
  border: 1px solid #ddd;
}
.btn-new:nth-of-type(2) {
  margin-left: 10px;
}
.seal-base .prompt {
  font-size: 12px;
  color: #999;
}
.seal-base > p:nth-of-type(1) {
  margin-top: 20px;
  margin-bottom: 5px;
}
.seal-base-btn {
  width: 320px;
}
.imgContent {
  margin-top: 10px;
  border: 1px solid #ddd;
  height: 320px;
  width: 100%;
  margin-bottom: 10px;
}
.imgContent img {
  width: 100%;
  height: 100%;
}

.bot {
  margin-top: 20px;
}

.imgList .row img {
  width: 100%;
  /* height: 100%; */
}

.imgList > div {
  margin-right: 1%;
  margin-top: 1%;
}
.imgList {
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
  background: #f0f0f0;
  padding-left: 20px;
  flex-wrap: wrap;
  align-content: start;
  align-items: flex-start;
}
.imgList > div {
  border: 1px solid #ddd;
  flex: 0 0 49%;
  width: 49%;
  min-width: 49%;
  background: #fff;
}
.imgList > div .img-title {
  background: #ebf0f4;
  padding-left: 20px;
  margin-bottom: 0;
  margin-top: 0;
  height: 40px;
  color: #333;
  line-height: 40px;
  clear: both;
  border-bottom: 1px solid #ddd;
}

.imgList > div .img-title span {
  float: right;
  display: inline-block;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.imgList > div .img-title span:nth-of-type(1) {
  margin-right: 20px;
}
.content-left-hide {
  position: fixed;
  left: 0;
  top: 48%;
}
.imgList .col-md-4 {
  display: flex;
  align-items: center;
}
.imgList .img-border {
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.pos-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.demo-img {
  border-radius: 5px;
  width: 100%;
}

.descrip {
  font-size: 15px;
  line-height: 0;
  color: #d66a00;
}

.code-view {
  width: 245px;
  font-size: 14px;
}
</style>

