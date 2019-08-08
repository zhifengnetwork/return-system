import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个store仓库,使用export公开，其他地方可引用
const storage =window.localStorage;
const store =  new Vuex.Store({
    //strict:true,//严格模式
    // 状态(一般保存数据)
    state:{
        isLoading:false,
        // token:0
        userInfo:{
            Authorization: storage.getItem('Authorization') ? storage.getItem('Authorization') : '' ,
            uid: storage.getItem('uid') ? storage.getItem('uid') : '' ,
        }
        
    },

    // mutations 类似事件
    mutations:{
        showLoading(state){
            state.isLoading = true
        },
        hideLoading(state){
            state.isLoading = false
        },
        set_token(state,user){
            state.userInfo.Authorization = user.Authorization;//TOKEN
            localStorage.setItem('Authorization', user.Authorization);

            state.userInfo.uid = user.uid;//user_id
            localStorage.setItem('uid', user.uid);
        },
        // userInfo(state, user){
        //     state.userInfo.usin = JSON.stringify(user);
        //     localStorage.setItem('uid', JSON.stringify(user));
        // },
        del_token(state){
            state.userInfo.Authorization = ''
            state.userInfo.uid = '';
            localStorage.removeItem('Authorization');
            localStorage.removeItem('uid');
        }
    },
    //获取共享数据
    getters:{
        optuser:function(state){
            return state.userInfo
        }
     },
  });
  
  export default store;