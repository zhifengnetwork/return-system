<template>
    <div class="reissue-card-wrap">
        <!-- 头部组件 -->
        <CardHeader class="res-card-header" custom-title="补卡">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <div class="res-card-a">
                <div class="-card-a-img"><img  :src="patch_img"/></div>
                <p class="-card-a-msg">会员卡<span class="c-active">￥{{levelInfo.card_one_money}}</span></p>
            </div> 
            <ul class="res-card-b">
                <p class="-card-b-title">补卡提醒记录</p>
                <li class="-card-b-list" v-for='(item,index) in patch_list.data' :key="index">
                   <img class="-b-msg-img" :src="item.avatar"/> 
                   <div class="-b-list-msg">
                       <span>ID:{{item.user_id}} - {{item.mobile}}提醒您补卡</span>
                       <span class="c-active2">X {{item.card_num}}</span>
                       <p class="-b-list-date">{{item.create_time | formatDate}}</p>
                   </div>
                </li>
                <p class="t-center"><router-link to="/MoreReissueCard" class="look-more">查看更多</router-link> </p>
            </ul>
            <div class="price-wrap">
                <!-- <div class="num-wrap"> -->
                <div class="-option-">
                    <i class="subling iconfont icon-jian-" @click="reducingNumber()"></i>
                    <input class="inp" type="number" v-model="card_num" @change="changNumber($event)"/>
                    <i class="puls iconfont icon-jia" @click="addNumber()"></i>
                </div>
                <!-- </div> -->
                <div class="num">总计：￥{{computeMoney}}</div>
            </div>
             <p class="height180"></p>
        </div>
       
        <div class="btn" @click="saveInfo()">立即补卡</div>
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
            card_num:1,
            cardInfo:[],
            patch_list:[],
            levelInfo:{},
            patch_img:'',
            card_one_money:0,
            token:this.$store.getters.optuser.Authorization
        };
    },
    computed: {
         computeMoney() {
            var totalMoney = new Number(this.card_one_money) * new Number(this.card_num)
            return totalMoney.toFixed(2)
        }
    },
    mounted() {
    // this.NotData()
    },
    created(){
        this.$store.commit('showLoading')
        this.getData()
    },
    methods: {

        getData(){
           var url ='card/card_edit_now',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token
            })
            .then((res)=>{
                var info =res.data
                // console.log(info.data)
                if(info.status==200){
                    that.cardInfo=info.data
                    that.levelInfo=info.data.level_info
                    that.card_num =info.data.level_info.card_num
                    that.patch_list=info.data.patch_list
                    that.card_one_money=info.data.level_info.card_one_money
                    that.patch_img =info.data.level_info.patch_img
                    that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                     setTimeout(()=>{
                        this.$router.push('/Login')
                    },100)
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },

        reducingNumber(){
            var val =parseInt(this.card_num - 1) 
           if(val<=1){
               val =1
           }
           this.card_num=val
        },
        changNumber(e){
            var _that =this
            var val =e.target.value;
            if(val<=1 || isNaN(val)){
                return _that.$toast('请输入正确的数量');
            }
            this.card_num=val
        },
        addNumber(){
            var val =parseInt(this.card_num) + 1
            this.card_num=val
        },
        saveInfo(){
            if(this.card_num<=0){
                return this.$toast('补卡数量须大于0')
            }
            this.$router.push({
                path: '/Pay/PayWay?level_id=' + this.levelInfo.id+'&card_num='+this.card_num+'&isReissue=1',
            })
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
        }
    },
    components: {
        CardHeader
    }
};
</script>

<style lang="stylus" scoped>
    html,body
        width 100%
        height 100%
    .reissue-card-wrap
        width 100%
        height 100%
        background #fff
        overflow hidden
    .reissue-card-wrap /deep/ .TopHeader
        background #f3b93d
        border-color #f3b93d
    .content
        color #151515
        font-size 30px
        .res-card-a
            padding 0 86px 40px
            background url('/static/images/membershipCard/card_bg.png')
            background-size:100%
            background-size:contain
            width: 100%
            box-sizing: border-box
            .-card-a-img
                width 580px
                height 320px
                margin-bottom 19px
                img 
                    width 100%
                    height 100%
            .-card-a-msg
                .c-active
                    font-size 36px
                    color #f60808
        .res-card-b
            padding 65px 130px 90px
            .-card-b-title
                text-align center 
                font-size 28px
                margin-bottom 40px
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
            .t-center
                text-align center
            .look-more
                margin-top 20px
                padding 9px 0 0px
                font-size 26px
                text-align center
                color: #676767
        .price-wrap 
            padding 0 21px
            text-align center
            .-option-
                border 2px solid #000000
                width 320px
                height 70px
                line-height 72px
                margin auto
                display flex
                justify-content center
                align-items center
                border-radius 35px
                font-size 36px
                .iconfont
                    width 80px
                    height 100%
                .puls
                    border-left 1px solid #000000
                .subling
                    border-right 1px solid #000000
                    
                .inp
                    width 160px
                    height inherit
                    text-align center
                    
                    font-weight bold
            .buy 
                font-weight 550
                line-height 65px
            .num 
                margin 39px 0 0
                font-size 36px
                font-weight 550
                line-height 75px
    .height180
        width 100%
        height 160px
    .btn 
        position fixed
        bottom 20px
        left 22px
        width 706px
        height 88px
        margin 40px auto
        background-image linear-gradient(-90deg, #ffbf5b 0%, #ffe184 100%), linear-gradient(#ffc9a6, #ffc9a6)
        background-blend-mode normal, normal
        box-shadow -1px 1px 7px 0px #a7a7a7
        border-radius 44px
        font-weight 600
        text-align center
        line-height 88px
        letter-spacing 5px
        font-size:28px
           
</style>


