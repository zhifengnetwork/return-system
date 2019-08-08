<template>
	<div class="data_wrap">
		<!-- 头部组件 -->
		<Data-Header custom-title="个人资料">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Data-Header>
        <div class="content">
			<div class="nom_wrap">
                <div class="item_wrap">
                        <div class="text">头像</div>
                        <van-uploader :after-read="onRead">    
                            <div class="img">
                                <img :src="userName.avatar" alt="" ref="userImg"/>
                            </div>
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </van-uploader>
                </div>
                <router-link class="my_look" to="/user/modifyUserName">
                    <div class="item_wrap">
                        <div class="text">用户名</div>
                        <div class="name_wrap">
                            <span class="name">{{userName.realname}}</span>
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </div>
                    </div>
                </router-link>
                <router-link class="my_look" to="/EditPassword">
                    <div class="item_wrap">
                        <div class="text">修改密码</div>
                        <div class="name_wrap">
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </div>
                    </div>
                </router-link>    
                 <router-link class="my_look" to="/user/SetPassword">
                    <div class="item_wrap">
                        <div class="text">支付密码</div>
                        <div class="name_wrap">
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </div>
                    </div>
                </router-link>    
            </div>
            <!-- 按钮 -->
            <div class="btn" @click="quitOut()">退出登录</div>
		</div>
	</div>
</template>

<script>
    import DataHeader from "@/pages/common/header/TopHeader"
    import { Dialog } from 'vant'
    import { Toast } from 'vant'
	export default {
		name: "personalData",
		data() {
			return{
                userImg:'',// 用户头像
                userName:''// 用户名
			}
        },
        created() {
            this.Name();// 用户名
        },
        methods:{
            onRead(file) {
                // console.log(file)
                this.$refs.userImg.src = file.content;
                var url = "/user/updateTou"
                var params = new URLSearchParams();
                params.append('image',file.content);// 传给后台的参数值
                params.append('token', this.$store.getters.optuser.Authorization);// 要传给后台的参数值token
                this.$axios({
                    method:"post",
                    url:url,
                    data:params
                })
                .then((res)=>{
                    console.log(res)
                    if(res.data.status ===200){
                        this.userImg = res.data.data;
                        console.log(this.userImg)
                        Toast('头像上传成功')
                    }else{
                        Toast(res.data.msg)
                    }
                })
                
            },
            // 用户头像，名称接口
            Name() {
                var url = "/user/personal"
                var params = new URLSearchParams();
                params.append('token', this.$store.getters.optuser.Authorization);// 要传给后台的参数值token
                this.$axios({
                    method:"post",
                    url:url,
                    data:params
                })
                .then((res)=>{
                    console.log(res)
                    if(res.data.status ===200){
                        this.userName = res.data.data;
                        console.log(this.userName)
                    }else{
                        Toast(res.data.msg)
                    }
                })
            },
            //退出登录
            quitOut() {
                var url = '/user/logout'
                var params = new URLSearchParams();
                    params.append('token', this.$store.getters.optuser.Authorization); //传给后台的参数值 key/value
                Dialog.confirm({
                    title: '温馨提示',
                    message: '你确定要退出登录?'
                }).then(() => {
                    this.$axios({
                    method:"post",
                    url:url,
                    data:params
                }).then((res)=>{
                    this.$store.commit('del_token'); //token，清除它;
                    if (res.data.status === 200){
                        Toast('退出成功');
                        setTimeout(() => {
                            this.$router.push("/Login");
                        }, 1000);
                    } else {
                        Dialog.alert({
                            message:res.data.msg
                        })
                    }
                });
                }).catch(() => {
                    // on cancel
                })
            },
        },
		components: {
			DataHeader,
		},
		
	}
</script>

<style lang="stylus" scoped>
    .data_wrap
        width 100%
        height 100%
        .content
            .nom_wrap
                margin 26px 24px
                .item_wrap
                    padding 15px 20px
                    margin 0 0 30px
                    background #fff
                    line-height 75px
                    border-radius 10px
                .my_look
                    display block
                    color #151515    
                .item_wrap .text,.img,.name_wrap 
                    display inline-block
                    vertical-align middle
                .text
                    width 130px
                    font-size 30px
                    text-align-last justify
                .name_wrap
                    font-size 30px
                    float right
                .img
                    width 68px
                    height 68px
                    border-radius 50% 
                .van-uploader
                    float right    
            .btn 
                position fixed
                bottom 27px
                left 24px
                width 702px
                height 88px
                background #ff4d4d
                border-radius 44px
                font-size 30px
                color #fff 
                text-align center
                line-height 88px  
                letter-spacing 2px            
                    

img
    display block
    margin 0 auto
    max-width 100%
    height 100%
    border-radius 50%
</style>