<template>
    <div class="TeamList">
        <!-- 头部组件 -->
        <TopHeader custom-title="团队列表">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="tab-title">
                <span @click="handleTitle(1)" :class="[isActive ? 'active' : '']">直推会员({{directNumber}})</span>
                <span @click="handleTitle(2)" :class="[isActive ? '' : 'active']">其他会员({{otherNumber}})</span>
            </div>
            <div class="tab-container">
                <div class="thead">
                    <span>用户ID</span>
                    <span>名称</span>
                    <span>电话</span>
                    <span>订单</span>
                </div>
                <div class="member-list" v-if="teamList.length > 0">
                    <div class="member-item" v-for="(item,index) in teamList" :key="index">
                        <div class="column">{{item.id}}</div>
                        <div class="column">{{item.realname}}</div>
                        <div class="column" @click="onCall(item.mobile)">{{item.mobile}}</div>
                        <div class="column"><router-link :to="'/user/ViewOrders?user_ids=' + item.id">查看</router-link></div>
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
    name:'TeamList',
    components: {
        TopHeader,
    },
    data(){
        return{
           type:1, 
           isActive:true,
           teamList:[],
           directNumber:0,
           otherNumber:0,
        }
    },
    created(){
        this.$store.commit('showLoading');
        this.handleTitle(1);
    },
    methods:{
        /**
         * 标题切换
         */
        handleTitle(i){
            this.type = i;
            if(i == 1){
                this.isActive = true
            }else{
                this.isActive = false
            }

            let url = 'user/team_list';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                type:this.type
            }).then((res) => {
                if(res.data.status == 200){
                    this.teamList = res.data.data.list;
                    this.directNumber = res.data.data.num[0];
                    this.otherNumber = res.data.data.num[1];
                }else{
                    this.$toast(res.data.msg)
                }
                this.$store.commit('hideLoading')
            }).catch((error) => {

            })
            
        },

        /**
         * 拨打电话
         */
        onCall(tel){
            // console.log(tel)
            window.location.href = `tel:${tel}`; 
        }

    }
}
</script>

<style lang="stylus" scoped>
.TeamList
    height 100%
    background-color #fff
    .content
        padding 0 24px
        box-sizing border-box
        .tab-title
            height 70px
            font-size 28px
            background-color #ffffff
            display flex
            align-items center
            justify-content space-around
            span 
                flex 1
                text-align center
                height 100%
                line-height 70px
                &.active
                    color #ef1010
        .tab-container
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
            .member-item
                width 100%
                height 70px
                display flex
                align-items center
                background-color #fff4f0
                .column
                    flex 1
                    text-align center
                    font-size 22px
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
