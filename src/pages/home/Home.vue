<template>
	<div class="Home">
		<!-- 轮播图 -->
		<div class="banner">
			<van-swipe :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="(item,index) in bannerData" :key="index">
					<img :src="baseUrl+item.picture" />
				</van-swipe-item>
			</van-swipe>
		</div>

		<!-- 公告 -->
		<div class="notice" v-for="(item,index) in filterNotice" :key="index">
			<router-link :to="'/notice/NoticeDetails?item_id='+item.id" tag="div" class="notice-container">
				<van-notice-bar
					:text = "item.title"
					left-icon="volume-o"
					color="#ff1616"
					background="#a6aaff"
				/>
				<span class="sub-title">公告</span>
			</router-link>
			<!-- <router-link  class="more" to="/notice/NoticeList" tag="div">更多</router-link> -->
		</div>

		<!-- 菜单导航 -->
		<div class="nav-wrap">
			<router-link to="#" class="nav-item" tag="div">
				<img src="/static/images/home/nav-investment.png" />
			</router-link>
			<router-link to="/user/CommissionList" class="nav-item" tag="div">
				<img src="/static/images/home/nav-profit.png" />
			</router-link>
			<router-link to="/user/TeamList" class="nav-item" tag="div">
				<img src="/static/images/home/nav-team.png" />
			</router-link>
			<router-link to="/user/AccountBalance" class="nav-item" tag="div">
				<img src="/static/images/home/nav-balance.png" />
			</router-link>
		</div>
	
		<!-- 底部导航 -->
		<Navigate></Navigate>

	</div>
</template>

<script>
import Navigate from "@/pages/common/footer/Navigate";
import {jumpTo} from '../../../static/js/public'

export default {
	name: "Home",
	components: {
		Navigate,
	},
	data() {
		return {
			baseUrl:'',
			bannerData:[],
			noticeData:[],
		};
	},
	created(){		
		this.$store.commit('showLoading')//加载loading
		this.requestData();
	},
	computed:{
		// 过滤公告列表
		filterNotice(){
			return this.noticeData.slice(0,1);
		}
	},
	methods: {
		/**
		 * 请求数据
		 */
		requestData(){
            let url = 'index/index';
            this.$axios.post(url)
            .then( (res) => {
                if(res.data.status === 200){
					this.bannerData = res.data.data.banners;
					this.noticeData = res.data.data.announce;
					this.$store.commit('hideLoading');
				}else if(res.data.status == 999){
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Login')
					},1000)
				}else{
					this.$toast(res.data.msg)
				}
            })
            .catch((error) => {
                this.$toast(error)
            })
		},

	},
	
	filters:{
		//格式化金钱
        formatMoney:function(val){
            return "¥" + Number(val).toFixed(2)
        }
	}

};
</script>


<style lang="stylus" scoped>
.Home
	width 100%
	min-height 100vh
	background-color #ffffff
	.banner
		width 100%
		height 380px
		overflow hidden
		img 
			max-width 100%
			display block
	.notice
		font-size 28px
		position relative
		margin-bottom 30px
		.van-notice-bar
			font-size 28px
			height 60px
		.van-notice-bar >>> .van-icon 
			width 36px
			height 36px
			background url(/static/images/home/notice-icon.png) no-repeat 
			background-size 100%
			margin-right 90px
		.van-notice-bar >>>	.van-icon-volume-o:before
			content ''
		.van-notice-bar >>> .van-notice-bar__left-icon, .van-notice-bar__right-icon
			min-width 33px
		.sub-title
			color #151515
			line-height 60px
			font-weight 700
			position absolute
			left 80px
			top 0
		.more
			color #fff
			line-height 60px
			padding 0 15px
			position absolute
			right 0px
			top 0
	.nav-wrap
		display flex
		flex-flow wrap
		padding 0 24px
		box-sizing border-box
		.nav-item
			width 48%
			text-align center
			margin-right 4%
			margin-bottom 30px
			img
				width 100%
		.nav-item:nth-child(even)
			margin-right 0
				
	
	
</style>
