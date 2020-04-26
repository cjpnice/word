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
                        <input type="range" id='field-range' v-model="wordNum" min="0" max="100" />
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
            console.log(this.wordNum)
            let postData = qs.stringify({
				wordNum: this.wordNum,
				userId: 1
                })
            this.$axios.post("/user/setWordNum",postData)
            .then((res)=>{
                localStorage.setItem('wordNum', this.wordNum);
            })
            .catch((err)=>{
				console.log(err)
			});
        }
    }
}
</script>

<style>

</style>