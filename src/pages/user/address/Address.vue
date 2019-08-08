<template>
    <div class="AddressView">
        <TopHeader custom-title="收货地址">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>

        <div class="content">
            <div class="address-list" v-for="(item,index) in siteList" :key="index">
                <div class="address-item" @click="slectAddress(index)">
                    <div class="item-name">
                        <span class="name">{{item.consignee}}</span>
                        <span class="tel">{{item.mobile}}</span>
                    </div>
                    <div class="item-address">
                        <div class="isDefault" v-if="item.is_default===1">默认</div>
                        <div class="exact-address">
                            <p>{{item.p_cn}}&nbsp;{{item.c_cn}}&nbsp;{{item.d_cn}}</p>
                            <p>{{item.address}}</p>
                        </div>
                    </div>
                </div>
                <div class="operation-bar">
                    <router-link :to="'/user/EditAddress?address_id='+item.address_id">
                        <span class="iconfont icon-bianji1 edit"></span>
                    </router-link>
                    <span class="iconfont icon-guanbi del-icon" @click="delSite(item,index)"></span>
                </div>
            </div>
            <router-link to="/user/AddAddress">
                <div class="add-address">
                    <span class="plus-icon"><img src="/static/images/user/address/plus-icon.png" /></span>
                    <span>新建收货地址</span>
                </div>
            </router-link>

        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
import { Dialog,Toast  } from 'vant'
export default {
    name:'AddressView',
    components: {
        TopHeader
    },
    data(){
        return {
           siteList:[]
        }
    },
    created(){
        this.$store.commit('showLoading')       //加载loading
        this.requestData();                     // 请求用户地址列表数据
    },
    methods:{
        slectAddress(key){                      //选择默认地址
            var edit_ =this.$route.query.edit_address
            if(edit_ !=1){return}
            var _that =this,
                list =_that.siteList[key]
            var url ='address/set_default_address'
            _that.$axios.post(url,{              // 传给后台的参数
                'token':this.$store.getters.optuser.Authorization,
                'address_id':list.address_id
            })
            .then((res)=>{
                if(res.data.status==200){
                    this.$router.go(-1)
                } 
            })
            .catch( (error) => {
                alert("请求错误:" + error)
            })
        },
        requestData() {     // 请求用户地址列表数据
            var url = 'address/addressList'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);  
            this.$axios({
                method:"post",
                url:url,
                data:params
            }).then((res)=>{
                this.$store.commit('hideLoading')
                if(res.data.status === 200){
                    this.siteList = res.data.data
                    console.log(this.siteList)
                }else if(res.data.status===999){
                    this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }
                else {
                    this.$toast({message:"暂无地址信息,请添加地址",duration:2000})
                }
            })
        },
        // 删除地址
        delSite(item,index) {
            var url = 'address/delAddress'
            var params = new URLSearchParams();
                params.append('id',item.address_id);       // 传给后台的参数值 
                params.append('token', this.$store.getters.optuser.Authorization); // 传给后台的参数值 
            Dialog.confirm({
                title: '温馨提示',
                message: '你确定要删除当前地址吗?',
            }).then(() => {
                this.$axios({
                    method:"post",
                    url:url,
                    data:params
                }).then((res)=>{
                    if (res.data.status === 200){
                        this.siteList.splice(index,1)
                        this.$toast({message:"删除成功",duration:1000})
                        // Toast('删除成功');
                    } else {
                        // this.$toast({message:"暂无地址信息,请添加地址",duration:1000})
                        Dialog.alert({
                            message:res.data.msg
                        })
                    }
                })
            }).catch(() => {
                // on cancel
            }); 
        },
    }

}
</script>

<style lang="stylus" scoped>
.AddressView
    min-height 100vh
    background-color #ffffff
    .content
        padding 25px 24px 128px
        box-sizing border-box
        background-color #ffffff
        
        .address-list   
            position relative
            display flex
            padding 28px 120px 28px 28px
            box-sizing border-box
            box-shadow 1px 1px 8px #ccc
            margin-bottom 20px
            .address-item
                width 100%
                // height 205px
                font-size 30px
                box-sizing border-box
                
                position relative
                .item-name
                    display flex
                    align-items center
                    margin-bottom 20px
                    .name   
                        margin-right 50px
                    .tel
                        flex 1
                .item-address
                    display flex
                    .isDefault
                        width 54px
                        height 28px
                        line-height 28px
                        text-align center
                        font-size 24px
                        color #ffffff
                        background-color #43c439
                        border-radius 3px
                        margin-right 20px
                        margin-top 5px
                    .exact-address
                        flex 1
                        font-size 0
                        p
                            line-height 40px
                            font-size 30px
                            // overflow hidden
                            // display -webkit-box
                            // -webkit-line-clamp 2
                            // -webkit-box-orient vertical
            .operation-bar
                position absolute
                right 10px
                top 16px
                span 
                    color #7f7f7f
                    font-size 36px
                .del-icon
                    margin-left 22px
        .add-address
            width 92%
            height 88px
            line-height 88px
            text-align center
            font-size 36px
            color #ffffff
            background-color #ff4d4d
            position fixed
            left 50%
            bottom 25px
            margin-left -46%
            border-radius 40px
            .plus-icon
                width 37px
                display inline-block
                vertical-align middle
                margin-right 15px
                img 
                    width 100%

   

            

</style>
