<template>
  <div>
      <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="https://cjpnice-picture.oss-cn-hangzhou.aliyuncs.com/img/20200414223227.jpg">
						<div class="mui-media-body">
							{{userName}}
							<p class='mui-ellipsis'>学无止境</p>
						</div>
					</a>
				</li>
			</ul>
      	<div class="mui-card" style="margin-bottom: 35px;">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right" @click="zhanwei">
							导出数据
						</a>
					</li>
				</ul>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right" @click="zhanwei">
							导入数据
						</a>
					</li>
				</ul>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<router-link class="mui-navigate-right" to="/reviewSetting">
							复习设置
						</router-link>
					</li>
				</ul>
		</div>
		<mt-button size="large" type="danger" @click.native="logOut">退出登陆</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
	data(){
		return{
			userName:localStorage.getItem("userName"),
			subtitle:''
		}
	},
	created(){
	
	},
	methods: {
		logOut(){
			this.$router.push('/login')
			//清除用户信息
			localStorage.clear();
		},
		zhanwei(){
			Toast({
                    position:'bottom',
                    message:'还未实现'
                });
		}
	}
}
</script>

<style scoped>

</style>