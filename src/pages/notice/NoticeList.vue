<template>
    <div class="noticeList">
        <!-- 头部组件 -->
		<TopHeader custom-title="公告列表">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="content">
            <div class="notice-list">
                <ul>
                    <router-link :to="'/notice/NoticeDetails?item_id='+item.id" tag="li" v-for="(item,index) in NotList" :key="index">
                        <h3>{{item.title}}</h3>
                        <span class="date">{{item.create_time | formatDate}}</span>
                    </router-link>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
// 公共头部
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'NoticeList',
    data(){
        return{
           NotList:[],
        }
    },
    mounted() {
        this.NotData()
    },
    methods:{
        NotData() {
            var url = "user/announce_list"
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            })
            .then((res)=>{                
                var that = this
                if(res.data.status === 200){
                    that.NotList = res.data.data.list;
                }else{
                    that.$toast(res.msg)
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
    components:{
        TopHeader
    }
}
</script>

<style lang="stylus" scoped>
.noticeList
    background-color #fff
    min-height 100vh
    .content
        padding-top 30px
        .notice-list
            ul
                li
                    padding 10px 30px
                    font-size 28px
                    line-height 50px
                    border-bottom 1px solid #efefef
                    box-sizing border-box
                    h3
                        display -webkit-box
                        overflow hidden
                        -webkit-line-clamp 2
                        -webkit-box-orient vertical
                        font-weight normal
                    .date
                        display block
                        color #999999
                        font-size 24px
                        text-align right 


</style>


