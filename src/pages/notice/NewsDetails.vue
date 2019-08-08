<template>
    <div class="noticeDetails">
        <!-- 头部组件 -->
		<TopHeader custom-title="资讯详情">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="content">
            <div class="details-container">
                <div class="headline">
                    <h1>{{newsDetailsData.title}}</h1>
                    <p class="date">{{newsDetailsData.create_time | formatDate}}</p>
                </div>
                <!-- <p>{{NotiList.desc}}</p> -->
                <div v-html="newsDetailsData.desc" class="dec"></div>
                <img :src="newsDetailsData.picture" />
            </div>
        </div>

    </div>
</template>

<script>
// 公共头部
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'NoticeDetails',
    components:{
        TopHeader
    },
    data(){
       return{
           newsId:this.$route.query.id, //接收传过来的资讯id
           newsDetailsData:[],
        }
    },
    created() {
        this.$store.commit('showLoading')//加载loading
        this.reqnewsData();
    },
    methods:{
        reqnewsData() {
            var url = "user/announce_edit"
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                announce_id:this.newsId
            })
            .then((res) => {  
                if(res.data.status === 200){
                    this.$store.commit('hideLoading');
                    this.newsDetailsData = res.data.data;
                    console.log(this.newsDetailsData)
                }else if(res.data.status === 999){
                    this.$toast(res.data.msg)
                    this.$store.commit('del_token'); //清除token;
                        setTimeout(()=>{
                            this.$router.push('/Login')
                    },1000)
                }
                else{
                    this.$toast(res.data.msg)
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
    }
  
}
</script>

<style lang="stylus" scoped>
.noticeDetails
    background-color #fff
    min-height 100vh
    .details-container
        width 80%
        margin 50px auto 0
        .headline
            margin-bottom 20px
            h1
                text-align center
                font-size 32px
                font-weight normal
                margin-bottom 10px
            .date
                text-align center
        .dec
            line-height 40px
            font-size 26px
            color #666
            letter-spacing 2px
</style>
