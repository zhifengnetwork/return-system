<template>
    <div class="Login">
        <h1>登录</h1>
        <div class="login-container">
            <div class="form-group">
                <i class="icon tel-icon"></i>
                <input type="text" placeholder="输入手机号" v-model="phone">
            </div>
            <div class="form-group">
                <i class="icon password-icon"></i>
                <input :type="isHide?'password':'text' " placeholder="输入密码" v-model="password">
                <div class="eyes" @click="handleEyes()">
                    <i :class="isHide?'close-eyes':'open-eyes'"></i>
                </div>
            </div>
            <div class="btn" :class="{'hiLine':phone!=''}"  @click="saveUserInfo()">登录</div>

            <div class="jump-link">
                <router-link to="/Register">注册账号</router-link>
                <!-- <div class="appDown" @click="download()">APP下载</div> -->
                <!-- <router-link to="" class="appDown">APP下载</router-link> -->
                <router-link to="/EditPassword">忘记密码</router-link>
            </div>
        </div>
       
    </div>
</template>
<script>
import md5 from 'js-md5';
export default {
    name:'Login',
    data(){
        return{
            phone:'',//手机号
            password:'',//密码
            isHide:true,  //是否显示密码
            disabled:false
        }
    },
    created(){
        if(this.$store.getters.optuser.Authorization){       //返回登录页 如果有token 就返回首页
            this.$router.push('/Home')
        }
    },
    methods:{
        saveUserInfo() {
            var _that=this;
            if(! _that._verifyUserInfo()){ return }
            let url = 'user/login'
             _that.$axios.post(url,{
                phone: _that.phone,
                user_password: _that.password
            })
            .then((res)=>{
                var list=res.data;
                if(list.status==200){
                    _that.$toast({message:"登陆成功,正在跳转...",duration:1000})
                    localStorage.removeItem('Authorization');
                    var tokens = list.data.token
                    _that.$store.commit('set_token',{Authorization: tokens})  //保存token
                    setTimeout(()=>{
                        _that.$router.push({path:'/Home',name:'Home'})
                    },1000)
                }else{
                    _that.$toast(list.msg)
                }
            })
            .catch((error) => {
                alert('请求错误:'+ error)
            }) 
        },
        /**
         * 密码显示开关
         */
        handleEyes(){
            this.isHide = !this.isHide
            // ss
        },

        /**
         * 校验登录
         */
        _verifyUserInfo(){
            let mobile_reg=/^1[3456789]\d{9}$/
            let pswd_reg =/^[a-z0-9_-]{6,18}$/
            if(this.phone == '' || !mobile_reg.test(this.phone)){
                // return this.$toast('手机号码不能为空')
                this.$toast('请填写正确的手机号码')
                return false
            }
            // if(!mobile_reg.test(this.phone)){
            //     this.$toast('请填写正确的手机号码')
            //     return false
            // }
            if(this.password == ''){
                this.$toast('密码不能为空')
                return false
            }
            if(!pswd_reg.test(this.password)){
               this.$toast('密码长度为6-18位')
                return false
            }
            return true
        },
        // 判断ios终端/android终端
        download() {
            let ua = navigator.userAgent.toLowerCase();
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios终端
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.location = 'https://fir.im/efuc'

            } else if (/(Android)/i.test(navigator.userAgent)) {
                window.location = 'https://fir.im/81wf'
            }

            function isWeixinBrowser() {
                return (/micromessenger/.test(ua)) ? true : false;
            }
        },
    }
}
</script>

<style lang="stylus" scoped>
.Login
    width 100%
    min-height 100vh
    background-color #ffffff
    h1
        height 208px
        line-height 208px
        text-align center
        font-weight normal
        font-size 36px
    .login-container
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
            input 
                height 50px
                flex 1
                font-size 30px
            .eyes
                width 82px
                height 100%
                i 
                    width 100%
                    height 100%
                    display inline-block
                .close-eyes
                    width 82px
                    background url(/static/images/login/close-eyes.png) no-repeat center center
                    background-size 36px 17px
                .open-eyes
                    width 82px
                    background url(/static/images/login/open-eyes.png) no-repeat center center
                    background-size 36px 24px
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
                // color #1e82d2
                color #fa9f71
            .appDown
               font-size 34px
               text-decoration underline
               color #fa9f71


</style>
