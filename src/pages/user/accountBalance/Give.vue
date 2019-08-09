<template>
    <div class="Give">
        <!-- 头部组件 -->
        <TopHeader custom-title="赠送">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>
        <div class="content">
            <div class="amount-money">
                <div class="sub-title">我的余额</div>
                <div class="money">¥ 0.00</div>
            </div>
            <div class="form-container">
                <div class="input-group">
                    <label>收款ID:</label>
                    <input type="number">
                </div>
                 <div class="input-group">
                    <label>手机号码:</label>
                    <input type="number">
                </div>
                 <div class="input-group">
                    <label>金额:</label>
                    <input type="number">
                </div>
            </div>
            <div class="confirm-btn">确认转出</div>
        </div>
        
    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'Give',
    components: {
        TopHeader,
    },
}
</script>

<style lang="stylus" scoped>
.Give
    & /deep/ .TopHeader
        background-color #f2f2f2
    .content
        padding 0 24px
        box-sizing border-box
        .amount-money
            width 100%
            height 280px
            color #ffffff
            background url("/static/images/user/amount-money-bg.png") no-repeat
            background-size 100%
            display flex
            align-items center
            justify-content center
            flex-direction column
            margin-bottom 70px
            .sub-title
                font-size 30px
                margin-bottom 40px
            .money
                font-size 36px
        .form-container
            margin 0 110px
            .input-group
                height 50px
                display flex
                align-items center
                margin-bottom 50px
                label
                    width 115px
                    font-size 26px
                    display inline-block
                    text-align right 
                input 
                    height 50px
                    line-height 50px
                    font-size 26px
                    display inline-block
                    flex 1
                    border-bottom 1px solid #1b1b1b
                    padding-left 10px
                    box-sizing border-box
        .confirm-btn
            width 92%
            height 88px
            font-size 26px
            line-height 88px
            text-align center
            color #ffffff
            background #ff4d4d
            border-radius 40px
            position fixed
            left 50%
            margin-left -46%
            bottom 30px

</style>
