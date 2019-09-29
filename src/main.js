import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
// import './mock' // simulation data

import * as filters from './filters' // global filters
// 图片预览组件
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

import vUeditor from 'v-umeditor'
Vue.use(vUeditor)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 引入font-awsome
// http://www.hangge.com/blog/cache/detail_2104.html
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.config.productionTip = false
// import devtools from '@vue/devtools'

// Vue.config.devtools = process.env.NODE_ENV === 'development'
// if (process.env.NODE_ENV === 'development') {
//   devtools.connect('localhost', 8899)
// }

new Vue({
  el: '#app',
  router,
  data: {
    eventHub: new Vue()
  },
  // 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
  store,
  i18n,
  render: h => h(App)
})
