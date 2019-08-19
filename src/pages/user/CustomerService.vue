<template>
    <div class="CustomerService">
        <!-- 头部组件 -->
		<TopHeader custom-title="联系客服">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>
        <div class="content">
            <div class="service-info">
                <div class="code">
                    <img :src="'http://rebate_api.zhifengwangluo.com' + serviceData.picture" />
                    <p>扫码加好友</p>
                </div>
                <div class="group-item">
                    <div class="sub-title">客服电话:</div>
                    <div class="text" @click="onCall(serviceData.urllink)">{{serviceData.urllink}}</div>
                </div>
                <div class="group-item" v-html="serviceData.desc"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader"
    export default {
    name: "CustomerService",
    components: {
		TopHeader,
	},
	data() {
		return {
            serviceData:[]
        };
    },
    created(){
        this.$store.commit('showLoading');
        this.reqData();       
    },
   
    methods:{
        /**
            * 请求数据
            */
        reqData(){
            let url = 'user/get_service_info';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
            }).then((res) => {
                if(res.data.status == 200){
                    this.serviceData = res.data.data;
                }else{
                    this.$toast(res.data.msg) 
                }
                this.$store.commit('hideLoading')
            }).catch((error) => {
                this.$toast(error)
            })
        },

        /**
         * 拨打电话
         */
        onCall(tel){
            // console.log(tel)
            window.location.href = `tel:${tel}`; 
        }
    },
	
};
</script>

<style lang="stylus" scoped>
.content
    margin-top 30px
    padding 0 24px
    box-sizing border-box       
    .service-info
        width 100%
        height 100%
        background-color #fff
        margin-bottom 20px
        border-radius 10px
        padding 18px
        box-sizing border-box
        .code
            text-align center
            margin-bottom 20px
            img
                width 300px
                height 300px
            p
                font-size 30px 
                line-height 60px           
        .group-item
            font-size 28px
            line-height 60px
            background-color #fff
            display flex
            justify-content center
            .sub-title  
                margin-right 10px
            .text       
                color #5facfa                     
</style>