<template>
    <div class="MySharing">
        <!-- 头部组件 -->
        <TopHeader custom-title="我的推广">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="share-container">
                <div class="user-info">
                    <div class="avatar">
                        <img :src="shareData.avatar" />
                    </div>
                    <div class="user-name">
                        <span>我是</span>
                        <span class="name">{{shareData.realname}}</span>
                    </div>
                </div>
                <div class="code-wrap">
                    <div class="qr-code">
                        <img :src="codeUrl" />
                    </div>
                </div>
                <div class="text">长按二维码保存</div>

                <div class="link">{{linkUrl}}</div>

                <div class="copy-btn"
                    v-clipboard:copy="linkUrl"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                    复制邀请链接
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
import VueClipboard from 'vue-clipboard2'
export default {
    name:'MySharing',
    components: {
        TopHeader,
    },
    data(){
        return{
            shareData:{}, //推广信息
            codeUrl:'', // 二维码链接
            linkUrl:'', // 邀请链接
        }
    },
    created(){
        this.$store.commit('showLoading');
        this.reqShareData();
    },
    methods:{
        /**
         * 获取推广信息
         */
        reqShareData(){
            let url = '/user/ewm';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
            }).then((res) => {
                if(res.data.status == 200){
                    this.shareData = res.data.data;
                    this.codeUrl = this.shareData.img_url;
                    this.linkUrl = this.globalUrl + '/Register' + this.shareData.url;
                }else{
                    this.$toast(res.data.msg)
                }
                this.$store.commit('hideLoading')
            }).catch((error) => {
                alert('请求失败:' + error)
            })
        },

        // 复制成功回调
        onCopy:function(e){
            // console.log(e)
            this.$toast('复制成功');
        },

        // 复制失败回调
        onError:function(){
            this.$toast('复制失败');
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
                margin-top -85px
                margin-bottom 40px
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
                line-height 100px
                text-align center
            .link
                width 80%
                font-size 26px
                color #151515
                line-height 34px
                margin 0px auto 40px
                word-break break-all 
            .copy-btn
                width 266px
                height 50px
                font-size 26px
                text-align center
                line-height 50px
                color #ffffff
                background-color #ff164d
                border-radius 10px
                margin 0 auto



</style>
