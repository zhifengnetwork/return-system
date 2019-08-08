<template>
    <div class="sj-reissue-card-wrap">
        <!-- 头部组件 -->
        <CardHeader class="res-card-header" custom-title="联系上级补卡">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <div class="res-card-a">
                <div class="-card-a-img"><img  :src="list.patch_img"/></div>
                <p class="-card-a-msg">会员卡<span class="c-active">￥{{list.card_one_money}}</span></p>
                <p class="-card-a-msg2">上级会员卡数量：{{list.leader_num}}</p>
            </div> 
            <div class="price-wrap">
                <div class="-option-">
                    <i class="subling iconfont icon-jian-" @click="reducingNumber()"></i>
                    <input class="inp" type="number" v-model="card_num" @change="changNumber($event)"/>
                    <i class="puls iconfont icon-jia" @click="addNumber()"></i>
                </div>
                <div class="btn" @click="saveInfo()">联系上级补卡</div>
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
            card_num:1,
            init_cart:1,
            list:[],
            c_num:this.$route.query.card_num,
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){
        this.getData();

        
        
    },
    mounted() {
    // this.NotData()
    },
    methods: {
        getData(){
           var url ='card/patch_card_edit',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':that.init_cart
            })
            .then((res)=>{
                var info =res.data
                // console.log(info.data)
                if(info.status==200){
                    this.list=info.data
                    if(typeof(this.c_num)!='undefined'){
                        console.log(this.c_num)
                        that.card_num =that.c_num
                    }else{
                        that.card_num =info.data.card_num
                    }
                    // 
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
            // val =new Number(val+ 1)
            this.card_num=val
        },
        saveInfo(){
            var url ='card/patch_card',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':that.card_num
            })
            .then((res)=>{
                var list =res.data
                if(list.status==200){
                    that.$toast(res.data.msg)
                    setTimeout(() => {
                        this.$router.push('/Home')
                    }, 2000);
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                   return setTimeout(() => {
                        this.$router.push('/Login')
                    }, 2000);
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
    },
    components: {
        CardHeader
    }
};
</script>

<style lang="stylus" scoped>
    html
        width 100%
        height 100%
    .sj-reissue-card-wrap
        width 100%
        height 100%
        background #fff
        overflow hidden
    .sj-reissue-card-wrap /deep/ .TopHeader
        background #f3b93d
        border-color #f3b93d
    .content
        color #151515
        font-size 30px
        font-weight 550
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
            .-card-a-msg2
                margin-top 24px
        .price-wrap 
            position fixed
            bottom 50px
            z-index 111
            left 22px
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
            .btn 
                width 706px
                height 88px
                margin 60px auto 40px
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


