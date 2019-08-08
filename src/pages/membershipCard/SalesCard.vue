<template>
    <div class="sales-card-wrap">
        <!-- 头部组件 -->
        <CardHeader custom-title="我的会员卡">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <ul class="sales-card-inner">
                <router-link  :to="'/SalesDetails?id='+item.id" v-for="(item,index) in listData" class="sales-card-list" :key="index">
                    <p class="-list-icon">
                        <span>{{item.levelname}}</span>
                        <i class="iconfont icon-xiangyoujiantou"></i>
                    </p>
                    <p class="-list-icon2">{{item.cardnum}}张</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
// 公共头部
import CardHeader from "@/pages/common/header/TopHeader";
import Swiper from "swiper"
import "swiper/dist/css/swiper.css"
export default {
    name: "membershipCard",
    components: {
        CardHeader
    },
    data() {
        return {
            state: "",
            listData: [],
            levelId:'',
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){
        // this.$store.commit('showLoading')       //加载loading
        this.getData();
    },
    methods: {
        getData(){
            var _that=this
            _that.$axios.post('card/member_level_money',{
                'token':_that.token,
                'level_id':_that.levelId
            })
            .then((res)=>{
                var info = res.data
                if(info.status == 200){
                    _that.listData = info.data
                    _that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    _that.$store.commit('del_token'); //清除token
                    setTimeout(() => {
                        _that.$router.push('/Login')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
            })
        },
        buyCard(){
            this.$router.push({
                path: '/Pay/PayWay?level_id=' + this.levelId,
            })
        },
        swipeChange(index) {
            this.index = index;
        }
    },
  
};
</script>

<style lang="stylus" scoped>
    .sales-card-wrap
        width 100%
        height 100vh
        background #fff
        .sales-card-inner
            margin:24px
            // width:420px
            
            .sales-card-list
                height :150px
                display block
                padding:20px
                margin-bottom 20px
                background-image linear-gradient(-90deg, #ffcafb 0%, #f0b6ff 100%), linear-gradient(#ffcafb, #f0b6ff)
                border-radius: 20px
                font-size 26px
                font-weight 500
                &:nth-child(1)
                    color #956b93
                    background-image linear-gradient(-90deg, #f0b6ff 0%, #ffcafb 100%), linear-gradient(#f0b6ff,#ffcafb)
                &:nth-child(2)
                    color #b88766
                    background-image linear-gradient(-90deg, #fdb88e 0%, #ffdcc0 100%), linear-gradient(#fdb88e, #ffdcc0)
                &:nth-child(3)
                    color #6b848b
                    background-image linear-gradient(-90deg, #aadce3 0%, #e7f8ff 100%), linear-gradient(#aadce3,#e7f8ff)
                &:nth-child(4)
                    color #516c65
                    background-image linear-gradient(-90deg, #87e9d2 0%, #d6fef3 100%), linear-gradient(#87e9d2,#d6fef3)
                &:nth-child(5)
                    color #8a8ba8
                    background-image linear-gradient(-90deg, #c4c3fd 0%, #e4e3ff 100%), linear-gradient(#c4c3fd,#e4e3ff)
                &:nth-child(6)
                    color #a1957b
                    background-image linear-gradient(-90deg,#fdfac3 0%, #ffefd6 100%), linear-gradient(#fdfac3, #ffefd6) 
            .iconfont
                vertical-align middle
            .-list-icon
                font-size 28px 
            .-list-icon2
                font-weight 550
                font-size 30px
                text-align center
                color #515151
                line-height 100px

           
</style>


