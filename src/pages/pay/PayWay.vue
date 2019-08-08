<template>
    <div class="PayWay">
      	<!-- 头部组件 -->
        <div class="TopHeader">
            <div class="backBtn" @click="JumpTo()">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="title">支付方式</div>
        </div>

        <div class="height-88"></div>
        <div class="content">
            <div class="pay-way">
                <van-radio-group v-model="payDefault">
                    <van-cell-group>
                        <van-cell v-for="(item,index) in pay_type" :key="index" :title="item.pay_name" clickable @click="selectPay(item)" v-if="item.pay_type != tag ">
                            <van-radio :name="item.pay_name"/>
                        </van-cell>
                    </van-cell-group>    
                </van-radio-group>
            </div>
        </div>
        <div class="payment-btn" @click="payment(order_id,pay_id)">立即付款</div>
        <!-- 数字键盘 -->
        <div v-show="paswPopup" class="pasw-popup">
            <div class="-popup-cont">
                <van-password-input
                :value="payPassword"
                @focus="showKeyboard = true"
                />
                <div class="fg-password"><router-link to="/user/SetPassword">忘记密码</router-link></div>
                <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = true"
                />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'PayWay',
    data() {
        return {
            payDefault:'余额支付',
            isClick:false,
            order_id:this.$route.query.order_id,
            pay_id:1,            //支付方式id
            pay_type:[],        //所有支付方式
            payPassword:'',     //支付密码
            showPwd:false,
            showKeyboard: true,
            paswPopup:false,
            token:this.$store.getters.optuser.Authorization,
            levelId:this.$route.query.level_id,          //会员卡
            isCard:this.$route.query.isCard,
            cardNum:this.$route.query.card_num,          //会员卡数量
            goodsId:this.$route.query.goods_id,         //商品id
            rechargeAmount:this.$route.query.rechargeAmount, //充值金额 
            tag:'' //余额支付标记
        }
    },
    created(){
        console.log(this.isClick)
        this.requestData();
        if(typeof(this.goodsId)!='undefined'){
            this.tag = 1
        }

    },
    methods:{
        /**
         * 跳转到首页
         */
        JumpTo(){
            this.$router.push('/Home')
        },

        /**
         * 获取支付方式
         */
        requestData(){
            let url = 'Order/get_pay_type';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            }).then((res) => {
                if(res.data.status === 200){
                    this.pay_type = res.data.data;
                    if(typeof(this.goodsId)!='undefined'){
                        this.pay_id = res.data.data[0].pay_type;    //充值接口默认微信
                    }
                    // this.pay_id = res.data.data[0].pay_type;//当前选中支付方式id
                } 
                else if(res.data.status == 999){
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Login')
					},1000)
				}
                else{
                    this.$toast(res.data.msg)
                }
            })
        },
        /**
         * 选择支付方式
         */
        selectPay(item){
            this.payDefault = item.pay_name;//当前选中
            this.pay_id = item.pay_type;//当前选中支付方式id
        },

        payment(){
            // 余额支付
            // console.log(this.pay_id)
            var pay_id=this.pay_id
            if(pay_id == 1){
                this.showPwd = true;
                this.showKeyboard = true;
                this.paswPopup =true
            }

            // 微信&支付宝支付
            if(pay_id==2 || pay_id==3){
                // 普通支付
                if(typeof(this.order_id)!='undefined'){
                    this.requestInfo()
                }
                // 购买会员卡
                if(typeof(this.isCard)!='undefined'){
                    this.payMemberCard()
                }
                // 立即补卡
                if(typeof(this.cardNum) !='undefined'){
                    this.reissueCard()
                }
                // 账户充值
                if(typeof(this.goodsId)!='undefined'){
                    this.reqRacharge()  
                }
            }
        },
        reissueCard(){
            if(this.isClick){
                return
            }
            this.isClick=true
            var url ='pay/card_pay',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':that.cardNum,
                'level_id':that.levelId,
                'card_type':1,
                'pwd':that.payPassword,
                'pay_type':that.pay_id
            })
            .then((res)=>{
                var list =res.data
                if(list.status==310){
                    that.$toast(res.data.msg)
                    setTimeout(() => {
                        that.$router.go(-1)
                    }, 2000);
                }
                else if(res.data.status == 312){
                    that.$toast(res.data.msg)
                    setTimeout(()=>{
                        this.$router.push('/sjReissueCard?card_num='+res.data.data.card_num)
                    },1500)
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                }else{
                    that.$toast(res.data.msg)
                }
                that.isClick=false
            })
            .catch((error) => {
                that.$toast('请求错误')
                that.isClick=false
            })
        },
        payMemberCard(){                     //购买会员卡
            if(this.isClick){
                return
            }
            this.isClick=true
            var url ='pay/card_pay',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'pay_type':that.pay_id,
                'pwd':that.payPassword,
                'level_id':that.levelId
            })
            .then((res)=>{
                var info =res.data
                if(info.status==310){
                    that.$toast(res.data.msg)
                    setTimeout(() => {
                        that.$router.go(-1);
                    }, 1000);
                }
                else if(res.data.status == 308){
                     that.$toast(res.data.msg)
                     setTimeout(()=>{
                        this.$router.push('/user/myWallet/Recharge')
                    },1500)
                }
                else if(res.data.status == 311){
                    window.location.href =res.data.data.url
                }
                else if(res.data.status == 312){
                    that.$toast(res.data.msg)
                    setTimeout(()=>{
                        this.$router.push('/sjReissueCard?card_num='+res.data.data.card_num)
                    },1500)
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                }else{
                    that.$toast(res.data.msg)
                }
                that.isClick=false
            })
            .catch((error) => {
                that.$toast('请求错误')
                that.isClick=false
            })
        },

        // 账户充值
        reqRacharge(){
            if(this.isClick){
                return
            }
            this.isClick=true
            let url = 'pay/recharge_pay';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                pay_type:this.pay_id,
                money:this.rechargeAmount,
                good_id:this.goodsId
            })
            .then((res) => {
                // console.log(res)
                this.isClick=false
            })
            .catch((error) => {
                that.$toast('请求错误')
                that.isClick=false
            })
        },
        /**
         * 余额支付:输入密码
         */
        requestInfo(){   //普通商品
          if(this.isClick){
                return
            }
            this.isClick=true
            let url = 'pay/payment';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                order_id:this.$route.query.order_id,
                // pay_type:this.pay_id, 
                pay_type:1,                         //默认余额支付
                pwd:this.payPassword
            }).then((res) => {
                if(res.data.status === 200){  
                    if(this.pay_id==1){
                         // 余额支付成功               
                        this.$toast.success({message:res.data.msg,duration: 2000});
                        this.requestData();
                        if(res.data.data.is_turntable == 0){ //支付成功，如果是新用户，2s跳转到抽奖页面
                            setTimeout(() => {       
                                this.$router.push('/luckywheel?order_id=' + res.data.data.order_id)
                            },2000)
                        }else{
                            setTimeout(() => {                   
                                this.$router.push('/Order/OrderDetails?order_id=' + res.data.data.order_id)
                            },2000)
                        }
                    }
                    // else if(this.pay_id==3){             //拉起支付宝链接，暂时注解
                    //     window.location.href =res.data.data.url
                    // }
                    
                } 
                else if(res.data.status == 308){
                    return this.$router.push('/user/myWallet/Recharge')
                }  
                else if(res.data.status === 888){
                    // 设置支付密码
                    this.$toast.fail(res.data.msg);
                    this.$router.push('/user/SetPassword')
                }else if(res.data.status == 999){               // token过期
                    this.$store.commit('del_token');              //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }
                else{
                    // 支付失败
                    this.$toast.fail(res.data.msg);
                }
                this.isClick=false
            })
            .catch((error) => {
                that.$toast('请求错误')
                that.isClick=false
            })
        },
        onInput(key) {  //密码框
            this.payPassword = (this.payPassword + key).slice(0, 6);
            if(this.payPassword.length === 6){ 
                if(typeof(this.order_id)!='undefined'){      // 普通支付
                    this.requestInfo()
                }
                
                if(typeof(this.isCard)!='undefined'){      // 购买会员卡
                    this.payMemberCard()
                }
               
                if(typeof(this.cardNum) !='undefined'){      // 立即补卡
                    this.reissueCard()
                }

                // 关闭密码输入
                this.showKeyboard = false
                this.showPwd = false
                this.paswPopup =false
                this.payPassword = ''
            }
        },
        onDelete() {
            this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1);
        },
        /**
         * 关闭密码蒙层，清空密码
         */
        hidePwd(){
            this.showPwd=false;
            this.payPassword = '';
        },
    },
    
}
</script>

