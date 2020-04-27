<template>
  <div>
	  	<form class="mui-input-group">
			<div class="mui-input-row">
				<label style="font-size:12px">按忘记次数筛选</label>
				<input type="text" placeholder="输入次数">
			</div>
			<div class="mui-button-row">
				<button type="button" class="mui-btn mui-btn-primary" onclick="return false;">确认</button>&nbsp;&nbsp;
				<button type="button" class="mui-btn mui-btn-danger" onclick="return false;">取消</button>
			</div>
	  	</form>
        <div class="mui-card">
			
			<ul class="newsList mui-table-view">
				<li class="mui-table-view-divider">点击为忘记的单词，按点击数排序，右侧为点击次数</li>
				<li class="mui-table-view-cell" v-for="(item) in forgetWordList" :key="item.id" disguise>
					{{item.word}}
					<h5 style="padding-right:40px">{{item.translation}}</h5>
					<span class="mui-badge mui-badge-primary">{{item.forgetTime}}</span>
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
			forgetWordList:{},


		}
	},
	methods:{
		
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
				localStorage.setItem("forgetWordList",JSON.stringify(this.forgetWordList))	
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