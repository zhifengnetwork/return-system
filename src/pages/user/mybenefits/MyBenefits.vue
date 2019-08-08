<template>
   <div class="myBenefits">
        <!-- 头部组件 -->
        <TopHeader custom-title="我的收益">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="revenue-list">
                <div class="card-item" v-for="(item,index) in list" :key="index">
                    <router-link :to="'/user/ProfitDetails?type='+item.type+'&name='+item.name">
                        <p class="title">{{item.name}}</p>
                        <p class="money">￥{{item.money}}</p>
                    </router-link>
                </div>    
            </div>
            
        </div>
   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'MyBenefits',
    components: {
		TopHeader,
    },
    data() {
        return {
            list:[],
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){
        this.$store.commit('showLoading')
        this.getData()
    },
    methods:{
        getData(){
           var url ='user/my_profit',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token
            })
            .then((res)=>{
                var info =res.data
                if(info.status==200){
                    that.list = info.data
                    that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
    },

}
</script>

<style lang="stylus" scoped>
.myBenefits
    .revenue-list
        margin-top 20px
        padding 0 24px
        box-sizing border-box
        display flex
        flex-wrap wrap
        .card-item
            width 49%
            height 340px
            color #ffffff
            font-size 30px
            border-radius 10px
            margin-right 2%
            margin-bottom 2%
            a   
                width 100%
                height 100%
                color #ffffff
                display block
                display flex
                flex-direction column
                justify-content center
                align-items center
            &:nth-child(1)
                background url("/static/images/user/revenue-bg-1.png") no-repeat
                background-size 100%
            &:nth-child(2)
                background url("/static/images/user/revenue-bg-2.png") no-repeat
                background-size 100%
            &:nth-child(3)
                background url("/static/images/user/revenue-bg-3.png") no-repeat
                background-size 100%
            &:nth-child(4)
                background url("/static/images/user/revenue-bg-4.png") no-repeat
                background-size 100%
            &:nth-child(2n)
                margin-right 0
            .title
                margin-bottom 15px
</style>
