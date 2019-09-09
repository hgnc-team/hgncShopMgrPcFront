<template>
  <el-main class="order-detail-wrap">
    <div>
      <h3 class="heading">
        配送订单信息
        <router-link to="/onlineOrderManage/index">
          <el-button type="default" size="mini" style="float:right;margin-top:-3px;">
            <font-awesome-icon :icon="['fas', 'reply']" />返回配送订单列表
          </el-button>
        </router-link>
      </h3>
    </div>
    <!--步骤条 start-->
    <div class="order-status-base order-five-base">
      <ul>
        <li class="step-first">
          <div class="step-done">
            <div class="step-no"></div>
            <div class="m_t5">提交订单</div>
            <div class="m_t5 pengyu-blue">2019-03-18 14:58:32</div>
          </div>
        </li>
        <li>
          <div class="step-cur">
            <div class="step-no">2</div>
            <div class="m_t5">买家已付款</div>
            <div class="m_t5 pengyu-blue">2019-03-18 14:58:41</div>
          </div>
        </li>
        <li>
          <div>
            <div class="step-no">3</div>
            <div class="m_t5">商家未接单</div>
            <div class="m_t5 pengyu-blue"></div>
          </div>
        </li>
        <li>
          <div>
            <div class="step-no">4</div>
            <div class="m_t5">商家未发货</div>
            <div class="m_t5 pengyu-blue"></div>
          </div>
        </li>
        <li class="step-last">
          <div>
            <div class="step-no">5</div>
            <div class="m_t5">交易完成</div>
          </div>
        </li>
      </ul>
    </div>
    <!--步骤条 end-->

    <el-row :gutter="0" style="margin-top:20px;margin-bottom:20px;height:40px;line-height: 40px;">
      <el-col :span="10">
        <span>
          <b>订单编号：</b>2018032310760
        </span>
      </el-col>
      <el-col :span="14">
        <el-form :inline="true" :model="form" class="order-search-form-inline">
          <el-form-item label>
            <el-input v-model="form.keyword" placeholder="请输入订单号或者订单id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!--基本信息 start-->
    <el-collapse v-model="activeNames[0]" class="custom-collapse">
      <el-collapse-item title="基本信息" name="1">
        <table class="table table-oddtd m_b0">
          <tbody class="first-td-no-leftbd">
            <tr>
              <td>
                <div align="right">
                  <strong>订单号：</strong>
                </div>
              </td>
              <td>2018032310760</td>
              <td>
                <div align="right">
                  <strong>订单状态：</strong>
                </div>
              </td>
              <td>已接单</td>
            </tr>
            <tr>
              <td>
                <div align="right">
                  <strong>购买人：</strong>
                </div>
              </td>
              <td>
                ecjia
                [
                <a
                  class="userInfo cursor_pointer"
                  data-toggle="modal"
                  href="#consigneeinfo"
                  title="显示购货人信息"
                >显示购货人信息</a> ]
              </td>
              <td>
                <div align="right">
                  <strong>下单时间：</strong>
                </div>
              </td>
              <td>2018-03-23 08:26:16</td>
            </tr>
            <tr>
              <td>
                <div align="right">
                  <strong>支付方式：</strong>
                </div>
              </td>
              <td>余额支付</td>
              <td>
                <div align="right">
                  <strong>付款时间：</strong>
                </div>
              </td>
              <td>2018-03-23 08:26:18</td>
            </tr>

            <tr>
              <td>
                <div align="right">
                  <strong>配送方式：</strong>
                </div>
              </td>
              <td>
                <span>上门取货</span>
              </td>
              <td>
                <div align="right">
                  <strong>期望送达时间：</strong>
                </div>
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <div align="right">
                  <strong>发货时间：</strong>
                </div>
              </td>
              <td></td>
              <td>
                <div align="right">
                  <strong>运单编号：</strong>
                </div>
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <div align="right">
                  <strong>订单来源：</strong>
                </div>
              </td>
              <td colspan="3"></td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
    <!--商品信息 end-->

    <!--发票信息 start-->
    <el-collapse v-model="activeNames[1]" class="custom-collapse">
      <el-collapse-item title="发票信息" name="1">
        <table class="table table-oddtd m_b0">
          <tbody class="first-td-no-leftbd">
            <tr>
              <td>
                <div align="right">
                  <strong>发票类型：</strong>
                </div>
              </td>
              <td></td>
              <td>
                <div align="right">
                  <strong>纳税人识别码：</strong>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div align="right">
                  <strong>发票抬头：</strong>
                </div>
              </td>
              <td></td>
              <td>
                <div align="right">
                  <strong>发票内容：</strong>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
    <!--发票信息 end-->

    <!--其他信息 start-->
    <el-collapse v-model="activeNames[2]" class="custom-collapse">
      <el-collapse-item title="其他信息" name="1">
        <table class="table table-oddtd m_b0">
          <tbody class="first-td-no-leftbd">
            <tr>
              <td>
                <div align="right">
                  <strong>订单备注：</strong>
                </div>
              </td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td>
                <div align="right">
                  <strong>缺货处理：</strong>
                </div>
              </td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td>
                <div align="right">
                  <strong>商家给客户的留言：</strong>
                </div>
              </td>
              <td colspan="3"></td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
    <!--其他信息 end-->

    <!--收货人信息 start-->
    <el-collapse v-model="activeNames[3]" class="custom-collapse">
      <el-collapse-item title="收货人信息" name="1">
        <table class="table table-oddtd m_b0">
          <tbody class="first-td-no-leftbd">
            <tr>
              <td>
                <div align="right">
                  <strong>收货人：</strong>
                </div>
              </td>
              <td>ECJia</td>
              <td>
                <div align="right">
                  <strong>手机号：</strong>
                </div>
              </td>
              <td>17612345671</td>
            </tr>
            <tr>
              <td>
                <div align="right">
                  <strong>地址：</strong>
                </div>
              </td>
              <td colspan="3">[ 上海 上海市 普陀区 曹杨新村街道] 上海市普陀区中山北路3553号伸大厦301</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
    <!--收货人信息 end-->

    <!--商品信息 start-->
    <el-collapse v-model="activeNames[4]" class="custom-collapse">
      <el-collapse-item title="商品信息" name="1">
        <table class="table table-striped table_vam m_b0 order-table-list">
          <thead>
            <tr class="table-list">
              <th class="w100">商品缩略图</th>
              <th>商品名称 [ 品牌 ]</th>
              <th class="w80">货号</th>
              <th class="w70">货品号</th>
              <th class="w100">价格</th>
              <th class="w70">数量</th>
              <th class="w100">属性</th>
              <th class="w70">库存</th>
              <th class="w100">小计</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-list">
              <td>
                <img
                  src="http://demodaojia.ecjia.com/content/uploads//images/201610/goods_img/1103_G_1477698555092.jpg"
                  width="50"
                />
              </td>
              <td>
                <a
                  href="http://demodaojia.ecjia.com/index.php?m=goods&amp;c=admin&amp;a=preview&amp;id=1103"
                  target="_blank"
                >温馨祝福鲜果礼盒</a>
              </td>
              <td>2160723102</td>
              <td></td>
              <td>
                <div>￥268.00</div>
              </td>
              <td>
                <div>1</div>
              </td>
              <td></td>
              <td>
                <div>996</div>
              </td>
              <td>
                <div>￥268.00</div>
              </td>
            </tr>
            <tr class="table-list">
              <td>
                <img
                  src="http://demodaojia.ecjia.com/content/uploads//images/201610/goods_img/430_G_1459971655294.jpg"
                  width="50"
                />
              </td>
              <td>
                <a
                  href="http://demodaojia.ecjia.com/index.php?m=goods&amp;c=admin&amp;a=preview&amp;id=430"
                  target="_blank"
                >以色列葡萄柚4个约250g/个</a>
              </td>
              <td>ECS000430</td>
              <td></td>
              <td>
                <div>￥10.00</div>
              </td>
              <td>
                <div>1</div>
              </td>
              <td></td>
              <td>
                <div>763</div>
              </td>
              <td>
                <div>￥10.00</div>
              </td>
            </tr>
            <tr class="table-list">
              <td>
                <img
                  src="http://demodaojia.ecjia.com/content/uploads//images/201610/goods_img/461_G_1459127072318.jpg"
                  width="50"
                />
              </td>
              <td>
                <a
                  href="http://demodaojia.ecjia.com/index.php?m=goods&amp;c=admin&amp;a=preview&amp;id=461"
                  target="_blank"
                >泰国龙眼2KG装</a>
              </td>
              <td>ECS000461</td>
              <td></td>
              <td>
                <div>￥23.90</div>
              </td>
              <td>
                <div>1</div>
              </td>
              <td></td>
              <td>
                <div>892</div>
              </td>
              <td>
                <div>￥23.90</div>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <div align="right">
                  <strong>商品总重量：</strong>
                </div>
              </td>
              <td colspan="2">
                <div align="right">10千克</div>
              </td>
              <td>
                <div align="right">
                  <strong>合计：</strong>
                </div>
              </td>
              <td>
                <div align="right">￥301.90</div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
    <!--商品信息 end-->

    <!--费用信息 start-->
    <el-collapse v-model="activeNames[5]" class="custom-collapse">
      <el-collapse-item title="费用信息" name="1">
        <table class="table m_b0">
          <tbody>
            <tr>
              <td>
                <div align="right">
                  商品总金额：
                  <strong>￥301.90</strong>
                  - 折扣：
                  <strong>￥30.19</strong>
                  + 发票税额：
                  <strong>￥0.00</strong>
                  + 配送费用：
                  <strong>￥0.00</strong>
                  + 保价费用：
                  <strong>￥0.00</strong>
                  + 支付费用：
                  <strong>￥0.00</strong>
                  + 包装费用：
                  <strong>￥0.00</strong>
                  + 贺卡费用：
                  <strong>￥0.00</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="right">
                  = 订单总金额：
                  <strong>￥271.71</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="right">
                  - 已付款金额：
                  <strong>￥0.00</strong>
                  - 使用余额：
                  <strong>￥271.71</strong>
                  - 使用积分：
                  <strong>￥0.00</strong>
                  - 使用红包：
                  <strong>￥0.00</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="right">
                  = 应付款金额：
                  <strong>￥0.00</strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
    <!--费用信息 end-->

    <!--操作记录 start-->
    <el-collapse v-model="activeNames[6]" class="custom-collapse">
      <el-collapse-item title="操作记录" name="1">
        <table class="table table-striped m_b0">
          <thead>
            <tr>
              <th class="w150">
                <strong>操作者</strong>
              </th>
              <th class="w180">
                <strong>操作时间</strong>
              </th>
              <th class="w150">
                <strong>订单状态</strong>
              </th>
              <th class="w150">
                <strong>操作备注</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>买家</td>
              <td>2018-03-23 08:26:18</td>
              <td>已接单</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
    <!--操作记录 end-->
  </el-main>
