import Axios from 'axios'
import router from '@/router'
// 本地 || 线上请求前缀
var root = process.env.API_ROOT;
const axios = Axios.create();
import { Dialog } from 'vant';
let cancel ,promiseArr = {} 
/*设置 axios拦截器*/
axios.interceptors.request.use(
	config => {
		//请求之前重新拼装url
		config.url = root + config.url;
		config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
		config.timeout = 5000 // 超时时间
		// var token = window.sessionStorage.getItem("token");
		// if(token) {
		// 	config.headers = {
		// 		'Authorization': token,
		// 		'Content-Type': 'application/x-www-form-urlencoded'
		// 	}
		// }
		//发起请求时，取消掉当前正在进行的相同请求
		if (promiseArr[config.url]) {
			promiseArr[config.url]('操作取消')
			promiseArr[config.url] = cancel
		} else {
			promiseArr[config.url] = cancel
		}
		return config
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	})

// http response 拦截器 //响应拦截器即异常处理
axios.interceptors.response.use(
	response => {
		if(response.data['status'] === -1) {
			console.log('拦截器-状态');
			Dialog.alert({
				message: '用户信息过期，请重新授权'
			}).then(() => {
				window.sessionStorage.setItem("token",null);
				console.log('token,初始化: ',window.sessionStorage.getItem("token"));
				/**存储当前路由（用来授权后，返回该页面） */
				window.sessionStorage.setItem("this_router",window.location.href)
				console.log('存储当前路由 this_router: ',window.sessionStorage.getItem("this_router"));
				router.replace({  	
					path: '/index',
				})
			})
		}
		return response;
	},
	error => {
		if(error && error.response) {
				
		}else{
			error.message = '网络出现问题，请稍后再试'
			console.log(error.message)
		}
		// console.log(Promise.reject(error.response.data))
		return Promise.reject(error.response&&error.response.data)
	});



export default axios;