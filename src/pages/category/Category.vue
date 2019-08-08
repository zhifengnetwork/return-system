<template>
	<div class="Category">
		
		<!-- 头部组件 -->
		<TopHeader custom-title="分类">
			<!-- <i slot="backBtn" class="iconfont icon-fanhui"></i> -->
			<!-- <i slot="rightBtn" class="iconfont icon-lajitong"></i> -->
		</TopHeader>
		<div class="scroll-content">
			<div class="scroll-menu">
				<div class="menu-item" 
				v-for="(item,index) in this.menuBar" 
				:key="index"
				:class="{'active': activeIndex === index}"
				@click="handleClick(index)"
				>{{item}}</div>
				<!-- <div class="menu-item active">洁面</div>
				<div class="menu-item">爽肤水</div>
				<div class="menu-item">清透乳</div>
				<div class="menu-item">面霜</div>
				<div class="menu-item">面膜</div>
				<div class="menu-item">连衣裙</div> -->
			</div>
			<div class="scroll-list">
				<!-- <Scroller> -->
					<div class="list-item" v-for="(items,index) in this.categoryData" :key="index" v-show ="activeIndex === index">
						<div class="single-item" v-for="(item,index) in items.goods" :key="index">
							<div class="img-wrap">
								<router-link 
								:to="'/Details?goods_id='+item.goods_id">
									<img :src="item.img" />
								</router-link>
							</div>
							<div class="main">
								<router-link 
								:to="'/Details?goods_id='+item.goods_id">
									<h3>{{item.goods_name}}</h3>
								</router-link>
								<p class="price">{{item.price | formatMoney}}</p>
							</div>
						</div>
					</div>
				<!-- </Scroller> -->
			</div>
		</div>
		<!-- 底部导航 -->
		<Navigate></Navigate>
	</div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
import Navigate from "@/pages/common/footer/Navigate"
export default {
	name: "Category",
	components: {
		TopHeader,
		Navigate,
	},
	data() {
		return {
			activeIndex:0,
			menuBar:[],
			categoryData:[],
			isLoading:true,
			pullDownTip:''
		};
	},
  	created(){
		this.$store.commit('showLoading');// 调用loading 
        this.requestData();//请求数据
    },
	methods:{
		// 根据索引点击跳至对应内容
		handleClick(i){
			this.activeIndex = i;
		},
		// 请求数据
        requestData(){
            let url = 'goods/categoryList';
            this.$axios.get(url)
            .then( (res) => {
				let status = res.data.status
                if(status === 200){
					// 数据加载成功，关闭loading 
					this.$store.commit('hideLoading');
					this.categoryData = res.data.data;
					this.categoryData.forEach((item) => {
						// 左侧导航赋值
						this.menuBar.push(item.cat_name)
					})		
                }else if(res.data.status == 999){
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
.Category
	touch-action:none;
	-webkit-overflow-scrolling: touch;
	overflow-scrolling: touch;
	width 100%
	min-height 100vh
	background-color #ffffff
	.scroll-content
		height calc(100vh - 186px)
		display flex
		padding-right 24px
		box-sizing border-box
		.scroll-menu
			width 250px
			height 100%
			overflow-y auto
			text-align center
			margin-right 30px
			background-color #f2f2f2
			.menu-item
				height 80px
				line-height 80px
				font-size 30px
				&.active
					background-color #fff
		.scroll-list
			padding 25px 0 68px
			height 100%
			overflow-y auto
			flex 1
			box-sizing border-box
			.single-item
				display flex
				padding 10px 0
				box-sizing border-box
				border-bottom 1px solid #eeeeee
				&:last-child
					border-bottom none
				.img-wrap
					width 160px
					height 160px
					overflow hidden
					margin-right 20px
					img 
						width 100%
				.main
					flex 1
					h3
						// height 70px
						font-size 26px
						color #151515
						font-weight normal
						display -webkit-box
						-webkit-box-orient vertical
						-webkit-line-clamp 2
						overflow hidden
						margin 20px 0 30px
					.price
						font-size 26px
						color #f30c0c

				
  
</style>
