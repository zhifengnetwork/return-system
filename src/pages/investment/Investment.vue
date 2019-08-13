<template>
    <div class="Investment">
        <!-- 头部组件 -->
        <TopHeader custom-title="投资记录">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            
        </div>

        <!-- 底部 -->
        <Navigate></Navigate>
    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
import Navigate from "@/pages/common/footer/Navigate"
export default {
    name:'Investment',
    components: {
        TopHeader,
        Navigate,
    },
    data(){
        return{
          
        }
    },
   
    methods:{
      
        
    },
   
}
</script>

<style lang="stylus" scoped>

</style>
