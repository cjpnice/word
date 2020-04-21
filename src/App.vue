<template>
  <div id="app-container">
    <mt-header :title=selected>
      <router-link to="/reciteWords" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>   
    <router-view></router-view>
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
export default {
  name: 'App',
  
  data(){
    return {
        selected: "背单词",
 
    }
  },
  methods: {
      back(){
        this.selected="背单词"
      }
  },
  watch:{
      selected:function(newVal,oldVal){
          if(this.selected=="背单词"){
            this.$router.replace('/reciteWords')
          }else if(this.selected=="生词本"){
            this.$router.replace('/newWords')
          }else{
            this.$router.replace('/personal')
          }
      },
      
  }
}
</script>

<style scoped>
body{
  margin: 0;
}
.app-container{
  padding-top: 40px;
  overflow-x: hidden;
}
.mint-header{
  background-color:#FAFAFA;
  color:black;
}

</style>
