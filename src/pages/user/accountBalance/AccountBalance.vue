<template>
   <div class="AccountBalance">
        <!-- 头部组件 -->
        <TopHeader custom-title="账户余额">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="amount-money">
                <div class="sub-title">我的余额</div>
                <div class="money">{{accountData.remainder_money | formatMoney}}</div>
            </div>
            <div class="group-btn">
                <router-link to="/user/CashWithdrawal">
                    <div class="link-btn">提现</div>
                </router-link>
                
                <router-link to="/user/Give">
                    <div class="link-btn link-btn2">赠送</div>
                </router-link>
            </div>
            <div class="link-list">               
                <router-link to="/user/WithdrawalDetails">
                    <div class="link-item">
                        <div class="text">提现明细</div>
                        <div class="more"></div>
                    </div>
                </router-link>
                <router-link to="/user/GiveRecord">
                    <div class="link-item">
                        <div class="text">赠送记录</div>
                        <div class="more"></div>
                    </div>
                </router-link>
                <router-link to="/user/BillDetails?type=0">
                    <div class="link-item">
                        <div class="text">账单明细</div>
                        <div class="more"></div>
                    </div>
                </router-link>
            </div>
        </div>

   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'AccountBalance',
    components: {
		TopHeader,
    },
    data(){
        return{
            accountData:[]
        }
    },
    created(){
        this.reqAccount();
    },
    methods:{
        /**
         * 请求数据
         */
        reqAccount(){
            let url = '/user/user_remainder';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            }).then((res) => {
                if(res.data.status == 200){
                    this.accountData = res.data.data
                }else{
                    this.$toast(res.data.msg)
                }
            })
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
.AccountBalance
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
        .group-btn
            display flex
            justify-content space-between
            margin-bottom 30px
            .link-btn
                width 330px
                height 88px
                color #fff
                font-size 30px
                border-radius 44px
                text-align center
                line-height 88px
                letter-spacing 4px
                background #ff4d4d
            .link-btn2 
                color #ff4444 
                background none 
                border 1.5px solid #ff4d4d 
        .link-list 
            .link-item 
                width 100%
                height 88px
                font-size 30px
                color #151515
                background-color #ffffff
                margin-bottom 20px
                border-radius 10px
                padding 0 36px
                box-sizing border-box
                display flex
                align-items center
                justify-content space-between
                .text
                    flex 1
                    display flex
                    align-items center
                .more 
                    min-width 8px
                    min-height 14px
                    background url(/static/images/user/right-arrow2.png) no-repeat right center
                    background-size 8px 14px
                    padding-right 30px
        
                  




</style>
