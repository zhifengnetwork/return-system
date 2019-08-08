<template>
    <div class="Scroller" ref="scroller">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name:'Scroller',
    props:{
        handleToScroll:{
            type:Function,
            default:function(){}
        },
        hangdleToTouchEnd:{
            type:Function,
            default:function(){}
        }
    },
    mounted(){
        // 初始化
        var scroll = new BScroll(this.$refs.scroller,{
            click:true,
            probeType:1
        });

        scroll.on('scroll',(pos)=>{
           this.handleToScroll(pos);
        });

        scroll.on('touchEnd',(pos)=>{
           this.hangdleToTouchEnd(pos);
        });

       

    }

}
</script>

<style lang="stylus" scoped>
.Scroller
    height 100%
</style>
