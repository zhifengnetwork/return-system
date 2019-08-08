<template>
    <div class="payFail">
        <TopHeader custom-title="支付">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>

        <div class="content">
            <div class="pay-tips">
                <i class="iconfont icon-zhifushibai"></i>
                <span>订单支付失败</span>
            </div>
        </div>

    </div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader"
    export default {
        name:'PayFail',
        components: {
            TopHeader
        }
    }
</script>

<style lang="stylus" scoped>
.content
    box-sizing border-box
    .pay-tips
        display flex
        justify-content center
        align-items center
        font-size 38px
        margin 80px 0;
        i 
            font-size 55px
            color red
            margin-right 15px
</style>


