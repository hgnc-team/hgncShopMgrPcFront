export default [
  {
    prop: 'thumb',
    name: '缩略图',
    type: 'image',
    editable: false,
    sortable: false
  },
  {
    prop: 'goodName',
    name: '商品名称',
    type: 'input',
    editable: true,
    sortable: true,
    isRowMenuWrapCell: false
  },
  {
    prop: 'goodsNo',
    name: '货号',
    type: 'input',
    editable: true,
    sortable: true
  },
  {
    prop: 'price',
    name: '价格',
    type: 'input',
    editable: true,
    sortable: true
  },
  {
    prop: 'onSale',
    name: '上架',
    type: 'switch',
    editable: true,
    sortable: false
  },
  {
    prop: 'sort',
    name: '排序',
    type: 'input',
    editable: true,
    sortable: true
  }
]
