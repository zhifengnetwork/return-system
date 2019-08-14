<template>
	<div class="EditUserName">
		<!-- 头部组件 -->
		<TopHeader custom-title="修改用户名">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="personal-container">
                <div class="input-group">
                    <input type="text" placeholder="输入修改用户名" v-focus v-model="userName">
                </div>
                <div class="confirm-btn" @click="editUserName(userName)">确定修改</div>
            </div>
		</div>
	</div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader"
	export default {
        name: "PersonalData",
        components: {
			TopHeader,
		},
		data() {
			return{
               userName:''
			}
        },

        methods:{
            /**
             * 修改用户名
             */
            editUserName(name){
                if(name == ''){
                    this.$toast("用户昵称不能为空");
                    return false
                }else{
                    let url = '/user/edit_name';
                    this.$axios.post(url,{
                        token:this.$store.getters.optuser.Authorization,
                        realname:name 
                    }).then((res) => {
                        if(res.data.status == 200){
                            this.userName = name;
                            this.$toast({message:"用户名修改成功",duration:1000})
                            setTimeout(() => {
                                this.$router.go(-1);
                            },1000)
                        }else{
                            this.$toast(res.data.msg)
                        }
                    }).catch((error) => {
                        this.$toast(error)
                    })
                }
            }
        },
	
	}
</script>

<style lang="stylus" scoped>
    .EditUserName
        width 100%
        height 100%
        & /deep/ .TopHeader
            background none
            border-bottom none    
        .content    
            padding 0 24px
            box-sizing border-box
            .personal-container
                margin-top 30px
                .input-group
                    width 100%
                    height 88px
                    font-size 30px
                    background-color #fff   
                    margin-bottom 30px
                    border-radius 10px 
                    padding 0 20px
                    box-sizing border-box  
                    display flex  
                    align-items center
                    input 
                        width 100%
                        height 50px
                        &::-webkit-input-placeholder
                            color #8b8b8b                     
                .confirm-btn
                    width 92%
                    height 88px
                    font-size 30px
                    color #ffffff
                    background-color #ff4d4d
                    text-align center
                    line-height 88px
                    border-radius 40px
                    position fixed
                    left 50%
                    margin-left -46%
                    bottom 30px
                        
                    
                        
</style>