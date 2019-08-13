import Vue from 'vue'
import App from './App'
import router from './router'

// 重置样式
import '../static/css/reset.css'

// 配置移动端自适配:安装lib-flexible、安装postcss-px2rem-exclude
import 'lib-flexible/flexible.js'

// 导入vant所有组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// 引入axios请求数据
import axios from "./axios/request";
Vue.prototype.$axios = axios

// 引入vuex管理数据
import store from '@/store/store.js'

import Loading from '@/pages/common/loading/Loading'
Vue.component('Loading',Loading)

import Scroller from '@/pages/common/scroller/Scroller'
Vue.component('Scroller',Scroller)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


// 拼接图片路径
Vue.prototype.globalUrl = 'http://member.zhifengwangluo.com'
// Vue.prototype.globalUrl = 'http://www.hmylst.cn'
// Vue.prototype.globalUrl = 'http://www.puruitingxls.com'
// Vue.prototype.globalUrl ='http://newretailweb.zhifengwangluo.com'

/**
 * 注册全局自定义指令,获取焦点
 */
Vue.directive('focus', {
	inserted: function (el) {
	  // 聚焦元素
	  el.focus()
	}
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,// 全局注册 vuex状态管理
  components: { App },
  template: '<App/>'
})
