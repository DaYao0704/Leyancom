import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './assets/icon/01/iconfont.css'
import './assets/icon/iconfont.css'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import {
	Message
} from 'element-ui';
Vue.prototype.$message = Message
import vueiInfinite from 'vue-infinite-scroll'
Vue.use(vueiInfinite)


import md5 from "js-md5"
Vue.prototype.$md5 = md5

// 配置请求的根路径
axios.defaults.baseURL = 'http://modoudou.cn:8082/'

Vue.prototype.$http = axios

axios.interceptors.request.use(config => {
	config.headers.Authorization = window.sessionStorage.getItem('token')
	return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
