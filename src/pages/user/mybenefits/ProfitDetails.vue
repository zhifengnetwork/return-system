<template>
   <div class="ProfitDetails">
        <!-- 头部组件 -->
        <TopHeader :custom-title="name">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <!-- 无数据 -->
            <div class="none" v-show="isShow">
                <img src="/static/images/public/none.png"/>
                <p>暂无信息</p>
            </div>

            <div class="revenue-list" v-for="(item,index) in list" :key="index">
                <div class="single-item">
                    <div class="img-wrap">
                        <img :src="item.avatar" />
                    </div>
                    <div class="main">
                        <div class="user-info row-line">
                            <span class="user-name info-left">ID:{{item.to_user_id}}</span>
                            <p class="info-right">数量：{{item.num}}</p>
                        </div>
                        <div class="row-line">
                            <span class="date info-left">{{item.create_time | formatDate}}</span>
                            <span class="profit info-right">{{type ==4 ? '奖励' : '利润'}}:￥{{item.money}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'ProfitDetails',
    data() {
        return {
            list: [],
            isShow:false,
            type:this.$route.query.type,
            name:this.$route.query.name,
            token:this.$store.getters.optuser.Authorization
        };
    },
    components: {
		TopHeader,
    },
    created(){
        this.$store.commit('showLoading')       //加载loading
        this.getData()
    },
    methods:{
        getData(){
            var _that=this
            _that.$axios.post('user/profit_edit',{
                'token':_that.token,
                'type':_that.type
            })
            .then((res)=>{
                var info =res.data
                if(info.status == 200){
                    if(info.data.length<1){
                        this.isShow=true
                    }
                    _that.list =info.data
                    // console.log(_that.swipeData)
                    _that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    _that.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        _that.$router.push('/Login')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
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

            return y + '-' + MM + '-'+ d+' '+ h +':'+ m +':'+s;
        }
    },

}
</script>

<style lang="stylus" scoped>
.ProfitDetails
    .revenue-list
        margin-top 20px
        padding 0 24px
        box-sizing border-box
        display flex
        flex-wrap wrap
        .single-item
            width 100%
            height 160px
            color #151515
            font-size 24px
            background-color #fff
            border-radius 10px
            margin-bottom 18px
            box-sizing border-box
            display flex
            align-items center
            .img-wrap
                width 80px
                height 80px
                margin-right 20px
                border-radius 50%
                border 1px solid #7d7d7d
                img 
                    width 100%
                    height 100%
                    border-radius 50%
            .main
                flex 1
                .user-info
                    font-size 28px
                    margin-bottom 10px
                    .user-name
                        margin-right 20px
                .row-line
                    display flex
                    justify-content space-between
                    .info-left
                        display block
                        width 46%
                    .info-right
                        margin-left 2%
                        width 52%
                        text-align right 
    .none
        text-align center
        margin-top 35%
        font-size 28px
        img
            width 80px
        p
            margin 20px auto
           
</style>
