<template>
    <div class="MySharing">
        <!-- 头部组件 -->
        <TopHeader custom-title="我的分享">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="share-container">
                <div class="user-info">
                    <div class="avatar">
                        <img :src="userData.avatar" />
                    </div>
                    <div class="user-name">
                        <span>我是</span>
                        <span class="name">{{userData.realname}}</span>
                    </div>
                </div>
                <div class="code-wrap">
                    <div class="qr-code">
                        <img :src="codeUrl" />
                    </div>
                </div>
                <div class="text">长按二维码保存</div>
            </div>
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'MySharing',
    components: {
        TopHeader,
    },
    data(){
        return{
            userData:{}, //用户信息
            codeUrl:'', // 二维码链接
        }
    },
    created(){
        this.$store.commit('showLoading');
        this.getUserData();
    },
    methods:{
        /**
         * 获取用户数据
         */
        getUserData(){
            let url = 'user/personal';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
            }).then((res) => {
                if(res.data.status == 200){
                    this.userData = res.data.data;
                    this.getQrCode(); //获取二维码
                }else{
                    this.$toast(res.data.msg)
                }
            }).catch((error) => {
                this.$toast(error)
            })
        },
        
        /**
         * 获取二维码
         */
        getQrCode(){
            let url = 'user/ewm';
            let jumpUrl = 'Register?'+'uid='+ this.userData.id;
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                url:jumpUrl
            }).then((res) => {
                if(res.data.status == 200){
                    this.codeUrl = res.data.data.url;
                    console.log(jumpUrl)
                }else{
                    this.$toast(res.data.msg)
                }
                this.$store.commit('hideLoading')
            }).catch((error) => {
                this.$toast(error)
            })
        }
        
    },
   
}
</script>

<style lang="stylus" scoped>
.MySharing
    width 100%
    height 100vh
    background url("/static/images/user/share-bg.png") no-repeat
    background-size 750px 1334px
    & /deep/ .TopHeader
        background none
        color #ffffff
        border-bottom none
    .content
        height calc(100vh - 88px)
        padding 0 24px
        box-sizing border-box
        display flex
        align-items center
        justify-content center
        .share-container
            width 100%
            height 930px
            background rgba(255,255,255,0.9)
            border-radius 10px
            position relative
            .user-info
                text-align center
                position relative
                top -85px
                .avatar
                    width 160px
                    height 160px
                    border-radius 50%
                    overflow hidden
                    margin 0 auto 15px
                    img 
                        width 100%
                .user-name
                    font-size 30px
                    color #ff4d4d
                    .name
                        color #151515 
                        margin-left 20px
            .code-wrap
                width 480px
                height 480px
                margin 0 auto
                background-color #ffffff
                border-radius 10px 
                display flex
                align-items center
                justify-content center 
                .qr-code
                    width 378px
                    height 378px
                    background url("/static/images/user/qr-code-bg.png") no-repeat 
                    background-size 100%
                    padding 30px
                    box-sizing border-box
                    img 
                        width 318px
                        height 318px
            .text
                font-size 30px
                line-height 108px
                text-align center


</style>
