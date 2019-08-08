<template>
    <div class="MyTeam">
        <!-- 头部组件 -->
		<Team-Header custom-title="我的团队">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Team-Header>
        <div class="content">
                <p class="-team-title">
                    <span>上级:{{shanglist.realname}}</span>
                    <span>上级ID:{{shanglist.id}}</span>
                </p>
                <div class="list-wrap" v-for="(item,key) in zhilist">
                    <img class="-list-ico" :src="item.avatar"/>
                    <ul class="group-list">
                        <li class="-list-cont">
                            <span>{{item.mobile}}</span>
                            <span class="-msg-1">ID：{{item.id}}</span>
                        </li>
                        <li class="-list-cont">
                            <span>{{item.createtime | formatDate}}</span>
                            <span class="-msg-2">直推</span>
                        </li>
                    </ul>
                </div>
 
            <!-- 团队 -->

                <div class="list-wrap" v-for="(item,index) in tuanlist" :key="index">
                    <img class="-list-ico" :src="item.avatar"/>
                    <ul class="group-list">
                        <li class="-list-cont">
                            <span>{{item.mobile}}</span>
                            <span class="-msg-1">ID：{{item.id}}</span>
                        </li>
                        <li class="-list-cont">
                            <span>{{item.createtime | formatDate}}</span>
                            <span class="-msg-2">团队</span>
                        </li>
                    </ul>
                </div>


        </div>
    </div>
</template>

<script>
    import TeamHeader from "@/pages/common/header/TopHeader"
    export default {
	name: "myTeam",
	data() {
		return {
            teamList:[],
            shanglist:{},
            tuanlist:[],
            zhilist:[]
        };
    },
    created(){
        this.getTeamInfo();
        
    },
    methods:{
        getTeamInfo(){
            let _that=this,
                url = 'user/team';
            _that.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            }).then((res)=>{
                var list =res.data
                if(list.status===200){
                    _that.teamList =list.data;
                    _that.shanglist =list.data.shanglist
                    _that.tuanlist =list.data.tuanlist
                    _that.zhilist =list.data.zhilist
                    console.log( _that.teamList)
                }else{
                    _that.$toast(list.msg)
                }
            })
        }
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
	components: {
		TeamHeader,
	}
};
</script>

<style lang="stylus" scoped>
    .MyTeam
        width 100%
        height 100vh
        background #fff
        .head
            background none
        .content
            padding 24px
            color #151515
            font-size 28px
            .-team-title,.list-wrap
                display flex
                border-bottom  solid 1px #dcdcdc
                padding-bottom 25px
                margin-bottom 25px
             .-team-title
                justify-content space-between
                align-items center
            .list-wrap
                // display flex
                
                .-list-ico
                    width 109px
                    height 109px
                    margin-right 30px
                .group-list
                    margin-top 10px
                    .-list-cont
                        width 558px
                        display flex
                        justify-content space-between
                        margin 0 0 20px
                        .-msg-1
                            font-size 26px
                        .-msg-2
                            font-size 24px
                
            
                                                             
</style>