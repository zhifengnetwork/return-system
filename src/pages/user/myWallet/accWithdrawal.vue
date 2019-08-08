<template>
	<div class="accWit_wrap">
		<!-- 头部组件 -->
		<With-Header custom-title="提现">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</With-Header>
        <div class="content">
            <div class="hd_wrap">
				<div class="back">
                    <div class="k_box">
                        <div class="sum">
                            <span>￥</span><span>{{moneyInfo.remainder_money}}</span>
                        </div>
                        <p class="can">可提现金额</p>
                    </div>
                </div>
				<!-- 提现方式 -->
				<div class="way_wrap">
					<h4>提现方式</h4>
					<div class="mode">
                        <div class="wechat_wrap" v-for="(item,index) in payList" :key="index">
                            <div class="wechat weixi">
                                <img :src="item.img"/>
                            </div>
                            <div class="radio">
                                <van-radio-group v-model="radio">
                                    <van-cell-group>
                                        <van-cell :title="item.msg" clickable>
                                            <van-radio slot="right-icon" :name="index" @click="selectPayWay(item.id)"/>
                                        </van-cell>
                                    </van-cell-group>
                                </van-radio-group>
                            </div>
                        </div>
              
					</div>
					<div class="play_wrap">
						<!-- 微信/支付宝-提现金额 -->
						<div class="sum_wrap">
                            <h4>输入提现金额 <span>手续费({{fee}})</span></h4>
                            <!-- <h4>输入提现金额 </h4> -->
							<div class="put">
                                <span class="dollars">￥</span>
								<div class="inp">
                                    <!-- <input type="number" placeholder="请输入提现金额" ref="money" v-model.number="money"> -->
                                    <input type="number" oninput="if(value.length > 12)value = value.slice(0, 12)" placeholder="请输入提现金额" ref="money" v-model.number="money">
								</div>
							</div>
                           <h4>实际到账： <span>{{computeMoney}}</span></h4>
                            <!-- 输入支付宝账号 -->
                            <div class="pay_wrap">
                                <div class="pay">
                                    <h4>填写姓名</h4>
                                    <div class="inp">
                                        <input type="text" placeholder="请填写真实姓名" v-model="name"/>
                                    </div>
                                </div>
                                <div class="pay">
                                    <h4>填写{{pay_way==2 ? '微信' : '支付宝'}}账号</h4>
                                    <div class="inp">
                                        <input type="text" v-model="account" placeholder="请填写支付宝账号"/>
                                    </div>
                                </div>
                            </div>
						</div>

					</div>
				</div>
				<!-- 申请提现按钮 -->
				<div class="apply_btn" @click="saveWithdrawal()">提交申请</div>
			</div>
		</div>
	</div>
</template>

<script>
    import WithHeader from "@/pages/common/header/TopHeader"
    import { Toast } from 'vant'
	export default {
        name: 'accWithdrawal',
        components: {
			WithHeader,
		},
		data() {
			return{
                payList:[
                    {id:2,msg:'微信',img:'/static/images/user/weixi.png'},
                    {id:3,msg:'支付宝',img:'/static/images/user/zfb.png'},
				],
                radio:0,
                money:'',
                name:'',
                account:'',
                isClick:false,
                moneyInfo:[],
                remainderMoney:this.$route.query.remainder_money,
                rate:this.$route.query.rate,
                fee:0,
                //默认选中第一个
                cur: 0,
                pay_way:2,
                token:this.$store.getters.optuser.Authorization
			}
        },
        created(){
            this.$store.commit('showLoading')
            this.getUserAlipayInfo()
            
        },
        computed:{
            computeMoney() {
                var fee = this.money * this.moneyInfo.sxf
                this.fee =fee.toFixed(2)
                var tMoney= new Number(this.money - fee)
                return tMoney.toFixed(2)
            }
        },
        methods:{
            selectPayWay(id){
                this.pay_way =id
                this.getUserPayInfo(id)
            },
            getUserPayInfo(pay_way){
                var that =this
                if(pay_way==2){
                    that.name=that.moneyInfo.wx_name
                    that.account=that.moneyInfo.wx_account
                }
                if(pay_way==3){
                    that.name=that.moneyInfo.zfb_name
                    that.account=that.moneyInfo.zfb_account
                }
            },
            saveWithdrawal(){
                var that =this,
                    url ='user/withdrawal',
                    name=that.name,
                    account=that.account,
                    computeMoney=new Number(that.computeMoney)

                if(computeMoney<=0){
                    return that.$toast('请输入大于0的提现金额')
                }
                if(name==""){
                     return that.$toast('姓名不能为空')
                }
                if(account=="" || isNaN(account)){
                    return that.$toast('请正确填写账号')
                }
                if(that.isClick){  
                    return
                }
                that.isClick=true
				that.$axios.post(url,{         // 传给后台的参数
                    'token':that.token,
                    'money':computeMoney,
                    'withdraw_type':that.pay_way,
                    'account':account,
                    'name':name,
				})
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.$toast(res.data.msg)
                        setTimeout(()=>{
                            that.$router.push('/User')
                        },1000)
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
            getUserAlipayInfo(){
                var that =this,
                    url ='user/wallet_info'
				that.$axios.post(url,{         // 传给后台的参数
					'token':that.token
				})
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.moneyInfo =list.data
                        this.getUserPayInfo(this.pay_way)   //初始化支付账号
                        that.$store.commit('hideLoading')
                    }
                    else if(res.data.status == 999){
                        that.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }else{
                        that.$toast(res.data.msg)
                    }
				})
            },
            // 全部提现
            all(){
                this.money = this.remainderMoney;
            },
        }
	}
