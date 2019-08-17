<template>
    <div class="SetPassword">
        <TopHeader custom-title="设置支付密码">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        
        <!-- <h1>设置支付密码</h1> -->
        <div class="edit-container">
            <div class="form-group">
                <i class="icon tel-icon"></i>
                <input type="number" placeholder="请输入手机号" v-model="phone">
            </div>
            <!-- <div class="form-group">
                <i class="icon verify-icon"></i>
                <input type="text" placeholder="请输入验证码" v-model="verifyCode">
                <button class="verifyCode" :disabled="disabled" @click="getVerifyCode()">{{verifyText}}</button>
            </div> -->
            <div class="form-group">
                <i class="icon password-icon"></i>
                <input type="password" placeholder="请输入密码" v-model="password" >
            </div>
            <div class="form-group">
                <i class="icon password-icon"></i>
                <input type="password" placeholder="请再次输入密码" v-model="password2" >
            </div>

            <div class="btn" :class="{'hiLine':phone!='','hiLine':verifyCode!='','hiLine':password!='' ,'hiLine':password2!=''}" @click="confirmClick()">确定</div>

            <!-- <div class="jump-link">
                <router-link to="/Login">登录</router-link>
                <router-link to="/Register">注册账号</router-link>
            </div> -->
            
        </div>
       
    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader";
import md5 from 'js-md5';
export default {
    name:'SetPassword',
 	components: {
		TopHeader
	},
    data(){
        return{
            phone:'',//手机号
            verifyCode:'',//验证码
            disabled:false,
            verifyText:'获取验证码',
            password:'',//密码
            password2:'',//重复密码
        }
    },
    methods:{
        /**
         * 获取验证码
         */
        getVerifyCode(){
            if(this.validatePhone()){
                // 发送网络请求
                var $phone = this.phone;
                var $temp = 'sms_forget';
                var $md = md5($phone+$temp)
                this.$axios.post('user/sendVerifyCode',{
                    phone:this.phone,
                    temp:$temp,
                    auth:$md,
                    type:1
                })
                .then( (res)=>{
                    var status = res.data.status
                    if(status === 200){
                        // 开启倒计时
                        this.countDown();
                        this.$toast(res.data.data)
                    }else{
                        this.$toast(res.data.msg)
                    }
                })
                .catch((error) => {
                    alert('请求错误:'+ error)
                })
            } 
        },
       
        /**
         * 校验手机号
         */
        validatePhone(){
            if(!this.phone){
                this.$toast('手机号码不能为空')
                return false;
            }else if(!/^1[345678]\d{9}$/.test(this.phone)){
                this.$toast('请填写正确的手机号码')
                return false;
            }else{
                return true;
            }
        },

        /**
         * 倒计时效果
         */
        countDown(){
            var count = 60;
            var timer = setInterval( () => {
                if(count == 0){
                    clearInterval(timer);
                    this.verifyText = "重新获取";
                    this.disabled = false;
                }
                else if(count < 10){
                    count = "0" + count;
                    this.verifyText =  count + "秒后重试";
                    this.disabled = true;
                    count -- ;
                }
                else{
                    //倒计时
                    this.verifyText = count + "秒后重试";
                    this.disabled = true;
                    count -- ;
                }
            },1000);
        },

        /**
         * 修改密码
         */
        confirmClick(){
            var that = this;
            if(that.phone == ''){
                that.$toast('手机号码不能为空')
                return false
            }else if(!/^1[345678]\d{9}$/.test(that.phone)){
                that.$toast('请填写正确的手机号码')
                return false
            }
            // else if(that.verifyCode == ''){
            //     that.$toast('验证码不能为空')
            //     return false
            // }
            else if(that.password == ''){
                that.$toast('密码不能为空')
                return false
            }else if(!/^[a-z0-9_-]{6,18}$/.test(that.password)){
                that.$toast('密码长度为6-18位')
                return false
            }else if(that.password != that.password2){
                that.$toast('两次密码不一致')
                return false
            }else{
                // 请求修改密码接口
                var url = "/user/resetPassword"
                this.$axios.post(url,{
                    phone:this.phone,
                    type:2,
                    // verify_code:this.verifyCode,
                    user_password:this.password,
                    confirm_password:this.password2,
                })
                .then((res)=>{
                    if(res.data.status === 200){
                        that.$toast('修改成功')                
                        setTimeout(() => {
                            // that.$router.push("/home");
                            this.$router.go(-1)
                        }, 1000);
                    }else{
                        that.$toast(res.data.msg)
                    }
				})  
            }
        },

    }

}
</script>

<style lang="stylus" scoped>
.SetPassword
    width 100%
    min-height 100vh
    background-color #ffffff
    h1
        height 208px
        line-height 208px
        text-align center
        font-weight normal
        font-size 36px
    .edit-container
        padding 0 24px
        box-sizing border-box
        margin-top 30px
        .form-group
            width 100%
            height 90px
            border-bottom 1px solid #f56817
            display flex
            align-items center
            .icon
                width 56px
                height 100%
                display inline-block
                margin-right 20px
            .tel-icon
                background url(/static/images/login/tel-icon.png) no-repeat center center
                background-size 20px 30px
            .password-icon
                background url(/static/images/login/password-icon.png) no-repeat center center
                background-size 24px 28px
            .verify-icon
                background url(/static/images/login/verifyCode-icon.png) no-repeat center center
                background-size 14px 30px
            input 
                height 50px
                flex 1
                font-size 26px
            .verifyCode
                height 90px
                line-height 90px
                font-size 30px
                color #f4550b  
                padding 0 24px
                box-sizing border-box 
                background none
                border none
        .btn
            width 100%
            height 88px
            text-align center
            line-height 88px
            border-radius 40px
            font-size 36px
            color #ffffff
            background linear-gradient(to right, #f9a775,#fb946a)
            margin-top 88px
        .hiLine
            background linear-gradient(to right, #f66716,#f94e08)
        .jump-link
            width 100%
            font-size 28px
            margin-top 20px
            padding 0 38px
            box-sizing border-box
            display flex
            justify-content space-between
            a
                color #fa9f71
        

</style>
