<template>
    <div class="Purchase">
        <!-- 头部组件 -->
        <TopHeader custom-title="投资购买">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="module-box">
                <div class="text-container">
                    <div class="row-line">
                        <div class="sub-title">当前投资币：</div>
                        <div class="text">
                            <input type="number" placeholder="请输入投资币" v-model="currencyVal" @blur.prevent="validateVal()" ref="currencyVal">
                        </div>
                    </div>
                    <div class="row-line">
                        <div class="sub-title">当前投资金额：</div>
                        <div class="text">{{calcAmount}}</div>
                    </div>
                </div>
            </div>

            <div class="module-box">
                <div class="text-container">
                    <div class="row-line">
                        <div class="sub-title">收款人:</div>
                        <div class="text">{{receiptData.username}}</div>
                    </div>
                    <div class="row-line">
                        <div class="sub-title">电话:</div>
                        <div class="text">{{receiptData.iphone}}</div>
                    </div>
                    <div class="row-line">
                        <div class="sub-title">账号:</div>
                        <div class="text">{{receiptData.bank_card}}</div>
                    </div>
                    <div class="row-line">
                        <div class="sub-title">银行:</div>
                        <div class="text">{{receiptData.bank_name}}</div>
                    </div>
                </div>
            </div>

            <div class="module-box upload-wrap">
                <div class="upload-content">
                    <van-uploader
                        v-model="fileList"
                        multiple
                        :after-read="afterRead"
                        :max-count="1"
                        />
                </div>
            </div>
            <div class="vouchers">上传凭证</div>

            <div class="confirm-btn" @click="submitClick()">提交</div>

        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'Purchase',
    components: {
        TopHeader,
    },
    data(){
        return{
            fileList: [], //上传预览图
            currencyVal:'',
            scale:'', //比例
            currentAmount:'', //当前投资金额
            receiptData:[] //收款信息
        }
    },

    computed:{
        /**
         * 计算当前投资金额
         */
        calcAmount(){
            let currentAmount = new Number(this.currencyVal * this.scale);
            return currentAmount.toFixed(2);
        }
    },

    created(){
        this.reqData();
    },

    methods:{
        /**
         * 请求数据
         */
        reqData(){
            let url = 'pay/investment';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
            }).then((res) => {
                if(res.data.status == 200){
                    this.scale = (res.data.data.bili[1]) / res.data.data.bili[0];
                    this.receiptData = res.data.data.info;
                    console.log(this.receiptData)
                }else{
                    this.$toast(res.data.msg)
                }
            }).catch((error) => {
                alert("请求失败:" + error)
            })
        },

        /**
         * 校验输入框的值
         */
        validateVal(){
            if(this.currencyVal < 600){
                this.$toast('投资币不可低于600');
                this.currencyVal = '';
                return 
            }
            else if(this.currencyVal % 600 != 0){
                this.$toast('投资币必须是600的倍数');
                this.currencyVal = '';
                return 
            }
            else{
                return true
            }
            
        },

        /**
         * 文件上传完毕后会触发after-read回调函数
         */
        afterRead(file){
            // 大于1.5MB的jpeg和png图片都缩小像素上传
            if(/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 1500000) {
                console.log(file.file.size)
                let canvas =  document.createElement('canvas')        // 创建Canvas对象(画布)
                let context = canvas.getContext('2d') 
                let img = new Image()                   // 创建新的图片对象 
                // 指定图片的DataURL(图片的base64编码数据)
                img.src = file.content
                // 监听浏览器加载图片完成，然后进行进行绘制
                // img.onload = () => {
                //     // 指定canvas画布大小，该大小为最后生成图片的大小
                //     canvas.width = 400
                //     canvas.height = 300
                //     /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
                //     如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/ 
                //     context.drawImage(img, 0, 0, 400, 300)
                //     // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
                //     file.content = canvas.toDataURL(file.file.type, 0.92) 
                // }                       
            }
        },

        /**
         * 提交
         */
        submitClick(){
            // console.log(this.fileList[0])
            let fileObj = this.fileList[0];
            if(this.currencyVal == ''){
                this.$toast('投资币的值不可为空');
            }
            else if(fileObj == '' || typeof(fileObj) == 'undefined'){
                return this.$toast('亲,还没有选择上传的凭证哦!')
            }else{
                fileObj = this.fileList[0].content
            }

            let url = '';
            this.$axios.post(url,{

            }).then((res) => {

            }).catch((error) => {
                alert('请求错误:' + error)
            })
        }
    },
   
}
</script>

<style lang="stylus" scoped>
.Purchase
    & /deep/ .TopHeader
        background none 
        border none
    .content    
        padding 0 24px
        box-sizing border-box
        .module-box
            width 100%
            background-color #ffffff
            border-radius 10px
            margin-bottom 20px
            padding 20px
            box-sizing border-box
            .text-container
                margin-left 170px
                .row-line
                    font-size 28px
                    height 60px
                    display flex
                    align-items center
                    .sub-title
                        margin-right 10px
                    .text
                        input 
                            width 200px
                            line-height 50px
                            border-bottom 1px solid #1b1b1b
        .upload-wrap
            height 300px
            display flex
            align-items center
            justify-content center
            .upload-content
                width 558px
                height 250px
                background-color #eeeeee
                border-radius 10px
                overflow hidden
                display flex
                align-items center
                justify-content center
                .van-uploader
                    max-width 558px
                    max-height 250px
                .van-uploader /deep/ .van-uploader__upload
                    width 109px
                    height 109px
                    margin 0
                    background url("/static/images/investment/add-upload.png") no-repeat
                    background-size 109px 109px
                    .van-icon
                        display none
                .van-uploader /deep/ .van-uploader__preview
                    margin 0
                .van-uploader /deep/ .van-uploader__preview-image
                    width auto
                    height auto
                    max-width 558px
                    max-height 250px
        .vouchers
            font-size 30px
            text-align center
        .confirm-btn
            width 92%
            height 88px
            font-size 30px
            color #ffffff
            background-color #ff4d4d
            text-align center
            line-height 88px
            border-radius 40px
            position fixed
            left 50%
            margin-left -46%
            bottom 30px
             
</style>