</script>

<style lang="stylus" scoped>
.accWit_wrap
    width 100%
    height 100%
    .content
        .hd_wrap
            margin 21px 24px 30px
        .back
            padding 90px 0
            width 100%
            background url('/static/images/myWallet/of.png') no-repeat
            background-size 100% 100%
        .k_box
            text-align center
            line-height 55px
            .sum
                font-size 40px
                color #fff
            .can
                font-size 26px
                color #eefffe
        .way_wrap
            h4
                margin 26px 0 26px
                color #151515
                font-size 30px
                line-height 65px
            .mode
                // display flex
            .mode img
                margin 0 auto
                display block
                max-width 100%
            .mode .wechat
                width 60px
                height 60px
            .wechat_wrap
                display flex
                //  0 0
                .weixi
                    margin 0 0 36px  
                .radio
                    width 100%
                .radio /deep/ .van-cell-group
                    background transparent     
                .radio /deep/ .van-cell 
                    padding 5px 20px 20px
                    background transparent 
                    line-height 56px
                .radio /deep/ .van-cell:nth-child(2)
                    padding 20px 20px 20px 
                .radio /deep/ .van-radio__icon .van-icon 
                    width 40px
                    height 40px
                    border-radius 8px
                    border 1.1px solid #3b2709
                .radio /deep/ .van-radio__icon--checked .van-icon
                    width 40px
                    height 40px
                    border-radius 8px
                    background-color #d6a14c
                    border-color #d6a14c              
            .sum_wrap
                .sum_wrap
                .put
                    padding 22px 0
                    border-bottom 1.1px solid #b9b9b9
                .dollars
                    font-size 30px
                    line-height 50px
                    font-weight 600    
                .put .inp,.all_btn
                    display inline-block
                    vertical-align top
                    font-size 30px
                    color #151515
                .inp input
                    width 650px
                    height 45px
                    font-size 30px
                    color #151515
                    .inp input::-webkit-input-placeholder
                        font-size 26px
                        color #717171
                .all_btn
                    float right
                    line-height 45px
                .fee_wrap
                    padding 22px 0
                    line-height 45px
                    border-bottom 1.1px solid #e6e6e6
                .fee_wrap .fee,.unit
                    display inline-block
                    vertical-align top
                    font-size 26px
                    color #151515
                .unit
                    float right
                .icon
                    margin 16px 0 0 
                    width 25px
                    height 25px
                    background url('/static/images/user/address/address-edit-icon.png') no-repeat
                    background-size 100% 100%
                .pay_wrap
                    .pay 
                        .inp 
                            padding 0 0 20px 
                            border-bottom 1.5px solid #b9b9b9    
        .apply_btn
            margin 123px auto 45px
            width 702px
            height 88px
            background-image linear-gradient(-90deg, #ffbf5b 0%,#ffe184 100%),linear-gradient(#25bbb3, #25bbb3)
            background-blend-mode normal,normal
            box-shadow -1px 1px 7px 0px #a7a7a7
            border-radius 44px
            font-size 30px
            color #151515
            text-align center
            line-height 88px
            letter-spacing 4px

</style>