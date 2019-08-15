<template>
    <div class="ReceiptInformation">
        <!-- 头部组件 -->
		<TopHeader custom-title="收款信息">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>
        <div class="content">
            <div class="receipt-wrap" v-if="receiptData">
                <div class="receipt-info">
                    <div class="list-item">
                        <div class="sub-title">收款人:</div>
                        <div class="text">{{receiptData.username}}</div>
                    </div>
                    <div class="list-item">
                        <div class="sub-title">电话:</div>
                        <div class="text">{{receiptData.iphone}}</div>
                    </div>
                    <div class="list-item">
                        <div class="sub-title">账号:</div>
                        <div class="text">{{receiptData.bank_card}}</div>
                    </div>
                    <div class="list-item">
                        <div class="sub-title">银行:</div>
                        <div class="text">{{receiptData.bank_name}}</div>
                    </div>
                </div>

                <div class="code-list">
                    <div class="code-item weChat">
                        <div class="code">
                            <img :src="this.globalUrl + '/public/upload/images/' + receiptData.wx_code" />
                        </div>
                        <p class="sub-title">微信收款二维码</p>
                    </div>
                    <div class="code-item alipay">
                        <div class="code">
                            <img :src="this.globalUrl + '/public/upload/images/' + receiptData.zfb_code" />
                        </div>
                        <p class="sub-title">支付宝收款二维码</p>
                    </div>
                </div>
            </div>

            <!-- 无数据 -->
            <div class="none" v-else>
                <img src="/static/images/public/none.png"/>
                <p>暂无相关数据</p>
            </div>
        </div>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader"
    export default {
    name: "ReceiptInformation",
    components: {
		TopHeader,
	},
	data() {
		return {
            receiptData:[]
        };
    },
    created(){
        this.$store.commit('showLoading');
        this.reqData();       
    },
   
    methods:{
       /**
        * 请求收款信息数据
        */
       reqData(){
           let url = 'pay/investment';
           this.$axios.post(url,{
               token:this.$store.getters.optuser.Authorization,
           }).then((res) => {
               if(res.data.status == 200){
                   this.receiptData = res.data.data.info;
                   console.log(this.receiptData)
               }else{
                   this.$toast(res.data.msg) 
               }
               this.$store.commit('hideLoading')
           }).catch((error) => {
               this.$toast(error)
           })
       }
    },
	
};
</script>

<style lang="stylus" scoped>
.content
    margin-top 30px
    padding 0 24px
    box-sizing border-box       
    .receipt-info
        width 100%
        height 100%
        background-color #fff
        padding 18px
        box-sizing border-box
        margin-bottom 30px
        .list-item
            font-size 28px
            line-height 60px
            display flex
            .sub-title  
                width 230px
                text-align right 
                margin-right 10px
            .text
                flex 1
    .code-list
        .code-item
            margin-bottom 20px
            &.weChat
                background url("/static/images/user/weChat-code-bg.png") no-repeat
                background-size 100%
            &.alipay
                background url("/static/images/user/alipay-code-bg.png") no-repeat
                background-size 100%
            .code
                width 100%
                height 300px
                display flex
                align-items center
                justify-content center
                img 
                    width 260px
                    height 260px
            .sub-title
                font-size 30px
                text-align center
                line-height 50px
                margin 10px 0
    .none
        text-align center
        margin 150px auto
        img
            width 80px
        p
            margin 10px auto
            font-size 24px                        
</style>