<template>
   <div class="CashCoupon">
        <!-- 头部组件 -->
        <TopHeader custom-title="代金券">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="coupon-list">
                <div class="single-item" v-for="(item,index) in couponList" :key="index" v-show="item.is_use == 0">
                    <div class="coupon-amount">{{item.price | formatPrice}}<span class="unit">元</span></div>
                    <div class="coupon-info">
                        <p class="coupon-name">代金劵</p>
                        <p class="validity-date">永久有效</p>
                        <p class="get-date">{{item.add_time | formatDate}} 获得</p>
                    </div>
                </div>
                <!-- <div class="single-item">
                    <div class="coupon-amount">5<span class="unit">元</span></div>
                    <div class="coupon-info">
                        <p class="coupon-name">代金劵</p>
                        <p class="validity-date">永久有效</p>
                        <p class="get-date">2019-05-06 获得</p>
                    </div>
                </div> -->
            </div>
            <div class="none" v-show="couponList<1">
                <img src="/static/images/public/none.png"/>
                <p>暂无代金券</p>
            </div>
        </div>

   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'CashCoupon',
    components: {
		TopHeader,
    },
    data(){
        return{
            couponList:[],
            isShow:false
        }
    },
    created(){
        this.reqCashCoupon();
    },
    methods:{
        reqCashCoupon(){
            let url = 'coupon/get_list';
            this.$axios.post(url,{
                token: this.$store.getters.optuser.Authorization
            })
            .then((res) => {
                if(res.data.status == 200){
                    this.couponList = res.data.data
                    console.log(this.couponList)
                }
            })
        }
    },
    filters: {
        //格式化金钱
        formatPrice:function(val){
            return parseFloat(val)
        },
        // 日期格式化
        formatDate: function (time) {
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

            return y + '-' + MM + '-' + d ;
        }
    }

}
</script>

<style lang="stylus" scoped>
.CashCoupon
    .content
        padding 0 24px
        box-sizing border-box
        .single-item
            width 588px
            height 201px
            margin 30px auto 0
            background url("/static/images/user/coupon-bg.png") no-repeat
            background-size 100%
            display flex
            align-items center
            .coupon-amount
                width 40%
                font-size 146px
                text-align center
                color #edab47
                .unit
                    font-size 36px
            .coupon-info
                width 60%
                text-align center
                color #151515
                .coupon-name
                    font-size 36px
                .validity-date
                    font-size 24px
                    line-height 40px
                .get-date
                    font-size 24px
        .none
            text-align center
            margin-top 35%
            font-size 28px
            img
                width 80px
            p
                margin 20px auto



</style>
