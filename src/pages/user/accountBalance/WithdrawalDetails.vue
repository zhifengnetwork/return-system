<template>
    <div class="WithdrawalDetails">
        <!-- 头部组件 -->
        <TopHeader custom-title="提现明细">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="tab-container" v-if="withdrawalData.length > 0">
                <div class="thead">
                    <span>申请日期</span>
                    <span>金额</span>
                    <span>手续费</span>
                    <span>审核状态</span>
                </div>
                <div class="withdrawal-list">
                    <div class="item" v-for="(item,index) in withdrawalData" :key="index">
                        <div class="column">{{item.createtime | formatDate}}</div>
                        <div class="column">￥{{item.money}}</div>
                        <div class="column">￥{{item.taxfee}}</div>
                        <div class="column state" v-if="item.status === 1">审核中</div>
                        <div class="column state succeed" v-if="item.status === 2">审核成功</div>
                        <div class="column state fail" v-if="item.status === -1">审核失败</div>
                    </div>
                    <!-- <div class="item">
                        <div class="column">2019-06-03</div>
                        <div class="column">￥9155.00</div>
                        <div class="column">￥55.00</div>
                        <div class="column state">审核成功</div>
                    </div> -->
                </div>
            </div>
            <!-- 无数据 -->
            <div class="none" v-else>
                <img src="/static/images/public/none.png"/>
                <p>暂无相关数据</p>
            </div>
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'WithdrawalDetails',
    components: {
        TopHeader,
    },
    data(){
        return{
            withdrawalData:[],
        }
    },
    
    created(){
        this.$store.commit('showLoading');
        this.requestData();
    },

    methods:{
        /**
         * 请求数据
         */
        requestData(){
            let url = 'user/withdrawal_list';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            }).then((res) => {
                if(res.data.status == 200){                    
                    this.withdrawalData = res.data.data.list;
                }else{
                    this.$toast(res.data.msg)
                }
                this.$store.commit('hideLoading')
            }).catch((error) => {

            })

        }
    },

    filters: {
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
.WithdrawalDetails
    width 100%
    height 100%
    .content
        width 100%
        height 100%
        margin-top 20px
        padding 0 24px
        box-sizing border-box
        position relative
        .tab-container
            .thead  
                height 50px
                font-size 26px
                display flex
                align-items center
                justify-content space-between
                background-color #ffc9b4
                span 
                    text-align center
                    display block 
                span:nth-child(1)
                    width 25%
                span:nth-child(2)
                    width 25%
                span:nth-child(3)
                    width 25%
                span:nth-child(4)
                    width 25%
            .item
                width 100%
                height 70px
                display flex
                align-items center
                background-color #fff4f0
                .column
                    text-align center
                    font-size 20px
                .column:nth-child(1)
                    width 25%
                .column:nth-child(2)
                    width 25%
                .column:nth-child(3)
                    width 25%
                .column:nth-child(4)
                    width 25%
                &:nth-child(even)
                    background-color #ffede7
                & .state 
                    color #151515
                & .state.succeed
                    color #12eb22
                & .state.fail
                    color #f70a0a
        .none
            text-align center
            margin 150px auto
            img
                width 80px
            p
                margin 10px auto
                font-size 24px


</style>
