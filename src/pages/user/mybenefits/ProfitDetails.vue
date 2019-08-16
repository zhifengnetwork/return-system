<template>
   <div class="ProfitDetails">
        <!-- 头部组件 -->
        <TopHeader :custom-title="name">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="details-container">
                <div class="thead">
                    <span>日期</span>
                    <span>金额</span>
                    <span>描述</span>
                </div>
                <div class="record-list">
                    <div class="record-item" v-for="(item,index) in this.profitList">
                        <div class="column">{{item.createtime | formatDate}}</div>
                        <div class="column">{{item.amplify_amount_day}}</div>
                        <div class="column">描述</div>
                    </div>
                </div>

                <!-- 无数据 -->
                <div class="none" v-show="profitList.length == 0">
                    <img src="/static/images/public/none.png"/>
                    <p>暂无相关数据</p>
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
            type:'',
            name:'',
            profitList:[]
        };
    },
    components: {
		TopHeader,
    },
    created(){
        this.type = this.$route.query.type,
        this.name = this.$route.query.name,
        this.$store.commit('showLoading');  
        this.reqUser();    
    },
    methods:{
        reqUser() {
            let url = 'user/user_info'
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            })
            .then((res)=>{   
                this.$store.commit('hideLoading')
                if(res.data.status === 200){
                    this.userData = res.data.data;
                    this.getData();
                }
                else if(res.data.status === 999){
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
        getData(){
           let url = 'user/record_details';
           this.$axios.post(url,{
                user_id:this.userData.id,  
                type:this.type,
                name:this.name,
                token:this.$store.getters.optuser.Authorization
           }).then((res) => {
               this.profitList = res.data.data;
               console.log(this.profitList)
               this.$store.commit('hideLoading');  
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
    .details-container
        .thead  
            height 50px
            font-size 26px
            display flex
            align-items center
            justify-content space-between
            background-color #ffc9b4
            span 
                flex 1
                text-align center
                display block 
        .record-item
            width 100%
            height 70px
            display flex
            justify-content space-between
            align-items center
            background-color #fff4f0
            .column
                flex 1
                text-align center
                font-size 20px
            &:nth-child(even)
                background-color #ffede7
        .none
            text-align center
            margin 150px auto
            img
                width 80px
            p
                margin 10px auto
                font-size 24px
           
</style>
