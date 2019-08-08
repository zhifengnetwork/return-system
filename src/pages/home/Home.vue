<template>
	<div class="Home">
		<div class="top-wrap">
			<!-- 轮播图 -->
			<div class="banner">
				<van-swipe :autoplay="3000" indicator-color="white">
					<van-swipe-item v-for="(item,index) in bannerData" :key="index">
						<img :src="baseUrl+item.picture" />
					</van-swipe-item>
				</van-swipe>
			</div>
		</div>
	
		<!-- 菜单导航 -->
		 <div class="nav-wrap">
			<div class="nav-item" v-for="(item,index) in levelData" :key="index">
				
				<router-link v-if="index==1" :to="'/VipNav'">
					<span class="icon"><img :src="item.level_img" /></span>
					<span class="text">{{item.levelname}}</span>
				</router-link>
				<router-link v-else="" :to="'/membershipCard?id='+item.id">
					<span class="icon"><img :src="item.level_img" /></span>
					<span class="text">{{item.levelname}}</span>
				</router-link>
            </div>
        </div>

		<!-- 链接 -->
		<div class="patch-card">
			<span class="link" @click="linkSJReissueCard()">联系上级补卡</span>
			<span @click="linkReissueCard()" class="link">立即补卡</span>
		</div>

		<!-- 免费领取专区 -->
		<router-link to="/FreeZone" class="free-area">
			<div class="icon">
				<img src="/static/images/home/gift-icon.png" />
			</div>
			<div class="text">
				<h2 class="title">会员免费领取专区</h2>
				<p class="dec">每张会员卡每日可以领取一次</p>
			</div>
			<!-- <router-link to="/FreeZone"> -->
				<div class="btn">立即领取</div>
			<!-- </router-link> -->
		</router-link>

		<!-- 包邮商品 -->
		<div class="hot-wrap" v-show="hotGoods.length>0">
			<div class="heading">
				<h3>包邮商品</h3>
			</div>
			<div class="hot-list">
				<div class="single-item" v-for="(item,index) in hotGoods" :key="index">
					<div class="img-wrap">
						<router-link :to="'/Details?goods_id='+item.goods_id">
							<img :src="item.img" />
						</router-link>
					</div>
					<div class="main">
						<router-link :to="'/Details?goods_id='+item.goods_id">
							<h3 class="title">{{item.goods_name}}</h3>
						</router-link>
						<div class="row-line">
							<div class="price">
								<p class="discount-price">{{item.price | formatMoney}}</p>
								<p class="original-price"><del>原价:{{item.original_price | formatMoney}}</del></p>
							</div>
							<!-- <div class="add-cart"></div> -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="hot-wrap" v-show="freeGoods.length>0">
			<div class="heading">
				<h3>包邮商品</h3>
			</div>
			<div class="hot-list">
				<div class="single-item" v-for="(item,index) in freeGoods" :key="index">
					<div class="img-wrap">
						<router-link :to="'/Details?goods_id='+item.goods_id">
							<img :src="item.img" />
						</router-link>
					</div>
					<div class="main">
						<router-link :to="'/Details?goods_id='+item.goods_id">
							<h3 class="title">{{item.goods_name}}</h3>
						</router-link>
						<div class="row-line">
							<div class="price">
								<p class="discount-price">{{item.price | formatMoney}}</p>
								<p class="original-price"><del>原价:{{item.original_price | formatMoney}}</del></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="hot-wrap" v-show="shippingGoods.length>0">
			<div class="heading">
				<h3>韩国直邮</h3>
			</div>
			<div class="hot-list">
				<div class="single-item" v-for="(item,index) in shippingGoods" :key="index">
					<div class="img-wrap">
						<router-link :to="'/Details?goods_id='+item.goods_id">
							<img :src="item.img" />
						</router-link>
					</div>
					<div class="main">
						<router-link :to="'/Details?goods_id='+item.goods_id">
							<h3 class="title">{{item.goods_name}}</h3>
						</router-link>
						<div class="row-line">
							<div class="price">
								<p class="discount-price">{{item.price | formatMoney}}</p>
								<p class="original-price"><del>原价:{{item.original_price | formatMoney}}</del></p>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

		<!-- 热门资讯 -->
		<div class="hot-news" v-show="newsData.length>0">
			<div class="heading">
				<h3>热门资讯</h3>
			</div>
			<div class="news-list">
				<div v-for="(item,index) in newsData" :key="index">
					<router-link :to="'/notice/NewsDetails?id='+ item.id " class="single-item">
						<div class="main">
							<h3 class="title">{{item.title}}</h3>
							<p class="dec" v-html="item.desc"></p>
						</div>
						<div class="img-wrap">
							<img :src="item.picture" />
						</div>
					</router-link>
				</div>
			</div>
			<div class="more" @click="showMore" v-show="showText">查看更多&gt;&gt;</div>
		</div>

		<!-- 底部导航 -->
		<Navigate></Navigate>

	</div>
