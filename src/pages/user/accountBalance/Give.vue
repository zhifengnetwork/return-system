<template>
    <div class="Give">
        <!-- 头部组件 -->
        <TopHeader custom-title="赠送">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>
        <div class="content">
            <div class="amount-money">
                <div class="money-item">
                    <div class="sub-title">可提现余额</div>
                    <div class="money">{{accountData.remainder_money | formatMoney}}</div>
                </div>
                <div class="money-item">
                    <div class="sub-title">冻结余额</div>
                    <div class="money">{{accountData.pay_points | formatMoney}}</div>
                </div>
            </div>
            <div class="form-container">
                <div class="input-group">
                    <label>收款ID:</label>
                    <input type="number" v-model="to_id">
                </div>
                 <div class="input-group">
                    <label>手机号码:</label>
                    <input type="number" v-model="phone">
                </div>
                 <div class="input-group">
                    <label>金额:</label>
                    <input type="number" v-model="money">
                </div>
            </div>

            <!-- 数字键盘 -->
            <div v-show="showKeyboard" class="keyboard-popup">
                <div class="popup-cont">
                    <van-password-input
                    :value="payPassword"
                    />
                    <div class="fg-password"><router-link to="/user/SetPassword">忘记密码</router-link></div>
                    <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
                    />
                </div>
            </div>

            <div class="confirm-btn" @click="showPopup()">立即赠送</div>

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
    data(){
        return{
            accountData:{},
            to_id:'',
            phone:'',
            money:'',
            payPassword:'',     //支付密码
            showKeyboard:false, //是否显示数字键盘
            isClick:false
        }
    },
    created(){
        this.$store.commit('showLoading');
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
                    this.accountData = res.data.data;
                    this.$store.commit('hideLoading');
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },

        /**
         * 校验值
         */
        validateAll(){
            if(this.to_id == ''){
                this.$toast('收款ID不能为空')
                return false;
            }
            else if(!this.phone){
                this.$toast('手机号码不能为空')
                return false;
            }
            else if(!/^1[3456789]\d{9}$/.test(this.phone)){
                this.$toast('请填写正确的手机号码')
                return false;
            }
            else if(this.money == ''){
                this.$toast('转出金额不能为空')
                return false;
            }
            else{
                return true
            }
        },

        /**
         * 显示键盘 
         */
        showPopup(){
            if(this.validateAll()){
                // 显示数字密码键盘
                this.showKeyboard = true;
            }
           
        },

        /**
         * 确认转账
         */
        confirmTransfer(){
            if(this.isClick){
                return
            }
            this.isClick = true;

            let url = 'Balance/transfer_money';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                to_user_id:parseInt(this.to_id),
                iphone:this.phone,
                money:this.money,
                pwd:this.payPassword
            }).then((res) => {
                if(res.data.status == 200){
                    this.$toast({message:'赠送成功',duration:2000})
                    setTimeout(() => {
                        this.$router.replace('/user/AccountBalance')
                    },2000)
                }
                else if(res.data.status == 888){
                    // 设置支付密码
                    this.$toast.fail(res.data.msg);
                    this.$router.replace('/user/SetPassword')
                }
                else if(res.data.status == 999){               
                    this.$store.commit('del_token');              
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },2000)
                }
                else{
                    // 支付失败
                    this.$toast.fail(res.data.msg);
                }
                this.isClick = false;
            }).catch((error) => {
                this.isClick = false;
            })
           
        },

        /**
         * 密码框
         */
        onInput(key) {  
            this.payPassword = (this.payPassword + key).slice(0, 6);
            if(this.payPassword.length === 6){ 
                this.confirmTransfer(); // 执行转账
                this.showKeyboard = false; // 关闭密码输入
                this.payPassword = ''; //清空密码
            }
        },

        /**
         * 删除密码
         */
        onDelete() {
            this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1);
        },

        /**
         * 关闭密码蒙层，清空密码
         */
        hideKeyboard(){
            this.showKeyboard = false;
            this.payPassword = '';
        },
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
            justify-content space-around
            margin-bottom 70px
            .money-item
                display flex
                align-items center
                justify-content center
                flex-direction column
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
        .keyboard-popup
            position fixed
            width 100%
            height 100%
            bottom 0
            left 0
            z-index 9999
            background rgba(0,0,0,0.5)
            .popup-cont
                position absolute
                bottom 0
                z-index 1
                left 0
                width 100%
                background #fff
                padding-top 40px
                .fg-password
                    text-align right
                    margin: 30px
                    a
                        color: #1a89fa
                .van-password-input__security 
                    height: 100px
                .van-password-input__security li
                    border 1px solid #bdbdbd
                    border-left 0
                .van-password-input__security li:first-child
                        border-left 1px solid #bdbdbd
                .van-password-input__security li:first-child
                    // border-left 1px solid #999
                .van-number-keyboard
                    position relative

</style>
