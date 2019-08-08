<template>
    <div class="ReturnGoods">
        <TopHeader custom-title="退货">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <!-- 内容 -->
        <div class="content">
            <div class="item-card" v-for="(item,index) in returnGoods" v-if="item.status == 7">
                <div class="card-head">
                    <span class="order-date">{{item.add_time}}</span>
                    <span class="order-state">退货成功</span>
                </div>
                <div class="goods-item">
                    <div class="img-wrap">
                        <router-link :to="'/Details?goods_id='+item.goods_id"><img :src="item.img" /></router-link>
                    </div>
                    <div class="text">
                        <router-link :to="'/Details?goods_id='+item.goods_id"><h3>{{item.goods_name}}</h3></router-link>
                        <div class="good-sku">
                            <span class="sku-coll">{{item.spec_key_name}}</span> 
                            <span class="price">{{item.goods_price}}</span>
                        </div>
                    </div>
                </div>
                <div class="total-bar">
                    <div class="total-count">共{{item.goods_num}}件商品 </div>
                    <div class="payment">
                        <span class="label">合计 : </span>
                        <span class="price">{{(item.goods_num * item.goods_price) | formatMoney}}</span>
                    </div>
                </div>
            </div>
            <!-- <div class="item-card">
                <div class="card-head">
                    <span class="order-date">2019-02-03 00:28:20</span>
                    <span class="order-state">退货成功</span>
                </div>
                <div class="goods-item">
                    <div class="img-wrap">
                        <img src="/static/images/order/00order-goods-img01.png" />
                    </div>
                    <div class="text">
                        <h3>Haoduoyi2018秋季新品女装 欧美宽松休闲套头卫衣欧美宽松休闲套头卫衣欧美宽松休闲套头卫衣</h3>
                        <div class="good-sku">
                            <span class="sku-coll">颜色:蓝色；尺寸:M码</span> 
                            <span class="price">￥368</span>
                        </div>
                    </div>
                </div>
                 <div class="total-bar">
                    <div class="total-count">共2件商品 </div>
                    <div class="payment">
                        <span class="label">合计 : </span>
                        <span class="price">￥736.00</span>
                    </div>
                </div>
            </div> -->

            <!-- 数据加载完提示 -->
            <div class="end-wrap" style="display:none">
                <p>我是有底线哦~~</p>
            </div>

            <!-- 无数据 -->
            <div class="none">
                <img src="/static/images/public/none.png"/>
                <p>您还没相关订单</p>
            </div>

        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'returnGoods',
    components: {
        TopHeader
    },
    data(){
        return{
            returnGoods:[],
            page:1,//页数
        }
    },
    mounted(){
        this.requestData();
    },
    methods:{
        requestData(){
            let url = 'Order/order_list';
            let type = 'tk';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                page:this.page,
                type:type
            }).then((res) => {
                if(res.data.status === 200){
                    this.returnGoods = res.data.data;
                }
                else if(res.data.status == 999){
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Login')
					},1000)
                }
                else{
                    this.$toast(res.data.msg)
                }
            })

        }
        
    },
    filters: {
        //格式化金钱
        formatMoney:function(val){
            return "¥" + Number(val).toFixed(2)
        }
    }
}
</script>

<style lang="stylus" scoped>
.content
    margin-top 30px
    .item-card
        width 702px
        height 300px
        background-color #ffffff
        border-radius 8px
        box-shadow 0 0 8px #e6e6e6
        margin 0 auto 15px
        .card-head
            height 55px
            border-bottom 2px solid #e6e6e6
            display flex
            align-items center
            justify-content space-between
            padding 0 36px
            box-sizing border-box
            .order-date
                font-size 22px
                color #151515
            .order-state
                font-size 24px
                color #f20c0c
        .goods-item
            display flex
            padding 17px 38px 0
            box-sizing border-box
            .img-wrap
                width 160px
                height 160px
                text-align center
                margin-right 40px
                img 
                    max-width 100%
            .text
                flex 1
                h3
                    font-size 28px
                    line-height 40px
                    color #151515
                    font-weight normal
                    margin-bottom 30px
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                .good-sku
                    color #151515
                    font-size 24px
                    display flex
                    justify-content space-between
                    .sku-coll
                        font-size 22px
        .total-bar
            height 40px
            color #6f6f6f
            display flex
            justify-content flex-end
            align-items center
            padding 0 38px
            box-sizing border-box
            .total-count
                line-height 40px
            .payment
                margin-left 20px
                font-size 30px
                line-height 40px
                .label
                    font-size 22px
                    position relative
                    top -2px
                .price
                    color #151515
                    font-size 30px
    .end-wrap
        font-size 18px
        color #888888
        text-align center
        margin 30px auto
    .none
        text-align center
        margin-top 50%
        font-size 28px
        img
            width 80px
        p
            margin 20px auto

</style>