</template>

<script>
import Navigate from "@/pages/common/footer/Navigate";
import {jumpTo} from '../../../static/js/public'

export default {
	name: "home",
	components: {
		Navigate,
	},
	data() {
		return {
			baseUrl:'',
			bannerData:[],
			levelData:[],
			hotGoods:[],
			newsData:[],
			freeGoods:[],
			shippingGoods:[],
			page:1,//页数
			showText:true,
			token: this.$store.getters.optuser.Authorization
		};
	},
	created(){		
		this.$store.commit('showLoading')//加载loading
		this.requestData();
	},
	methods: {
		/**
		 * 联系上级补卡
		 */
        linkSJReissueCard(){		
           	var url ='card/patch_card_edit',
            	that = this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':0
            })
            .then((res)=>{
                var info = res.data
                if(info.status==200){
                    this.$router.push('/sjReissueCard')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
		/**
		 * 立即补卡
		 */
		linkReissueCard(){
           var url ='card/card_edit_now',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token
            })
            .then((res)=>{
                var info =res.data
                if(info.status1!=315){
                    this.$router.push('/ReissueCard')
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },


		/**
		 * 请求数据
		 */
		requestData(){
            let url = 'index/index';
            this.$axios.post(url)
            .then( (res) => {
                if(res.data.status === 200){
					this.bannerData = res.data.data.banners;
					this.levelData = res.data.data.level_list;
					this.hotGoods = res.data.data.hot_goods;
					this.newsData = res.data.data.announce;
					this.freeGoods =res.data.data.free_goods;
					this.shippingGoods=res.data.data.shipping_goods
					this.$store.commit('hideLoading');
				}
				else if(res.data.status == 999){
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Login')
					},1000)
				}
				else{
					this.$toast(res.data.msg)
				}
            })
            .catch((error) => {
                alert('请求错误:'+ error)
            })
		},

		/**
		 * 点击加载更多
		 */
		showMore(){
			let url = 'announce/get_list';
			this.$axios.post(url,{
				page:this.page++,
				token:this.$store.getters.optuser.Authorization,
			})
			.then((res) => {
				if(res.data.status == 200){
					this.newsData = this.newsData.concat(res.data.data.list); 
					this.showText = false;
				}
			})
		},

		/**
		 * 路由跳转
		 */
		jumpTo(path,name,id){
			// 商品路由跳转
			if(path && name && id){
				this.$router.push(path+'?'+ name +'=' + id);
				return false;
			}
			// 跳转指定路由
			if(path && !name && !id){
				this.$router.push(path);
				return false;
			}
			//后退
			else{
				this.$router.go(-1)
			}
		}

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
	padding-bottom 114px
	.top-wrap
		width 100%
		height 340px
		background #ffffff url(/static/images/home/topHeader-bg.png) no-repeat;
		background-size 750px 260px
		padding-top 30px
		box-sizing border-box
		.banner
			width 702px
			height 280px
			overflow hidden
			margin 0 auto
			border-radius 10px
			box-shadow 0px 0px 15px #333
			img 
				max-width 100%
				height 280px
				display block
	.nav-wrap
		display -webkit-box
		display -moz-flex
		display -ms-flexbox
		display flex
		-ms-flex-flow wrap
		flex-flow wrap
		background #ffffff
		padding 0 24px
		-webkit-box-sizing border-box
		box-sizing border-box
		.nav-item
			width 33%
			text-align center
			font-size 24px
			margin-bottom 24px
			a
				width 100%
				height 100%
				display block
				.icon
					margin-bottom 10px
					display block
					img
						width 70px
						height 70px
				.text
					font-size 26px
	.patch-card
		display flex
		justify-content space-around
		background-color #fff
		padding 20px 24px
		box-sizing border-box
		.link
			width 217px
			height 60px
			text-align center
			line-height 60px
			color #ffffff
			font-size 26px
			display block
			background url(/static/images/home/links-bg.png) no-repeat
			background-size 100%
	.free-area
		width 702px
		height 130px
		background url(/static/images/home/free-area-bg.png) no-repeat
		background-size 100%
		margin 20px auto 0
		display flex
		align-items center
		padding 0 20px
		box-sizing border-box
		.icon
			width 94px
			height 107px
			padding 20px 15px 0 
			img 
				width 100%
		.text
			flex 1
			.title
				font-size 32px
				color #e7390f
				margin-bottom 10px
				&:after
					width 38px
					height 15px
					content ''
					display inline-block
					background url(/static/images/home/wave-icon.png) no-repeat
					background-size 100%
					margin-left 16px
			.dec
				font-size 24px
				color #da5637
		.btn
			width 160px
			height 50px
			text-align center
			line-height 50px
			background #da9569
			border-radius 20px
			font-size 28px
			color #ffffff
	.heading
		height 88px
		display flex
		align-items center
		justify-content center
		&:before
			width 56px
			height 15px
			content ''
			display inline-block
			background url(/static/images/home/line-left.png) no-repeat
			background-size 100%
		&:after
			width 56px
			height 15px
			content ''
			display inline-block
			background url(/static/images/home/line-right.png) no-repeat
			background-size 100%
		h3
			font-size 30px
			font-weight normal
			margin 0 12px
	.hot-wrap
		padding 0 24px
		box-sizing border-box
		.hot-list
			display flex
			flex-wrap wrap
			.single-item
				width 49%
				height 476px
				background-color #fff
				border-radius 8px
				overflow hidden
				margin 0 2% 22px 0
				padding 10px
				box-sizing border-box
				&:nth-child(2n)
					margin-right 0
				.img-wrap
					width 320px
					height 320px
					border-radius 10px
					overflow hidden
					img 
						max-width 100%
						max-height 100%
						display block
						margin 0 auto
						border-radius 10px
				.main
					.title
						width 100%
						font-size 22px
						color #151515
						overflow hidden    
						text-overflow ellipsis    
						white-space nowrap
						margin 15px 0
					.row-line
						display flex
						align-items center
						justify-content space-between
						.price
							.discount-price
								font-size 30px
								color #ed0d0d
							.original-price
								font-size 24px
								color #a1a1a1
						.add-cart
							width 50px
							height 50px
							background url(/static/images/home/add-cart.png) no-repeat
							background-size 100%
	.hot-news
		padding 0 24px
		box-sizing border-box
		.news-list
			.single-item
				height 140px
				background-color #ffffff
				border-radius 10px
				margin-bottom 15px
				padding 0 20px
				box-sizing border-box
				display flex
				align-items center
				justify-content space-between	
				.main 
					flex 1
					.title
						width 480px
						font-size 26px
						margin-bottom 10px
						overflow hidden
						text-overflow ellipsis
						white-space nowrap
						
					.dec
						width 400px
						font-size 24px
						color #7e7e7e
						overflow hidden
						text-overflow ellipsis
						display -webkit-box
						-webkit-line-clamp 1
						-webkit-box-orient vertical
				.img-wrap
					width 118px
					height 118px
					overflow hidden
					border-radius 10px
					img 
						width 100%
		.more
			font-size 26px
			color #151515
			text-align center
	
</style>
