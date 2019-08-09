import Vue from 'vue'
import Router from 'vue-router'

// 登录
import Login from '@/pages/login/Login'
// 注册
import Register from '@/pages/login/Register'
// 修改密码
import EditPassword from '@/pages/login/EditPassword'

// 首页
import Home from '@/pages/home/Home'
// vip导航
import VipNav from '@/pages/home/VipNav'

// 公告
import NoticeList from '@/pages/notice/NoticeList'
import NoticeDetails from '@/pages/notice/NoticeDetails'
import NewsDetails from '@/pages/notice/NewsDetails'

// 会员免费领取专区
import FreeZone from '@/pages/freezone/FreeZone'

// 搜索
import Search from '@/pages/search/Search'

// 分类
import Category from '@/pages/category/Category'

// 商品详情
import Details from '@/pages/details/Details'

// 购物车
import Cart from '@/pages/cart/Cart'

// 会员卡
import membershipCard from '@/pages/membershipCard/membershipCard'

// 补卡
import ReissueCard from '@/pages/membershipCard/ReissueCard'
// 联系上级补卡
import sjReissueCard from '@/pages/membershipCard/sjReissueCard'
// 补卡记录
import MoreReissueCard from '@/pages/membershipCard/MoreReissueCard'

// 订单列表
import Order from '@/pages/order/Order'
// 订单详情
import OrderDetails from '@/pages/order/OrderDetails'
// 物流
import LogisticsDetail from '@/pages/order/LogisticsDetail'

// 提交评价
import Evaluate from '@/pages/order/Evaluate'
// 退货
import ReturnGoods from '@/pages/order/ReturnGoods'
// 申请退款
import ReturnRequest from '@/pages/order/ReturnRequest'

// 确认订单
import ConfirmOrder from '@/pages/pay/ConfirmOrder'
// 支付方式
import PayWay from '@/pages/pay/PayWay'
// 支付成功
import PaySucceed from '@/pages/pay/PaySucceed'
// 支付失败
import PayFail from '@/pages/pay/PayFail'

// 大转盘
import luckywheel from '@/pages/luckywheel/luckywheel'

// 我的
import User from '@/pages/user/User'
// 个人资料
import personalData from '@/pages/user/personalData'
// 邀请链接
import InviteLink from '@/pages/user/InviteLink'

// 我的收益
import MyBenefits from '@/pages/user/mybenefits/MyBenefits'
// 收益详情
import ProfitDetails from '@/pages/user/mybenefits/ProfitDetails'

// 账户余额
import AccountBalance from '@/pages/user/accountBalance/AccountBalance'
// 提现
import CashWithdrawal from '@/pages/user/accountBalance/CashWithdrawal'

// 我的钱包
import myWallet from '@/pages/user/myWallet/myWallet'
// 账单明细
import BillingDetails from '@/pages/user/myWallet/BillingDetails'
// 提现
// import accWithdrawal from '@/pages/user/myWallet/accWithdrawal'
// 充值
import Recharge from '@/pages/user/myWallet/Recharge'
// 代金券
import CashCoupon from '@/pages/user/myWallet/CashCoupon'
// 赠送
import Give from '@/pages/user/accountBalance/Give'
// 赠送记录
import GiveRecord from '@/pages/user/accountBalance/GiveRecord'

// 我的团队
import myTeam from '@/pages/user/myTeam'

// 我的分享
import mySharing from '@/pages/user/mySharing'

// 支付宝账号编辑
import alipay from '@/pages/user/alipay'
// 修改用户名
import modifyUserName from '@/pages/user/modifyUserName'

// 收藏
import Collect from '@/pages/user/Collect'

// 收货地址
import Address from '@/pages/user/address/Address'
// 添加收货地址
import AddAddress from '@/pages/user/address/AddAddress'
// 修改收货地址
import EditAddress from '@/pages/user/address/EditAddress'


Vue.use(Router)

