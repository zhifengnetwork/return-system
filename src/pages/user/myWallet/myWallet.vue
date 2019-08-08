<template>
	<div class="accs_wrap">
        <div class="header">
            <!-- 头部组件 -->
            <Acc-Header custom-title="我的钱包" class="head">
                <!-- 返回按钮 -->
                <i slot="backBtn" class="iconfont icon-fanhui"></i>
            </Acc-Header>

            <div class="amount">
                <div class="total">
                    <span>{{moneyInfo.remainder_money}}</span>
                    <span>元</span>
                </div>
                <div class="acc"><router-link to="/user/myWallet/BillingDetails">账单明细</router-link></div>
                <!-- <div class="acc">账单余额</div> -->
                <div class="list_wrap">
                    <div class="list">
                        <router-link to="/user/myWallet/accWithdrawal">
                            <span class="icon"></span>
                            <span>提现</span>
                        </router-link>
                    </div>
                    <div class="list">
                        <router-link to="/user/myWallet/Recharge">
                            <span class="icon_1"></span>
                            <span>充值</span>
                        </router-link>
                    </div>
                    <div class="list">
                        <router-link to="/user/CashCoupon">
                            <span class="icon_2"></span>
                            <span>代金券</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="the_wrap">
                <div class="the">
                    <div class="time" v-show="withdrawal.length>0">提现</div>
                    <!-- <div class="info_wrap"> 
                        <div class="info">
                            <div>充值</div>
                            <div>+200.00</div>
                        </div>
                        <p>充值成功</p>
                    </div> -->
                    <div class="info_wrap" v-for="(item,index) in withdrawal" :key="index"> 
                        <div class="info">
                            <div>提现</div>
                            <div>-{{item.account}}</div>
                        </div>
                        <div class="info">
                            <p>
                                <span v-if="item.status=== -1">不通过审批</span>
                                <span v-if="item.status== 1">待审批</span>
                                <span v-if="item.status== 2">通过审批</span>
                            </p>
                            <div>{{item.createtime | formatDate}}</div>
                        </div>
                    </div>
                </div>

                <div class="the">
                    <div class="time" v-show="recharge.length >0">充值</div>
                    <div class="info_wrap"  v-for="(item,index) in recharge" :key="index"> 
                        <div class="info">
                            <div>
                                <span v-if="item.status=== -1">不通过审批</span>
                                <span v-if="item.status== 1">待审批</span>
                                <span v-if="item.status== 2">通过审批</span>
                                {{item.source==2 ? '微信充值' : '支付宝充值'}}
                                
                                
                            </div>
                            <div>+{{item.amount}}</div>
                        </div>
                        <div class="info">
                            <p>
                                <span v-if="item.order_status=== 0">未支付</span>
                                <span v-if="item.order_status== 1">已支付</span>
                                <span v-if="item.order_status== 2">待确认</span>
                                <span v-if="item.order_status== 4">已关闭</span>
                            </p>
                            <div>{{item.pay_time | formatDate}}</div>
                        </div>
                    </div>
                </div>
                <div v-show="showMore" class="end-wrap"  @click="showMoreData()">
                    <p class="more-msg">点击加载更多</p>
                </div>
                
            </div>

            <div class="end-wrap" v-show="isBotom">
                <p>我是有底线哦~~</p>
            </div>

            <!-- 无数据 -->
            <div class="none" v-show="page==1 && (withdrawal.length <1 && recharge.length <1)">
                <img src="/static/images/public/none.png"/>
                <p>您还没相关记录</p>
            </div>
        </div>
	</div>
</template>

