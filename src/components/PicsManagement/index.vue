<template>
  <div class="pics-manage-wrap">
    <el-dialog
      :visible="dialogVisible"
      :show-close="false"
      :append-to-body="true"
      width="940px"
      custom-class="pics-manage-compontent-dialog"
      title="">
      <el-container style="height:auto" class="left-side">
        <el-aside width="120px" style="background-color:#212121;position:relative;">
          <div class="title-wrap">
            <h2>素材中心</h2>
          </div>
          <div class="left-side-inner">
            <ul class="left-menu-wrap">
              <li class="selected"><span>图片库</span></li>
              <!-- <li><span>视频库</span></li>
              <li><span>音乐库</span></li>
              <li><span>动图库</span></li> -->
            </ul>
          </div>
          <div class="upload-btn-wrap">
            <el-upload
              :action="postUrl"
              :http-request="upload"
              class="upload-btn-inner">
              <el-button size="mini">
                <font-awesome-icon :icon="['fas', 'cloud-upload-alt']" />
                本地上传
              </el-button>
            </el-upload>
          </div>
        </el-aside>
        <el-container class="right-main">
          <el-header style="height:40px;" class="category-hd-wrap">
            <ul class="category">
              <!-- <li class="item active">最近</li> -->
              <li class="item active">上传</li>
            </ul>
            <div class="close pull-right" @click="togglePicsCenter()">
              <font-awesome-icon :icon="['fas', 'times']" />
            </div>
          </el-header>
          <el-main class="category-bd-wrap" style="position:relative;">
            <ul class="images-list">
              <li v-for="item in imagesList" :key="item.id" class="image-item" @click="select(item)">
                <div :style="{ 'background-image' : `url('${item.url}')`}" class="cover">
                  <div class="mask" />
                  <span data-hint="预览" class="icon preview">
                    <img
                      v-preview="item.url"
                      :src="item.url"
                      :alt="item.url"
                      :key="item.id"
                      preview-title-enable="true"
                      preview-nav-enable="true"
                      class="placeholder-img">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                  </span>
                </div>
              </li>
            </ul>
            <!--分页导航 start-->
            <div class="pageNavWrap">
              <el-pagination
                :current-page="pageNav.pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageNav.pageSize"
                :total="pageNav.total"
                layout="total, sizes, prev, pager, next, jumper"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
            </div>
            <!--分页导航 end-->
          </el-main>
        </el-container>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImagesToOSS, getOSSImagesList } from '@/api/goodsManage'
import { BASE_URL } from '@/utils/request'
export default {
  name: 'PicsManagement',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 分页导航
      pageNav: {
        total: 0,
        pageNo: 1,
        pageSize: 10
      },
      // 当前登录用户id
      userId: this.$store.getters.id,
      // 接口api
      picsManagementMapApi: {
        upload: uploadImagesToOSS,
        query: getOSSImagesList
      },
      // 已上传图片
      imagesList: [],
      // 上传地址
      postUrl: BASE_URL + '/user/images/upload'
    }
  },
  mounted() {
    this.visible = this.dialogVisible
    this.refreshImageList()
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageNav.pageSize = val
      this.refreshImageList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pageNav.pageNo = val
      this.refreshImageList()
    },
    togglePicsCenter() {
      this.$root.eventHub.$emit('togglePicsCenterEvent')
    },
    // 选中某张图片
    select(pic) {
      this.$root.eventHub.$emit('selectPicsCenterEvent', pic)
    },
    // 刷新已上传图片列表
    refreshImageList() {
      this.picsManagementMapApi.query({
        page: this.pageNav.pageNo,
        pageSize: this.pageNav.pageSize
      })
        .then(res => {
          if (res.status === 200) {
            const tempArr = []
            res.data.data.forEach(o => {
              // tempArr.push(`https://images.maiyidesan.cn/users/${this.userId}/${o.path}`)
              tempArr.push({
                id: o.id,
                url: `https://images.maiyidesan.cn/users/${this.userId}/${o.path}`,
                fileName: o.path
              })
            })
            this.imagesList = tempArr
            // 设置分页
            this.pageNav.total = res.data.total
          }
        })
    },
    // 上传图片至oss
    upload(file) {
      const formData = new FormData()
      formData.append('images', file.file)
      this.picsManagementMapApi.upload(formData)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '图片上传成功！'
            })
            this.refreshImageList()
          }
        })
    }
  }
}
</script>

