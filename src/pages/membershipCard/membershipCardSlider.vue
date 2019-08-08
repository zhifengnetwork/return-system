<template>
    <div class="CardWrap">
        <!-- 头部组件 -->
        <CardHeader custom-title="会员卡">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <div class="swipe_wrap">
                <div class="img_wrap">
                    <img class="img_01" :src="imGinfo.img_01" />
                    <img class="img_02" :src="imGinfo.img_02" />
                </div>
                <div class="banner">
                    <img class="img_03" :src="item.img_03" />
                    <div class="state" v-if="item.state === 1">当前</div>
                    <div class="state_not" v-if="item.state === 0">未解锁</div>
                </div>
                <!-- <van-swipe :loop="false" :initial-swipe="index" :width="300"  @change="swipeChange" :style="{width:'95%',marginLeft:'2%'}">
                    <van-swipe-item v-for="(item,index) in swipeData" :key="index" >
                        
                    </van-swipe-item>
                </van-swipe> -->
            </div>
            <div class="price_wrap">
                <div class="price">
                    <span>会员卡:</span>
                    <span>￥{{info.price}}</span>
                    <del>原价￥{{info.initPrice}}</del>
                </div>
                <div class="buy">购买数量：{{info.num}}</div>
                <div class="num">总计：￥{{sumPrice}}</div>
                <div class="btn">立即购买</div>
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
    data() {
        return {
            state: "",
            imgData:[
                {
                    img_01: "/static/images/membershipCard/p_vip01.png",
                    img_02: "/static/images/membershipCard/p_vip02.png"
                },
                {
                    img_01: "/static/images/membershipCard/vip_001.png",
                    img_02: "/static/images/membershipCard/VIP_01.png"
                },
                {
                    img_01: "/static/images/membershipCard/vip_002.png",
                    img_02: "/static/images/membershipCard/vip_02.png"
                },
                {
                    img_01: "/static/images/membershipCard/vip_003.png",
                    img_02: "/static/images/membershipCard/vip_03.png"
                },
                {
                    img_01: "/static/images/membershipCard/vip_004.png",
                    img_02: "/static/images/membershipCard/vip_04.png"
                },
                {
                    img_01: "/static/images/membershipCard/vip_005.png",
                    img_02: "/static/images/membershipCard/vip_05.png"
                }
            ],
            swipeData: [
                {
                    img_01: "/static/images/membershipCard/p_vip01.png",
                    img_02: "/static/images/membershipCard/p_vip02.png",
                    img_03: "/static/images/membershipCard/vip.png",
                    state: 1
                },
                {
                    img_01: "/static/images/membershipCard/vip_001.png",
                    img_02: "/static/images/membershipCard/VIP_01.png",
                    img_03: "/static/images/membershipCard/vip_1.png",
                    state: 0
                },
                {
                    img_01: "/static/images/membershipCard/vip_002.png",
                    img_02: "/static/images/membershipCard/vip_02.png",
                    img_03: "/static/images/membershipCard/vip_2.png",
                    state: 0
                },
                {
                    img_01: "/static/images/membershipCard/vip_003.png",
                    img_02: "/static/images/membershipCard/vip_03.png",
                    img_03: "/static/images/membershipCard/vip_3.png",
                    state: 0
                },
                {
                    img_01: "/static/images/membershipCard/vip_004.png",
                    img_02: "/static/images/membershipCard/vip_04.png",
                    img_03: "/static/images/membershipCard/vip_4.png",
                    state: 0
                },
                {
                    img_01: "/static/images/membershipCard/vip_005.png",
                    img_02: "/static/images/membershipCard/vip_05.png",
                    img_03: "/static/images/membershipCard/vip_5.png",
                    state: 0
                }
            ],
            infoArray: [
                {
                    price: 98,
                    num: 1,
                    initPrice: 98
                },
                {
                    price: 64,
                    num: 5,
                    initPrice: 98
                },

                {
                    price: 49,
                    num: 50,
                    initPrice: 98
                },
                {
                    price: 37,
                    num: 200,
                    initPrice: 98
                },
                {
                    price: 29,
                    num: 500,
                    initPrice: 98
                },
                {
                    price: 20,
                    num: 4000,
                    initPrice: 98
                }
            ],
            index: 3,
            token:this.$store.getters.optuser.Authorization
        };
    },

    computed: {
        info() {
            return this.infoArray[this.index];
        },
        imGinfo() {
            return this.imgData[this.index];
        },
        sumPrice() {
            return this.info.price * this.info.num;
        }
    },
    created(){
        this.$store.commit('showLoading')               //加载loading
        this.index=new Number(this.$route.query.index)
        console.log(this.$route.query.index)

        this.getData()
    },
    mounted() {
    // this.NotData()
    },
    methods: {
        getData(){
            var _that=this
            _that.$axios.post('user/card_edit',{
                'token':this.token
            })
            .then((res)=>{
                var info =res.data.data
                console.log(info)
                if(info.status == 200){
                    // this.prize_list =info
                    this.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
                this.$store.commit('hideLoading')
            })

        },

    // NotData() {
    //     var url = "user/announce_list"
    //     this.$axios.post(url,{
    //         token:this.$store.getters.optuser.Authorization
    //     })
    //     .then((res)=>{
    //         var that = this
    //         if(res.data.status === 200){
    //             that.NotList = res.data.data.list;
    //         }else{
    //             that.$toast(res.msg)
    //         }
    //     })
    // },
        swipeChange(index) {
            this.index = index;
        }
    },
    components: {
        CardHeader
    }
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


