import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入移动组件库
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
// 移动端适配
import 'amfe-flexible'
// 初始化--清除默认样式--字体图标
import '@/styles/index.less'

import MyIcon from '@/components/MyIcon.vue'
Vue.component('MyIcon', MyIcon)

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
