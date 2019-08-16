

/**
 * 路由跳转
 */
function jumpTo(path='',name='', id=''){
    console.log(path)
    console.log(name)
    console.log(id)
    
    // 商品路由跳转
    if(path && name && id){
        // this.$router.push(path+'?'+ name +'=' + id);
        return false;
    }
    // 搜索路由跳转
    if(path && !name && !id){
        // this.$router.push(path);
        return false;
    }
    
}

export { 
    jumpTo 
}


  