<script>
    import AccHeader from "@/pages/common/header/TopHeader"
    import { Toast } from 'vant'
	export default {
        name: 'theAccountBalance',
        components: {
			AccHeader,
		},
		data() {
			return{
                moneyInfo:{},
                infoList:{},
                withdrawal:[],
                recharge:[],
                page:1,             //页数
                isBotom:false,
                showMore:false,
                token:this.$store.getters.optuser.Authorization
			}
        },
        created(){
            this.$store.commit('showLoading')
            this.getData()
            this.getUserAlipayInfo()
        },
        methods: {
            showMoreData(){
                Toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration:1000
                });
                this.page ++;
                this.getData()
            },
            getData(){        //获取消费账单
                var that =this,
                    url ='user/wallet_detailed'
				that.$axios.post(url,{         // 传给后台的参数
                    'token':that.token,
                    'page':that.page
				})
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.infoList = list.data  
                        if(this.page == 1){ 
                            
                            that.withdrawal=list.data.withdrawal
                            that.recharge=list.data.recharge        
                        }else{
                            if(list.data.withdrawal.length > 0){        //如果有数据,拼接数组
                                that.withdrawal =that.withdrawal.concat(res.data.data.withdrawal)
                                // that.recharge = [...that.recharge, ...res.data.data.recharge]
                            }
                            if(list.data.recharge.length > 0){          //如果有数据,拼接数组
                                that.recharge =that.recharge.concat(res.data.data.recharge)
                            }
                            
                            if(list.data.withdrawal.length <1 && list.data.recharge.length <1){         //提现与充值数组都没有数据时‘没有更多数据显示’
                                  this.isBotom=true
                            }else{
                                this.showMore=false
                            }
                        }
                        that.$store.commit('hideLoading')   //数据成功获取后关闭loading
                    }
                    else if(res.data.status == 999){
                        that.$store.commit('del_token');    //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }else{
                        that.$toast(res.data.msg)
                    }
				})
            },
            getUserAlipayInfo(){    //获取余额
                var that =this,
                    url ='user/wallet_info'
				that.$axios.post(url,{         // 传给后台的参数
					'token':that.token
				})
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.moneyInfo =list.data
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
        },
        filters: {
            formatDate(time) {
                let date = new Date(time*1000);
                let y = date.getFullYear();

                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;

                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;

                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;

                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;

                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;

                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll, true);
        },
	}
</script>

<style lang="stylus" scoped>
    .accs_wrap
        width 100%
        height 100%
        .header
            padding 0 0 22px
            background url('/static/images/myWallet/bj.png') no-repeat
            background-size 100% 100%
        .header .head /deep/ .van-sticky--fixed
                background #fff
                border-bottom 1.5px solid #e6e6e6
            .amount
                position relative
                padding 82px 0 42px
                margin 126px 24px 0
                background #fff
                border-radius 20px
                .total 
                    text-align center
                    line-height 65px
                    span 
                        &:nth-child(1)
                            font-size 50px
                            color #151515
                        &:nth-child(2)
                            font-size 24px
                            color #343434 
                .acc 
                    position absolute
                    top 125px
                    right 0
                    width 186px
                    height 60px
                    background-color #ebc893
                    border-radius 30px 0px 0px 30px
                    font-size 30px
                    text-align center
                    line-height 60px 
                .list_wrap
                    margin 50px 0 0
                    display flex
                    line-height 75px
                    .list 
                        flex 1
                        font-size 28px
                        color #151515
                        text-align center 
                        .icon
                            display inline-block
                            width 24px
                            height 22px
                            background url('/static/images/myWallet/withdrawal.png') no-repeat
                            background-size 100% 100% 
                        .icon_1
                            display inline-block
                            width 24px
                            height 22px
                            background url('/static/images/myWallet/topup.png') no-repeat
                            background-size 100% 100% 
                        .icon_2
                            display inline-block
                            width 24px
                            height 22px
                            background url('/static/images/myWallet/vouchers.png') no-repeat
                            background-size 100% 100%  
        .content
            padding 40px 24px 88px 
            .the_wrap
                .the 
                    margin-bottom 20px
                    .time
                        padding 0 0 0 18px
                        background #e3dfd9
                        line-height 45px  
                    .info_wrap
                        padding 20px 0
                        font-size 26px
                        border-bottom 1.5px solid #e3dfd9
                        .info
                            display flex
                            justify-content space-between
                            line-height 55px
                            div 
                                // font-size 30px
                                color #151515
                        .list2
                            font-size 24px
                            color #424242  
                            line-height 55px   
            .end-wrap
                font-size 18px
                color #888888
                text-align center
                margin 30px auto
                .more-msg
                    font-size 28px
                    color #666
            .none
                text-align center
                margin-top 10%
                font-size 28px
                img
                    width 80px
                p
                    margin 20px auto   

</style>
<style lang="stylus">
.accs_wrap
    .head
        .TopHeader
            background-color transparent !important 
            border none
        
</style>
