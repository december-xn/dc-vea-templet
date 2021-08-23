import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en' // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons'
import './permission'
import './utils/error-log'

import elTableInfiniteScroll from 'el-table-infinite-scroll'
Vue.use(elTableInfiniteScroll)

import * as filters from './filters'

import vWaves from 'dc-vue-waves'
Vue.use(vWaves, {
  name: 'waves',
  duration: 500,
  delay: 200
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  locale: enLang
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
