<template>
    <div class="CommissionList">
        <!-- 头部组件 -->
        <TopHeader custom-title="佣金列表">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="tab-container">
                <div class="thead">
                    <span>订单号</span>
                    <span>金额</span>
                    <span>描述</span>
                </div>
                <div class="commission-list" v-if="commissionList.length > 0">
                    <div class="commission-item" v-for="(item,index) in commissionList">
                        <div class="column">{{item.item.order_sn}}</div>
                        <div class="column">{{item.money}}</div>
                        <div class="column">{{item.desc}}</div>
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
    name:'CommissionList',
    components: {
        TopHeader,
    },
    data(){
        return{
            page:1,
            commissionList:[]
        }
    },
    created(){
        this.$store.commit('showLoading');
        this.reqCommissionList();
    },
    methods:{
        /**
         * 请求佣金明细数据
         */
        reqCommissionList(){
            let url = 'user/distribut_list';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                page:this.page 
            }).then((res) => {
                if(res.data.status == 200){
                    this.commissionList = res.data.data
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
        .commission-item
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
