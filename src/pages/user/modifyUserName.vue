<template>
	<div class="modify_wrap">
		<!-- 头部组件 -->
		<Name-Header custom-title="修改用户名">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Name-Header>
        <div class="content">
            <div class="inp_wrap">
                <input type="text" placeholder="输入修改用户名" v-model="userName"/>
            </div>
			<!-- 确认按钮 -->
			<div class="btn" @click="modify(userName)">确认修改</div>
		</div>

	</div>
</template>

<script>
    import NameHeader from "@/pages/common/header/TopHeader"
    import { Toast } from 'vant'
	export default {
		name: "modifyUserName",
		data() {
			return{
                userName:''
			}
        },
        methods: {
            // 修改用户名
            modify(name) {
                if(name === '') {
                    Toast('用户昵称不能为空!')
                    return
                } else {
                    var url = '/user/edit_name'
                    var params = new URLSearchParams();
                        params.append('token', this.$store.getters.optuser.Authorization);// 要传给后台的参数值token
                        params.append('realname', name);
                    this.$axios({
                        method:"post",
                        url:url,
                        data:params
                    }).then((res)=>{
                        console.log(res)
                        if(res.data.status === 200){
                            this.userName = name
                            Toast('修改成功')
                            setTimeout(() => {
                                this.$router.go(-1);
                            }, 1000);
                        } else {
                            Toast(res.data.msg)
                        }
                    })
                }
            },
        },
		components: {
			NameHeader,
		},
		
	}
</script>

<style lang="stylus" scoped>
    .modify_wrap
        .content
            .inp_wrap
                padding 20px
                margin 26px 24px
                background #fff
                border-radius 10px
            .inp_wrap input
                width 602px
                font-size 30px
                color #151515
                line-height 65px    
            .inp_wrap input::-webkit-input-placeholder
                font-size 30px
                color #8b8b8b 
            .btn 
                margin 45px auto
                width 702px
                height 88px
                background #ff4d4d
                border-radius 44px
                font-size 30px
                color #fff 
                text-align center
                line-height 88px  
                letter-spacing 2px       

</style>