<template>
    <div class="User">
        <div class="header">
           <div class="user-info">
                <div class="avatar">
                    <router-link to="/user/personalData">
                        <img :src="userData.avatar"/>  
                    </router-link>
                </div>
                <div class="user-msg">
                    <p class="user-name">{{userData.realname}}</p>
                    <p class="user-id">ID:{{userData.id}}</p>
                </div>
            </div>
            <div class="member-msg">
                <div class="level level-0" v-if="personalData.level === 0">普通用户</div>
                <div class="level level-1" v-if="personalData.level === 1">VIP会员</div>
                <div class="level level-2" v-if="personalData.level === 2">官方经理</div>
                <div class="level level-3" v-if="personalData.level === 3">高级经理</div>
                <div class="level level-4" v-if="personalData.level === 4">大区经理</div>
                <div class="level level-5" v-if="personalData.level === 5">联合创始人</div>
                <div class="date" v-if="personalData.level==1 || personalData.level === 5">{{personalData.vip_time | formatDate}} 到期</div>
            </div>
            
            <router-link class="set-up" to="/user/personalData"></router-link>
             
        </div>
        
        <div class="content">
             <!-- 订单 -->
            <div class="order-area">
                <div class="headline">
                    <h3>我的订单</h3>
                    <router-link to="/order?type=0"><span class="more">查看全部订单</span></router-link>
                </div>
                <div class="list">
                    <router-link to="/order?type=1">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/user/dfk-icon.png" />
                            </span>
                            <span>待付款</span>
                            <span class="num" v-if="userData.not_pay">{{userData.not_pay}}</span>
                        </div>
                    </router-link>
                    <router-link to="/order?type=2">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/user/dfh-icon.png" />
                            </span>
                            <span>待发货</span>
                            <span class="num" v-if="userData.not_delivery">{{userData.not_delivery}}</span>
                        </div>
                    </router-link>
                     <router-link to="/order?type=3">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/user/dsh-icon.png" />
                            </span>
                            <span>待收货</span>
                            <span class="num" v-if="userData.not_receiving">{{userData.not_receiving}}</span>
                        </div>
                    </router-link>
                     <router-link to="/order?type=4">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/user/dpj-icon.png" />
                            </span>
                            <span>待评价</span>
                            <span class="num" v-if="userData.not_evaluate">{{userData.not_evaluate}}</span>
                        </div>
                    </router-link>
                     <!-- <router-link to="/Order/ReturnGoods">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/user/th-icon.png" />
                            </span>
                            <span>退货</span>
                            <span class="num" v-if="userData.refund">{{userData.refund}}</span>
                        </div>
                    </router-link>   -->
                </div>
            </div>
            <div class="link-list">
                <router-link to="/SalesCard">
                    <div class="link-item">
                        <span>会员卡</span>
                        <span class="more"></span>
                    </div>
                </router-link>

                <router-link to="/user/myWallet">
                    <div class="link-item">
                        <span>我的钱包</span>
                        <span class="more"></span>
                    </div>
                </router-link>
                
                <router-link to="/user/MyBenefits">
                    <div class="link-item">
                        <span>我的收益</span>
                        <span class="more"></span>
                    </div>
                </router-link>
                 
                <router-link to="/user/myTeam">
                    <div class="link-item">
                        <span>我的团队</span>
                        <span class="more"></span>
                    </div>
                </router-link>

                <router-link to="/user/Address">
                    <div class="link-item">
                        <span>地址管理</span>
                        <span class="more"></span>
                    </div>
                </router-link>
                <!-- <router-link to="/user/Collect">
                    <div class="link-item">
                        <span>我的收藏</span>
                        <span class="more"></span>
                    </div>
                </router-link> -->
               
                <router-link to="/notice/NoticeList">
                    <div class="link-item">
                        <span>公告</span>
                        <span class="more"></span>
                    </div>
                </router-link>
               
                <div class="link-item">
                    <span>手机号</span>
                    <span class="more">{{userData.mobile}}</span>
                </div>

                <router-link to="/user/mySharing">
                    <div class="link-item border-none">
                        <span>二维码</span>
                        <span class="more"></span>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- 底部 -->
        <TopHeader></TopHeader>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/footer/Navigate";
    export default {
        name: "User",
        components: {
            TopHeader,
        },
        data() {
            return {
                userData:[],
                personalData:[],
                nowIndex:0,
            };
        },
        created(){
            this.$store.commit('showLoading')
            this.reqUser();
            this.reqPersonal();
        },
        methods: {
            reqUser() {
                let url = 'user/user_info'
                this.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                })
                .then((res)=>{   
                    this.$store.commit('hideLoading')
                    if(res.data.status === 200){
                        this.userData = res.data.data;
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
            reqPersonal() {
                let url = 'user/personal'
                this.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                })
                .then((res)=>{  
                    if(res.data.status === 200){
                        this.personalData = res.data.data;
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
        }
    };
</script>

<style lang="stylus" scoped>
    .User
        width 100%
        height 100%
        padding-bottom 114px
        .header
            width 100%
            height 340px
            background url(/static/images/user/topHeader-bg.png) no-repeat
            background-size 100%
            display flex
            justify-content space-between
            padding 65px 24px 0
            box-sizing border-box
            position relative
            z-index 1
            .set-up
                width 28px
                height 28px
                background url(/static/images/user/set-up-icon.png) no-repeat
                background-size 100%
                position absolute
                right 42px
                top 24px
                z-index 1
            .user-info
                height 110px
                display flex
                align-items center
                .avatar
                    width 110px
                    height 110px
                    border-radius 50%
                    overflow hidden
                    margin-right 20px
                    img 
                        width 100%
                .user-msg
                    font-size 28px
                    color #ffffff
            .member-msg
                font-size 24px
                color #ffffff
                .level
                    height 50px
                    line-height 50px
                    vertical-align bottom
                    padding-left 50px
                .level-0
                    // background url(/static/images/user/level-0.png) left center no-repeat 
                    background-size 38px 39px
                .level-1
                    background url(/static/images/user/level-1.png) left center no-repeat 
                    background-size 31px 40px
                .level-2
                    background url(/static/images/user/level-2.png) left center no-repeat
                    background-size 31px 40px
                .level-3
                    background url(/static/images/user/level-3.png) left center no-repeat
                    background-size 31px 40px
                .level-4
                    background url(/static/images/user/level-4.png) left center no-repeat
                    background-size 49px 48px
                .level-5
                    background url(/static/images/user/level-5.png) left center no-repeat
                    background-size 40px 40px
                .date
                    font-size 22px
        .content
            margin-top -50px
            padding 0 24px
            box-sizing border-box
            position relative
            z-index 2
            .headline 
                width 100%
                height 60px
                color #333333
                display flex
                justify-content space-between
                align-items center
                border-bottom 1px solid #e5e5e5
                h3 
                    font-size 28px
                    font-weight normal
                    color #151515
                .more 
                    min-width 8px
                    min-height 14px
                    color #525252
                    font-size 24px
                    background url(/static/images/user/leftArrow.png) no-repeat right center
                    background-size 8px 14px
                    padding-right 22px
            .order-area 
                width 100%
                background-color #fff
                border-radius 12px
                margin-bottom 12px
                padding 0 24px
                box-sizing border-box
                .list 
                    height 114px
                    display -webkit-box
                    display -ms-flexbox
                    display flex
                    align-items center
                    justify-content space-between
                    padding 30px 0 20px
                    .item 
                        flex 1
                        font-size 26px
                        text-align center
                        color #2f2f2f
                        border-right 1px solid #efece9
                        position relative
                        &:last-child
                            border-right none
                        .num 
                            width 30px
                            height 30px
                            text-align center
                            line-height 30px
                            display inline-block
                            border 1px solid #191919
                            border-radius 50%
                            color #fe0226
                            font-size 14px
                            padding 2px
                            background #ffffff
                            position absolute
                            right 0
                            top -15px
                        span.icon 
                            width 48px
                            height 48px
                            display block
                            margin 0 auto 10px
                            display flex
                            align-items center
                            justify-content center
                            img 
                                max-width 100%
                                max-height 100%
            .link-list 
                background-color #fff
                border-radius 10px
                padding 0 24px
                box-sizing border-box
                .link-item 
                    height 80px
                    font-size 28px
                    display flex
                    align-items center
                    justify-content space-between
                    color #151515
                    border-bottom 1px solid #e6e6e6
                    &.border-none 
                        border-bottom none
                    .more 
                        min-width 8px
                        min-height 14px
                        background url(/static/images/user/leftArrow.png) no-repeat right center
                        background-size 8px 14px
                        padding-right 30px
            
                

            

</style>