<style lang="scss">
.pics-manage-compontent-dialog{
  // background-color:red;
  .el-dialog__header{
    display:none;
  }
  .el-dialog__body{
    padding:0;
    // 图片库左边栏
    .left-side{
      // 整个窗口标题
      .title-wrap{
        h2{
          color:#fff;
          text-indent:30px;
          font-size:16px;
          margin:0;
          height:40px;
          line-height:40px;
        }
      }
      // 本地文件上传按钮
      .upload-btn-wrap{
        position:absolute;
        bottom: 10px;
        left:0;
        width:100%;
        text-align:center;
        .upload-btn-inner{
          .el-upload{
            button{
              border:none;
              background-color: #1593ff;
              border-radius: 0;
              color:#fff;
              border-radius:50px;
              &:hover{
                background-color:#198ae7;
              }
            }
          }
          // 不显示已上传列表
          .el-upload-list{
            display:none !important;
          }
        }
      }
      // 左边栏菜单容器
      .left-side-inner{
        ul.left-menu-wrap{
          list-style:none;
          margin:0;
          padding:0;
          li{
            height:40px;
            line-height:40px;
            color:#fff;
            text-indent:30px;
            transition: all .3s;
            &.selected{
              background-color: #1593ff;
              color:#fff;
              font-weight:700;
            }
            &:hover{
              background-color: #1593ff;
              color:#fff;
              font-weight:700;
            }
          }
        }
      }
    }
    // 右侧主内容区
    .right-main{
      // 已上传图片列表显示
      .category-bd-wrap{
        ul.images-list{
          width:780px;
          display: flex;
          justify-content: flex-start;
          align-content: flex-start;
          flex-wrap: wrap;
          padding: 20px;
          list-style:none;
          margin:0;
          padding:0;
          li{
            flex: none;
            display:inline-block;
            vertical-align: top;
            position:relative;
            margin:10px;
            // &.image-item:not(:nth-child(5n)){
            //   margin-right:10px;
            // }
            .cover{
              position:relative;
              width:136px;
              height:136px;
              background:#eee 50%/contain no-repeat;
              &:after{
                content: "";
                display: block;
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 100px;
                background-image: linear-gradient(-180deg,transparent,rgba(0,0,0,.05) 31%,rgba(0,0,0,.1) 48%,rgba(0,0,0,.2) 66%,rgba(0,0,0,.3) 88%,rgba(0,0,0,.35) 95%,rgba(0,0,0,.4) 99%);
              }
              &:hover{
                .mask{
                  opacity: .3;
                }
              }
              .placeholder-img{
                position:absolute;
                height:100%;
                width:100%;
                display:block;
                opacity:0;
              }
              .mask{
                position:absolute;
                height:100%;
                width:100%;
                opacity:0;
                transition: all .3s;
                background: #000;
                pointer-events:none;
              }
              span{
                &.preview{
                  right: 0;
                  &:hover{
                    color: #1593ff;
                  }
                }
              }
              .icon{
                position:absolute;
                bottom: 0;
                width:20px;
                height:20px;
                line-height:20px;
                margin: 8px;
                text-align:center;
                color:#fff;
                cursor:pointer;
                transition:all .3s;
                z-index:1;
              }
            }
          }
        }
      }

      .category-hd-wrap{
        padding: 0 20px;
        box-shadow:0 6px 6px 0 rgba(0,0,0,.16);
        // 顶部右侧close按钮
        .close{
          width:22px;
          height:22px;
          line-height:22px;
          margin: 8px 0 8px 16px;
          text-align:center;
          cursor:pointer;
          transition: all .3s;
        }
        // 顶部tab按钮栏
        ul.category{
          display:inline-block;
          list-style:none;
          margin:0;
          padding:0;
          > .item.active{
            color:#1593ff;
            border-bottom:2px solid #1593ff;
          }
          > .item {
            display:inline-block;
            height:38px;
            line-height: 38px;
            border-bottom: 2px solid #fff;
            cursor:pointer;
            transition: all .3s;
            &:not(:first-child) {
              margin-left: 40px;
            }
          }
        }
      }
    }
  }
}
</style>
