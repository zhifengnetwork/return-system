<template>
   <div class="CashWithdrawal">
        <!-- 头部组件 -->
        <TopHeader custom-title="账户提现">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="amount-money">
                <div class="sub-title">可提现金额</div>
                <div class="money">{{accountData.remainder_money | formatMoney}}</div>
            </div>
            <!-- 提现方式 -->
            <div class="withdrawal-way">
                <h3>提现方式</h3>
                <div class="way-list">
                    <div class="way-item" 
                     v-for="(item,index) in wayArr" 
                     :key="index" 
                    :class="{on:index == nowIndex}"
                     @click="selectType(index,item.type)">
                        <img :src="item.icon" />
                    </div>
                    <!-- <router-link to="/user/EditBankCard" class="add-card" tag="div"><i class="icon"></i>添加银行卡</router-link> -->
                </div>
                <!-- 账号信息 -->
                <router-link to="/user/EditAlipay">
                    <div class="account-wrap" v-show="nowIndex == 0">
                        <div class="account-msg">
                            <span class="name">{{this.alipay ? this.alipay:'请添加支付宝账号'}}</span>
                            <span class="account-number">{{this.alipayName}}</span>
                        </div>
                        <div class="edit-btn"></div>  
                    </div>
                </router-link>

                <!-- 银行卡信息 -->
                <!-- <div class="account-wrap" v-show="nowIndex == 1">
                    <div class="account-msg">
                        <span class="name">银行</span>
                        <span class="account-number">6222</span>
                    </div>
                    <div class="right-arrow"></div>  
                </div> -->
                
                <!-- 银行卡上拉菜单 -->
                <!-- <div class="bankPopup">
                    <van-popup v-model="showBank">
                        <van-radio-group>
                            <van-cell-group>
                                <van-cell v-for="(item,index) in bankList" :key="index" :title="item.name" clickable @click="selectBank(item)">
                                    <van-radio :name="item.name"/>
                                </van-cell>
                            </van-cell-group>    
                        </van-radio-group>
                    </van-popup>
                </div> -->

            </div>

            <!-- 提现金额 -->
            <div class="withdrawal-money">
                <h3>提现金额</h3>
                <div class="group-item">
                    <div class="fl">
                        <span class="unit">￥</span>
                        <input type="number" placeholder="请输入提现金额" 
                            oninput="if(value.length > 12)value = value.slice(0, 12)" 
                            v-model.number = "money" 
                            ref="money">
                    </div>
                    <div class="fr all-withdrawal" @click="allWithdrawal()">全部提现</div>
                </div>
                <div class="group-item">
                    <div class="fl">手续费：{{fee}}</div>
                    <div class="fr">元</div>
                </div>
                <div class="group-item">
                    <div class="fl">实际到账: {{computedMoney}}</div>
                    <div class="fr">元</div>
                </div>
            </div>
            
            <div class="confirm-btn" @click="confirmWithdrawal()">提交申请</div>
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
            accountData:[], //账户余额
            nowIndex:0, //支付方式选中
            type:3, //提现方式，默认3支付宝
            // 提现方式
            wayArr:[
                {type:3,icon:'/static/images/user/alipay-icon.png'},
                // {type:2,icon:'/static/images/user/bank-card.png'},
            ],
            alipay:'', //支付宝账号
            alipayName:'', //真实姓名
            money:'', //提现金额
            rate:'', //费率
            fee:0, //手续费
        }
    },
    created(){
        this.reqAccount();
        this.getAlipayInfo();
    },
    computed:{
        /**
         * 计算手续费、实际到账
         */
        computedMoney(){
            this.fee = (this.money * this.rate).toFixed(2);
            let actualMoney = new Number(this.money - this.fee);
            return actualMoney.toFixed(2)
        }
    },
    methods:{
        // 获取账户余额
        reqAccount(){
            let url = '/user/user_remainder';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            }).then((res) => {
                if(res.data.status == 200){
                    this.accountData = res.data.data;
                    this.rate = this.accountData.rate;
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },

        /**
         * 选择方式
         */
        selectType(index,type){
            console.log(type)
            this.nowIndex = index;
        },

        /**
         * 获取支付宝账号信息
         */
        getAlipayInfo(){
            let url = 'user/zfb_info';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            }).then((res) => {
                if(res.data.status == 200){
                    this.alipay = res.data.data.alipay
                    this.alipayName = res.data.data.alipay_name
                }else if(res.data.status == 999){
                    this.$store.commit('del_token'); //清除token
                }else{
                    this.$toast(res.data.msg)
                }
            }).catch((error) => {

            })
        },

        /**
         * 全部提现
         */
        allWithdrawal(){
            this.money = this.accountData.remainder_money
        }, 
        
        /**
         * 申请提现
         */
        confirmWithdrawal(){
            if(!this.money){
                this.$toast('请输入提现金额')
                return false
            }
            let url = 'user/withdrawal';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                money:this.money,
                withdraw_type:this.type
            }).then((res) => {
                if(res.data.status == 200){
                    this.$toast(res.data.msg)
                    setTimeout(()=>{
                        this.$router.push('/User')
                    },1000)
                }else if(res.data.status == 999){
                    this.$store.commit('del_token'); //清除token
                }else{
                    this.$toast(res.data.msg)
                }
            }).catch((error) => {

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
                .add-card
                    height 50px
                    font-size 24px
                    border 2px solid #ccc
                    border-radius 6px
                    padding 0 15px
                    box-sizing border-box
                    display flex
                    align-items center
                    .icon
                        width 22px
                        height 22px
                        display inline-block
                        background url("/static/images/user/add-card.png") no-repeat center center
                        background-size 100%
                        margin-right 10px
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
                .right-arrow
                    width 8px
                    height 14px
                    background url("/static/images/user/right-arrow2.png") no-repeat center center
                    background-size 8px 14px
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
