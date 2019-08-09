<template>
    <div class="Give">
        <!-- 头部组件 -->
        <TopHeader custom-title="赠送记录">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="tab-title">
                <span v-for="(item,index) in tabTitle"
                    :class="{active:index == nowIndex}"
                    @click="tabClick(index)"
                    :key="index">
                    {{item}}
                </span>
            </div>
            <div class="tab-container">
                <div class="thead">
                    <span>订单</span>
                    <span>日期</span>
                    <span>金额</span>
                </div>
                <div class="record-list">
                    <div class="record-item">
                        <div class="column">
                            <p>01234567890</p>
                            <p>下单消费</p>
                        </div>
                        <div class="column">2019-06-03</div>
                        <div class="column">￥-484.00</div>
                    </div>
                    <div class="record-item">
                        <div class="column">
                            <p>01234567890</p>
                            <p>下单消费</p>
                        </div>
                        <div class="column">2019-06-03</div>
                        <div class="column">￥-484.00</div>
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
            nowIndex:0,
            // tab切换标题
            tabTitle:['消费','赚取'],
            type:this.$route.query.type,
        }
    },
    methods:{
        /**
         * 切换标题
         */
        tabClick(index){
            this.nowIndex = index;
            this.$router.replace('/user/GiveRecord?type=' + index);
            this.type = this.$route.query.type;
            this.requestData();
        },

        /**
         * 请求数据
         */
        requestData(){
            let type = null;
            let typeArr = ['xf','zq'];
            typeArr.forEach((i,index) => {  
                if(this.$route.query.type == index){
                    type = i
                    console.log(type)
                    return
                }
            })

            // let type = null;
            // switch(this.$route.query.type){
            //     case '0':
            //         type = 'xf'
            //         break;
            //     case '1':
            //         type = 'zq'
            //         break;
            // }
            // console.log(type)

         

            // for(let (e, i) in types.entries()){
            //     if(Object.is(this.$route.query.type, i){type = e;break;})}

        }
    }
}
</script>

<style lang="stylus" scoped>
.content
    padding 0 24px
    box-sizing border-box
    .tab-title
        height 70px
        font-size 28px
        background-color #ffffff
        display flex
        align-items center
        justify-content space-around
        span 
            flex 1
            text-align center
            height 100%
            line-height 70px
            &.active
                color #ef1010
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
                text-align left 
                padding-left 20px
                box-sizing border-box
            .column:nth-child(2)
                width 40%
            .column:nth-child(3)
                width 30%
            &:nth-child(even)
                background-color #ffede7
        
            



</style>