<style lang="stylus" scoped>
.PayWay
    .TopHeader
        width 100%
        height 88px
        line-height 88px
        color #151515
        font-size 30px
        background-color #ffffff
        display flex
        justify-content space-between
        align-items center
        position fixed
        top 0
        left 0
        z-index 9
        .backBtn
            width 10%
            text-align center
            position absolute
            left 0
            top 0
            .iconfont 
                font-size 36px
        .title
            text-align center
            width 70%
            margin 0 auto
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
    .content
        margin-top 20px
        padding 0 24px
        box-sizing border-box
        .pay-way /deep/ .van-cell__value
            flex none
    .payment-btn
        width 70%
        height 70px
        line-height 70px
        text-align center
        color #fff
        font-size 30px
        background-color #f70a0a
        border-radius 10px
        position fixed
        left 50%
        bottom 50px
        margin-left -35%
        z-index 9
    .pasw-popup
        position fixed
        width 100%
        height 100%
        bottom 0
        left 0
        z-index 9999
        background rgba(0,0,0,0.5)
        .-popup-cont
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
    // .popup
    //     width 100%
        
    //     .van-password-input__security li
    //         border 1px solid #999
    //         border-left 0
    //     .van-password-input
    //         padding 30px 0 20px
    // .van-number-keyboard
    //     z-index 3000!important
</style>



