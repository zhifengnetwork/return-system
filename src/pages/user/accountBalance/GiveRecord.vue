<template>
    <div class="Give">
        <!-- 头部组件 -->
        <TopHeader custom-title="赠送记录">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="details-container">
                <div class="thead">
                    <span>赠送日期</span>
                    <span>收款ID/手机号</span>
                    <span>金额</span>
                </div>
                <div class="record-list" v-if="transfercordData.length > 0">
                    <div class="record-item" v-for="(item,index) in transfercordData" :key="index">
                        <div class="column">{{item.create_time | formatDate}}</div>
                        <div class="column">{{item.id}}/{{item.account_id}}</div>
                        <div class="column">￥{{item.balance}}</div>
                    </div>
                </div>

                <!-- 无数据 -->
                <div class="none" v-else>
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
    name:'GiveRecord',
    components: {
        TopHeader,
    },
    data(){
        return{
           user_id:'',
           transfercordData:[]
        }
    },
    created(){
        this.$store.commit('showLoading');
        this.getTransferData();
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
                    this.user_id = res.data.data.id;
                    this.getRecordData();
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

        /**
         * 获取转账记录
         */
        getTransferData(){
            let url = 'balance/transfer_list';
            this.$axios.post(url,{
                user_id:this.user_id,
                token:this.$store.getters.optuser.Authorization
            }).then((res) => {
                if(res.status == 200){
                    this.transfercordData = res.data;
                }
                this.$store.commit('hideLoading')
            }).catch((error) => {
                alert("请求失败：" + error)
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

            return y + '-' + MM + '-' + d ;
        }
    }
}
</script>

<style lang="stylus" scoped>
.content
    padding 0 24px
    box-sizing border-box
    .details-container
        .thead  
            height 50px
            font-size 26px
            display flex
            align-items center
            justify-content space-between
            background-color #ffc9b4
            span 
                text-align center
                display block 
            span:nth-child(1)
                width 30%
            span:nth-child(2)
                width 40%
            span:nth-child(3)
                width 30%
        .record-item
            width 100%
            height 70px
            display flex
            align-items center
            background-color #fff4f0
            .column
                text-align center
                font-size 20px
            .column:nth-child(1)
                width 30%
            .column:nth-child(2)
                width 40%
            .column:nth-child(3)
                width 30%
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
