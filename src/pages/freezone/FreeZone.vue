<template>
   <div class="FreeZone">
        <!-- 头部组件 -->
        <TopHeader custom-title="会员免费领取专区">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="free-zone-list">
                <div class="single-item" v-for="(item,index) in freeList" :key="index">
                    <div class="img-wrap">
                        <router-link :to="'/Details?goods_id='+item.goods_id">       
                            <img :src="item.img" /> 
                        </router-link>
                    </div>
                    <div class="main">
                        <router-link :to="'/Details?goods_id='+item.goods_id">    
                            <h3 class="title">{{item.goods_name}} </h3>
                        </router-link>
                        <div class="row-line">
                            <div class="price">
                                <p class="discount-price">{{item.price}}</p>
                                <p class="original-price"><del>原价:{{item.original_price}}</del></p>
                            </div>
                            <!-- <div class="add-cart"></div> -->
                        </div>
                    </div>
                </div>
                <!-- <div class="single-item">
                    <div class="img-wrap">
                        <img src="/static/images/home/hot-img02.png" />
                    </div>
                    <div class="main">
                        <h3 class="title">韩后化妆品 面膏韩后化妆品 面膏 </h3>
                        <div class="row-line">
                            <div class="price">
                                <p class="discount-price">￥1569.00</p>
                                <p class="original-price"><del>原价:￥2500.00</del></p>
                            </div>
                            <div class="add-cart"></div>
                        </div>
                    </div>
                </div> -->
          
            </div>
            
        </div>
   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'FreeZone',
    components: {
		TopHeader,
    },
    data(){
        return{
            page:1,
            freeList:[]
        }
    },
    created(){
        this.reqData();
    },
    methods:{
        /**
		* 请求数据
        */
        reqData(){
            let url = 'Goods/goods_free';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                page:this.page
            })
            .then((res) => {
                if(res.data.status === 200){
                    this.freeList = res.data.data.list
                    console.log(res.data.data.list)
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.FreeZone
    .content
        margin-top 20px
        padding 0 24px
        box-sizing border-box
        .free-zone-list
            display flex
            flex-wrap wrap
            .single-item
                width 49%
                height 476px
                background-color #fff
                border-radius 8px
                overflow hidden
                margin 0 2% 22px 0
                padding 10px
                box-sizing border-box
                &:nth-child(2n)
                    margin-right 0
                .img-wrap
                    width 320px
                    height 320px
                    border-radius 10px
                    overflow hidden
                    a
                        width 100%
                        height 100%
                        display block
                        img 
                            max-width 100%
                            max-height 100%
                            display block
                            margin 0 auto
                            border-radius 10px
                .main
                    .title
                        width 100%
                        font-size 22px
                        color #151515
                        overflow hidden    
                        text-overflow ellipsis    
                        white-space nowrap
                        margin 15px 0
                    .row-line
                        display flex
                        align-items center
                        justify-content space-between
                        .price
                            .discount-price
                                font-size 30px
                                color #ed0d0d
                            .original-price
                                font-size 24px
                                color #a1a1a1
                        .add-cart
                            width 50px
                            height 50px
                            background url(/static/images/home/add-cart.png) no-repeat
                            background-size 100%
</style>
