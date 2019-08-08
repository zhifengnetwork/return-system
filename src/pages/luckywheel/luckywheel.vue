<template>
    <div class="container">
		<div class="jumpTo" @click="jumpToDetails(orderId)"></div>
        <div class="lucky-wheel">
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                     <div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
                </div>               
                <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">                   
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                            <div class="prize-pic">
                                <img :src="item.ico">
                            </div>
                            <!-- <div class="prize-count" v-if="item.count">
                                {{item.count}}
                            </div> -->
                            <div class="prize-type">
                                <!-- {{item.name}} -->
                                {{index}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
		<!-- 中奖弹窗 -->
		<div class="toast" v-show="toast_control">
            <div class="toast-container">
                <!-- <div class="title">恭喜你获得<span class="count">{{this.prize_list[this.index].number}}</span>张</div>
				<div class="money">{{this.prize_list[this.index].title}}<span class="unit">元</span></div> -->
				<div class="title">恭喜你获得<span class="count">{{this.results.number}}</span>张</div>
				<div class="money">{{this.results.name}}<span class="unit">元</span></div>
				<div class="close-btn" @click="close_toast"></div>
            </div>
        </div>
        <!-- <div class="toast" v-show="toast_control">
            <div class="toast-container">
                <img :src="toast_pictrue" class="toast-picture">
                <div class="close" @click="close_toast()"></div>
                <div class="toast-title">
                    {{toast_title}}
                </div>
                <div class="toast-btn">
                    <div class="toast-cancel"  @click="close_toast">关闭</div>
                </div>
            </div>
        </div> -->
        <div class="toast-mask" v-show="toast_control"></div>
    </div>
</template>
<script>
export default {
	data() {
		return {
		easejoy_bean: 0, //金豆
		lottery_ticket: 0, //抽奖次数
		prize_list: [
			// {
			// icon: require("../../../static/images/luckywheel/turntable-2.png"), // 奖品图片
			// count: 2, // 奖品数量
			// name: "5", // 奖品名称
			// isPrize: 1 // 该奖项是否为奖品
			// },
			// {
			// icon: require("../../../static/images/luckywheel/turntable-2.png"),
			// count: 1,
			// name: "5",
			// isPrize: 1
			// },
			// {
			// icon: require("../../../static/images/luckywheel/turntable-2.png"),
			// count: 2,
			// name: "5",
			// isPrize: 1
			// },
			// {
			// icon: require("../../../static/images/luckywheel/turntable-2.png"),
			// count: 1,
			// name: "5",
			// isPrize: 1
			// },
			// {
			// icon: require("../../../static/images/luckywheel/turntable-1.png"),
			// count: 1,
			// name: "10",
			// isPrize: 1
			// },
			// {
			// icon: require("../../../static/images/luckywheel/turntable-2.png"),
			// count: 1,
			// name: "5",
			// isPrize: 1
			// }
		], //奖品列表
		toast_control: false, //抽奖结果弹出框控制器
		hasPrize: false, //是否中奖
		start_rotating_degree: 0, //初始旋转角度
		rotate_angle: 0, //将要旋转的角度
		start_rotating_degree_pointer: 0, //指针初始旋转角度
		rotate_angle_pointer: 0, //指针将要旋转的度数
		rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
		rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
		click_flag: true, //是否可以旋转抽奖
		index: 0,
		results:{}, //抽奖结果
		orderId:this.$route.query.order_id
		};
	},

	created() {
		
		this.init_prize_list();
		this.reqTurntable();
	},

	computed: {
		toast_title() {
			return this.hasPrize
				? "恭喜您，获得" +this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name
				: "未中奖";
		},
		toast_pictrue() {
			return this.hasPrize
				? require("../../../static/images/luckywheel/congratulation.png")
				: require("../../../static/images/luckywheel/sorry.png");
		}
	},

	methods: {
		//此方法为处理奖品数据
		init_prize_list(list) {},
		/**
		 * 点击抽奖
		 */
		rotate_handle() {
			let url = 'turntable/get_gift';
			this.$axios.post(url,{
				token:this.$store.getters.optuser.Authorization
			})
			.then((res) => {
				if(res.data.status == 200){
					this.index = res.data.data.tt_id - 1;
					this.results = res.data.data
					this.rotating();
					console.log("返回id："+res.data.data.tt_id)
					console.log("当前index:"+this.index)
				}else if(res.data.status == 301){
					this.$toast(res.data.msg)
				}else{
					this.$toast(res.data.msg)
				}
			})
			
		},

		rotating() {
			if (!this.click_flag) return;
			var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
			var during_time = 5; // 默认为1s
			// var random = Math.floor(Math.random() * 7);//随机停
			var result_index = this.index ; // 最终要旋转到哪一块，对应prize_list的下标
			//   var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
			var result_angle = [360, 300, 240,180, 120, 60]; //最终会旋转到下标的位置所需要的度数
			var rand_circle = 6; // 附加多转几圈，2-3
			this.click_flag = false; // 旋转结束前，不允许再次触发
			if (type == 0) {
				// 转动盘子
				var rotate_angle =this.start_rotating_degree +rand_circle * 360 +result_angle[result_index] -this.start_rotating_degree % 360;
				this.start_rotating_degree = rotate_angle;
				this.rotate_angle = "rotate(" + rotate_angle + "deg)";
				// // //转动指针
				// this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
				// this.start_rotating_degree_pointer =360*rand_circle;
				var that = this;
				// 旋转结束后，允许再次触发
				setTimeout(function() {
					that.click_flag = true;
					that.game_over();
				}, during_time * 1000 + 1500); // 延时，保证转盘转完
			} else {
				//
			}
		},

		game_over() {
			this.toast_control = true;
			this.hasPrize = this.prize_list[this.index].isPrize
		},

		//关闭弹窗
		close_toast() {
			this.toast_control = false;
		},
		
		// 获取转盘列表数据
		reqTurntable(){
			let url = 'turntable/get_list';
			this.$axios.post(url,{
				token:this.$store.getters.optuser.Authorization
			})
			.then((res) => {
				if(res.data.status === 200){
					this.prize_list = res.data.data;
					console.log(this.prize_list)
				}
			})
		},
		// 跳转到订单详情
		jumpToDetails(order_id){
			
			this.$router.push('/Order/OrderDetails?order_id=' + order_id)
		}

	}
};
</script>
<style scoped>
.container {
  width: 100%;
  overflow: hidden;
}
.jumpTo{
	width: 50px;
	height: 50px;
	background: url("../../../static/images/luckywheel/jump-btn.png") no-repeat;
	background-size: 100%;
	position: fixed;
	left:24px;
	top:24px;
	z-index: 9
}
.lucky-wheel {
  width: 100%;
  height: 1334px;
  background: url("../../../static/images/luckywheel/lucky-wheel-bg.png") no-repeat center top;
  background-size: 100%;
  position: relative;
   display: flex;
  align-items: center;
  justify-content: center;
}

.wheel-bg {
  width: 702px;
  height: 702px;
  background: url("../../../static/images/luckywheel/disk_bg.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
}
.wheel-pointer-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -60%);
  width: 119px;
  height: 134px;
}
.wheel-pointer {
  width: 119px;
  height: 134px;
  background: url("../../../static/images/luckywheel/go.png") no-repeat center top;
  background-size: 100%;
  transform-origin: center 60%;
}
.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.prize-list .prize-item:first-child {
	top: 50px;
	left:260px;
	transform: rotate(0deg);
}
.prize-list .prize-item:nth-child(2) {
	top: 130px;
	left: 385px;
	transform: rotate(60deg);
}
.prize-list .prize-item:nth-child(3) {
	top: 265px;
	left: 380px;
	transform: rotate(120deg);
}
.prize-list .prize-item:nth-child(4) {
  top: 350px;
  left: 260px;
  transform: rotate(180deg);
}
.prize-list .prize-item:nth-child(5) {
  top: 275px;
  left: 130px;
  transform: rotate(240deg);
}
.prize-list .prize-item:nth-child(6) {
  top: 130px;
  left: 120px;
  transform: rotate(300deg);
}
.prize-item {
  width: 188px;
  height: 288px;
}

