<template>
    <div class="LinkSharing">
        <!-- 头部组件 -->
		<Link-Header custom-title="邀请链接" custom-fixed class="head">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Link-Header>
        <div class="content">
            <div class="main">
                <div class="img_head">
                    <div class="img">
                        <img :src="siteList.avatar"/>
                    </div>
                    <div class="name">
                        <div class="realname">{{siteList.realname}}</div>
                        <div class="realname"><span>ID：</span>{{siteList.id}}</div>
                    </div>
                </div>
                <div class="url">{{link}}</div>

                <div class="copyBtn" 
                v-clipboard:copy="link"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                >复制地址</div>
            </div>
        </div>
    </div>
</template>

<script>
    import LinkHeader from "@/pages/common/header/TopHeader"
    import { Toast } from 'vant'
    import VueClipboard from 'vue-clipboard2'
    export default {
	name: "InviteLink",
	data() {
		return {
            siteList:[],
            link:''
        };
    },
    methods: {
        
        // 接口
        sharing() {
            
            var url = 'user/shareUrl'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);  
            this.$axios({
                method:"post",
                url:url,
                data:params
            }).then((res)=>{
                if(res.data.status === 200){
                    this.siteList = res.data.data
                    this.link =this.globalUrl+'/Register'+this.siteList.url
                } else {
                    Dialog.alert({
                        message:res.data.msg
                    })
                }
            })
        },
        // 复制成功回调
        onCopy:function(e){
            Toast('复制成功');
            console.log(e)
           
        },
        // 复制失败回调
        onError:function(){}
    },
    mounted () {
        this.sharing();
    },
	components: {
        LinkHeader,
    },
};
</script>

<style lang="stylus" scoped>
    .LinkSharing
        width 100%
        height 100vh
        background url(/static/images/user/bnner.png) no-repeat
        background-size 100% 100%           
        .head
            color #fff
            background none
        .content
            padding 232px 0 0
            .main
                position relative
                margin 0 auto
                width 702px
                height 780px
                background #272439
                border-radius 10px
                .img_head
                    padding 82px 0 0
                    .img 
                        margin 0 auto
                        position absolute
                        top -85px
                        left 271px
                        width 160px
                        height 160px
                        border 2px solid #fff
                        border-radius 50%
                        img 
                            border-radius 50%
                    .name 
                        font-size 30px
                        line-height 55px
                        text-align center
                        .realname 
                            color #fff
                            span 
                                color #f50c7a
                .url 
                    margin 45px 0 0
                    font-size 26px
                    color #fff 
                    text-align center
                    line-height 45px               
                .copyBtn
                    margin 60px auto
                    width 300px
                    height 50px
                    background-color #e12282
                    border-radius 25px 
                    font-size 26px
                    color #fff
                    text-align center
                    line-height 50px               

img
    display block
    margin 0 auto
    max-width 100%
    height 100%                        
</style>