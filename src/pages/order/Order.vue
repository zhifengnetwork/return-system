<template>
    <div class="Order">
        <TopHeader custom-title="我的订单">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="tab-wrap">
            <!-- tab切换标题 -->
            <div class="tab-tit">
                <ul>
                    <li v-for="(item,index) in tabList"
                        :class="{active:index == nowIndex}"
                        
                        @click="handleClick(index)"
                        :key="index">
                        {{item.tabTitle}}
                    </li>
                </ul>
            </div>

            <div class="tab-con">
                <div v-if="nowIndex < 5">
                    <div class="item-card" v-for="(item,index) in allOrders" :key="index">
                        <div class="card-head">
                            <span class="order-date">{{item.order_sn}}</span>
                            <span class="order-state" v-if="item.status===1">待付款</span>
                            <span class="order-state" v-if="item.status===2">待发货</span>
                            <span class="order-state" v-if="item.status===3">待收货</span>
                            <span class="order-state" v-if="item.status===4 && item.comment == 0">交易成功</span>
                            <span class="order-state" v-if="item.status===5">已取消</span>
                            <!-- <span class="order-state" v-if="item.status===6">待退款</span> -->
                            <!-- <span class="order-state" v-if="item.status===7">已退款</span> -->
                            <!-- <span class="order-state" v-if="item.status===8">拒绝退款</span> -->
                            <span class="order-state" v-if="item.status===4 && item.comment == 1">已评价</span>
                        </div>
                        <router-link :to="'/Order/OrderDetails?order_id=' + item.order_id">
                            <div class="goods-item">
                                <div class="-item-list" v-for="(item,key) in item.goods" :key="key">
                                    <div class="img-wrap">
                                        <img :src="item.img" />
                                    </div>
                                    <div class="text">
                                        <h3>{{item.goods_name}}</h3>
                                        <div class="good-sku">
                                            <span class="sku-coll">{{item.spec_key_name}}</span>
                                            <span class="price">
                                                <p class="tr">{{item.goods_price | formatMoney}}</p>
                                                <p class="tr color-8"> x {{item.goods_num}}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </router-link>
        
                        <div class="total-bar">
                            <div class="total-count">共{{item.goods_num}}件商品 </div>
                            <div class="payment">
                                <span class="label">合计 : </span>
                                <span class="price">{{item.order_amount | formatMoney}}</span>
                                <span class="-price" v-if="item.shipping_price > 0">(含运费{{item.shipping_price}})</span>
                            </div>
                        </div>
                        <div class="order-btn">
                            <!-- 待付款 -->
                            <div v-if="item.status == 1">
                                <span class="btn" @click="cancelOrder(index,item.order_id,item.status)">取消订单</span>
                                <span class="btn red" @click="payment(item.order_id,item.pay_type)">去付款</span>
                            </div>
                            <!-- 待发货 -->
                            <!-- <div v-if="item.status == 2">
                                <router-link v-if="item.is_refund==1" :to="'/Order/ReturnRequest?order_id='+item.order_id"><span class="btn red">退款</span></router-link>
                            </div> -->
                            <!-- 待收货 -->
                            <div v-if="item.status == 3">
                                <span class="btn"><router-link class="color-8" :to="'/order/LogisticsDetail?order_id='+item.order_id">查看物流</router-link></span>
                                <span class="btn red" @click="confirmReceipt(index,item.order_id,item.status)">确定收货</span>
                            </div>
                            <!-- 交易成功 -->
                            <div v-if="item.status == 4">
                                <!-- <span class="btn">查看物流</span> -->
                                <span class="btn"><router-link class="color-8" :to="'/order/LogisticsDetail?order_id='+item.order_id">查看物流</router-link></span>
                                <span class="btn red" v-if="item.comment == 0"><router-link :to="'/Order/Evaluate?order_id='+item.order_id+'&sku_id='+item.goods[0].sku_id+'&goods_id='+item.goods[0].goods_id">去评价</router-link></span>
                                <!-- <span class="btn red" v-else><router-link :to="'/Order/Evaluate?order_id='+item.order_id">订单已完成</router-link></span> -->
                                <span class="btn red" v-else @click="delOrder(index,item.order_id,item.status)">删除订单</span>
                            </div>
                            <!-- 已取消 -->
                            <div v-if="item.status == 5">
                                <span class="btn" @click="delOrder(index,item.order_id,item.status)">删除订单</span>
                                <span class="btn red"><router-link :to="'/Details?goods_id='+item.goods[0].goods_id">重新购买</router-link></span>
                            </div>
                            <!-- 待退款 -->
                            <!-- <div v-if="item.status == 6">
                                <span class="btn red" @click="cancelRefund(index,item.order_id,item.status)">取消退款</span>
                            </div> -->
                            <!-- 已退款 -->
                            <!-- <div v-if="item.status == 7">
                                <span class="btn red" @click="delOrder(index,item.order_id,item.status)">删除订单</span>
                            </div> -->
                            <!-- 拒绝退款 -->
                            <!-- <div v-if="item.status == 8">
                                <router-link :to="'/Order/ReturnRequest?order_id='+item.order_id"><span class="btn red">重新申请</span></router-link>
                            </div> -->
                        </div>
                    </div>
                </div>

                <!-- <div v-else class="fifty_wrap"  v-for="(item,index) in allOrders" :key="index">
                    <div class="time">
                        <span class="date">{{item.order_sn}}</span>
                    </div>
                    <div class="nick_wrap">
                        <div class="img_wrap">
                            <img :src="item.img"/>
                        </div>
                        <div class="nickname">
                            <p>{{item.shop_name}}</p>
                            <p>ID:{{item.shop_user_id}}</p>
                        </div>
                    </div>
                    <div class="num-bar">
                        <div class="count">{{item.shop_name}}</div>
                        <div class="total_wrap">
                            <div class="total-count">共{{item.shop_num}}个商家</div>
                            <div class="payment">
                                <span class="label">合计 : </span>
                                <span class="price" style="color:#151515;font-size:.4rem;">¥{{item.goods_price}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="viewBtn"> <router-link :to="'/order/fiftyDetails?goods_id='+item.goods_id+'&add_time='+item.add_time">查看详情</router-link></div>
                </div> -->
                <!-- <ul>
                    <li v-show="nowIndex === 1">
                        <div class="item-card">
                            <div class="card-head">
                                <span class="order-date">2019-02-03 00:28:20</span>
                                <span class="order-state">待付款</span>
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
                            <div class="order-btn">
                                <span class="btn">取消订单</span>
                                <span class="btn red">去付款</span>
                            </div>
                        </div>
                        <div class="item-card">
                            <div class="card-head">
                                <span class="order-date">2019-02-03 00:28:20</span>
                                <span class="order-state">待付款</span>
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
                            <div class="order-btn">
                                <span class="btn">取消订单</span>
                                <span class="btn red">去付款</span>
                            </div>
                        </div>
                    </li>
                </ul> -->

                 <!-- 数据加载完提示 -->
                <div class="end-wrap" v-show="isBotom">
                    <p>我是有底线哦~~</p>
                </div>

                <!-- 无数据 -->
                <div class="none" v-show="allOrders.length == 0">
                    <img src="/static/images/public/none.png"/>
                    <p>您还没相关的订单</p>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'Order',
    components: {
        TopHeader
    },
    data(){
        return{
            nowIndex:0,
            type:this.$route.query.type,
            // tab切换标题
            tabList:[
                {
                    tabTitle:"全部"
                },
                {
                    tabTitle:"待付款"
                },
                {
                    tabTitle:"待发货"
                },
                {
                    tabTitle:"待收货"
                },
                {
                    tabTitle:"待评价"
                }
                // ,
                // {
                //     tabTitle:"50元专区"
                // }
            ],
            baseUrl:'',// 商品图片路径
            allOrders:[],//全部订单
            page:1,//页数
            ispage:true,//是否请求数据
            isBotom:false,
            order_id:'',
            pay_type:'',//支付方式
            token:this.$store.getters.optuser.Authorization,
        }
    },
    created(){
        this.$store.commit('showLoading')               //加载loading
    },
    // 模板渲染完成后执行
    mounted(){
        this.nowIndex = this.$route.query.type;
        this.requestData();
        window.addEventListener('scroll', this.scrollBottom);
    },
    methods:{
        // tab切换标题
        handleClick(index){
            this.nowIndex = index;
            this.$router.replace('/Order?type='+index);
            this.type = this.$route.query.type;
            this.page = 1;
            this.ispage=true
            this.requestData();
        },
        scrollBottom(){
            let _this = this;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if(scrollTop + windowHeight == scrollHeight){
                this.page ++;
                _this.requestData();
            }
        },
        // 页面数据渲染
        requestData(){
            // this.isBotom =false
            let type = null;
            switch(this.$route.query.type){
                case '0':
                    type = 'all'
                    break;
                case '1':
                    type = 'dfk'
                    break;
                case '2':
                    type = 'dfh'
                    break;
                case '3':
                    type = 'dsh'
                    break;
                case '4':
                    type = 'dpj'
                    break;
                // case '5':
                //     type = 'fifty'
                //     break;
            }
            if(this.ispage){
                var url = 'order/order_list';
                this.$axios.post(url,{
                    token:this.token,
                    type:type,
                    page:this.page
                })
                .then( (res)=>{
                    if(res.data.status == 200){
                        if(this.page == 1){ 
                           this.allOrders = res.data.data  
                           this.isBotom =false                         
                        }else{
                            if(res.data.data.length > 0){
                               //如果有数据,拼接数组
                                this.allOrders = this.allOrders.concat(res.data.data); 
                            }else{
                                this.ispage = false
                                this.isBotom =true
                                this.page =1
                            }
                        }                        
                    }else if(res.data.status == 999){
                        this.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }else{
                        this.$toast(res.data.msg)
                    }
                    this.$store.commit('hideLoading')
                })
                .catch((error) => {
                    alert('请求错误:'+ error)
                })
            }
        },
        
        /**
         * 封装修改状态方法
         */
        editStatus(index,order_id,status,items,tips){
            let url = 'Order/edit_status';
            this.$dialog.confirm({
               message: tips
            })
            .then(() => {
                // on confirm
                this.$axios.post(url,{
                    token:this.token,
                    order_id:order_id,
                    status:status
                }).then( (res) => {
                    if(res.data.status === 200){
                        items.splice(index,1)
                        this.$toast(res.data.msg)
                    }
                    else if(res.data.status == 999){
                        this.$toast(res.data.msg)
                        this.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }
                    else{
                        this.$toast(res.data.msg)
                    }
                })
                .catch((error) => {
                    console.log('请求错误:'+ error)
                })
            }).catch(() => {
                // on cancel
               
            })
        },
        /**
         * 取消订单 
         */
        cancelOrder(index,order_id,status){
            var tips = '您确定要取消订单吗？';
            this.editStatus(index,order_id,status,this.allOrders,tips);    
        },
        /**
         * 删除订单
         */
        delOrder(index,order_id,status){
            var tips = '您确定要删除订单吗？'
            this.editStatus(index,order_id,status,this.allOrders,tips) 
        },
        /**
         * 立即付款
         */
        payment(order_id,type){
            this.$router.push('/pay/PayWay?order_id='+order_id+'&pay_type='+type);
        },
        /**
         * 取消申请退款
         */
        cancelRefund(index,order_id){
            this.$dialog.confirm({
               message: '您确定要取消申请退款吗？'
            })
            .then( () => {
                let url = 'Order/cancel_refund';
                this.$axios.post(url,{
                    order_id:order_id,
                    token:this.$store.getters.optuser.Authorization                    
                }).then( (res) => {
                    if(res.data.status === 200){
                        this.allOrders.splice(index,1);  
                        this.$toast("取消申请退款成功！");
                    }
                    else if(res.data.status == 999){
                        this.$toast(res.data.msg)
                        this.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }
                    else{
                        this.$toast(res.data.msg);
                    }
                })
            }).catch(() => {
                // on cancel
            })

        },
    
        /**
         * 确认收货
         */
        confirmReceipt(index,order_id,status){
            var tips = '您要确认收货吗？'
            this.editStatus(index,order_id,status,this.allOrders,tips) 
        },
        /**
         * 评价订单
         */ 
        evaluateOrder(item){
            if(item.comment === 1){
                this.$toast("你已评价过此商品")
            }else{
                this.$router.push('/Order/Evaluate?order_id='+ item.order_id);
            }
        },

        /**
         * 路由跳转
         */
        jumpTo(path,name,id){
			// 商品路由跳转
			if(path && name && id){
				this.$router.push(path+'?'+ name +'=' + id);
				return false;
			}
			// 跳转指定路由
			if(path && !name && !id){
				this.$router.push(path);
				return false;
			}
			//后退
			else{
				this.$router.go(-1)
			}
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

            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },
        //格式化金钱
        formatMoney:function(val){
            return "¥" + Number(val).toFixed(2)
        }
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.scrollBottom);
    },
   

}
</script>

