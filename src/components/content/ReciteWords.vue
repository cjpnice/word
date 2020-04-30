<template>
  <div >
<mt-progress :value="progress">
    <div slot="start" style="font-size:12px">剩余单词量</div>
    <div slot="end">{{wordNum-index-1}}</div>
</mt-progress>
    <div class="mui-card">
        <div class="mui-card-header mui-card-media" style="height:30vw;background-image:url(https://api.fczbl.vip/bing/)"></div>
        <div class="mui-card-content" @click="showTranslation">
            <div class="mui-card-content-inner">
                <center><audio :src="audio" controls="controls" autoplay="autoplay"></audio></center>
                <p>点击单词以显示单词意思</p>
                <p style="color: #333;">
                    <center>
                        <h1>{{word}}</h1>
                        <h5>{{phonogram}}</h5>
                        <h4 v-show=display>{{translation}}</h4>
                    </center>
                </p>
            </div>
        </div>
        <div class="mui-card-footer">
            <a class="mui-card-link">Like</a>
            <a class="mui-card-link" @click="showMore=true">Example sentence</a>
        </div>
    </div>
    <div class="mui-card" v-show=showMore>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                {{exampleSentence}}
            </div>
        </div>
    </div>
    <div class="center_bottom">
        
        <!-- <button type="button" class="button mui-btn mui-btn-warning mui-btn-outlined" @click="know">
					认识
		</button> -->
        <button type="button" class="button mui-btn mui-btn-danger mui-btn-outlined" @click="forget">
					忘记
		</button>
        <button type="button" class="button mui-btn mui-btn-success mui-btn-outlined" @click="master">
					认识
		</button>
    </div>
    <mt-button class="buttom" size="large" type="primary" @click.native="startReciteWord">开始学习</mt-button>            
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import qs from 'qs'
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return{
            word:"word",
            translation:"单词",
            phonogram:"音标",
            exampleSentence:'',
            display: false,
            showMore: false,
            datas:{},
            index:0,
            start:"false",
            wordNum:0,
            audio:""
        }
    },
    created() {
        this.wordNum = Number(localStorage.getItem("wordNum"))
        if(localStorage.getItem("start")=="true"&&Number(localStorage.getItem("index"))<Number(localStorage.getItem("wordNum"))){
            this.datas = JSON.parse(localStorage.getItem("datas"))
            this.index = localStorage.getItem("index")==null? 0 : Number(localStorage.getItem("index"))
            this.start = localStorage.getItem("start")==null? "false" : localStorage.getItem("start") 
            this.word=this.datas[this.index].word
            this.translation=this.datas[this.index].translation
            this.phonogram=this.datas[this.index].phonogram
            this.exampleSentence=this.datas[this.index].exampleSentence
            this.audio="http://dict.youdao.com/dictvoice?audio="+this.word
        }
    },
    computed:{
        'progress':function(){
            return (this.index+1)/this.wordNum*100
        }
    },
    methods: {
        showTranslation(){
            if(this.display==false){
                this.display=true;
            }else{
                this.display=false;
            }
        },
        startReciteWord(){
            if(this.start=="false"&&Number(localStorage.getItem("todayIsRecite"))==0){
                this.wordNum = localStorage.getItem("wordNum")
                let postData = qs.stringify({
                    userId: localStorage.getItem("userId"),
                    wordNum: this.wordNum
                    })
                this.$axios.post("/word/getWord",postData)
                .then((res)=>{
                    //获取单词列表
                    this.datas = res.data.data
                    if(this.datas.length == 0){
                        Toast({
                            position:'bottom',
                            message:'没有单词要背，请先导入单词'
                        });
                    }else{
                        localStorage.setItem("datas",JSON.stringify(this.datas))
                        localStorage.setItem("start","true")
                        this.start = "true"
                        this.word=this.datas[this.index].word
                        this.translation=this.datas[this.index].translation
                        this.phonogram=this.datas[this.index].phonogram
                        this.exampleSentence=this.datas[this.index].exampleSentence
                        this.audio="http://dict.youdao.com/dictvoice?audio="+this.word
                    }
                    
                })
                .catch((err)=>{
                    console.log(err)
                });
            }else{
                if(Number(localStorage.getItem("todayIsRecite"))==1){
                    MessageBox({
                        title: '提示',
                        message: '你今天已经背过了，你要继续背吗？',
                        showCancelButton: true
                    }).then(action => {
                        if(action=="confirm"){
                            localStorage.setItem("todayIsRecite",0)
                            localStorage.setItem("index",0)
                            this.start="false"
                            this.index=0
                        }      
                    });
                }else{
                    Toast({
                        position:'bottom',
                        message:'你已经点击过了'
                    });
                }   
            }
        },
        master(){ 
            if(this.start=="true"&&Number(localStorage.getItem("todayIsRecite"))==0){       
                this.display=false
                if(this.index<this.datas.length){
                    let postData = qs.stringify({
                    id: this.datas[this.index].id,
                    userId: localStorage.getItem("userId")
                    })
                    this.$axios.post("/word/setIsRemember",postData)
                    .then((res)=>{
                        this.index++
                        //没有背完
                        if(this.index!=this.datas.length){
                            this.word=this.datas[this.index].word
                            this.translation=this.datas[this.index].translation
                            this.phonogram=this.datas[this.index].phonogram
                            this.exampleSentence=this.datas[this.index].exampleSentence
                            this.audio="http://dict.youdao.com/dictvoice?audio="+this.word
                            localStorage.setItem("index",this.index)
                            this.$axios.post("/word/setReciteTime",postData)
                            .then((res)=>{
                            })
                        }else{
                            //背完了
                            this.index--
                            Toast({
                                position:'bottom',
                                message:'背完啦'
                            });
                            localStorage.setItem("todayIsRecite",1)
                            // let postData1 = qs.stringify({
                            //     userId: localStorage.getItem("userId")
                            // })
                            // this.$axios.post("/user/setTodayIsRecite",postData1)
                            // .then((res)=>{
                            //     localStorage.setItem("todayIsRecite",1)
                            // })
                        }    
                    })
                    .catch((err)=>{
                        console.log(err)
                    });       
                }
            }else{
                if(localStorage.getItem("todayIsRecite")==1){
                    Toast({
                        position:'bottom',
                        message:'你今天已经背过了'
                    });
                }else{
                    Toast({
                        position:'bottom',
                        message:'你已经点击过了'
                    });
                }
            }
        },

        forget(){
            if(this.start=="true"&&Number(localStorage.getItem("todayIsRecite"))==0){    
                this.display=false
                if(this.index<this.datas.length){
                    let postData = qs.stringify({
                    id: this.datas[this.index].id,
                    userId: localStorage.getItem("userId")
                    })
                    this.$axios.post("/word/setForgetTime",postData)
                    .then((res)=>{
                        this.index++
                        if(this.index!=this.wordNum){
                            this.word=this.datas[this.index].word
                            this.translation=this.datas[this.index].translation
                            this.phonogram=this.datas[this.index].phonogram
                            this.exampleSentence=this.datas[this.index].exampleSentence
                            this.audio="http://dict.youdao.com/dictvoice?audio="+this.word
                            localStorage.setItem("index",this.index)
                            this.$axios.post("/word/setReciteTime",postData)
                            .then((res)=>{
                            })
                        }else{
                            this.index--
                            Toast({
                                position:'bottom',
                                message:'背完啦'
                            });
                            localStorage.setItem("todayIsRecite",1)
                            // let postData1 = qs.stringify({
                            //     userId: localStorage.getItem("userId")
                            // })
                            // this.$axios.post("/user/setTodayIsRecite",postData1)
                            // .then((res)=>{
                            //     localStorage.setItem("todayIsRecite",1)
                            // })
                        }  
                    })
                    .catch((err)=>{
                        console.log(err)
                    });          
                }
            }else{
                if(Number(localStorage.getItem("todayIsRecite"))==1){
                    Toast({
                        position:'bottom',
                        message:'你今天已经背过了'
                    });
                }else{
                    Toast({
                        position:'bottom',
                        message:'你已经点击过了'
                    });
                }
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
    margin-left: 50px;
    margin-right: 50px;
}
.center_bottom{
    width: 100%;
    margin-top: 100px;
    text-align:center;
    position:fixed ; 
    bottom:0px;
    padding-bottom: 55px;
}

.buttom{
    width: 100%;
    margin-top: 100px;
    text-align:center;
    position:fixed ; 
    bottom:0px;
    margin-bottom: 130px;
}

</style>