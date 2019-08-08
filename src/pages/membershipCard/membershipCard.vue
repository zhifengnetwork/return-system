<template>
    <div class="CardWrap">
        <!-- 头部组件 -->
        <CardHeader custom-title="会员卡">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <div class="swipe_wrap">
                <div class="img_wrap">
                    <img class="img_01" :src="swipeData.title_img" />
                    <img class="img_02" :src="swipeData.title_img1" />
                </div>
                <div class="banner">
                    <img class="img_03" :src="swipeData.patch_img" />
                </div>
            </div>
            <div class="price_wrap">
                <div class="price">
                    <span>会员卡:</span>
                    <span>￥{{swipeData.card_one_money}}</span>
                    <del>原价￥{{swipeData.card_original_price}}</del>
                </div>
                <div class="buy">购买数量：{{swipeData.cardnum}}</div>
                <div class="num">总计：￥{{swipeData.cardmoney}}</div>
                <div class="btn" @click="buyCard()">立即购买</div>
            </div>
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
            swipeData: [],
            levelId:'',
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){
        this.$store.commit('showLoading')       //加载loading
        this.levelId = new Number(this.$route.query.id) //接收传过来级别id
        this.getData();
    },
    methods: {
        getData(){
            var _that=this
            _that.$axios.post('card/card_edit',{
                'token':_that.token,
                'level_id':_that.levelId
            })
            .then((res)=>{
                var info = res.data
                if(info.status == 200){
                    _that.swipeData = info.data
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
                path: '/Pay/PayWay?level_id=' + this.levelId+'&isCard=1',
            })
        },
        swipeChange(index) {
            this.index = index;
        }
    },
  
};
</script>

<style lang="stylus" scoped>
    .CardWrap
        width 100%
        height 100vh
        background #fff
        overflow hidden
        .content
            .swipe_wrap
                padding 86px 0 58px
                width 100%
                background url('/static/images/membershipCard/vip_bj.png') no-repeat
                background-size 100% 100%
                .van-swipe-item
                    padding-left 15px
                    padding-right 15px
                    box-sizing border-box
            .swipe_wrap /deep/ .van-swipe__indicators 
                display none
            .-thumbs-list-
                width: 100% !important;
            .gallery-list
                width:80% !important;
            img 
                margin 0 auto
                display block
                max-width 100%
            .img_01
                width 325px
                height 35px
            .img_02 
                padding 29px 0 81px
                width 470px
                height 35px
            .banner
                position relative
                width 100%
                img 
                    max-width: 93%
                .state 
                    position absolute
                    top 0
                    left 0
                    width 98px
                    height 44px
                    background #ff9f2e
                    border-radius 4px
                    font-size 26px
                    color #fff
                    text-align center
                    line-height 44px
                .state_not 
                    position absolute
                    top 0
                    left 0
                    width 98px
                    height 44px
                    background #b9c4c5
                    border-radius 4px
                    font-size 26px
                    color #fff
                    text-align center
                    line-height 44px
            .price_wrap 
                padding 51px 21px
                .price 
                    line-height 75px
                    span 
                        &:nth-child(1) 
                            margin-right 41px
                            font-size 30px
                            font-weight 600
                            color #151515
                        &:nth-child(2) 
                            margin-right 36px
                            font-size 36px
                            font-weight 600
                            color #f60808
                    del 
                        font-size 26px
                        color #8d8c8c
                .buy 
                    font-size 30px
                    color #151515
                    font-weight 550
                    line-height 65px
                .num 
                    margin 85px 0 0
                    font-size 36px
                    color #151515
                    font-weight 550
                    text-align center
                    line-height 75px
                .btn 
                    position fixed
                    bottom 50px
                    left 22px
                    width 706px
                    height 88px
                    background-image linear-gradient(-90deg, #ffbf5b 0%, #ffe184 100%), linear-gradient(#ffc9a6, #ffc9a6)
                    background-blend-mode normal, normal
                    box-shadow -1px 1px 7px 0px #a7a7a7
                    border-radius 44px
                    font-size 30px
                    color #151515
                    font-weight 600
                    text-align center
                    line-height 88px
                    letter-spacing 5px
           
</style>


