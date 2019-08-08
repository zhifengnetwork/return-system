<template>
    <div class="selectPoint">
        <div class="map">
            <iframe id="mapPage" width="100%" height="700px" frameborder=0
                src="https://apis.map.qq.com/tools/locpicker?search=1&policy=1&type=1&key=VFUBZ-JIR3D-Z2M4H-PPAGG-G5KVQ-S3F2S&referer=myapp">
            </iframe>
            <!-- <iframe id="mapPage" width="100%" height="700px" frameborder=0
                src="https://apis.map.qq.com/tools/locpicker?search=1&policy=1&type=0&backurl=http://3gimg.qq.com/lightmap/components/locationPicker2/back.html&key=VFUBZ-JIR3D-Z2M4H-PPAGG-G5KVQ-S3F2S&referer=myapp">
            </iframe> -->
        </div>
    </div>
</template>

<script>
export default {
    name:'selectPoint',
    created: function(){
        var that = this;
        window.addEventListener('message', function(event){
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            var loc = event.data;
            if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                // console.log('location', loc.poiaddress,loc.poiname);
                // console.log('location', loc);
                // 跳转路由
                // that.$router.push({name:'addAddress',params:{'poiaddress':loc.poiaddress,'poiname':loc.poiname}})
                that.$router.push({name:'AddAddress',params:{'location':loc}})
            }
        }, false);
    },
}
</script>

<style lang="stylus" scoped>
body
    position absolute
    width 100%
    height 100%
    text-align center
    .selectPoint
        min-height 100vh
        background-color #ffffff

    

            

</style>
