<template>
	<div class="accs_wrap">
        <div class="header">
            <!-- 头部组件 -->
            <Acc-Header custom-title="账单明细" class="head">
                <!-- 返回按钮 -->
                <i slot="backBtn" class="iconfont icon-fanhui"></i>
            </Acc-Header>
        </div>
        <div class="content">
            <div class="the_wrap">
                <div class="the">
                    <div class="time" v-show="xiaofei.length >0">消费记录</div>
                    <div class="info_wrap"  v-for="(item,index) in xiaofei" :key="index"> 
                        <div class="info">
                            <div>
                                <span>{{item.note}}</span>
                            </div>
                            <div>余额：{{item.balance}}</div>
                        </div>
                        <div class="info">
                            <div>{{item.create_time}}</div>
                        </div>
                    </div>
                </div>
                <div class="the">
                    <div class="time" v-show="shouru.length >0">赚取记录</div>
                    <div class="info_wrap"  v-for="(item,index) in shouru" :key="index"> 
                        <div class="info">
                            <div>
                                <span>{{item.note}}</span>
                            </div>
                            <div>余额：{{item.balance}}</div>
                        </div>
                        <div class="info">
                            <div>{{item.create_time}}</div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- 无数据 -->
            <div class="none" v-if="xiaofei.length<1 && shouru.length<1">
                <img src="/static/images/public/none.png"/>
                <p>您还没相关记录</p>
            </div>
        </div>
	</div>
</template>

<script>
    import AccHeader from "@/pages/common/header/TopHeader"
    import { Toast } from 'vant'
	export default {
        name: 'theAccountBalance',
        components: {
			AccHeader,
		},
		data() {
			return{
                xiaofei:[],         //消费
                shouru:[],          //收入
                isBotom:false,
                showMore:false,
                token:this.$store.getters.optuser.Authorization
			}
        },
        created(){
            this.$store.commit('showLoading')
            this.getData(0)
            this.getData(1)
            this.getUserAlipayInfo()
        },
        mounted(){
            //  window.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
            getData(log_type){        //获取消费账单  log_type :0 消费， 1赚取
                var that =this,
                    url ='user/remainder_list'
				that.$axios.post(url,{         // 传给后台的参数
                    'token':that.token,
                    'log_type':log_type
				})
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.$store.commit('hideLoading')   //数据成功获取后关闭loading
                        if(list.data.list.length<1){
                            that.showMore=true
                        }else{     //有数据
                            if(log_type==0){
                                that.xiaofei=list.data.list
                            }else{
                                that.shouru =list.data.list
                            }
                        }
                        
                    }
                    else if(res.data.status == 999){
                        that.$store.commit('del_token');    //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }else{
                        that.$toast(res.data.msg)
                    }
				})
            },
            getUserAlipayInfo(){    //获取余额
                var that =this,
                    url ='user/wallet_info'
				that.$axios.post(url,{         // 传给后台的参数
					'token':that.token
				})
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.moneyInfo =list.data
                    }
                    else if(res.data.status == 999){
                        that.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }else{
                        that.$toast(res.data.msg)
                    }
				})
            },
        },
        filters: {
            formatDate(time) {
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
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll, true);
        },
	}
</script>

<style lang="stylus" scoped>
    .accs_wrap
        width 100%
        height 100%
        .content
            padding 40px 24px 88px 
            .the_wrap
                .the 
                    margin-bottom 20px
                    .time
                        padding 0 0 0 18px
                        background #e3dfd9
                        line-height 45px  
                    .info_wrap
                        padding 20px 0
                        font-size 26px
                        border-bottom 1.5px solid #e3dfd9
                        .info
                            display flex
                            justify-content space-between
                            line-height 55px
                            div 
                                // font-size 30px
                                color #151515
                        .list2
                            font-size 24px
                            color #424242  
                            line-height 55px   
            .end-wrap
                font-size 18px
                color #888888
                text-align center
                margin 30px auto
                .more-msg
                    font-size 28px
                    color #666
            .none
                text-align center
                margin-top 10%
                font-size 28px
                img
                    width 80px
                p
                    margin 20px auto   

</style>