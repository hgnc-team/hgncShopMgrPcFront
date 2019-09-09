export default [
  {
    prop: 'cateName',
    name: '分类名称',
    type: 'text',
    editable: false,
    sortable: false,
    width: (document.body.clientWidth * 0.5 - 180)
  },
  {
    prop: 'goodsNum',
    name: '商品数量',
    type: 'text',
    linkColor: 'normal',
    editable: false,
    sortable: false,
    width: 'auto'
  },
  {
    prop: 'numUnit',
    name: '数量单位',
    type: 'text',
    editable: false,
    sortable: false,
    width: 'auto'
  },
  {
    prop: 'priceGrade',
    name: '价格分级',
    type: 'input',
    editable: true,
    sortable: false,
    width: 'auto'
  },
  {
    prop: 'sort',
    name: '排序',
    type: 'input',
    editable: true,
    sortable: true,
    width: 'auto'
  },
  {
    prop: 'visible',
    name: '是否显示',
    type: 'switch',
    editable: false,
    sortable: false,
    width: 'auto'
  }
  // {
  //   prop: 'operate',
  //   name: '操作',
  //   type: 'text',
  //   editable: false,
  //   sortable: false,
  //   width: 'auto'
  // }
]
