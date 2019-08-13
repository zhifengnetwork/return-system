<template>
    <div class="ViewOrders">
        <!-- 头部组件 -->
        <TopHeader custom-title="查看订单">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="tab-container">
                <div class="thead">
                    <span>下单时间</span>
                    <span>订单号</span>
                    <span>金额</span>
                </div>
                <div class="order-list" v-if="orderList.length > 0">
                    <div class="order-item" v-for="(item,index) in orderList">
                        <div class="column">{{item.pay_time | formatDate}}</div>
                        <div class="column">{{item.order_sn}}</div>
                        <div class="column">{{item.order_amount | formatMoney}}</div>
                    </div>
                </div>

                <!-- 无数据 -->
                <div class="none" v-else>
                    <img src="/static/images/public/none.png"/>
                    <p>暂无相关数据</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'ViewOrders',
    components: {
        TopHeader,
    },
    data(){
        return{
           orderList:[]
        }
    },
    created(){
        this.$store.commit('showLoading');
        this.reqOrderList();
    },
    methods:{
        /**
         * 请求订单数据
         */
        reqOrderList(){
            let url = 'user/user_order';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                user_ids:this.$route.query.user_ids   
            }).then((res) => {
                if(res.data.status == 200){
                    this.orderList = res.data.data
                }else{
                    this.$toast(res.data.msg)
                }
                this.$store.commit('hideLoading')
            })
        } 
    },
    filters: {
        //格式化金钱
        formatMoney:function(val){
            return "¥" + Number(val).toFixed(2)
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
.content
    padding 0 24px
    box-sizing border-box
    .tab-container
        .thead  
            height 50px
            font-size 26px
            display flex
            align-items center
            justify-content space-between
            background-color #ffc9b4
            span
                flex 1 
                text-align center
                display block 
        .order-item
            width 100%
            height 70px
            display flex
            align-items center
            background-color #fff4f0
            .column
                flex 1
                text-align center
                font-size 22px
            &:nth-child(even)
                background-color #ffede7
        .none
            text-align center
            margin 150px auto
            img
                width 80px
            p
                margin 10px auto
                font-size 24px

</style>
