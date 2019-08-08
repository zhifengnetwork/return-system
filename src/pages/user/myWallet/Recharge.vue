<template>
   <div class="Recharge">
        <!-- 头部组件 -->
        <TopHeader custom-title="充值">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="input-amount"><input type="number" v-model="money" oninput="if(value.length > 10)value = value.slice(0, 12)"  placeholder="请输入充值金额" @input="changAmount($event)" /></div>
            <div class="amount-list">
                <div class="amount-item" 
                    v-for="(item,index) in amountList"
                    :class="{active:index == nowIndex}"
                    @click="handleClick(index,$event,item.id)"
                    :key="index">
                    {{item.amount}}元
                    <span class="isCheck"></span>
                </div>
            </div>
            <div class="foot-info">
                <div class="recharge-amount">{{rechargeAmount | formatMoney}}元</div>
                <div class="confirm-btn" @click="linkToPay()">确定付款</div>
            </div>
        </div>

   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'Recharge',
    components: {
        TopHeader,
    },
    data(){
        return{
            nowIndex:0,
            amountList:[],
            rechargeAmount:50,
            token:this.$store.getters.optuser.Authorization,
            goods_id:'',
            money:''
        }
    },
    created(){
        this.$store.commit('showLoading')       //加载loading
        this.getRechargeData();
        
    },
    methods:{
        linkToPay(){
            let goodsId = this.goods_id;
            if(this.money != ''){
                goodsId = 0
            }
            this.$router.push({
                path: '/Pay/PayWay?goods_id=' + goodsId + '&rechargeAmount=' + this.rechargeAmount,
            })
        },
        getRechargeData(){
            var _that=this
             _that.$axios.post('user/good',{
                'token':this.token
            })
            .then((res)=>{
                var info =res.data;
                if(info.status == 200){
                    this.amountList = info.data.list;
                    this.goods_id = info.data.list[0].id;
                    this.rechargeAmount = info.data.list[0].amount;
                    this.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
            })
        },
         /**
         * 输入充值金额
         */
        changAmount(e){
            if(isNaN(e.currentTarget.value) || e.currentTarget.value==""){
                return this.rechargeAmount = 0
            }
            this.rechargeAmount = e.currentTarget.value
        },
        /**
         * 选择充值金额
         */
        handleClick(index,e,goodsId){
            this.nowIndex = index;
            this.rechargeAmount = e.target.innerText;
            this.goods_id = goodsId;
            this.money = ''
        },       
    },
    filters:{
		//格式化金钱
        formatMoney:function(val){
            return "¥" + parseInt(val)
        }
	}
 

}
</script>

<style lang="stylus" scoped>
.Recharge
    width 100%
    min-height 100vh
    background #ffffff
    .content
        padding 0 24px
        box-sizing border-box
        .input-amount
            height 90px
            display flex
            align-items center
            input 
                width 100%
                height 60px
                line-height 60px
                font-size 28px
        .amount-list
            display flex
            flex-wrap wrap
            .amount-item
                width 220px
                height 110px
                font-size 30px
                text-align center
                line-height 110px
                border 2px solid #8c8c8c
                border-radius 8px
                margin-right 20px
                margin-bottom 24px
                box-sizing border-box
                position relative
                &:nth-child(3n)
                    margin-right 0
                &.active
                    border-color #e6b15c
                &.active .isCheck
                    width 41px
                    height 31px
                    position absolute
                    right 0
                    bottom 0
                    background url("/static/images/user/check-gou.png") no-repeat
                    background-size 100%
        .foot-info
            width 100%
            padding 0 24px
            box-sizing border-box
            position fixed
            left 0
            bottom 0
            z-index 9
            .recharge-amount
                font-size 36px
                text-align center
            .confirm-btn
                width 100% 
                height 88px
                line-height 88px
                text-align center
                color #151515
                font-size 30px
                background linear-gradient(#ffe083, #ffc05c)
                border-radius 40px
                margin 34px auto
                box-shadow 0px 3px 10px #cacaca

</style>
