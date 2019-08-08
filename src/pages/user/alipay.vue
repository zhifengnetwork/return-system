<template>
	<div class="alipay_wrap">
		<!-- 头部组件 -->
		<Pay-Header custom-title="支付宝账号编辑">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Pay-Header>
        <div class="content">
			<div class="row_wrap">
				<!-- 支付宝账号 -->
				<div class="name_wrap">
					<div class="name">支付宝账号</div>
					<div class="inp_wrap">
						<input type="text" v-model="alipay" placeholder="请输入支付宝账号"/>
					</div>
				</div>
				<!-- 真实姓名 -->
				<div class="name_wrap">
					<div class="name">真实姓名</div>
					<div class="inp_wrap">
						<input type="text" v-model="alipayName" placeholder="请输入真实姓名"/>
					</div>
				</div>
			</div>
			<!-- 确认按钮 -->
			<div class="submit_btn" @click="saveData()">确认</div>
		</div>

	</div>
</template>

<script>
	import PayHeader from "@/pages/common/header/TopHeader"
	export default {
		name: "alipay",
		data() {
			return{
				alipayName:'',
				alipay:''
			}
		},
		methods:{
			saveData(){
				var _that =this
				if(_that.alipayName=="" || _that.alipay==""){
					return _that.$toast("请输入完整信息")
				}
				var url ='user/zfb_edit'
				_that.$axios.post(url,{			// 传给后台的参数
					'token':this.$store.getters.optuser.Authorization,
					'alipay_name':_that.alipayName,
					'alipay':_that.alipay,
				})
				.then((res)=>{
					if(res.data.status===200){
						_that.$toast('修改成功')  
						
						setTimeout(() => {
							this.$router.go(-1)
						}, 2000);
					}else if(res.data.status==999){
                        this.$store.commit('del_token'); //token，清除它;
                    }else{
                        this.$toast(res.data.msg)
                    }
				})
			}
		},
		components: {
			PayHeader,
		},
		
	}
</script>

<style lang="stylus" scoped>
	.alipay_wrap
		width 100%
		height 100%
		.content
			.row_wrap
				margin 15px 24px
				border-radius 6px
				.name_wrap
					margin-bottom 30px
					padding 25px 0
					background #fff	
				.name_wrap .name,.inp_wrap
					display inline-block
					vertical-align top
				.name
					width 200px
					font-size 30px
					color #151515
					text-align right
					line-height 65px
				.inp_wrap
					margin-left 45px	
				.inp_wrap input
					width 400px
					border none
					outline none
					font-size 26px
					color #151515
					line-height 65px
				.inp_wrap input::-webkit-input-placeholder
					font-size 24px
					color #a0a0a0
			.submit_btn
				margin 74px auto 70px
				width 702px
				height 88px
				background #ff4d4d
				border-radius 44px
				color #fff
				font-size 36px
				text-align center
				line-height 88px
				letter-spacing 4px
			.map_wrap
				margin 10px 24px 50px
				img
					display block
					margin 0 auto 
					max-width 100%
					border-radius 10px		

</style>