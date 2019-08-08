<template>
     <div class="Navigate">
        <ul>
 			<li>
 				<router-link exact to="/Home">
                    <i class="home-icon"></i>
 					<span class="text">首页</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/Category">
 					<i class="category-icon"></i>
 					<span class="text">分类</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/Cart">
 					<i class="cart-icon"></i>
 					<span class="text">购物车</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/User">
 					<i class="user-icon"></i>
 					<span class="text">我的</span>	
 				</router-link>
 			</li>
 		</ul>
    </div>
</template>

<script>
    export default {
        name:'Navigate',
        data(){
            return{
                
            }
        }
        
    }
</script>

<style lang="stylus" scoped>
.Navigate
	width 100%
	height 98px
	border-top 1px solid #f8f2f2
	background #ffffff
	z-index 9
	position fixed
	left 0
	bottom 0
	border-top 1px solid #ccc
	ul
		display flex
		height inherit
		li
			width 25%
			a
				width 100%
				height 100%
				display flex
				flex-direction column
				align-items center 
				justify-content center
				i
					width 100%
					height 40px
					margin 7px 0
					display block
				.home-icon
					background url(/static/images/public/home-icon1.png) no-repeat center center
					background-size 45px 40px
				.category-icon
					background url(/static/images/public/category-icon1.png) no-repeat center center
					background-size 40px 39px
				.cart-icon
					background url(/static/images/public/cart-icon1.png) no-repeat center center
					background-size 45px 40px
				.user-icon
					background url(/static/images/public/user-icon1.png) no-repeat center center
					background-size 30px 40px
				span
					font-size 26px;
					color #7f7f7f
				
			.router-link-exact-active
				.home-icon
					background url(/static/images/public/home-icon-on1.png) no-repeat center center
					background-size 45px 40px
				.category-icon
					background url(/static/images/public/category-icon-on1.png) no-repeat center center
					background-size 40px 39px
				.cart-icon
					background url(/static/images/public/cart-icon-on1.png) no-repeat center center
					background-size 45px 40px
				.user-icon
					background url(/static/images/public/user-icon-on1.png) no-repeat center center
					background-size 30px 40px
				span
					color #151515	
</style>