<style lang="stylus" scoped>
.Order
    .tab-wrap
        .tr
            text-align: right
        .color-8
            color:#888
        .tab-tit
            border-top 1px solid #e6e6e6
            ul
                height 70px
                line-height 70px
                font-size 30px
                background-color #ffffff
                display flex
                align-items center
                justify-content space-between
                padding 0 24px
                box-sizing border-box
                margin-bottom 20px
                li
                    color #151515
                    border-bottom 4px solid transparent
                    &.active
                        border-color #f11010
                        color #f11010
        .tab-con
            padding 0 24px
            box-sizing border-box
            .item-card
                background-color #ffffff
                border-radius 8px
                box-shadow 0 0 8px #e6e6e6
                margin-bottom 14px
                a
                    display block
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
                    padding 17px 38px 10px
                    flex-wrap: wrap;
                    box-sizing border-box
                    .-item-list
                        width: 100%;
                        display: flex;
                        margin-bottom:20px;
                    .img-wrap
                        width 160px
                        height 160px
                        text-align center
                        margin-right 44px
                        img 
                            width 100%
                            height 100%
                    .text
                        flex 1
                        h3
                            font-size 24px
                            line-height 34px
                            color #151515
                            font-weight normal
                            overflow hidden
                            text-overflow ellipsis
                            display -webkit-box
                            -webkit-line-clamp 2
                            -webkit-box-orient vertical
                            margin-bottom 15px
                        .good-sku
                            color #151515
                            font-size 24px
                            display flex
                            justify-content space-between
                            .sku-coll
                                width 290px
                                font-size 22px
                                overflow hidden
                                text-overflow ellipsis
                                white-space nowrap
                        .count
                            text-align right 
                            font-size 24px
                .total-bar
                    height 40px
                    color #6f6f6f
                    display flex
                    justify-content flex-end
                    align-items center
                    margin-bottom 10px  
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
                        .-price
                            color #888
                            font-size 20px
                .order-btn
                    display flex
                    justify-content flex-end
                    padding 0 38px 36px
                    box-sizing border-box
                    .btn
                        width 130px
                        height 40px
                        line-height 40px
                        color #888888
                        text-align center
                        display inline-block
                        font-size 26px
                        border-radius 15px
                        border 2px solid #888888
                        margin-left 26px
                        &.red
                            color #f20c0c
                            border-color #f20c0c
                            background-color #faf8f5
                            a
                                color #f20c0c
            .fifty_wrap
                padding 25px 20px 0
                background #fff
                margin-bottom 14px
                .time
                    margin-bottom 15px
                    font-size 22px
                    color #151515
                    line-height 55px
                    border-bottom 2px solid #e6e6e6
                .nick_wrap  
                    position relative 
                    .img_wrap     
                        img    
                            margin 0 auto
                            display block
                            width 660px
                            height 280px
                            border-radius 10px
                    .nickname
                        padding 10px 15px
                        position absolute
                        top 0
                        left 0
                        background rgba(0,0,0,0.5)
                        font-size 26px 
                        color #fff
                        border-radius 10px
                        p 
                            text-align center
                            line-height 35px        
                .viewBtn
                    margin 10px 0 15px 505px
                    width 130px
                    height 40px
                    line-height 40px
                    color #888888
                    text-align center
                    display inline-block
                    font-size 26px
                    border-radius 15px
                    border 2px solid #888888
                    a
                        color #888

                .num-bar
                    color #6f6f6f
                    line-height 75px
                .num-bar .total_wrap,.count
                    display inline-block  
                .total_wrap  
                    float right 
                .total_wrap .total-count,.payment
                    display inline-block 
                .payment
                    padding 0 0 0 15px          

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
            .addBtn
                width 460px
                height 100px
                line-height 100px
                text-align center
                color #ffffff
                font-size 50px
                background-color #ea2028 
                margin 0 auto
                border-radius 46px              
        .popup
            width 100%
            .van-password-input__security li:first-child
                border-left 1px solid #999
            .van-password-input__security li
                border 1px solid #999
                border-left 0
            .van-password-input
                padding 30px 0 20px
        .van-number-keyboard
            z-index 3000!important
            


                

</style>
