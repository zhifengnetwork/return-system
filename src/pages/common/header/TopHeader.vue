<template>
    <van-sticky>
        <div class="TopHeader">
            <div class="backBtn" @click="backAction">
                <slot name="backBtn"></slot>
            </div>
            <div class="title">{{customTitle}}</div>
            <div class="rightBtn">
                <slot name="rightBtn"></slot>
            </div>
        </div>
    </van-sticky>
</template>

<script>
export default {
    name:'TopHeader',
    props:{
        "backUrl":{
            type:String
        },
        'customTitle':{
            type:String,
            default:'标题'
        },
        'customFixed':{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{

        }
    },
    methods:{
        // 后退按钮
        backAction(){
            if(this.backUrl){
                this.$router.push(this.backUrl)
            }else{
                this.$router.go(-1)
            }
        }
    }

}
</script>

<style lang="stylus" scoped>
.TopHeader
    width 100%
    height 88px
    line-height 88px
    color #151515
    font-size 30px
    background-color #ffffff
    display flex
    justify-content space-between
    align-items center
    position relative
    top 0
    left 0
    z-index 9
    // border-bottom 1.5px solid #e6e6e6
    .backBtn
        width 10%
        text-align center
        position absolute
        left 0
        top 0
        .iconfont 
            font-size 36px
    .title
        text-align center
        width 70%
        margin 0 auto
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
    .rightBtn
        padding-right 30px
        position absolute
        right 0
        top 0
        .iconfont
            font-size 46px


</style>
