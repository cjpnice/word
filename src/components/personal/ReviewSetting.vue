<template>
  <div>
    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <h5>设置每天背诵单词数：</h5> 
                <div class="mui-input-row mui-input-range field-contain">
                    <div style="float:left">
                        <label >单词数：</label>
                        <input type="text" id='field-range-input' v-model="wordNum">
                    </div>
                    <div style="margin-left:121px;">
                        <input type="range" id='field-range' v-model="wordNum" min="100" max="300" />
                    </div>
                </div>   
            </div>
        </div>
    </div>
    <mt-button size="large" type="primary" @click.native="save">保存</mt-button>
  </div>
</template>

<script>
import qs from 'qs'
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            wordNum:0
        }
    },
    created(){
        this.wordNum = localStorage.getItem("wordNum")
    },
    methods:{
        save(){
            if(localStorage.getItem("start")=="false"||localStorage.getItem("start")==null){
                let postData = qs.stringify({
                    wordNum: this.wordNum,
                    userId: localStorage.getItem("userId")
                    })
                this.$axios.post("/user/setWordNum",postData)
                .then((res)=>{
                    localStorage.setItem('wordNum', this.wordNum);
                })
                .catch((err)=>{
                    console.log(err)
                });
            }else{
                Toast({
                    position:'bottom',
                    message:'背完在修改吧'
                });
            }
            
        }
    }
}
</script>

<style>

</style>