<template>
    <div class="NoticeDetails">
        <!-- 头部组件 -->
		<TopHeader custom-title="公告详情">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>

        <div class="content">
            <div class="details-container">
                <h1>{{noticeDetails.title}}</h1>
                <div v-html="noticeDetails.desc" class="desc"></div>
            </div>
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'NoticeDetails',
    components:{
        TopHeader
    },
    data(){
       return{
           notice_id:this.$route.query.item_id,
           noticeDetails:[],
        }
    },
    created() {
        this.$store.commit('showLoading');
        this.reqnoticeDetails();
    },
    methods:{
        reqnoticeDetails() {
            var url = "user/announce_edit"
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                announce_id:this.notice_id
            }).then((res) => {  
                if(res.data.status === 200){
                    this.$store.commit('hideLoading')
                    this.noticeDetails = res.data.data;
                }else{
                    this.$toast(res.msg)
                }
            }).catch((error) => {
                alert("请求失败：" + error)
            })
        },
    },
 
}
</script>

<style lang="stylus" scoped>
.NoticeDetails
    height 100%
    background-color #fff
    .content
        padding 0 24px
        box-sizing border-box
        .details-container
            width 80%
            margin 50px auto 0
            h1
                text-align center
                font-size 30px
                font-weight normal
                margin-bottom 20px
                // border-bottom 1px solid #ccc
                padding 0 0 20px 0
                box-sizing border-box
            .desc
                line-height 40px
                font-size 26px
                color #666
                letter-spacing 2px
</style>
