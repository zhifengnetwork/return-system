<template>
    <div class="Evaluate">
        <TopHeader custom-title="提交评价">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="content">
            <div class="evaluate-wrap">
                <!-- 评价框 -->
                <div class="textBox">
                    <textarea placeholder="物流真快" v-model="content"></textarea>
                </div>
                <!-- 添加图片 -->
                <!-- <div class="addPic">
                    <span class="camera-icon"></span>
                    <span>添加图片</span>
                    <input type="file" class="input-file" multiple="multiple" @change="onRead($event)" accept="image/gif,image/jpeg,image/jpg,image/png" >
                </div> -->

                <van-uploader v-model="fileList" :after-read="onRead" :accept="'image/*'" multiple  :max-count="3" />
            </div>

            <div class="rate-wrap">
                <h2>商品评分</h2>
                <div class="rate-item">
                    <div class="label">描述相符</div>
                    <van-rate
                        v-model="rateVal"
                        icon="like-o"
                        void-icon="like-o"
                        color="#f70a0a"
                    />
                </div>
                <!-- <div class="rate-item">
                    <div class="label">物流服务</div>
                    <van-rate
                        v-model="rateVal2"
                        icon="like-o"
                        void-icon="like-o"
                        color="#f70a0a"
                    />
                </div> -->
                <!-- <div class="rate-item">
                    <div class="label">服务态度</div>
                    <van-rate
                        v-model="rateVal3"
                        icon="like-o"
                        void-icon="like-o"
                        color="#f70a0a"
                    />
                </div> -->
            </div>
            
            <div class="btn" @click="submitData()">发布评价</div>

        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'Evaluate',
    components: {
        TopHeader
    },
    data(){
        return {
            rateVal:0,   
            content:'',
            postData:[],
            fileList:[],
        }
    },
    methods:{
        onRead (file) { 
            this.postData.push(file.content)
        },
        submitData(){
            var _that = this,news=[]
            let url = '/Order/order_comment'
            var query =this.$route.query
            var params = new URLSearchParams();
            var returnObj = new Object();//创建一个对象
             returnObj.order_id=query.order_id
             returnObj.goods_id=query.goods_id
             returnObj.sku_id=query.sku_id
             returnObj.star_rating=_that.rateVal
             returnObj.content=_that.content
             returnObj.img=_that.postData
             if(_that.content==""){
                return _that.$toast("您还没有输入评论内容哦！")
             }
             if(_that.rateVal==0){
                 return _that.$toast("您还没有打分哦！")
             }
             news.push(returnObj)
                params.append('token',_that.$store.getters.optuser.Authorization)
                params.append('comments', JSON.stringify(news));
                _that.$axios.post(url,params).then((res)=>{
                    if(res.data.status === 200){
                        _that.$toast("评论成功")
                        _that.$router.push('/User')
                    }else if(res.data.status==999){
                        _that.$store.commit('del_token'); //token，清除它;
                    }else{
                        _that.$toast(res.data.msg)
                    }
                })
        }
    }

}
</script>

<style lang="stylus" scoped>
.content
    padding 0 24px 
    box-sizing border-box
    .evaluate-wrap
        width 100%
        // height 450px
        border 1px solid #a7a7a7
        border-radius 8px
        padding 30px
        box-sizing border-box
        .textBox
            width 100%
            margin-bottom 20px
            textarea
                width 100%
                height 200px
                font-size 26px
                color #888888
                border none 
                background none
                resize none
        .van-uploader__upload
            width 60px
            height 60px
        // .van-uploader__preview-image
        //     width 60px
        //     height 60px
        .addPic
            width 120px
            height 120px
            display flex
            flex-direction column
            align-items center
            justify-content center
            font-size 26px
            color #888888
            border 1px dashed #595959
            border-radius 5px
            position relative
            .camera-icon
                width 46px
                height 38px
                display block
                background url("/static/images/order/camera-icon.png") no-repeat
                background-size cover
                margin-bottom 20px
            .input-file
                width 100%
                height 100%
                position absolute
                left 0
                top 0
                opacity 0
            
    .rate-wrap
        h2
            font-size 30px
            margin 30px auto 70px
        .rate-item
            font-size 30px
            height 36px
            line-height 30px
            display flex
            margin-bottom 40px
            .label
                margin-right 44px
    .btn
        width 92%
        height 88px
        line-height 88px
        color #ffffff
        font-size 30px
        text-align center
        background-color #ff4d4d
        border-radius 40px
        position fixed
        left 50%
        bottom 68px
        margin-left -46%

            

</style>
