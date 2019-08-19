<template>
	<div class="PersonalData">
		<!-- 头部组件 -->
		<TopHeader custom-title="个人资料">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="personal-container">
                <div class="group-item">
                    <div class="sub-title">头像</div>
                    <div class="right">
                        <van-uploader :after-read="afterRead">    
                            <img :src="personalData.avatar" ref="avatar" class="avatar"/>
                        </van-uploader>
                        <span class="right-arrow"></span>   
                    </div>
                </div>
                <router-link to="/user/EditUserName" tag="div" class="group-item">
                    <div class="sub-title">用户名</div>
                    <div class="right">
                        <span class="name">{{personalData.realname}}</span>
                        <span class="right-arrow"></span>
                    </div>
                </router-link>
                <router-link to="/EditPassword" tag="div" class="group-item">
                    <div class="sub-title">登录密码</div>
                    <div class="right">
                        <span class="right-arrow"></span>
                    </div>
                </router-link>
                <router-link to="/user/SetPassword" tag="div" class="group-item">
                    <div class="sub-title">支付密码</div>
                    <div class="right">
                        <span class="right-arrow"></span>
                    </div>
                </router-link>
                <div class="logout" @click="logout()">退出登录</div>
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
                personalData:'', //用户资料
                userName:'' //用户名
			}
        },

        created() {
            this.getPersonal(); //获取用户信息
        },

        methods:{
            /**
             * 文件上传完毕后触发的回调函数
             */
            afterRead(file) {
                // console.log(file)
                this.$refs.avatar.src = file.content;
                
                let url = "/user/updateTou";
                this.$axios.post(url,{
                    image:file.content,
                    token:this.$store.getters.optuser.Authorization
                }).then((res) => {
                    if(res.data.status == 200){
                        this.$toast({message:"头像上传成功",duration:1000})
                    }else{
                        this.$toast(res.data.msg)
                    }
                }).catch((error) => {
                    this.$toast(error)
                })                
            },

            /**
             * 获取用户信息
             */
            getPersonal(){
                let url = '/user/personal';
                this.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization,
                }).then((res) => {
                    if(res.data.status == 200){
                        this.personalData = res.data.data
                    }else{
                        this.$toast(res.data.msg)
                    }
                }).catch((error) => {
                    this.$toast(error)
                })
            },
           
            /**
             * 退出登录
             */
            logout() {
                let url = '/user/logout';
                this.$dialog.confirm({
                    title:'温馨提示',
                    message:'你确定要退出登录吗？'
                }).then(() => {
                    this.$axios.post(url,{
                        token:this.$store.getters.optuser.Authorization,
                    }).then((res) => {
                        this.$store.commit('del_token'); //清除token
                        if(res.data.status == 200){
                            this.$toast({message:"退出成功",duration:1000});
                            setTimeout(() => {
                                this.$router.push("/Login");
                            },1000)
                        }else{
                            this.$toast(res.data.msg)
                        }
                    })
                }).catch(() => {
                    // on cancel
                })
            },
        },
	
		
	}
</script>

<style lang="stylus" scoped>
    .PersonalData
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
                .group-item
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
                    justify-content space-between
                    .sub-title  
                        width 120px
                        text-align-last justify
                    .right
                        height 100%
                        display flex  
                        align-items center
                        .van-uploader /deep/ .van-uploader__input-wrapper
                            display flex
                            align-items center
                        .avatar
                            width 68px
                            height 68px
                            border-radius 50%
                            overflow hidden
                        .name
                            position relative
                            top -3px
                        .right-arrow
                            width 8px
                            height 14px
                            display inline-block
                            background url(/static/images/user/right-arrow2.png) no-repeat right center
                            background-size 8px 14px
                            margin-left 20px
                            vertical-align middle
                .logout
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