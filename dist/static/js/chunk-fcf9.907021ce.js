(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-fcf9"],{"6jsm":function(t,e,o){},Opjo:function(t,e,o){"use strict";var n=o("6jsm");o.n(n).a},oU4k:function(t,e,o){"use strict";o.d(e,"j",function(){return a}),o.d(e,"l",function(){return r}),o.d(e,"k",function(){return s}),o.d(e,"b",function(){return i}),o.d(e,"h",function(){return u}),o.d(e,"m",function(){return d}),o.d(e,"o",function(){return c}),o.d(e,"i",function(){return l}),o.d(e,"d",function(){return p}),o.d(e,"n",function(){return f}),o.d(e,"f",function(){return m}),o.d(e,"a",function(){return b}),o.d(e,"g",function(){return h}),o.d(e,"c",function(){return g}),o.d(e,"e",function(){return v});var n=o("t3Un");function a(t){return Object(n.c)({url:"/v1/api/goods/list",method:"post",data:t})}function r(t){return Object(n.c)({url:"/v1/api/goods/topClass",method:"post",data:t})}function s(t){return Object(n.c)({url:"/v1/api/goods/secondClass",method:"post",data:t})}function i(t){return Object(n.c)({url:"/v1/api/goods/create",method:"post",data:t})}function u(t){return Object(n.c)({url:"/v1/api/goods/recycle/list",method:"post",data:t})}function d(t){return Object(n.c)({url:"/v1/api/goods/del",method:"post",data:{ids:t}})}function c(t){return Object(n.c)({url:"/v1/api/user/images/upload",method:"post",data:t,headers:{"Content-Type":"multipart/form-data"}})}function l(t){return Object(n.c)({url:"/v1/api/user/images/myImages",method:"post",data:t})}function p(t){return Object(n.c)({url:"/v1/api/goods/recycle/clear",method:"post",data:{ids:t}})}function f(t){return Object(n.c)({url:"/v1/api/goods/recycle/recover",method:"post",data:{ids:t}})}function m(t){return Object(n.c)({url:"/v1/api/goods/edit",method:"post",data:t})}function b(t){return Object(n.c)({url:"/v1/api/brand/add",method:"post",data:t})}function h(t){return Object(n.c)({url:"/v1/api/brand/list",method:"post",data:t})}function g(t){return Object(n.c)({url:"/v1/api/brand/delete",method:"post",data:{ids:t}})}function v(t){return Object(n.c)({url:"/v1/api/brand/edit",method:"post",data:t})}},sTKi:function(t,e,o){"use strict";o.r(e);var n=[{prop:"cateName",name:"分类名称",type:"text",editable:!1,sortable:!1,width:.5*document.body.clientWidth-180},{prop:"goodsNum",name:"商品数量",type:"text",linkColor:"normal",editable:!1,sortable:!1,width:"auto"},{prop:"numUnit",name:"数量单位",type:"text",editable:!1,sortable:!1,width:"auto"},{prop:"priceGrade",name:"价格分级",type:"input",editable:!0,sortable:!1,width:"auto"},{prop:"sort",name:"排序",type:"input",editable:!0,sortable:!0,width:"auto"},{prop:"visible",name:"是否显示",type:"switch",editable:!1,sortable:!1,width:"auto"}],a=o("HGfo"),r=o("oU4k"),s={name:"GoodsCates",components:{goodsTableCustomTd:a.a},data:function(){return{tableData:[],tableSheme:n,goodsCateMapApi:{firstClass:r.l,secondClass:r.k}}},mounted:function(){var t=this;this.goodsCateMapApi.firstClass({classScheme:"cat1"}).then(function(e){200===e.status&&t.renderTable(e.data)})},methods:{renderTable:function(t){if(0!==t.length){var e=[];t.forEach(function(t){e.push({cateName:t.name,cateId:t.id,pId:t.pid?t.pid:-1,goodsNum:1,numUnit:"",priceGrade:0,sort:1,visible:!0,operate:""})}),this.tableData=e}else this.$message({type:"info",message:"此分类下数据为空！"})},getSubClass:function(t){var e=this;this.goodsCateMapApi.secondClass({topClass:[t.cateId]}).then(function(t){200===t.status&&e.renderTable(t.data)})},returnSupperClass:function(){console.log("返回上一级")}}},i=(o("Opjo"),o("KHd+")),u=Object(i.a)(s,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-main",{staticClass:"contentwrapper"},[o("div",[o("h3",{staticClass:"heading"},[t._v("商品分类\n      "),o("span",{staticStyle:{float:"right","margin-top":"-3px"}},[o("router-link",{attrs:{to:"/goodsCates/transferProds"}},[o("el-button",{attrs:{type:"default",size:"mini"},on:{click:function(e){t.returnSupperClass()}}},[o("font-awesome-icon",{attrs:{icon:["fas","reply"]}}),t._v("\n            上级分类\n          ")],1)],1),t._v(" "),o("router-link",{attrs:{to:"/goodsCates/goodsCateEdit"}},[o("el-button",{attrs:{type:"default",size:"mini"}},[o("font-awesome-icon",{attrs:{icon:["fas","plus"]}}),t._v("\n            添加商品分类\n          ")],1)],1)],1)])]),t._v(" "),o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"header-row-class-name":"py-table-header",stripe:""}},[t._l(t.tableSheme,function(e){return o("el-table-column",{key:e.prop,attrs:{prop:e.prop,label:e.name,sortable:e.sortable,width:e.width},scopedSlots:t._u([{key:"default",fn:function(n){return["cateName"===e.prop?o("span",[o("router-link",{attrs:{to:""},nativeOn:{click:function(e){t.getSubClass(n.row)}}},[o("font-awesome-icon",{staticStyle:{"margin-right":"5px"},attrs:{icon:["far","minus-square"]}}),t._v(t._s(n.row[e.prop])+"\n          ")],1)],1):"cateName"!==e.prop?o("span",[o("goods-table-custom-td",{attrs:{prop:e.prop,name:e.name,"link-color":e.linkColor,type:e.type,data:n.row,"is-row-menu-wrap-cell":e.isRowMenuWrapCell||!1}})],1):t._e()]}}])})}),t._v(" "),o("el-table-column",{attrs:{prop:"operate",label:"操作",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",[o("el-button",{attrs:{size:"medium",type:"text",title:"进入子分类"},on:{click:function(o){t.getSubClass(e.row)}}},[o("font-awesome-icon",{attrs:{icon:["fas","sign-in-alt"],size:"lg","fixed-width":""}})],1),t._v(" "),o("router-link",{attrs:{to:"/goodsCates/goodsCateEdit"}},[o("el-button",{attrs:{size:"medium",type:"text",title:"编辑"}},[o("font-awesome-icon",{attrs:{icon:["fas","edit"],size:"lg","fixed-width":""}})],1)],1),t._v(" "),o("el-button",{attrs:{size:"medium",type:"text",title:"删除"}},[o("font-awesome-icon",{staticClass:"py-text-danger",attrs:{icon:["fas","trash-alt"],size:"lg","fixed-width":""}})],1)],1)]}}])})],2),t._v(" "),o("router-view")],1)},[],!1,null,null,null);u.options.__file="goods-cates.vue";e.default=u.exports}}]);