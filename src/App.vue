<template>
  <div id="app">
    <router-view/>
	<!-- loading 加载 -->
	<Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Loading from '@/pages/common/loading/Loading'
export default {
	name: 'App',
	computed:{
		...mapState([
		'isLoading'
		])
  	},
	components:{
		Loading
	}
}
</script>

<style lang="stylus">
body
	background-color #f2f2f2
	color #151515
	.height-88
		width 100%
		height 88px


</style>
