<template>
   <div class="CashWithdrawal">
        <!-- 头部组件 -->
        <TopHeader custom-title="账户提现">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="amount-money">
                <div class="sub-title">可提现金额</div>
                <div class="money">¥ 0.00</div>
            </div>
            <!-- 提现方式 -->
            <div class="withdrawal-way">
                <h3>提现方式</h3>
                <div class="way-list">
                    <div class="way-item" 
                     v-for="(item,index) in wayArr" 
                     :key="index" 
                    :class="{on:index == nowIndex}"
                     @click="selectType(index)">
                        <img :src="item.icon" />
                    </div>
                </div>
                <!-- 账号信息 -->
                <div class="account-wrap" v-show="nowIndex == 0">
                    <div class="account-msg">
                        <span class="name">小腊肉</span>
                        <span class="account-number">17875592622</span>
                    </div>
                    <div class="edit-btn"></div>  
                </div>
            </div>

            <!-- 提现金额 -->
            <div class="withdrawal-money">
                <h3>提现金额</h3>
                <div class="group-item">
                    <div class="fl">
                        <span class="unit">￥</span>
                        <input type="number" placeholder="请输入提现金额">
                    </div>
                    <div class="fr all-withdrawal">全部提现</div>
                </div>
                <div class="group-item">
                    <div class="fl">手续费：1</div>
                    <div class="fr">元</div>
                </div>
                <div class="group-item">
                    <div class="fl">实际到账: 655.00</div>
                    <div class="fr">元</div>
                </div>
            </div>
            
            <div class="confirm-btn">提交申请</div>
        </div>

   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'CashWithdrawal',
    components: {
		TopHeader,
    },
    data(){
        return{
            nowIndex:0, //支付方式选中
            wayArr:[
                {id:1,icon:'/static/images/user/alipay-icon.png'},
                {id:2,icon:'/static/images/user/weChat-icon.png'},
            ]
        }
    },
    created(){
        
    },
    methods:{
       selectType(index){
           this.nowIndex = index;
       }
    },
    filters:{
		//格式化金钱
        formatMoney:function(val){
            return "¥ " + Number(val).toFixed(2)
        }
	}
}
</script>

<style lang="stylus" scoped>
.CashWithdrawal
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
            margin-bottom 30px
            .sub-title
                font-size 30px
                margin-bottom 40px
            .money
                font-size 36px
        .withdrawal-way
            h3
                font-size 28px
                margin-bottom 30px
            .way-list
                height 70px
                display flex
                align-items center
                margin-bottom 20px
                .way-item
                    width 58px
                    height 58px
                    margin-right 35px
                    vertical-align middle
                    display inline-block
                    img
                        margin 0 auto
                        display block
                        max-width 100%
                    &.on
                        width 70px
                        height 70px
            .account-wrap
                height 70px
                display flex
                align-items center
                justify-content space-between
                border-bottom 1px solid #e6e6e6
                .account-msg
                    flex 1
                    font-size 26px
                    .name
                        margin-right 50px
                .edit-btn
                    width 25px
                    height 25px
                    background url("/static/images/user/edit-icon.png") no-repeat center center
                    background-size 25px 25px
                    padding 10px 
        .withdrawal-money
            h3
                line-height 90px
            .group-item
                height 70px
                font-size 26px
                display flex
                align-items center
                justify-content space-between
                border-bottom 1px solid #e6e6e6
                margin-bottom 20px
                .fl
                    display flex
                    align-items center
                    .unit
                        font-size 30px
                        margin-right 20px
                .all-withdrawal
                    font-size 26px
                
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
