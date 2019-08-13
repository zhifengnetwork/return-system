<template>
    <div class="ReceiptInformation">
        <!-- 头部组件 -->
		<TopHeader custom-title="收款信息">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>
        <div class="content">
            <div class="receivables-wrap" v-if="receiptData">
                <div class="list-item">
                    <div class="sub-title">收款人:</div>
                    <div class="text">{{receiptData.title}}</div>
                </div>
                <div class="list-item">
                    <div class="sub-title">电话:</div>
                    <div class="text">{{receiptData.name}}</div>
                </div>
                <div class="list-item">
                    <div class="sub-title">账号:</div>
                    <div class="text">{{receiptData.value}}</div>
                </div>
                <div class="list-item">
                    <div class="sub-title">银行:</div>
                    <div class="text">{{receiptData.remark}}</div>
                </div>
                <!-- <div class="code">
                    <img src="/static/images/user/receivablesCode.png" />
                </div>
                <div class="tips">
                    <p>充值余额请添加客服微信，微信客服充值时间:早上09:00起充值一晚上21:30截止，超过充值时间充值，第二天会员余额自动到账</p>
                </div> -->
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
           let url = '/user/bank_card';
           this.$axios.post(url,{
               token:this.$store.getters.optuser.Authorization,
           }).then((res) => {
               if(res.data.status == 200){
                   this.receiptData = res.data.data;
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
    margin-top 20px
    padding 0 24px
    box-sizing border-box       
    .receivables-wrap
        width 100%
        height 100%
        padding 18px
        box-sizing border-box
        background-color #fff
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
        .code
            display flex
            align-items center
            justify-content center
            margin-bottom 40px
            img 
                width 340px
        .tips
            font-size 28px
            color #151515
            line-height 46px   
    .none
        text-align center
        margin 150px auto
        img
            width 80px
        p
            margin 10px auto
            font-size 24px                        
</style>