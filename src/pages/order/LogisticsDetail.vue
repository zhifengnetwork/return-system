<template>
    <div class="logisstics-wrap">
      	<!-- 头部组件 -->
		<TopHeader custom-title="物流详情">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <!-- CONTENT START --> 

        <!-- No INFO START -->
        <div v-show="isShow" class="no-info" >
            <Nodata :nodatas="nodatas"></Nodata>
        </div>

        <div v-show="logistics!=''" class="content">
            <div class="box pt">
                <div class="order-info" v-for="(item,key) in logistics.goods_res" :key="key">
                    <div class="left-pro-pic">
                        <img :src="logistics.goods_res[0].img"/>
                        <p class="shadow">{{logistics.goods_res.length}}件商品</p>
                    </div>
                    <div class="right-detail">
                        <p><b>物流状态：</b>
                            <span v-if="wuliu.status==0" class="txt-success">已签收</span>
                            <span v-else="" class="txt-success">已发货</span>
                        </p>
                        <p>快递公司：{{wuliu.result.expName}}</p>
                        <p>快递单号：{{wuliu.result.courierPhone}}</p>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="box mt">
                <div class="logistics-info">
                    <ul class="-info-">
                        <li class="active" v-for="(item,index) in list" :key="index">
                            <i class="-icon" :class="{'-icon-active':index==0}"></i>
                            <p class="txt">{{item.status}}</p>
                            <p class="time">{{item.time}}</p>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader"
import Nodata from "@/pages/common/nodata/Nodata"
export default {
    data() {
        return {
            logistics:[],
            list:[],
            nodatas:{
                'imgSrc':'/static/images/public/none.png',
                'text':'暂无物流信息~',
                'link':'',
                'showBtn':false
            },
            goods_res:'',
            wuliu:'',
            gLeng:0,
            isShow:false,
            token:this.$store.getters.optuser.Authorization
        }
    },
    created(){
        // this.$store.commit('showLoading')       //加载login
        this.logisticsList()
    },
    methods:{
        logisticsList(){
            var _that =this
            _that.$axios.post('Order/express',{
                'token':_that.token,
                'order_id':_that.$route.query.order_id     
            })
            .then((res)=>{
                var list = res.data;
                console.log(list)
                // _that.$store.commit('hideLoading')
                if(list.status == 200){
                    _that.logistics =list.data
                    _that.wuliu=list.data.wuliu
                    _that.list =_that.wuliu.result.list
                    if(list.data.length<1){         //显示没有数据提示
                        _that.isShow=true
                    }
                }
                else if(list.status === 999){
                    _that.$store.commit('del_token'); //清除token
                    // _that.$store.commit('hideLoading')
                    // setTimeout(()=>{
                    //     _that.$router.push('/Login')
                    // },1000)
                }
                else{
                    _that.$toast(list.msg)
                    _that.isShow=true
                }
            })
        }, 

        // setAgents(){
        // }
    },
    components:{
        TopHeader,
        Nodata
    }
}
</script>
<style lang="stylus" scoped>
    html,body
        background:#e0e0e0
    .logisstics-wrap
        .box
            width:100%
            background:#fff
            .order-info
                width:94%
                margin:0 auto
                padding:15px 0
                .left-pro-pic
                    width:28%
                    float:left
                    position: relative
                    padding: 5px
                    border:1px solid #ddd
                    box-sizing border-box
                    margin-right 2%
                    img
                        height:100px
                        max-width: 100px
                        display: block
                        margin:0 auto
                    p
                        position: absolute
                        left: 0
                        bottom: 0
                        width:100%
                        background:rgba(0,0,0,0.4)
                        opacity: .8
                        color:#fff
                        padding:2px 0
                        text-align: center
                        font-size:26px
                .right-detail
                    p
                        margin-bottom 6px    
           .logistics-info
                width:90%
                margin-left:5%
                padding:25px 0
                min-height: 500px
                .-info-
                    border-left 1px solid #ccc
                    padding: 20px 20px 20px 40px
                    li
                        position: relative
                        margin-bottom 30px
                        border-bottom:1px solid #ccc
                        .-icon
                            display inline-block
                            width:18px
                            height 18px
                            border-radius :50%
                            background:#ccc
                            position: absolute
                            left: -48px
                            top: 50%
                            margin-top -11px
                            box-shadow 0 0 30px #f8f8f8
                        .-icon-active
                            background:#e06f14
                            width:18px
                            height 18px
                        .txt
                            top:-8px
                            margin-bottom 8px
                        .time
                            top:10px
                            // border-bottom:1px solid #ccc
                            padding-bottom: 10px
    .txt-success
        color:#f20c0c
    .mt
        margin-top:15px
    .pt
        padding-top:40px
</style>

