<template>
    <div class="reissue-card-wrap">
        <!-- 头部组件 -->
        <CardHeader class="res-card-header" custom-title="补卡记录">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <!-- <div class="res-card-a">
                <div class="-card-a-img"><img  src="/static/images/membershipCard/vip.png"/></div>
                <p class="-card-a-msg">会员卡<span class="c-active">￥98</span></p>
            </div>  -->
            <div class="inner"></div>
            <!-- <div -->
            <div class="res-card-cont">
                <ul class="res-card-a">

                    <!-- 无数据 -->
                    <div class="none" v-show="isShow">
                        <img src="/static/images/public/none.png"/>
                        <p>当前还没有信息</p>
                    </div>


                    <p class="-card-b-title" v-show="!isShow">补卡提醒记录</p>
                    <li class="-card-b-list" v-for="(item,index) in list" :key="index">
                        <img class="-b-msg-img" :src="item.avatar"/> 
                        <div class="-b-list-msg">
                            <span>ID:{{item.user_id}} - {{item.mobile}}提醒您补卡</span>
                            <span class="c-active2">X{{item.card_num}}</span>
                            <p class="-b-list-date">{{item.create_time | formatDate}}</p>
                        </div>
                    </li>
                </ul>
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
//   name: "ReissueCard",
    data() {
        return {
            list:[],
            isShow:false,
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){
        this.$store.commit('showLoading')
        this.getData()
    },
    methods: {
        getData(){
           var url ='card/patch_card_list',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token
            })
            .then((res)=>{
                var info =res.data
                // console.log(info.data)
                if(info.status==200){
                    if(info.data.length<1){
                        this.isShow=true
                    }
                    that.list=info.data
                    that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                     setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
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

            return y + '-' + MM + '-' + d ;
        }
    },
    components: {
        CardHeader
    }
};
</script>

<style lang="stylus" scoped>
    .reissue-card-wrap
        width 100%
        background #fff
        overflow hidden
        height 100vh
        overflow auto
    .reissue-card-wrap /deep/ .TopHeader
        background #f3b93d
        border-color #f3b93d
    .content
        color #151515
        font-size 30px
        height 80%
        position relative
        .inner
            width 100%
            height 510px
            background url('/static/images/membershipCard/card_bg.png')
            background-size:100%
            background-size:contain
        .res-card-cont
            position absolute
            top 0
            left 0
            z-index 1
            width 100%
            height: inherit
            .res-card-a
                margin 0 24px 24px
                background #fff
                padding 24px 86px 40px
                min-height 510px
                box-sizing: border-box
                height: inherit
                .-card-b-title
                    text-align center 
                    font-size 28px
                    margin-bottom 70px
                    font-weight 550
                    letter-spacing 2px
                .-card-b-list
                    margin-bottom 40px
                    display flex
                    align-items center
                    .-b-msg-img
                        margin-right 21px
                        width 60px
                        height 60px
                        border solid 1px #f7f7f7
                    .-b-list-msg
                        font-size 26px
                        .c-active2
                            font-size 30px
                            color #f80707
                            margin-left 10px
                        .b-list-date
                            margin-top 5px
                            font-size 24px
            .none
                text-align center
                margin-top 35%
                font-size 28px
                img
                    width 80px
                p
                    margin 20px auto
           
</style>


