<template>
    <div class="BillDetails">
        <!-- 头部组件 -->
        <TopHeader custom-title="账单明细">
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
                    <span>描述</span>
                </div>
                <div class="record-list" v-if="billData.length > 0">
                    <div class="record-item" v-for="(item,index) in billData" :key="index">
                        <div class="column">
                            {{item.source_id}}
                            <!-- <p>{{item.source_id}}</p>
                            <p>{{item.note}}</p> -->
                        </div>
                        <div class="column">{{item.create_time}}</div>
                        <div class="column">{{item.balance}}</div>
                        <div class="column">{{item.note}}</div>
                    </div>
                    <!-- <div class="record-item">
                        <div class="column">
                            <p>01234567890</p>
                            <p>下单消费</p>
                        </div>
                        <div class="column">2019-06-03</div>
                        <div class="column">￥-484.00</div>
                    </div> -->
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
    name:'BillDetails',
    components: {
        TopHeader,
    },
    data(){
        return{
            nowIndex:0,
            tabTitle:['消费','赚取'], // tab切换标题
            type:this.$route.query.type,
            ispage:true, //是否请求数据
            billData:[]
        }
    },
    created(){
        this.$store.commit('showLoading');
        this.reqBillData();
    },
    methods:{
        /**
         * 切换标题
         */
        tabClick(index){
            if(index != this.$route.query.type){
                this.nowIndex = index;
                this.$router.replace('/user/BillDetails?type=' + index);
                this.type = this.$route.query.type;
                this.ispage = true
                this.reqBillData();
            }else{
                return false
            }
            
        },

        /**
         * 请求数据
         */
        reqBillData(){
            let typeIndex = ''; //定义类型索引
            let typeArr = ['xf','zq']; //定义类型
            typeArr.forEach((i,index) => {  
                if(this.$route.query.type == index){
                    typeIndex = index
                }
            })
     
            if(this.ispage){
                let url = 'user/remainder_list';
                this.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization,
                    log_type:typeIndex,
                }).then( (res)=>{
                    if(res.data.status == 200){
                        this.billData = res.data.data.list
                    }else{
                        this.$toast(res.data.msg)
                    }
                    this.$store.commit('hideLoading')
                })
                .catch((error) => {
                    alert('请求错误:'+ error)
                })
            }
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
                width 20%
            span:nth-child(3)
                width 20%
            span:nth-child(4)
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
                width 20%
            .column:nth-child(3)
                width 20%
            .column:nth-child(4)
                width 30%
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