</template>

<script>
export default {
  name: 'OnlineOrderDetail',
  data() {
    return {
      // 订单搜索表单
      form: {
        keyword: ''
      },

      // 激活面板名称
      activeNames: [
        // 基本信息
        ['1'],
        // 发票信息
        ['1'],
        // 其他信息
        ['1'],
        // 收货人信息
        ['1'],
        // 商品信息
        ['1'],
        // 费用信息
        ['1'],
        // 操作记录
        ['1']
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../../../styles/variables.scss';
.pengyu-blue {
  color: $blue;
}
.order-detail-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  // 为什么是10，魔术数字
  z-index: 10;

  // 定制折叠面板
  .custom-collapse {
    .el-collapse-item {
      .el-collapse-item__wrap {
        padding: 0;
      }
    }
  }
  .order-status-base {
    ul {
      margin: 0 auto;
      overflow: hidden;
      padding: 0;
      li {
        list-style: none;
        margin-left: 0 !important;
        text-align: center;
        float: left;
      }
    }
    &.order-five-base {
      ul {
        li {
          width: 20%;
        }
      }
    }
    .step-first {
      .step-done {
        .step-no {
          background-position: 50% -204px;
        }
      }
    }

    .step-last {
      .step-no {
        background-position: 50% -136px;
      }
    }
    .step-cur {
      .step-no {
        background-position: 50% 0;
      }
    }
    .step-done {
      .step-no {
        background-position: 50% -170px;
      }
    }

    .step-no {
      margin-top: 10px;
      color: #fff;
      font-size: 18px;
      height: 34px;
      line-height: 34px;
      background: url(../../../assets/images/order-time-base.png) no-repeat scroll 50% -102px;
    }
  }
}
</style>

