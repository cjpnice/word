<template>
  <div>
	  	<form class="mui-input-group">
			<div class="mui-input-row">
				<label style="font-size:12px">按忘记次数筛选</label>
				<input type="text" placeholder="输入次数" v-model="time">
			</div>
			<div class="mui-button-row">
				<button @click="confirmTime" type="button" class="mui-btn mui-btn-primary">确认</button>&nbsp;&nbsp;
				<button @click="cancel" type="button" class="mui-btn mui-btn-danger">取消</button>
			</div>
	  	</form>
		<div class="mui-card">
			<li class="mui-table-view-cell">生词总数：{{wordList.length}}</li>
		</div>
        <div class="mui-card">
			<ul class="newsList mui-table-view">
				<li class="mui-table-view-divider">点击为忘记的单词,右侧为忘记次数/背诵次数</li>
				
				<li class="mui-table-view-cell" v-for="(item) in wordList" :key="item.id" disguise>
					{{item.word}}
					<h5 style="padding-right:40px">{{item.translation}}</h5>
					<span class="mui-badge mui-badge-primary">{{item.forgetTime}}/{{item.reciteTime}}</span>
				</li>		
				
			</ul>
		</div>


       
  </div>
</template>

<script>
import qs from 'qs'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
export default {
	data(){
		return{
			forgetWordList:new Array(),
			filterWordList:new Array(),
			wordList:new Array(),
			time:1

		}
	},
	methods:{
		confirmTime(){
			localStorage.setItem("time",this.time)
			this.filterWordList.splice(0,this.filterWordList.length);  
			for(var i=0;i<this.forgetWordList.length;i++){
				if(this.forgetWordList[i].forgetTime>=this.time){
					this.filterWordList.push(this.forgetWordList[i])
				}
			}
			this.wordList=this.filterWordList
		},
		cancel(){
			this.time=0
		}
	},
	created(){
		let postData = qs.stringify({
		userId: localStorage.getItem("userId"),
		})
		this.$axios.post("/word/getForgetWord",postData)
		.then((res)=>{
			//获取单词列表
			this.forgetWordList = res.data.data
			if(this.forgetWordList.length == 0){
				Toast({
					position:'bottom',
					message:'没有生词'
				});
			}else{
				this.wordList=this.forgetWordList
				this.time=localStorage.getItem("time")==null? 1 : Number(localStorage.getItem("time"))
				this.confirmTime()
			}
			
		})
		.catch((err)=>{
			console.log(err)
		});
	}
}
</script>

<style scoped>
.newsList{
	max-height: 60vh;
	overflow-y: auto;
}
</style>