<template>
    <div class="MySharing">
        <!-- 头部组件 -->
		<My-Header custom-title="我的二维码" class="head">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</My-Header>
        <div class="content">
            <div class="main">
                <div class="img_head">
                    <div class="img">
                        <img :src="siteList.avatar"/>
                    </div>
                    <div class="name">
                        <span>我是</span>
                        <span>{{siteList.realname}}</span>
                    </div>
                </div>
                <div class="mark_wrap">
                    <div class="mark">
                        <div class="mark_img">
                            <img :src="ewmList.url"/>
                            <!-- 必须是id 和实例化的第一参数对应 -->
                            <!-- <div id="qrcode"></div> -->
                        </div>
                    </div>
                </div>
                <p class="touch">长按二维码保存</p>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "@/pages/common/header/TopHeader"
    import QRCode from 'qrcodejs2'
    export default {
	name: "mySharing",
	data() {
		return {
            //link: 'http://new_retail_web.zhifengwangluo.com/Register+url',// 要跳转的路径或者显示的文字
            siteList:[],
            ewmList:[],
            link:''
        };
    },
    methods: {
        // qrcode () {
        //     // 和div的id相同 必须是id  class类名会报错
        //     // 第二参数是他的配置项
        //     let that = this 
        //     let qrCode = new QRCode('qrcode', {
        //         width: 160,
        //         height: 160,
        //         render: "table",
        //         text: that.link,//可以写路径或者文字，扫描后想要跳转的路径或者显示的文字
        //     })
        //     //从 canvas 提取图片 image  
        //     function convertCanvasToImage(canvas) {  
        //         // var canvas = document.getElementById('qrcode').getElementsByTagName('img')[0];
        //         var canvas=document.getElementsByTagName('canvas')[0];
        //         var img = convertCanvasToImage(canvas);
        //         console.log(canvas) 
        //         $('#qrcode').append(img);// 添加DOM
        //         //新建Image对象
        //         var image = new Image();
        //         // canvas.toDataURL 返回的是一串Base64编码的URL
        //         image.src = canvas.toDataURL("image/png");
        //         console.log(image.src)  
        //         return image;
        //     }
        // },
        // 接口
        sharing() {
            var url = 'user/personal'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);  
            this.$axios({
                method:"post",
                url:url,
                data:params
            }).then((res)=>{
                if(res.data.status === 200){
                    this.siteList = res.data.data
                    // console.log(this.siteList)
                    this.qrcode(); 
                } else {
                    Dialog.alert({
                        message:res.data.msg
                    })
                }
            })
        },
         // 二维码接口
        qrcode() {
            var http = 'user/ewm'
            var url ='Register?'+'uid='+this.siteList.id
            // console.log(url)
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);
            params.append('url',url)  
            this.$axios({
                method:"post",
                url:http,
                data:params
            }).then((res)=>{
                // console.log(res)
                if(res.data.status === 200){
                    this.ewmList = res.data.data
                    this.link =res.data.data+this.siteList.id
                    // console.log(this.ewmList)
                } else {
                    Dialog.alert({
                        message:res.data.msg
                    })
                }
            })
        },
    },
    mounted () {
        this.sharing();
        console.log(this.globalUrl)
    },
	components: {
        MyHeader,
    },
};
</script>

<style lang="stylus" scoped>
    .MySharing
        width 100%
        height 100vh
        background url(/static/images/user/bnner.png) no-repeat
        background-size 100% 100%
        .head /deep/ .van-sticky
            color #fff
            background none
        .content
            padding 145px 0 0
            .main
                position relative
                margin 0 auto
                width 702px
                background rgba(255,255,255,0.9)
                border-radius 10px
            .img_head
                padding 82px 0 0
                .img 
                    width 160px
                    height 160px 
                    margin 0 auto
                    position absolute
                    top -85px
                    left 271px
                    border 2px solid #fff
                    border-radius 50%
                    overflow hidden
                    img 
                        width 100%
                        height :100%
                .name 
                    font-size 30px
                    line-height 75px
                    text-align center
                .name span:nth-child(1)
                    margin 0 20px 0 0 
                    color #ff4d4d
            .mark_wrap
                margin 30px auto
                padding 51px
                width 480px
                background #fff
                border-radius 10px
                box-sizing border-box
                .mark
                    width 400px
                    height 400px
                    margin 0 auto
                    padding 10px
                    background url(/static/images/user/ber.png) no-repeat
                    background-size 100% 100%
                    box-sizing border-box
                    img 
                        width 100%           
            .touch
                font-size 30px
                text-align center
                line-height 105px            


// img
//     display block
//     margin 0 auto
//     max-width 100%
//     height 100%                       
</style>
<style lang="stylus">
.MySharing
    .head
        .TopHeader
            background-color transparent !important 
            border none
            color #fff
        
</style>