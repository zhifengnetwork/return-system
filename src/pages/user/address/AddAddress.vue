<template>
    <div class="addAddress">
        <TopHeader custom-title="新增地址">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>

        <div class="content">
            <div class="address-info">
                <div class="form-group">
                    <div class="label">收货人</div>
                    <div class="input-group">
                        <input type="text" placeholder="收货人姓名" v-model="userName">
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">手机号码</div>
                    <div class="input-group">
                        <input type="number" placeholder="输入电话号码" v-model="userMobile">
                    </div>
                </div>
                <!-- <router-link to="/user/selectPoint"> -->
                    <div class="form-group">
                        <div class="label">收货地址 </div>
                            <div class="input-group">
                                <van-button type="primary" @click="showPopup">{{this.address}}</van-button>
                                <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
                                    <van-area :area-list="areaList" :columns-num="3" @confirm="onAddrConfirm" @cancel="onAddrCancel" />
                                </van-popup>
                            </div>
                        <div class="right-arrow"></div>
                    </div>
                <!-- </router-link> -->
                <div class="details-address">
                    <div class="label">详细地址</div>
                    <div class="textarea"  ref="detailAddress" contenteditable="true" placeholder ="详细地址，例D座726"></div>
                </div>
            </div>

            <!-- 设置默认地址 -->
            <div class="set-default">
                <div class="label">设置默认地址</div>
                <van-switch
                    v-model="checked"
                    size="24px"
                />
            </div>

            <!-- 保存按钮 -->
            <div class="saveBtn" @click="onSave()">保存</div>
            
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
import { Popup,Area,Toast } from 'vant'
export default {
    name:'addAddress',
    components: {
        TopHeader
    },
    data(){
        return {
            show: false,// 地区上拉列表显示隐藏
            checked: false,// 设置默认地址
            userName:'',// 收货人姓名
            areaList:{},// 选择地区上拉列表
            detailAddress:"",// 详细地址
            userMobile:'',// 手机号
            address:'选择省/市/区',//点击选择省/市/区展示
            // location:{},// 请选择地址
            addressId:'',// id
            code:'',// 区id
            address_id:0,// 传过来的id
        }
    },
    created() {
        // this.modify();
        this.codes();// 获取省、市、区接口
    },
    mounted() {
        
    },
    methods:{
        // 省市区上拉
        showPopup() {
            this.show = true;
        },
        // 地区确定选择
        onAddrConfirm(val){  
            this.show = false;
            this.address = val[0].name+ val[1].name +val[2].name
            this.code =val[2].code// 传给后台的district-区id
            this.district=val[2].code
            console.log(this.code)
        },
        // 地区取消选择
        onAddrCancel(){  
            this.show = false
        },
        // 保存地址按钮
        onSave(addressData){
            var _that=this
            _that.detailAddress =_that.$refs.detailAddress.innerText
            var url ='address/addAddress'
            if(!_that._verifyUserInfo()){return}
            _that.$axios.post(url,{
                // 传给后台的参数
                'token':this.$store.getters.optuser.Authorization,
                'address_id':_that.addressId,
                'consignee':_that.userName,
                'mobile':_that.userMobile,
                'is_default':_that.checked,
                'district':_that.code,
                'address':_that.detailAddress,
            })
            .then((res)=>{
                _that.$toast('地址添加成功')                
                setTimeout(() => {
                    // _that.$router.push("/user/Address");
                    _that.$router.go(-1);
                }, 1000);
            })
            .catch( (error) => {
                // Toast("请求错误:" + error)
            })
        },
        // 判断输入
        _verifyUserInfo(){
            var _that =this
            let mobile_reg=/^1[345678]\d{9}$/
            var detailAddress =_that.$refs.detailAddress.innerText
            if( _that.userName === ""){
                _that.$toast("请输入收货人姓名")
                return false
            }
            if( _that.userMobile === ""){
                _that.$toast("请输入电话号码")
                return false
            }
               if(!(/^1[3456789]\d{9}$/.test(_that.userMobile))){ 
                _that.$toast("手机格式有误");  
                return false; 
            }
            if(!_that.code){
                _that.$toast("请选择省市区");
                return
            }
            if(_that.detailAddress==""){
                _that.$toast("请输入详情地址")
                return false
            }
            return true
        },
        // 获取省、市、区接口
        codes() {
            var url = 'user/get_address'
            var params = new URLSearchParams();
                params.append('token', this.$store.getters.optuser.Authorization);//要传给后台的参数值 key/value //token
            this.$axios({
                method:"post",
                url:url,
                data:params
            }).then((res)=>{
                if(res.data.status === 200){
                    this.areaList = res.data.data
                } else {
                    Toast(res.data.msg)
                }
            })
        }
    },        

}
</script>

<style lang="stylus" scoped>
.addAddress
    min-height 100vh
    background-color #ffffff
    .content
        padding 20px 24px 0
        box-sizing border-box 
        .address-info
            padding 0 28px
            box-sizing border-box  
            box-shadow 1px 1px 8px #ccc
            margin-bottom 14px   
            .form-group
                height 56px
                display flex
                align-items center
                border-bottom 1px solid #e6e6e6
                padding-top 22px
                padding-bottom 10px
                .label
                    width 145px
                    font-size 24px
                    color #151515
                    margin-right 10px
                .input-group
                    width 460px
                    font-size 24px
                    .van-button--primary
                        padding 0
                        width 460px
                        height 56px
                        line-height 56px
                        text-align left 
                        background #fff
                        color #151515
                        border none
                        outline none
                    input
                        width 100%
                        height 30px
                        border none
                    h3
                        font-size 24px
                        color #151515
                        font-weight normal
                    p
                        color #838383
                        font-size 22px
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap  
                .right-arrow
                    width 8px
                    height 14px
                    background url("/static/images/user/address/right-arrow.png") no-repeat
                    background-size 100%
                    margin-left 20px
            .details-address
                min-height 56px
                display flex
                padding-top 22px
                padding-bottom 10px 
                .label
                    width 145px
                    font-size 24px
                    color #151515
                    margin-right 10px 
                .textarea
                    flex 1
                    font-size 24px
                    color #858585
                    min-height 30px
                    line-height 30px
                    max-height 140px
                    _height 120px
                    margin-left auto
                    margin-right auto
                    padding 3px
                    outline 0                    
                    padding 2px
                    word-wrap break-word
                    overflow-x hidden
                    overflow-y auto
                    _overflow-y visible
                    -webkit-user-modify read-write-plaintext-only // 只是编辑text文本，只能解决webkit内核里面问题，手机端适用
                    -webkit-user-select text // 解决IOS部分手机不支持contenteditable=true属性问题               
                .textarea[placeholder]:empty:before 
                    content attr(placeholder) 
                // 焦点时内容为空
                .textarea[placeholder]:empty:focus:before 
                    content ""
        .set-default
            height 88px
            display flex
            justify-content space-between
            align-items center 
            padding 0 28px
            box-sizing border-box  
            box-shadow 1px 1px 8px #ccc
            .label
                width 145px
                font-size 24px
                color #151515
                margin-right 25px  
        .saveBtn
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

</style>