const router= new Router({
	mode: 'history',
	routes: [
		/**
		 * 登录
		 */
		{
			path: '/Login',
			name: 'Login',
			component:() => import('@/pages/login/Login'),
		},
		// 注册
		{
			path: '/Register',
			name: 'Register',
			component:() => import('@/pages/login/Register'),
		},
		// 修改密码
		{
			path: '/EditPassword',
			name: 'EditPassword',
			component:() => import('@/pages/login/EditPassword'),
		},

		/**
		 * 首页
		 */
		{
			path: '/Home',
			name: 'Home',
			// component:() => import('@/pages/home/Home'),//按需加载
			component: (resolve) => require(['@/pages/home/Home'],resolve),
			meta:{requireAuth:true}
		},
		/**
		 * 首页
		 */
		{
			path: '/VipNav',
			name: 'VipNav',
			// component:() => import('@/pages/home/Home'),//按需加载
			component: (resolve) => require(['@/pages/home/VipNav'],resolve),
			meta:{requireAuth:true}
		},

		/**
		 * 公告
		 */
		// 公告列表
		{
			path: '/notice/NoticeList',
			name: 'NoticeList',
			component:() => import('@/pages/notice/NoticeList'),
			meta:{requireAuth:true}
		},
		// 公告详情
		{
			path: '/notice/NoticeDetails',
			name: 'NoticeDetails',
			component:() => import('@/pages/notice/NoticeDetails'),
			meta:{requireAuth:true}
		},	
		// 资讯详情
		{
			path: '/notice/NewsDetails',
			name: 'NewsDetails',
			component:() => import('@/pages/notice/NewsDetails'),
			meta:{requireAuth:true}
		},

		// 会员免费领取专区
		{
			path: '/FreeZone',
			name: 'FreeZone',
			component:() => import('@/pages/freezone/FreeZone'),
			meta:{requireAuth:true}
		},

		/**
		 * 搜索
		 */
		{
			path: '/Search',
			name: 'Search',
			component:() => import('@/pages/search/Search'),
			meta:{requireAuth:true}
		},

		/**
		 * 分类
		 */
		{
			path: '/Category',
			name: 'Category',
			component:() => import('@/pages/category/Category'),
			meta:{requireAuth:true} //是否需要登录
		},

		/**
		 * 购物车
		 */
		{
			path: '/Cart',
			name: 'Cart',
			component: (resolve) => require(['@/pages/cart/Cart'],resolve),
			meta:{requireAuth:true}
		},
		// 会员卡
		{
			path: '/membershipCard',
			name: 'membershipCard',
			component: (resolve) => require(['@/pages/membershipCard/membershipCard'],resolve),
			meta:{requireAuth:true}
		},

		// 补卡
		{
			path: '/ReissueCard',
			name: 'ReissueCard',
			component: (resolve) => require(['@/pages/membershipCard/ReissueCard'],resolve),
			meta:{requireAuth:true}
		},
		// 联系上级补卡
		{
			path: '/sjReissueCard',
			name: 'sjReissueCard',
			component: (resolve) => require(['@/pages/membershipCard/sjReissueCard'],resolve),
			meta:{requireAuth:true}
		},
		// 补卡记录
		{
			path: '/MoreReissueCard',
			name: 'MoreReissueCard',
			component: (resolve) => require(['@/pages/membershipCard/MoreReissueCard'],resolve),
			meta:{requireAuth:true}
		},
	
		/**
		 * 商品详情页 
		 */ 
		{
			path: '/Details',
			name: 'Details',
			component:() => import('@/pages/details/Details'),
			meta:{requireAuth:true}
		},

		/**
		 * 
		 * 订单中心
		 */
		// 订单列表
		{
			path: '/Order',
			name: 'Order',
			component:() => import('@/pages/order/Order'),
			meta:{requireAuth:true}
		},
		// 订单详情
		{
			path: '/Order/OrderDetails',
			name: 'OrderDetails',
			component:() => import('@/pages/order/OrderDetails'),
			meta:{requireAuth:true}
		},
		// 物流
		{
			path: '/Order/LogisticsDetail',
			name: 'LogisticsDetail',
			component:() => import('@/pages/order/LogisticsDetail'),
			meta:{requireAuth:true}
		},
		// 提交评价
		{
			path: '/Order/Evaluate',
			name: 'Evaluate',
			component: (resolve) => require(['@/pages/order/Evaluate'],resolve),
			meta:{requireAuth:true}
		},
		// 退货
		{
			path: '/Order/ReturnGoods',
			name: 'ReturnGoods',
			component: (resolve) => require(['@/pages/order/ReturnGoods'],resolve),
			meta:{requireAuth:true}
		},
		// 退款申请
		{
			path: '/Order/ReturnRequest',
			name: 'ReturnRequest',
			component: (resolve) => require(['@/pages/order/ReturnRequest'],resolve),
			meta:{requireAuth:true}
		},

		/**
		 * 支付模块
		 */
		// 确认订单
		{
			path: '/Pay/ConfirmOrder',
			name: 'ConfirmOrder',
			component: (resolve) => require(['@/pages/pay/ConfirmOrder'],resolve),
		},
		// 支付方式
		{
			path: '/Pay/PayWay',
			name: 'PayWay',
			component: (resolve) => require(['@/pages/pay/PayWay'],resolve),
			meta:{requireAuth:true}
		},
		// 支付成功
		{
			path: '/Pay/PaySucceed',
			name: 'PaySucceed',
			component: (resolve) => require(['@/pages/pay/PaySucceed'],resolve),
			meta:{requireAuth:true}
		},
		// 支付失败
		{
			path: '/Pay/PayFail',
			name: 'PayFail',
			component: (resolve) => require(['@/pages/pay/PayFail'],resolve),
			meta:{requireAuth:true}
		},

		// 幸运大转盘
		{
			path: '/luckywheel',
			name: 'luckywheel',
			component: (resolve) => require(['@/pages/luckywheel/luckywheel'],resolve),
			meta:{requireAuth:true}
		},

		/**
		 * 我的
		 */
		{
			path: '/User',
			name: 'User',
			// component:() => import('@/pages/user/User'),
			component: (resolve) => require(['@/pages/user/User'],resolve),
			meta:{requireAuth:true}
		},
		// 个人资料
		{
			path: '/user/personalData',
			name: 'personalData',
			// component:() => import('@/pages/user/personalData'),
			component: (resolve) => require(['@/pages/user/personalData'],resolve),
			meta:{requireAuth:true}
		},
		// 修改用户名
		{
			path: '/user/modifyUserName',
			name: 'modifyUserName',
			component:() => import('@/pages/user/modifyUserName'),
			meta:{requireAuth:true}
		},
		// 修改支付密码
		{
			path: '/user/SetPassword',
			name: 'SetPassword',
			component:() => import('@/pages/user/SetPassword'),
		},
		// 邀请链接
		{
			path: '/user/InviteLink',
			name: 'InviteLink',
			component:() => import('@/pages/user/InviteLink'),
			meta:{requireAuth:true}
		},
		
		// 我的收益
		{
			path: '/user/MyBenefits',
			name: 'MyBenefits',
			component: (resolve) => require(['@/pages/user/mybenefits/MyBenefits'],resolve),
			meta:{requireAuth:true}
		},
		// 收益详情
		{
			path: '/user/ProfitDetails',
			name: 'ProfitDetails',
			component: (resolve) => require(['@/pages/user/mybenefits/ProfitDetails'],resolve),
			meta:{requireAuth:true}
		},

		// 账户余额
		{
			path: '/user/AccountBalance',
			name: 'AccountBalance',
			component:() => import('@/pages/user/accountBalance/AccountBalance'),
			meta:{requireAuth:true}
		},
		// 提现
		{
			path: '/user/CashWithdrawal',
			name: 'CashWithdrawal',
			component:() => import('@/pages/user/accountBalance/CashWithdrawal'),
			meta:{requireAuth:true}
		},
		// 赠送
		{
			path: '/user/Give',
			name: 'Give',
			component:() => import('@/pages/user/accountBalance/Give'),
			meta:{requireAuth:true}
		},
		// 赠送记录
		{
			path: '/user/GiveRecord',
			name: 'GiveRecord',
			component:() => import('@/pages/user/accountBalance/GiveRecord'),
			meta:{requireAuth:true}
		},
		
		// 我的钱包
		{
			path: '/user/myWallet',
			name: 'myWallet',
			component:() => import('@/pages/user/myWallet/myWallet'),
			meta:{requireAuth:true}
		},
		// 账单明细
		{
			path: '/user/myWallet/BillingDetails',
			name: 'BillingDetails',
			component:() => import('@/pages/user/myWallet/BillingDetails'),
			meta:{requireAuth:true}
		},

		// 提现
		{
			path: '/user/myWallet/accWithdrawal',
			name: 'accWithdrawal',
			component:() => import('@/pages/user/myWallet/accWithdrawal'),
			meta:{requireAuth:true}
		},

		// 余额充值
		{
			path: '/user/myWallet/Recharge',
			name: 'Recharge',
			component:() => import('@/pages/user/myWallet/Recharge'),
			meta:{requireAuth:true}
		},
		// 代金券
		{
			path: '/user/CashCoupon',
			name: 'CashCoupon',
			component:() => import('@/pages/user/myWallet/CashCoupon'),
			meta:{requireAuth:true}
		},
	
		// 我的团队
		{
			path: '/user/myTeam',
			name: 'myTeam',
			component:() => import('@/pages/user/myTeam'),
			meta:{requireAuth:true}
		},
		
		// 我的分享
		{
			path: '/user/mySharing',
			name: 'mySharing',
			component:() => import('@/pages/user/mySharing'),
			meta:{requireAuth:true}
		},

		// 支付宝账号编辑
		{
			path: '/user/alipay',
			name: 'alipay',
			component:() => import('@/pages/user/alipay'),
			meta:{requireAuth:true}
		},
		
		// 收藏
		{
			path: '/user/Collect',
			name: 'Collect',
			component:() => import('@/pages/user/Collect'),
			meta:{requireAuth:true}
		},
		/**
		 * 地址管理
		 */
		// 收货地址
		{
			path: '/user/Address',
			name: 'Address',
			component:() => import('@/pages/user/address/Address'),
			meta:{requireAuth:true}
		},
		// 添加收货地址
		{
			path: '/user/AddAddress',
			name: 'AddAddress',
			component:() => import('@/pages/user/address/AddAddress'),
			meta:{requireAuth:true}
		},
		// 修改收货地址
		{
			path: '/user/EditAddress',
			name: 'EditAddress',
			component:() => import('@/pages/user/address/EditAddress'),
			meta:{requireAuth:true}
		},
		// 地址选点
		{
			path: '/user/SelectPoint',
			name: 'SelectPoint',
			component: (resolve) => require(['@/pages/user/address/SelectPoint'],resolve),
			meta:{requireAuth:true}
		},
	
		// 重定向
		{
			path: '*',
			redirect: '/Home'
		},

	]
})

//注册全局钩子函数
router.beforeEach((to,from,next) =>{
	//判断当前页面是否需要登录，true
	if(to.matched.some(r => r.meta.requireAuth)){
		if(to.path === '/Login' || to.path ==='/Register'){
			next()
		}else{
			let token = localStorage.getItem('Authorization');
			if(token === null || token === ''){		//判断是否有token
				// Dialog.confirm({
				// 	message: '亲，还没有登录哦!'
				// }).then(() =>{
				// 	next('/Login');
				// })
				next('/Login');
			}else{
				next()
			}
		}
	}else{
		next()
	}
})

export default router