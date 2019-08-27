<template>
    <div class="Investment">
        <div class="content">
            <div class="investment-list">
                <div class="investment-item" v-for="(item,index) in recordData" :key="index">
                    <div class="row-line">
                        <div class="sub-title">商家ID :</div>
                        <div class="right">{{item.otc_id}}</div>
                    </div>
                    <div class="row-line">
                        <div class="sub-title">投资金额 :</div>
                        <div class="right">{{item.vigor_value}}</div>
                    </div>
                    <div class="row-line">
                        <div class="sub-title">订单号 :</div>
                        <div class="right">{{item.order_sn}}</div>
                    </div>
                    <div class="row-line">
                        <div class="sub-title">投资时间 :</div>
                        <div class="right">{{item.create_time | formatDate}}</div>
                    </div>
                    <div class="row-line">
                        <div class="sub-title">投资状态 :</div>
                        <div class="right" v-show="item.state == 0">待审核</div>
                        <div class="right" v-show="item.state == 1">失败</div>
                        <div class="right" v-show="item.state == 2">成功</div>
                    </div>
                </div>
            </div>

             <!-- 无数据 -->
            <div class="none" v-show="recordData.length == 0">
                <img src="/static/images/public/none.png"/>
                <p>暂无相关数据</p>
            </div>

        </div>

        <!-- 底部 -->
        <Navigate></Navigate>
    </div>
</template>

<script>
import Navigate from "@/pages/common/footer/Navigate"
export default {
    name:'Investment',
    components: {
        Navigate,
    },
    data(){
        return{
            user_id:'',
            recordData:[]
        }
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
         * 请求投资记录数据
         */
        getRecordData(){
            let url = 'user/record_list';
            this.$axios.post(url,{
                user_id:this.user_id,
                token:this.$store.getters.optuser.Authorization
            }).then((res) => {
                if(res.status == 200){
                    this.recordData = res.data;
                    this.$store.commit('hideLoading')
                    console.log(this.recordData)
                }
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
.Investment
    height 100%
    .content
        height calc(100% - 98px) 
        padding 0 24px
        box-sizing border-box
        position relative
        .investment-list
            margin-top 20px
            .investment-item
                width 100%
                height 300px
                font-size 30px
                background-color #fff
                border-radius 10px
                padding 0 36px
                box-sizing border-box
                display flex
                justify-content center
                flex-direction column
                margin-bottom 20px
                .row-line
                    display flex
                    line-height 56px
                    .sub-title
                        width 140px
                        margin-right 15px
                        text-align-last justify
        .none
            text-align center
            margin 0px auto
            position absolute
            left 50%
            top 50%
            z-index 3
            transform translate(-50%,-50%)
            img
                width 80px
            p
                margin 10px auto
                font-size 24px
                    

</style>
