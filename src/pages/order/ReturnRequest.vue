<template>
    <div class="ReturnRequest">
        <TopHeader custom-title="退款申请">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <!-- 主内容 -->
        <div class="content">
            <!-- 商品信息 -->
            <div class="goods-item" v-for="(item,index) in refundData" :key="index">
                <div class="img-wrap">
                    <router-link :to="'/Details?goods_id='+item.goods_id"><img :src="item.img" /></router-link>
                </div>
                <div class="text">
                    <router-link :to="'/Details?goods_id='+item.goods_id"><h3>{{item.goods_name}}</h3></router-link>
                     <div class="good-sku">
                        <span class="sku-coll">{{item.spec_key_name}}</span>
                        <span class="price">{{item.goods_price | formatMoney}}</span>
                    </div>
                    <div class="count">x {{item.goods_num}}</div>
                </div>
            </div>

            <!-- 退款原因 -->
            <div class="reason-wrap">
                <textarea placeholder="退款原因" v-model="refund_reason"></textarea>
            </div>

            <!-- 退款金额 -->
            <div class="refund-amount">
                <span class="label">退款金额</span>
                <span class="amount">{{total}} <span v-if="shippingPrice>0" class="shipp-sty">(含运费{{shippingPrice}})</span></span>
                
            </div>

            <!-- 按钮 -->
            <div class="refundBtn" @click="applyRefund()">提交申请</div>

        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'ReturnRequest',
    components: {
        TopHeader
    },

    data(){
        return{
            order_id:this.$route.query.order_id,//退款订单id
            refundData:'',
            totalNum:0,//总件数
            total:0,//总价，
            shippingPrice:0,
            refund_reason:''
        }
    },
    created(){
        this.$store.commit('showLoading')               //加载loading
    },
    mounted(){
        let url = 'Order/get_refund';
        this.$axios.post(url,{
            token:this.$store.getters.optuser.Authorization,
            order_id:this.order_id	
        }).then( (res) => {
            if(res.data.status === 200){
                this.refundData = res.data.data.goods
                this.total =res.data.data.order_amount
                this.shippingPrice =res.data.data.shipping_price
                this.totalNumber() //总件
                // this.totalPrice() //总金额
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
            this.$store.commit('hideLoading')
        })
    },

    methods:{
        /**
         * 总价
         */
        // totalPrice(index){
        //     for(var i = 0;i<this.refundData.length;i++){
        //         this.total += parseInt(this.refundData[i].goods_price * this.refundData[i].goods_num)
        //     }
        // },
        /**
         * 总件数
         */
        totalNumber(){
            for(var i = 0;i<this.refundData.length;i++){
                this.totalNum += parseInt(this.refundData[i].goods_num)
            }
        },
       
        /**
         * 退款
         */
        applyRefund(index,order_id){
            this.$dialog.confirm({
               message: '您确定要申请退款吗？'
            })
            .then(() => {
                // on confirm
                let url = 'Order/apply_refund';
                this.$axios.post(url,{
                    order_id:this.order_id,
                    refund_type:1,
                    refund_reason:this.refund_reason,
                    token:this.$store.getters.optuser.Authorization,
                }).then((res) => {
                    if(res.data.status === 200){
                        this.$toast(res.data.msg)
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
                    setTimeout( () => {
                        this.$router.push('/Order?type=0')
                    },2000)
                }) 
            }).catch(() => {
                // on cancel
            })
            
        },
    },
    filters: {
        //格式化金钱
        formatMoney:function(val){
            return "¥" + Number(val).toFixed(2)
        }
    }
 
}
</script>

<style lang="stylus" scoped>
.content
    padding 28px 24px
    box-sizing border-box
    .goods-item
        display flex
        background-color #ffffff
        box-shadow 0 0 8px #e6e6e6
        margin-bottom 20px
        padding 35px 40px
        box-sizing border-box
        .img-wrap
                width 160px
                height 160px
                text-align center
                margin-right 44px
                img 
                    max-width 100%
            .text
                flex 1
                h3
                    font-size 24px
                    line-height 34px
                    font-weight normal
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                    margin-bottom 15px
                    color #151515
                .good-sku
                    color #151515
                    font-size 24px
                    display flex
                    justify-content space-between
                    .sku-coll
                        font-size 22px
                .count
                    text-align right 
                    font-size 24px
    .reason-wrap
        width 100%
        min-height 360px
        background-color #f8f8f8
        margin-bottom 20px
        textarea
            width 100%
            min-height 360px
            font-size 26px
            color #151515
            border-radius 10px
            resize none
            padding 20px 
            box-sizing border-box
            &::-webkit-input-placeholder
                color #a4a4a4
                opacity 1
    .refund-amount
        height 80px
        font-size 30px
        color #151515
        background-color #ffffff
        display flex
        align-items center
        justify-content space-between
        padding 0 30px
        box-sizing border-box
        .amount
            color #f20c0c
            .shipp-sty
                font-size 24px
                color #888
    .refundBtn
        width 92%
        height 88px
        line-height 88px
        color #ffffff
        font-size 30px
        text-align center
        background-color #ff4d4d
        border-radius 40px
        position fixed
        left 50%
        bottom 68px
        margin-left -46%



</style>