.prize-pic img {
  width: 119px;
  height: 119px;
  margin-top:47px;
}
.prize-count {
	font-size: 28px;
	display: none;
}
.prize-type {
 	font-size: 24px;
	display: none;
}
.main {
  position: relative;
  width: 100%;
  min-height: 456px;
  background: rgb(243, 109, 86);
  padding-bottom:54px;
}
.main-bg {
  width: 100%;
  height: 210px;
  position: absolute;
  top: -110px;
  left: 0;
  background: url("../../../static/images/luckywheel/luck_bg.png") no-repeat center top;
  background-size: 100%;
}
.bg-p {
  width: 100%;
  height: 95px;
  background: rgb(252, 207, 133);
}
.content {
  position: absolute;
  top:6px;
  left: 0;
  background: rgb(243, 109, 86);
  width: 100%;
  height: 166px;
  font-size: 36px;
  color: #ffeb39;
}
.content div {
  text-align: left;
}
.tip {
  position: relative;
  margin: 80px auto 0;
  width: 560px;
  border: 1px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 32px;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 10px 20px;
}
.tip-content {
  padding: 50px 20px;
  font-size:28px;
  color: #fff8c5;
  line-height: 1.5;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;
  transform: translate(-50%, -50%);
  width: 600px;
  /* display: block!important; */
}
.toast-container {
	width: 600px;
	height: 800px;
	background: url("/static/images/luckywheel/zhongjiang-bg.png") no-repeat;
	background-size: 100%;
	position: relative;
}
.toast-container .title{
	font-size: 60px;
	color: #ffeb0b;
	text-align: center;
	padding: 30px 0;
	box-sizing: border-box;
}
.toast-container .money{
	font-size: 170px;
	color: #ff5944;
	text-align: center;
	margin-top: 115px;
}
.toast-container .unit{
	font-size: 60px;
}
.close-btn{
	width: 48px;
	height: 48px;
	background:url("/static/images/luckywheel/close-x.png") no-repeat;
	background-size: 100%;
	position: absolute;
	left: 50%;
	margin-left: -24px;
	bottom: -78px;
	z-index: 10001;
}
.toast-picture {
  position: absolute;
  top: -208px;
  left: -48px;
  width: 600px;
  height: 274px;
}
.toast-pictrue-change {
  position: absolute;
  top: -48px;
  left: -44px;
  width:560px;
  height: 100px;
}
.toast-title {
  padding: 20px 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
.toast-btn div {
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width:150px;
  height: 60px;
  border-radius: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.close {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 64px;
  height: 64px;
  background: url("../../../static/images/luckywheel/close_store.png") no-repeat center top;
  background-size: 100%;
}

/* .toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 494px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  background-color: rgb(252, 244, 224);
  display: block!important;
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -208px;
  left: -48px;
  width: 600px;
  height: 274px;
}
.toast-pictrue-change {
  position: absolute;
  top: -48px;
  left: -44px;
  width:560px;
  height: 100px;
}
.toast-title {
  padding: 20px 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
.toast-btn div {
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width:150px;
  height: 60px;
  border-radius: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.close {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 64px;
  height: 64px;
  background: url("../../../static/images/luckywheel/close_store.png") no-repeat center top;
  background-size: 100%;
} */
</style>

