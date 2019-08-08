<template>
    <div class="cart">
      	<!-- 头部组件 -->
		<TopHeader custom-title="购物车">
			<i slot="rightBtn" class="iconfont icon-lajitong" @click="deletOption()"></i>
		</TopHeader>
       
        <div v-show="list.length > 0" class="c-wrap">
            <div class="conter">
                <div class="c-list-" v-for="(item,key) in list" :key="key">
                    <div class="check">
                        <van-checkbox v-model="item.selected == 0" :check ="item.selected == 0" @click="selectGoods($event,key)"></van-checkbox>
                    </div>

                    <div class="-list-img">
                        <router-link :to="'/Details?goods_id='+item.goods_id"><img :src="item.img" /></router-link>
                    </div>

                    <div class="goods-info">
                        <router-link :to="'/Details?goods_id='+item.goods_id">
                            <div class="-info-msg publicEllipsis">
                                <p>{{item.goods_name}}</p>
                                <p class="spec-names publicEllipsis">{{item.spec_key_name}}</p>
                            </div>
                        </router-link>

                        <div class="-info-option"> 
                            <span class="price">
                                ￥<strong>{{item.goods_price}}</strong>
                            </span>
                            <span class="-option-">
                                <i class="subling iconfont icon-jian-" @click="reducingNumber(key,item.sku_id)"></i>
                                <input class="inp" type="number" :value="item.goods_num" @change="changNumber($event,key,item.sku_id)"/>
                                <i class="puls iconfont icon-jia" @click="addNumber(key,item.sku_id)" ></i>
                            </span>
                        </div>

                    </div>

                </div>
            </div>
            <!-- CART FOOT START -->
            <div class="footer-height"></div>
            <div class="footer">
                <div class="footer-a">
                    <span class="f-a-a">
                        <van-checkbox ref="allCheck" v-model="allChecked" @click="selectAll(allChecked)"><strong class="size-30">全选</strong></van-checkbox>
                    </span>
                    <div class="f-a-b">
                        <p class="size-30">
                            <strong>总计：</strong>
                            <span class="colorRed">￥<strong class="size-35">{{updatePrice}}</strong></span>
                        </p>
                        <!-- <p class="size-24">
                            节省: <span class="size-20">￥</span><span class="size-30">10.00</span>
                        </p> -->
                    </div>
                </div>
                <div class="footer-b" @click="toPay()">结算({{updateNumber}})</div>
            </div>
            
        </div>
       <!-- No INFO START -->
        <div v-show="isShow" class="no-info" >
            <Nodata :nodatas="nodatas"></Nodata>
        </div>
       <!-- GOODS LIST START -->
       <Navigate></Navigate>
    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader";
