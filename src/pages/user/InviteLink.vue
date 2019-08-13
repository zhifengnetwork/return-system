<template>
    <div class="InviteLink">
        <!-- 头部组件 -->
        <TopHeader custom-title="邀请链接">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="share-container">
                <div class="user-info">
                    <div class="avatar">
                        <img :src="userData.avatar" />
                    </div>
                    <div class="user-id">
                        <span>{{userData.realname}}</span>
                        <span class="id">ID: {{userData.id}}</span>
                    </div>
                </div>
                <div class="link">{{linkUrl}}</div>

                <div class="copy-btn"
                    v-clipboard:copy="linkUrl"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                    复制地址
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
import VueClipboard from 'vue-clipboard2'
export default {
    name:'InviteLink',
    components: {
        TopHeader,
    },
    data(){
        return{
            userData:{}, //用户信息
            linkUrl:'', // 邀请链接
        }
    },
    created(){
        this.$store.commit('showLoading');
        this.getData();
    },
    methods:{
        /**
         * 获取用户数据
         */
        getData(){
            let url = 'user/shareUrl';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
            }).then((res) => {
                if(res.data.status == 200){
                    this.userData = res.data.data;
                    this.linkUrl = this.globalUrl + '/Register' + this.userData.url;
                }else{
                    this.$toast(res.data.msg)
                }
                this.$store.commit('hideLoading');
            }).catch((error) => {
                this.$toast(error)
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
.InviteLink
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
            background #272439
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
                .user-id
                    font-size 30px
                    color #f50c7a
                    .id
                        color #ffffff 
                        margin-left 20px
            .link
                font-size 26px
                color #fae1e8
                text-align center
                line-height 50px
                margin 100px 0
            .copy-btn
                width 300px
                height 50px
                font-size 26px
                text-align center
                line-height 50px
                color #ffffff
                background-color #e12282
                border-radius 25px
                margin 0 auto


</style>
