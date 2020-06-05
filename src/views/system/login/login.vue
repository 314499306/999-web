<template>
	<div id="login" class="login">
		
		<mu-dialog title="创建用户" width="360" :open.sync="edit">
			<mu-text-field type="text" label="编码" prop="code" v-model.trim="dialog.code" ></mu-text-field>
			<mu-text-field type="text" label="用户名" prop="username" v-model.trim="dialog.name"></mu-text-field>
			<mu-text-field label="密码" prop="password" v-model.trim="dialog.password" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field><br/>
			<mu-text-field label="重复密码" prop="password" v-model.trim="user.repeatPassword" :action-icon="repeatVisibility ? 'visibility_off' : 'visibility'" :action-click="() => (repeatVisibility = !repeatVisibility)" :type="repeatVisibility ? 'text' : 'password'"></mu-text-field><br/>
			<mu-button slot="actions" flat color="primary" @click="ok">确认</mu-button>
			<mu-button slot="actions" flat color="primary" @click="cancel">关闭</mu-button>
		</mu-dialog>
		
		<mu-text-field type="text" label="用户名" label-float prop="username" v-model.trim="user.code" icon="account_circle" ></mu-text-field>
		<mu-text-field label="密码" label-float prop="password" v-model.trim="user.password" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"  icon="locked"></mu-text-field><br/>
		<div style="display: flex;">
			<mu-button color="primary" @click="submit"><mu-icon value="done"></mu-icon>登录</mu-button>
			<div style="width: 50px;"></div>
			<mu-button color="primary" @click="edit = true"><mu-icon value="add"></mu-icon>注册</mu-button>
		</div>
	</div>
</template>

<script>
	
	import token from '../token/token.js'
	
	export default {
		name: "login",
		data: function () {
			return {
				user: {
					code: '',
					password: ''
				},
				repeatVisibility: false,	// 控制旧密码是否显示
				visibility: false,		// 控制新密码是否显示
				edit: false,			// 左侧修改密码弹框标识
				dialog:{
					code: "",
					name: "",
					password: "",
					repeatPassword: ''
				}
			}
		},
		methods:{
			submit() {
				this.$axios.get(process.env.VUE_APP_SERVICE+"/user/login/" + this.user.code + "/" + this.$MD5(this.user.password)).then((res) => {
						const us = res.data
						if (!us.success) {
							this.$museUIToast.error("登录失败：" + us.meta.message);
							return;
						}
						this.$museUIToast.success("登陆成功!");
						
						token.setToken(us.data)
						location.reload()   
					}).catch((err) => {
						console.log("err", err)
					})
			},
			
			ok(params) {
				this.$axios.post(process.env.VUE_APP_SERVICE+"/user/register", this.dialog).then((res) => {
						const us = res.data
						if (!us.success) {
							this.$museUIToast.error("创建用户失败：" + us.meta.message);
							return;
						}
						this.$museUIToast.success("创建用户成功!");
						this.cancel()
					}).catch((err) => {
						console.log("err", err)
					})
			},
			
			cancel() {
				this.edit = false,
				this.repeatVisibility = false,	// 控制旧密码是否显示
				this.visibility = false		// 控制新密码是否显示
			}
		}
	}
</script>

<style>
	.login {
		height: 100vh;
		display: flex;
		align-items:center;
		justify-content:center;
		background:url(../../../assets/login.jpg);
		background-size: cover;
		flex-direction: column;
	}
	
	.mu-input {
	    /* width: 400px !important */
	}
	
</style>
