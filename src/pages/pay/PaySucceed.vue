<template>
    <div class="paySucceed">
        <TopHeader custom-title="支付">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div  class="order-info">
                <p>支付金额: <span class="money">￥<strong>63578</strong></span></p>
            </div>
            <div class="pay-tips">
                <i class="iconfont icon-zhifuchenggong"></i>
                <span>订单支付成功</span>
            </div>
            <router-link to="/Order?type=0"><input class="-info-btn" type="button" value="查看订单" /> </router-link>
        </div>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader";
    export default {
        name: "PaySucceed",
        components: {
            TopHeader
        }
    }
</script>


<style lang="stylus" scoped>
    .paySucceed
        height 100vh
        background #ffffff
        .content
            box-sizing border-box
            text-align center
            .order-info
                margin-top:150px
            .money
                color #f30c0c
                strong
                    font-size 40px
                
            .pay-tips 
                display flex
                justify-content center
                align-items center
                font-size 38px
                margin 60px 0
            i 
                font-size 55px
                color #3bb000
                margin-right 15px
            
            .-info-btn
                width: 460px
                height: 100px
                background: #ea2028
                border-radius: 50px
                font-size 50px
                color:#fff
  
</style>