import Navigate from "@/pages/common/footer/Navigate";
import Nodata from "@/pages/common/nodata/Nodata";
export default {
    data(){
        return {
            nodatas:{
                'imgSrc':'/static/images/cart/cart_icon.png',
                'text':'购物车空空如也~',
                'link':'/Hone',
                'showBtn':true
            },
            list:[],
            isShow:false,
            token:"",
            allChecked: false,
        };
    },
    computed:{
        /**
         * 计算总价
         */
        updatePrice(){
            let totalPrice=0;
            this.list.forEach((data)=>{
                if(data.selected==0){
                    totalPrice += new Number(data.goods_price) * new Number(data.goods_num);
                }
            })
            return totalPrice.toFixed(2);
        },
        /**
         * 计算总件数
         */
        updateNumber(){
            let count =0;
            this.list.forEach((data)=>{
                if(data.selected == 0){
                    count ++
                }
            })
            return count;
        }
    },

    created(){
        this.$store.commit('showLoading')       //加载loading
        this.token =this.$store.getters.optuser.Authorization
        this._getGoodsList();
    },

    methods:{
        /**
         * 修改商品数量接口
         */
        _updataGoodsNumber(key,sku_id,val){     
            var _that = this
            _that.$axios.post('cart/addCart',{
                'sku_id':sku_id,
                'cart_number':val,
                'edit':1,
                'token':this.token
            })
            .then((res) => {
                var info = res.data
                if(info.status == 200){
                    var data =_that.list[key];
                    _that.$set( data,'goods_num',val)
                }
                else if(res.data.status == 999){
                    this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
            })
        },

        _upDataSelecet(cart_id){
            var _that = this
            _that.$axios.post('cart/selected',{
                'cart_id':cart_id,
                'token':this.token  
            })
            .then((res)=>{
                var info = res.data;
                // console.log(res)
                if(info.status == 200){
                   
                }
                else if(res.data.status == 999){
                    this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
            })
        },
        _getGoodsList(){
            var _that=this
            _that.$axios.post('cart/cartlist',{
                'token':this.token 
            })
            .then((res)=>{
                var info = res.data;
                if(info.status == 200){
                    _that.list = info.data
                    if(_that.updateNumber == _that.list.length){
                        _that.allChecked=true
                    }
                    if(info.data.length<1){         //显示没有数据提示
                        _that.isShow=true
                    }
                    this.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    this.$store.commit('hideLoading')
                    this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
            })
        },
        getSlectedGoodsCartID(){    //获取选中的商品的cart_id
            var catIds ="";
            this.list.forEach((data)=>{
                if(data.selected==0){
                    if(catIds==""){
                        catIds =data.cart_id
                    }else{
                        catIds =catIds+','+data.cart_id
                    }
                }
            })
            return catIds
        },
        selectAll(_flag){
            var num =1
            for(var i =0;i<this.list.length;i++){
                if(_flag){num =0 }
                this.$set(this.list[i],'selected',! num);
            }
        },
        selectGoods(e,key){
            var data =this.list[key];
            this.$set(data,'selected',!data.selected);
            if(data.selected!=0){
                this.allChecked=false
            }else{
                if(this.updateNumber == this.list.length){
                    this.allChecked=true
                }
            }
            this._upDataSelecet(data.cart_id)
        },
        reducingNumber(key,sku_id){
            var _that =this
            var data =_that.list[key];
            var val =parseInt(data.goods_num - 1) 
           if(val<=1){
               val =1
           }
           _that._updataGoodsNumber(key,sku_id,val)
        },
        changNumber(e,key,sku_id){
            var _that =this
            var val =e.target.value;
            var data =_that.list[key]; 
            if(val<=1 || isNaN(val)){
                return _that.$toast('请输入正确的数量');
            }
            // if(val>data.single_number){
            //      _that.$set(data,'goods_num',data.single_number)
            //     return _that.$toast('该商品最大购买量为:'+data.single_number+'件');
            // }
            if(val>data.inventory){
                 _that.$set(data,'goods_num',data.inventory)
                return _that.$toast('该商品库存为:'+data.inventory+'件');
            }
            _that._updataGoodsNumber(key,sku_id,val)
        },
        addNumber(key,sku_id){
            var _that =this
            var data =_that.list[key];
            var val =parseInt(data.goods_num) 
            val =new Number(val+ 1)
            // if(val>data.single_number){
            //     return _that.$toast('该商品购买量为:'+data.single_number+'件');
            // }
            if(val>data.inventory){
                return _that.$toast('该商品库存为:'+data.inventory+'件');
            }
            _that._updataGoodsNumber(key,sku_id,val)
        },
        deletOption(){
            var _that =this
            if(_that.updateNumber < 1){
                _that.$toast('亲，还没有选择要删除的商品哦!');
                return
            }
            _that.$dialog.confirm({
            title: '信息提醒',
            message: '亲，再考虑考虑吧?'
            }).then(() => {
                let newArry=[];
                let json=""
                _that.list.forEach((data,index)=>{
                    if(!data.selected==0){
                        newArry.push(data)
                    }else{
                        // json=""? data.cart_id : json =+','+ data.cart_id
                        if(json==""){
                            json = data.cart_id
                        }else{
                            json = json+ ','+ data.cart_id
                        }
                    }
                })
                _that.$axios.post('cart/delCart',{
                    'token':_that.$store.getters.optuser.Authorization,
                    'cart_id':json,
                })
                .then((res)=>{
                    var info = res.data;
                    if(info.status == 200){
                        _that.list =newArry;
                        if(newArry.length<1){
                            _that.isShow=true
                        }
                        _that.$toast('删除成功');
                    }
                    else if(res.data.status == 999){
                        this.$toast(res.data.msg)
                        this.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }
                    else{
                        _that.$toast(list.msg)
                    }
                })
            // on confirm
            }).catch(() => {
            // on cancel
            });
        },
        toPay(){
            if(this.updateNumber<1){
                return this.$toast("请选择商品")
            }
            sessionStorage.setItem('cartInfo',JSON.stringify({'cart_id': this.getSlectedGoodsCartID()}))
            this.$router.push({
                path: '/pay/ConfirmOrder',
                name: 'ConfirmOrder',
                // params: {'cart_id': this.getSlectedGoodsCartID()}
            })
        }
    },
    components: {
        TopHeader,
        Navigate,
        Nodata
	}

}
</script>

<style lang="stylus" scoped>
    .cart
        width 100%
        min-height 100%
        color #151515
        .colorRed
            color #ff112f
        .size-35
            font-size 35px
        .size-30
            font-size 30px
        .no-info
            text-align center
            .-info-img
                margin 145px auto 50px
                width 290px
                height 290px
            .-info-txt
                color #6c6c6c
                font-size 36px
                margin-bottom 90px
            .-info-btn
                width 460px
                height 100px
                background #ea2028
                border-radius 50px
                font-size 50px
                color #fff
        .conter
            margin 10px 24px
            .c-list-
                width 100%
                margin-bottom 12px
                border-radius 6px
                padding 20px 40px 20px 6px
                height 238px
                display flex
                align-items center
                box-sizing border-box
                .-list-img
                    width 201px
                    height 176px
                    margin 0 10px 0 4px
                    img
                        max-width 100%
                        max-height 100%
                .goods-info
                    width:445px
                    .-info-msg
                        width 100%
                        height 80px
                        font-size 24px
                        color #151515
                        overflow hidden
                        text-overflow ellipsis
                        -webkit-line-clamp 2
                        text-overflow ellipsis
                        white-space nowrap
                        margin-bottom 10px
                        word-break break-all
                        .spec-names
                            color:#888
                            margin-top 7px
                    .-info-option
                        display flex
                        justify-content space-between
                        align-items center
                        .price
                            color #ff112f
                            font-size 20px
                            strong
                                font-size 30px
                        .-option-
                            border 2px solid #e6e6e6
                            width 200px
                            height 40px
                            line-height 40px
                            display flex
                            align-items center
                            justify-content space-between
                            border-radius 20px
                            text-align center
                            .iconfont
                                width 41px
                                height 100%
                                font-size 12px
                            .puls
                                border-left 1px solid #e6e6e6
                            .subling
                                border-right 1px solid #e6e6e6
                                
                            .inp
                                width 121px
                                text-align center
                                height inherit
                                font-size 24px
                                font-weight bold
        .footer-height
            width 100%
            height 220px
        .footer
            position fixed
            bottom 98px
            width 100%
            height 120px
            line-height 120px
            left 0
            background #fff
            z-index 2
            box-shadow 0px 0px 5px 0px #cccccc
            display flex
            .footer-a
                width 530px
                display flex
                padding-left 28px
                .f-a-a
                    display flex
                    margin-right 70px
                .f-a-b p:nth-child(1)  
                    margin-bottom 2px
            .footer-b
                width 221px
                background #f30c0c
                color #fff
                line-height 120px
                text-align center
                font-size 30px
                font-weight bold            

</style>    
<style lang="stylus">
    .cart
        .van-checkbox__icon--checked .van-icon
            background-color #f30c0c
            border-color #f30c0c
    .van-checkbox__icon
        margin 0 5px 0 0         
</style>

