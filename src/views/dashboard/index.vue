<template>
  <el-container class="dashboard-wrap">
    <el-main>
      <div class="kanban-wrap">
        <div class="header-row">
          <el-row :gutter="10">
            <el-col :span="3">
              <img src="public/img/merchant_dashboard/test_shop_logo.jpg" class="shop-logo" />
            </el-col>
            <el-col :span="7">
              <div class="header-row-item">
                <h2>
                  <b>天天果园</b>
                </h2>
                <h3 class="shop-cate-name">水果生鲜</h3>
                <div class="panel-type">
                  <div class="panel-type-item">
                    <img src="public/img/merchant_dashboard/self.png" />
                    <div class="type">自营店</div>
                  </div>
                  <div class="panel-type-item">
                    <img src="public/img/merchant_dashboard/enterprise.png" />
                    <div class="type">企业入驻</div>
                  </div>
                  <div class="panel-type-item">
                    <img src="public/img/merchant_dashboard/open.png" />
                    <div class="type">营业中</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="header-row-item">
                <h2>
                  <b>店铺资料</b>
                </h2>
                <div class="panel-type">
                  <ul class="shop-info-ul">
                    <li>
                      <b>营业时间：</b>8:00--次日0:00
                    </li>
                    <li>
                      <b>店铺公告：</b>超过当天营业时间第二天发货。
                    </li>
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="header-row-item">
                <h2>
                  <b>个人信息</b>
                </h2>
                <div class="panel-type">
                  <div class="header-img">
                    <font-awesome-icon
                      :icon="['fas', 'user-circle']"
                      size="lg"
                      style="font-size:50px;"
                    />
                  </div>
                  <div class>
                    <div class="person-title">
                      张三
                      <small class="label label-warning">店长</small>
                    </div>
                    <div>
                      <ul class="shop-info-ul">
                        <li>
                          <b>上次登录IP：</b>218.104.98.19
                        </li>
                        <li>
                          <b>上次登录时间：</b>2019-09-10 15:13
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="py-card-header green">
                <span>待接单订单</span>
              </div>
              <div class="box-card-body">
                <span class="number">
                  <a>1</a>
                </span>
                <span class="unit">单</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="py-card-header yellow">
                <span>待发货订单</span>
              </div>
              <div class="box-card-body">
                <span class="number">
                  <a>0</a>
                </span>
                <span class="unit">单</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="py-card-header red">
                <span>待收货订单</span>
              </div>
              <div class="box-card-body">
                <span class="number">
                  <a>2</a>
                </span>
                <span class="unit">单</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="py-card-header purple">
                <span>退款/售后订单</span>
              </div>
              <div class="box-card-body">
                <span class="number">
                  <a>1</a>
                </span>
                <span class="unit">单</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'DashboardAdmin',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.header-row {
  background-color: #fff;
  border: 1px solid rgb(235, 238, 245);
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  padding: 15px 30px;

  // 直营店logo
  .shop-logo {
    display: block;
    width: 121px;
    height: 121px;
    border: 1px solid rgb(235, 238, 245);
    border-radius: 4px;
  }

  .header-row-item {
    h2 {
      font-size: 18px;
      margin: 0;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    h3 {
      margin: 0;
      font-size: 14px;
      padding: 10px 0;
    }
    .panel-type {
      display: flex;
      margin-top: 10px;
      .header-img {
        margin-right: 10px;
      }
      // 人员职位
      .person-title {
        font-size: 18px;
      }
      ul.shop-info-ul {
        list-style: none;
        padding: 0;
        li {
        }
      }
      .panel-type-item {
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        margin-right: 30px;
        img {
          width: 30px;
          height: 30px;
          margin-bottom: 5px;
        }
        .type {
          font-size: 16px;
        }
      }
    }
  }
}
.dashboard-wrap {
  background-color: #fff;
  // border:1px solid red;
  padding: 20px;
  .box-card {
    // border-color:red;
    .el-card__header {
      padding: 0;
      .py-card-header {
        padding: 20px 10px;
        color: #fff;
        text-align: center;
        &.green {
          background-color: #2fc1a5;
        }

        &.yellow {
          background-color: #efbc2e;
        }

        &.red {
          background-color: #f44775;
        }

        &.purple {
          background-color: #7a31ec;
        }
      }
    }

    .box-card-body {
      text-align: center;
      span {
        &.number {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
