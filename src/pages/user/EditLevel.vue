<template>
	<div class="EditLevel">
		<!-- 头部组件 -->
		<TopHeader custom-title="等级更改">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="edit-container">
                <div class="input-group">
                    <div class="sub-title">下级ID:</div>
                    <input type="number" placeholder="请输入下级ID" v-focus v-model="lowe_id">
                </div>
                <div class="group-item input-group">
                    <van-dropdown-menu>
                        <van-dropdown-item v-model="currentValue" :options="levelArry" />
                    </van-dropdown-menu>
                </div>
                <div class="confirm-btn" @click="editLevel(lowe_id)">确定更改</div>
            </div>
		</div>
	</div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader"
	export default {
        name: "EditLevel",
        components: {
			TopHeader,
		},
		data() {
			return{
                lowe_id:'',
                currentValue: 0,
                levelArry: [
                    { text: '普通会员', value: 0 },
                    { text: '报单中心', value: 1 },
                    { text: '经理', value: 2 },
                    { text: '大区', value: 3 },
                    { text: '全国总代', value: 4 }
                ],
               
			}
        },

        methods:{
            /**
             * 修改用户名
             */
            editLevel(lowe_id){
                if(lowe_id == ''){
                    this.$toast("下级ID不能为空");
                    return false
                }else{
                    let url = '/user/edit_name';
                    this.$axios.post(url,{
                        token:this.$store.getters.optuser.Authorization,
                        id:this.lowe_id,
                    }).then((res) => {
                        if(res.data.status == 200){
                            this.lowe_id = id;
                            this.$toast({message:"级别修改成功",duration:1000})
                            setTimeout(() => {
                                this.$router.go(-1);
                            },1000)
                        }else{
                            this.$toast(res.data.msg)
                        }
                    }).catch((error) => {
                        alert("请求失败:" + error)
                    })
                }
            }
        },
	
	}
</script>

<style lang="stylus" scoped>
    .EditLevel
        width 100%
        height 100%
        background-color #fff
        & /deep/ .TopHeader
            border-bottom none    
        .content    
            padding 0 24px
            box-sizing border-box
            .edit-container
                margin-top 30px
                .input-group
                    width 100%
                    height 88px
                    font-size 28px
                    border 1px solid #ebebeb
                    margin-bottom 30px
                    border-radius 10px 
                    padding 0 20px
                    box-sizing border-box  
                    display flex  
                    align-items center
                    .sub-title
                        width 130px
                    input 
                        width 100%
                        height 50px
                        &::-webkit-input-placeholder
                            color #8b8b8b 
                .group-item
                    .van-dropdown-menu
                        width 100%
                        background none
                    .van-dropdown-menu /deep/ .van-dropdown-menu__item
                        justify-content space-between      
                        .van-dropdown-menu__title
                            width 100%        
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