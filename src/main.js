import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入移动组件库
import Vant from 'vant'
import 'vant/lib/index.less'

// 移动端适配
import 'amfe-flexible'

// 初始化--清除默认样式--字体图标
import '@/styles/index.less'

import MyIcon from '@/components/MyIcon.vue'

import FollowUser from '@/components/FollowUser.vue'

import * as obj from '@/filters'

// 全局组件注册方式
import '@/components'
Vue.component(FollowUser.name, FollowUser)

Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.component('MyIcon', MyIcon)

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
