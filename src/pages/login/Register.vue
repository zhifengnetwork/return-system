<template>
    <div class="Register">
        <h1>注册</h1>
        <div class="register-container">
            <div class="form-group">
                <i class="icon tel-icon"></i>
                <input type="number" placeholder="输入手机号" v-model="phone">
            </div>
            <!-- <div class="form-group">
                <i class="icon verify-icon"></i>
                <input type="text" placeholder="输入验证码" v-model="verifyCode">
                <button class="verifyCode" :disabled="disabled" @click="getVerifyCode()">{{verifyText}}</button>
            </div> -->
            <div class="form-group">
                <i class="icon password-icon"></i>
                <input type="password" placeholder="输入密码" v-model="password">
            </div>
            <div class="form-group">
                <i class="icon password-icon"></i>
                <input type="password" placeholder="确认密码" v-model="password2">
            </div>

            <div class="btn" :class="{'hiLine':phone!=''}" @click="registerClick()">注册</div>

            <div class="jump-link">
                <router-link to="/Login">登录</router-link>
                <router-link to="/EditPassword">忘记密码</router-link>
            </div>
            
        </div>
       
    </div>
</template>

<script>
import md5 from 'js-md5';
import '../../../static/js/public.js'
export default {
    name:'Register',
    data(){
        return{
            phone:'',//手机号
            verifyCode:'',//验证码
            disabled:false,
            verifyText:'获取验证码',
            password:'',//密码
            password2:'',//重复密码,
            uid:'',
            isClick:false,
            flag:false
        }
    },
    created(){
        this.uid=this.$route.query.uid
        // console.log(this.$route.query.uid)
    },
    methods:{
        /**
         * 获取验证码
         */
        getVerifyCode(){
            if(this.validatePhone()){
                if(this.isClick){
                    return;
                }
                this.isClick =true
                // 发送网络请求
                var $phone = this.phone;
                var $temp = 'sms_reg';
                var $md = md5($phone+$temp)
                this.$axios.post('user/sendVerifyCode',{
                    phone:this.phone,
                    temp:$temp,
                    auth:$md,
                    type:1
                })
                .then( (res)=>{
                    // this.isClick = false;
                    var status = res.data.status
                    if(status === 200){
                        // 开启倒计时
                        // this.countDown();
                        this.$toast(res.data.data)
                    }else{
                        this.$toast(res.data.msg)
                    }
                    this.isClick = false;
                })
                .catch((error) => {
                    this.isClick = false;
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
            }else if(!/^1[3456789]\d{9}$/.test(this.phone)){
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
         * 校验注册
         */
        registerClick(){
            var uid =""
            if('undefined' != typeof(this.uid)){
                uid =new Number(this.uid)
            }
            if(this.phone == ''){
                this.$toast('手机号码不能为空')
                return false
            }else if(!/^1[3456789]\d{9}$/.test(this.phone)){
                this.$toast('请填写正确的手机号码')
                return false
            }
            // else if(this.verifyCode == ''){
            //     this.$toast('验证码不能为空')
            //     return false
            // }
            else if(this.password == ''){
                this.$toast('密码不能为空')
                return false
            }else if(!/^[a-z0-9_-]{6,18}$/.test(this.password)){
                this.$toast('密码长度为6-18位')
                return false
            }else if(this.password2==""){
                this.$toast('确认密码不能为空')
                return false
            }else if(this.password != this.password2){
                this.$toast('两次密码不一致')
                return false
            }else{
                if(this.flag){
                    return;
                }
                this.flag = true;
                // 请求数据
                this.$axios.post('user/register',{
                    phone:this.phone,
                    // verify_code:this.verifyCode,
                    user_password:this.password,
                    confirm_password:this.password2,
                    uid:uid
                })
                .then( (res)=>{
                    var status = res.data.status
                    if(status === 200){
                       this.$toast('注册成功') 
                       setTimeout(() => {
                            this.$router.push("/Login");
                        }, 1000);
                    }else{
                        this.flag = false;
                        this.$toast(res.data.msg) 
                    }
                })
                .catch((error) => {
                    this.flag = false;
                    console.log('请求错误:'+ error)
                })
            }

        }

    }
}
</script>

<style lang="stylus" scoped>
.Register
    width 100%
    min-height 100vh
    background-color #ffffff
    h1
        height 208px
        line-height 208px
        text-align center
        font-weight normal
        font-size 36px
    .register-container
        padding 0 24px
        box-sizing border-box
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
                font-size 30px
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
