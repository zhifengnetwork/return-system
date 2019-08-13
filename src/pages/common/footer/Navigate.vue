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
 				<router-link to="/Investment">
 					<i class="investment-icon"></i>
 					<span class="text">投资记录</span>
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
	background #e9e9e9
	z-index 9
	position fixed
	left 0
	bottom 0
	ul
		display flex
		height inherit
		li
			flex 1
			a
				width 100%
				height 100%
				display flex
				flex-direction column
				align-items center 
				justify-content center
				i
					width 33px
					height 38px
					margin 3px 0
					display block
				.home-icon
					background url(/static/images/public/home-icon2.png) no-repeat center center
					background-size 33px 38px
				.investment-icon
					background url(/static/images/public/investment-icon2.png) no-repeat center center
					background-size 33px 38px
				.user-icon
					background url(/static/images/public/user-icon2.png) no-repeat center center
					background-size 33px 38px
				span
					font-size 28px;
					color #686868
			.router-link-exact-active
				.home-icon
					background url(/static/images/public/home-icon-on2.png) no-repeat center center
					background-size 33px 38px
				.investment-icon
					background url(/static/images/public/investment-icon-on2.png) no-repeat center center
					background-size 33px 38px
				.user-icon
					background url(/static/images/public/user-icon-on2.png) no-repeat center center
					background-size 33px 38px
				span
					color #151515	
</style>


