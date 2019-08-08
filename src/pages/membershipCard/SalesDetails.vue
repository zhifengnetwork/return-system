<template>
    <div class="SalesDetails">
        <!-- 头部组件 -->
		<TopHeader custom-title="会员卡明细">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="content">

            <div class="none" v-show="isShow">
                <img src="/static/images/public/none.png"/>
                <p>当前还没有信息</p>
            </div>

            <div class="sales-details">
                <!-- -->
                <div class="sales-item" v-for="(item,index) in list" :key="index">
                    <div class="avatar"><img :src="item.avatar" /></div>
                    <div class="main">
                        <div class="user-info">
                            <span class="user-id">ID:{{item.user_id}}</span>
                        </div>
                        <div class="date">时间:{{item.create_time | formatDate}}</div>
                    </div>
                    <div class="sales-count">
                        {{item.type==1? '购买' : '卖出'}}数量:{{item.card_num}}
                    </div>
                </div>
                <!-- -->
            </div>
        </div>
    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'SalesDetails',
    data() {
        return {
            list: [],
            isShow:false,
            type:'',
            id:this.$route.query.id, //商品id
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){
        this.$store.commit('showLoading')       //加载loading
        this.getData()
    },
    methods:{
        getData(){
            var _that=this
            _that.$axios.post('card/vip_card_list',{
                'token':_that.token,
                'id':_that.id
            })
            .then((res)=>{
                var info =res.data
                if(info.status == 200){
                    if(info.data.length<1){
                        this.isShow=true
                    }
                    _that.list =info.data
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
    filters: {      // 日期格式化
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
    },
    components: {
		TopHeader,
	},
}
</script>

<style lang="stylus" scoped>
.sales-details
    padding 0 24px
    box-sizing border-box
    .sales-item
        width 100%
        height 160px
        font-size 28px
        padding 0 30px
        box-sizing border-box
        background-color #fff
        border-radius 10px
        margin-top 20px
        display flex
        align-items center
        .avatar
            width 80px
            height 80px
            border-radius 50%
            overflow hidden 
            margin-right 20px
            img 
                width 100%
        .main
            flex 1
            .date
                font-size 24px
                margin-top 10px
.none
    text-align center
    margin-top 35%
    font-size 28px
    img
        width 80px
    p
        margin 20px auto
</style>
