<template>
  <div>
      		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">注册</h1>
		</header>
		<div class="mui-content">
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="username">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
				</div>
				<div class="mui-input-row">
					<label>确认</label>
					<input id='password_confirm' type="password" class="mui-input-clear mui-input" placeholder="请确认密码" v-model="confirmPassword">
				</div>
				<div class="mui-input-row">
					<label>邮箱</label>
					<input id='email' type="email" class="mui-input-clear mui-input" placeholder="请输入邮箱" v-model="email">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='reg' class="mui-btn mui-btn-block mui-btn-primary" @click="register">注册</button>
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
			confirmPassword:'',
			email:''
		}
	},
	methods:{
		register(){
			if(this.username!=''&&this.password!=''&&this.confirmPassword&&this.email!=''){
				if(this.password==this.confirmPassword){
					let postData = qs.stringify({
					username: this.username,
					password: this.password,
					email: this.email
					})
					Indicator.open('加载中...');
					this.$axios.post("/user/register",postData)//传参
					.then((res)=>{
						if(res.data.status==0){
							Indicator.close();
							this.$router.replace('/login')		
						}else{
							Indicator.close();
							Toast({
								position:'bottom',
								message:'注册失败'
							});
						}         
					})
					.catch((err)=>{
						console.log(err)
					});
				}else{
					Toast({
						position:'bottom',
						message:'两次密码不同'
					});
				}
			}else{
				Toast({
					position:'bottom',
					message:'请输入完整信息'
				});
			}
		}
	}
}
</script>

<style>

</style>