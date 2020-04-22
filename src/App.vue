<template>
  <div id="app-container">
    <mt-header :title=selected>
      <router-link to="/reciteWords" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>   
    <router-view @setIsLogin="setIsLoginToTrue"></router-view>
    <mt-tabbar v-model="selected">

  <mt-tab-item id="背单词" >
    <img slot="icon" src="@/assets/studying.png">
    背单词
  </mt-tab-item>
  <mt-tab-item id="生词本">
    <img slot="icon" src="@/assets/icon-book.png">
    生词本
  </mt-tab-item>
  <mt-tab-item id="我的">
    <img slot="icon" src="@/assets/me.png">
    我的
  </mt-tab-item>
</mt-tabbar>
  </div>
</template>

<script>
import Router from 'vue-router'
/**
 * 重写路由的push方法,解决两次跳转相同路由报错的问题
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default {
  name: 'App',
  
  data(){
    return {
        selected: "背单词",
        isLogin: false
 
    }
  },
  methods: {
      back(){
        this.selected="背单词"
      },
      setIsLoginToTrue(msg){
        this.isLogin=true
      }
  },
  watch:{
      selected:function(newVal,oldVal){
          if(this.selected=="背单词"){
            if(this.isLogin)
              this.$router.push('/reciteWords')
            else
              this.$router.push('/')
          }else if(this.selected=="生词本"){
            if(this.isLogin)
              this.$router.push('/newWords')
            else
              this.$router.push('/')
          }else{
            if(this.isLogin)
              this.$router.push('/personal')
            else
              this.$router.push('/')
          }
      },  
  }
}
</script>

<style scoped>


.mint-header{
  background-color:#FAFAFA;
  color:black;
}

</style>
