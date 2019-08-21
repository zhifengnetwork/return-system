<template>
    <div class="User">
        <div class="header">
           <div class="user-info">
                <div class="avatar">
                    <router-link to="/user/PersonalData">
                        <img :src="userData.avatar"/>  
                    </router-link>
                </div>
                <div class="user-msg">
                    <p class="user-name">{{userData.realname}}</p>
                    <p class="user-id">ID:{{userData.id}}</p>
                    <p class="join-time">加入时间：{{userData.createtime | formatDate}}</p>
                </div>
            </div>
            <div class="member-msg">
                <div class="level" v-if="personalData.level === 0">普通用户</div>
                <div class="level" v-if="personalData.level === 1">VIP会员</div>
                <div class="level" v-if="personalData.level === 2">官方经理</div>
                <div class="level" v-if="personalData.level === 3">高级经理</div>
                <div class="level" v-if="personalData.level === 4">大区经理</div>
                <div class="level" v-if="personalData.level === 5">联合创始人</div>
            </div>
            
        </div>
        
        <div class="content">
            <!-- 模块 -->
            <div class="module-area">
                <div class="module-item">
                    <router-link to="/user/AccountBalance">
                        <p class="number">{{userData.remainder_money}}</p>
                        <p class="sub-title">
                            <span class="text">余额</span>
                            <i class="right-arrow"></i>
                        </p>
                    </router-link>
                </div>
                <div class="module-item">
                    <router-link to="/user/CommissionList">
                        <p class="number">{{userData.distribut_money}}</p>
                        <p class="sub-title">
                            <span class="text">佣金</span>
                            <i class="right-arrow"></i>
                        </p>
                    </router-link>
                </div>
                <div class="module-item">
                    <router-link to="/user/TeamList">
                        <div class="link-item">
                            <p class="number">{{userData.get_all_lower}}</p>
                            <p class="sub-title">
                                <span class="text">团队</span>
                                <i class="right-arrow"></i>
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
            
            <div class="link-list">
                <router-link to="/notice/NoticeList">
                    <div class="link-item">
                        <div class="fl">
                            <span class="icon"><img src="/static/images/user/notice-icon.png" /></span>
                            <span class="text">公告信息</span>
                        </div>
                        <div class="more"></div>
                    </div>
                </router-link>
                <router-link to="/user/EditLevel" v-show="personalData.level > 1">
                    <div class="link-item">
                        <div class="fl">
                            <span class="icon"><img src="/static/images/user/level-icon.png" /></span>
                            <span class="text">等级更改</span>
                        </div>
                        <div class="more"></div>
                    </div>
                </router-link>
                <!-- <router-link to="/user/ReceiptInformation">
                    <div class="link-item">
                        <div class="fl">
                            <span class="icon"><img src="/static/images/user/money-icon.png" /></span>
                            <span class="text">收款信息</span>
                        </div>
                        <div class="more"></div>
                    </div>
                </router-link> -->
                <div class="link-item">
                    <div class="fl">
                        <span class="icon"><img src="/static/images/user/tel-icon.png" /></span>
                        <span class="text">手机号绑定</span>
                    </div>
                    <div class="more">{{userData.mobile}}</div>
                </div>
                <!-- <router-link to="/user/InviteLink">
                    <div class="link-item">
                        <div class="fl">
                            <span class="icon"><img src="/static/images/user/link-icon.png" /></span>
                            <span class="text">邀请链接</span>
                        </div>
                        <div class="more"></div>
                    </div>
                </router-link> -->
                <router-link to="/user/mySharing">
                    <div class="link-item">
                        <div class="fl">
                            <span class="icon"><img src="/static/images/user/share-icon.png" /></span>
                            <span class="text">我的推广</span>
                        </div>
                        <div class="more"></div>
                    </div>
                </router-link>

                <router-link to="/user/CustomerService">
                    <div class="link-item">
                         <div class="fl">
                            <span class="icon"><img src="/static/images/user/kefu-icon.png" /></span>
                            <span class="text">联系客服</span>
                        </div>
                        <div class="more"></div>
                    </div>
                </router-link>
        
            </div>
        </div>

        <!-- 底部 -->
        <Navigate></Navigate>
    </div>
</template>

<script>
    import Navigate from "@/pages/common/footer/Navigate";
    export default {
        name: "User",
        components: {
            Navigate,
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
                    .join-time
                        font-size 24px
            .member-msg
                position absolute
                top 85px
                right 0
                z-index 9
                .level
                    width 155px
                    height 50px
                    line-height 50px
                    text-align center
                    font-size 24px
                    color #ffffff
                    background url(/static/images/user/level-bg.png) no-repeat 
                    background-size 100%
                    padding-left 10px
                    box-sizing border-box
        .content
            margin-top -86px
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
                    background url(/static/images/user/right-arrow2.png) no-repeat right center
                    background-size 8px 14px
                    padding-right 22px
            .module-area
                height 140px
                background-color #fff
                margin-bottom 36px
                border-radius 10px
                display flex
                align-items center
                .module-item
                    flex 1
                    text-align center
                    border-right 1px solid #efece9
                    &:last-child
                        border-right none
                    a
                        display block
                    .number
                        font-size 36px
                    .sub-title
                        font-size 28px 
                        .right-arrow
                            width 7px
                            height 11px
                            display inline-block
                            background url(/static/images/user/right-arrow.png) no-repeat
                            background-size 7px 11px
                            margin-left 5px
                            vertical-align middle
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
                    color #525252
                    border-bottom 1px solid #e6e6e6
                    &.border-none 
                        border-bottom none
                    .fl
                        flex 1
                        display flex
                        align-items center
                        .icon
                            width 38px
                            height 38px
                            display inline-block
                            margin-right 30px
                            img
                                width 100%
                    .more 
                        min-width 8px
                        min-height 14px
                        background url(/static/images/user/right-arrow2.png) no-repeat right center
                        background-size 8px 14px
                        padding-right 30px            

</style>
