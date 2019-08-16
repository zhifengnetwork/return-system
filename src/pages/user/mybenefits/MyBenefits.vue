<template>
   <div class="myBenefits">
        <!-- 头部组件 -->
        <TopHeader custom-title="我的收益">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="revenue-list">
                <!-- <div class="card-item" v-for="(item,index) in list" :key="index">
                    <router-link :to="'/user/ProfitDetails?type='+item.type+'&name='+item.name">
                        <p class="title">{{item.name}}</p>
                        <p class="money">￥{{item.money}}</p>
                    </router-link>
                </div>  -->                
                <div class="card-item" v-for="(item,index) in profitData" :key="index">
                    <router-link :to="'/user/ProfitDetails?type=' + item.type +'&name='+item.name">
                        <div class="title">{{item.name}}</div>
                        <div class="money">{{item.money}}</div>
                    </router-link> 
                </div>  
                 
            </div>
            
        </div>
   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'MyBenefits',
    components: {
		TopHeader,
    },
    data() {
        return {
            profitData:{}
        };
    },
    created(){
        this.$store.commit('showLoading')
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
            let url ='user/record_rebate';
            this.$axios.post(url,{   
                user_id:this.userData.id,      
                token:this.$store.getters.optuser.Authorization,
            })
            .then((res)=>{
                if(res.status == 200){
                    this.profitData = res.data.data;
                    console.log(this.profitData)
                    this.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    this.$store.commit('del_token'); //清除token
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
    },

}
</script>

<style lang="stylus" scoped>
.myBenefits
    .revenue-list
        margin-top 20px
        padding 0 24px
        box-sizing border-box
        .card-item
            width 100%
            height 260px
            border-radius 10px
            margin-bottom 30px
            position relative
            
            &:nth-child(1)
                background url("/static/images/user/profit-item-bg-1.png") no-repeat
                background-size 100%
                .title
                    background-color #b65e29
            &:nth-child(2)
                background url("/static/images/user/profit-item-bg-2.png") no-repeat
                background-size 100%
                .title
                    background-color #c73d75
            &:nth-child(3)
                background url("/static/images/user/profit-item-bg-3.png") no-repeat
                background-size 100%
                .title
                     background-color #bc8c2f
            a
                width 100%
                height 100%
                display flex
                justify-content center
                align-items center
            .title
                width 160px
                height 50px
                font-size 30px
                color #ffffff
                text-align center
                line-height 50px
                border-radius 24px
                background-color #b65e29
                position absolute
                top 22px
                left 25px
            .money
                color #571607
                font-size 40px
  
</style>
