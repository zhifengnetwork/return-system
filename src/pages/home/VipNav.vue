<template>
	<div class="vip-nav-wrap">
        <!-- 头部组件 -->
		<Team-Header custom-title="经理人">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Team-Header>
		<!-- 菜单导航 -->
		 <div class="nav-wrap">
			<div class="nav-item" v-for="(item,index) in levelData" :key="index">
				<router-link :to="'/membershipCard?id='+item.id">
					<span class="icon"><img :src="item.level_img" /></span>
					<span class="text">{{item.levelname}}</span>
				</router-link>
            </div>
        </div>

	</div>
</template>

<script>
import TeamHeader from "@/pages/common/header/TopHeader"
import {jumpTo} from '../../../static/js/public'

export default {
	// name: "vip-nav-wrap",
	components: {
		TeamHeader,
	},
	data() {
		return {
			levelData:[],
			token: this.$store.getters.optuser.Authorization
		};
	},
	created(){		
		this.$store.commit('showLoading')//加载loading
		this.requestData();
	},
	methods: {
		requestData(){
			var that =this,
				url ='card/card_list'
			that.$axios.post(url,{         // 传给后台的参数
				'token':that.token,
			})
			.then((res)=>{
				var list =res.data
				if(list.status==200){
					that.$store.commit('hideLoading')   //数据成功获取后关闭loading
					that.levelData=list.data
				}
				else if(res.data.status == 999){
					that.$store.commit('del_token');    //清除token
					setTimeout(()=>{
						this.$router.push('/Login')
					},1000)
				}else{
					that.$toast(res.data.msg)
				}
			})
		}
	}
};
</script>


<style lang="stylus" scoped>
.vip-nav-wrap
	padding-bottom 114px
	.nav-wrap
		display -webkit-box
		display -moz-flex
		display -ms-flexbox
		display flex
		-ms-flex-flow wrap
		flex-flow wrap
		background #ffffff
		margin-top 40px
		padding 0 24px
		-webkit-box-sizing border-box
		box-sizing border-box
		.nav-item
			width 33%
			text-align center
			font-size 24px
			margin-bottom 50px
			a
				width 100%
				height 100%
				display block
				.icon
					margin-bottom 10px
					display block
					img
						width 85px
						height 85px
				.text
					font-size 26px
	
</style>
