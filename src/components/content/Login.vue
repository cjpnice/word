<template>
  <div>
      <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">登录</h1>
		</header>
		<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="username">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="login">登录</button>
				<div class="link-area"><router-link id='reg' to="/register">注册账号</router-link> <span class="spliter">|</span> <router-link id='forgetPassword' to="/forgetPassword">忘记密码</router-link>
				</div>
			</div>
			<div class="mui-content-padded oauth-area">

			</div>
		</div>
  </div>
</template>

<script>
import qs from 'qs'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
	data(){
		return{
			username:'',
			password:'',	
			userToken:''
		}
	},
	methods: {
		login(){
			if(this.username!=''&&this.password!=''){
				let postData = qs.stringify({
				username: this.username,
				password: this.password
				})
				Indicator.open('加载中...');
				this.$axios.post("/user/login",postData)//传参
				.then((res)=>{
					if(res.data.status==0){
						Indicator.close();
						//存储token			
						this.userToken = res.data.data
						localStorage.setItem('userToken', this.userToken);
						this.$store.commit('set_token', this.userToken)
						this.$router.replace('/reciteWords')		
					}else{
						Indicator.close();
						Toast({
							position:'bottom',
							message:'用户名密码错误'
						});
					}         
				})
				.catch((err)=>{
					console.log(err)
				});
			}else{
				Toast({
					position:'bottom',
					message:'请输入用户名密码'
				});
			}
			

			
		}
	}
}
</script>

<style>

</style>