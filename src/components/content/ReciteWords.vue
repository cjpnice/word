<template>
  <div >

    <div class="mui-card">
        <div class="mui-card-header mui-card-media" style="height:40vw;background-image:url(https://cjpnice-picture.oss-cn-hangzhou.aliyuncs.com/img/20200414083119.jpg)"></div>
        <div class="mui-card-content" @click="showTranslation">
            <div class="mui-card-content-inner">
                <p>Posted on January 18,2019</p>
                <p style="color: #333;">
                    <center>
                        <h1>{{word}}</h1>
                        <h2 v-show=display>{{translation}}</h2>
                    </center>
                </p>
            </div>
        </div>
        <div class="mui-card-footer">
            <a class="mui-card-link">Like</a>
            <a class="mui-card-link">Read more</a>
        </div>
    </div>
    <div class="center_bottom">
        <button type="button" class="button mui-btn mui-btn-success mui-btn-outlined" @click="master">
					掌握
		</button>
        <button type="button" class="button mui-btn mui-btn-warning mui-btn-outlined" @click="know">
					认识
		</button>
        <button type="button" class="button mui-btn mui-btn-danger mui-btn-outlined" @click="forget">
					忘记
		</button>
    </div>
                
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            word:"necessary",
            translation:"必要",
            display: false,
            datas:{},
            index:0
        }
    },
     created(){
        this.getInfo();      
    },
    methods: {
        showTranslation(){
            if(this.display==false){
                this.display=true;
            }else{
                this.display=false;
            }
        },
        getInfo(){
            this.$http.get('http://localhost:8081/word/word/selectWord?input_unit=1').then(function(result){
                this.datas=result.data
                console.log(this.datas)
            },function(err){
                console.log("sd")
            })
        },
        master(){
            if(this.index<this.datas.length){
                this.word=this.datas[this.index].word
                this.translation=this.datas[this.index].translate
                this.index++
            }else{
                Toast({
                    position:'bottom',
                    message:'背完啦'
                });
            }
        },
        know(){
            if(this.index<this.datas.length){
                this.word=this.datas[this.index].word
                this.translation=this.datas[this.index].translate
                this.index++
            }else{
                Toast({
                    position:'bottom',
                    message:'背完啦'
                });
            }
        },
        forget(){
            if(this.index<this.datas.length){
                this.word=this.datas[this.index].word
                this.translation=this.datas[this.index].translate
                this.index++
            }else{
                Toast({
                    position:'bottom',
                    message:'背完啦'
                });
            }
        }
    }
}
</script>

<style scoped>
.center{
    margin-top: 60px; 
    text-align:center;
}
.button{
    margin: 20px;
}
.center_bottom{
    width: 100%;
    margin-top: 100px;
    text-align:center;
    position:fixed ; 
    bottom:0px;
    padding-bottom: 55px;
}

</style>