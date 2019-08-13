<template>
    <div class="Give">
        <!-- 头部组件 -->
        <TopHeader custom-title="赠送记录">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="details-container">
                <div class="thead">
                    <span>赠送日期</span>
                    <span>收款ID/手机号</span>
                    <span>金额</span>
                </div>
                <div class="record-list">
                    <div class="record-item">
                        <div class="column">2019-06-03</div>
                        <div class="column">28015/17875592633</div>
                        <div class="column">￥484.00</div>
                    </div>
                     <div class="record-item">
                        <div class="column">2019-06-03</div>
                        <div class="column">28015/17875592633</div>
                        <div class="column">￥484.00</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'GiveRecord',
    components: {
        TopHeader,
    },
    data(){
        return{
           
        }
    },
    created(){
        this.requestData();
    },
    methods:{
        /**
         * 请求数据
         */
        requestData(){
            
        }
    }
}
</script>

<style lang="stylus" scoped>
.content
    padding 0 24px
    box-sizing border-box
    .details-container
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
                width 30%
            span:nth-child(2)
                width 40%
            span:nth-child(3)
                width 30%
        .record-item
            width 100%
            height 70px
            display flex
            align-items center
            background-color #fff4f0
            .column
                text-align center
                font-size 20px
            .column:nth-child(1)
                width 30%
            .column:nth-child(2)
                width 40%
            .column:nth-child(3)
                width 30%
            &:nth-child(even)
                background-color #ffede7

</style>
