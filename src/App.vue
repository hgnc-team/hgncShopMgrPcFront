<template>
  <div id="app">
    <router-view/>
    <lg-preview />
  </div>
</template>

<script>
export default{
  name: 'App'
}
</script>
<style lang="scss">
// 引入bootstrap;此bootstrap定制过
@import './styles/bootstrap/stylesheets/bootstrap.scss';
@import './styles/main.scss';

// 页面通用样式
.contentwrapper{
  // 列表顶部管总标题
  .heading{
    border-bottom: 1px solid #dcdcdc;
    margin-bottom: 18px;
    padding-bottom: 5px;
  }
}

//列表列可编辑popper弹窗样式
.editablePopper{
  padding:0;
}
.py-text-danger{
  // 区别于bootstrap工具类.text-danger
  color:#c62626
}
//el-table表头定制样式
.py-table-header{
  th{
    background-color:#ebf2f6;
    font-weight:bold;
    text-shadow: 1px 1px 0 #fff;
    color:#222;
  }
}
.pageNavWrap{
  background-color: #F5F5F5;
  border: 1px solid #E3E3E3;
  border-radius: 4px;
  box-shadow: none;
  margin: 10px 0px;
  padding: 5px;
  text-align:right;
}
</style>
