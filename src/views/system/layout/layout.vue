<template>
  <div id="app">
    <div id="nav">
		<mu-dialog :title="editType === 'e'?'修改密码': '创建用户'" width="360" :open.sync="edit">
			<mu-text-field type="text" label="编码" prop="code" v-model.trim="user.code" v-if="editType === 'e'?false: true"></mu-text-field>
			<mu-text-field type="text" label="用户名" :disabled="editType === 'e'?true: false" prop="username" v-model.trim="user.name"></mu-text-field>
			<mu-text-field :label="editType === 'e'?'旧密码': '密码'" prop="password" v-model.trim="user.oldPassword" :action-icon="oldVisibility ? 'visibility_off' : 'visibility'" :action-click="() => (oldVisibility = !oldVisibility)" :type="oldVisibility ? 'text' : 'password'"></mu-text-field><br/>
			<mu-text-field :label="editType === 'e'?'新密码': '重复密码'" prop="password" v-model.trim="user.password" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field><br/>
			<mu-button slot="actions" flat color="primary" @click="ok(editType)">确认</mu-button>
			<mu-button slot="actions" flat color="primary" @click="cancel">关闭</mu-button>
		</mu-dialog>
		<div class="nav-left" v-if="navLeftShow">
			<mu-paper :z-depth="1" class="demo-list-wrap paper-height">
			  <mu-appbar color="primary">
			    数据分析
			  </mu-appbar>
			  <mu-list>
			    <mu-list-item v-for='label in labels' :key="label.order" avatar button :ripple="false" @click='clickLable(label)'>
			      <mu-list-item-action>
					  <mu-icon v-if="index === label.order" value="star" color="red"></mu-icon>
				  </mu-list-item-action>
			      <mu-list-item-title>{{ label.title }}</mu-list-item-title>
			    </mu-list-item>
			  </mu-list>
			</mu-paper>
		</div>
		<div class="nav-right">
			<mu-appbar style="width: 100%;" color="blue">
			  <mu-button icon slot="left" @click="navLeftShow = !navLeftShow">
			    <mu-icon value="menu"></mu-icon>
			  </mu-button>
			  <h4>{{ title }}</h4>
			  <mu-menu placement="top-start"  flat slot="right">
			      <mu-button flat color="primary">
					  <mu-icon value="account_box"></mu-icon>
					  {{ user.name }}
					  <mu-icon value="keyboard_arrow_down"></mu-icon>
				  </mu-button>
			      <mu-list slot="content">
			        <mu-list-item button @click="editClick('e')">
						  <mu-icon value="edit"></mu-icon>修改密码
			        </mu-list-item>
					<mu-list-item button @click="editClick('c')">
						  <mu-icon value="add"></mu-icon>创建用户
					</mu-list-item>
					<mu-list-item button @click="exit">
						  <mu-icon value="input"></mu-icon>退出
					</mu-list-item>
			      </mu-list>
			  </mu-menu>
			  <mu-button flat slot="right" @click="open = !open">
				  <mu-icon size="2vw" value="settings" ></mu-icon>
			  </mu-button>
			</mu-appbar>
			<router-view/>
		</div>
		<div>
		  <mu-drawer :open.sync="open" z-depth:10 :docked="docked" right>
			<mu-list>
			  <mu-list-item button>
				<mu-list-item-title>Menu Item 1</mu-list-item-title>
			  </mu-list-item>
			  <mu-list-item button>
				<mu-list-item-title>Menu Item 2</mu-list-item-title>
			  </mu-list-item>
			  <mu-list-item  @click="open = false" button>
				<mu-list-item-title>Close</mu-list-item-title>
			  </mu-list-item>
			</mu-list>
		  </mu-drawer>
		</div>
    </div>
  </div>
</template>

<script>
	
	import Theme from 'muse-ui/lib/theme'
	import token from '../token/token.js'
	
	export default {
		name: 'layout',
		data: function () {
			return {
				index:0,  				// 控制小星星是否隐藏
				navLeftShow: true,    	// 右侧目录标识
				oldVisibility: false,	// 控制旧密码是否显示
				visibility: false,		// 控制新密码是否显示
				title: this.$router.options.routes[0].title,
				labels: this.$router.options.routes,
				docked: false,		
				open: false,			// 左侧工具栏标识
				edit: false,			// 左侧修改密码弹框标识
				editType: 'e',			// dialog类型
				user:{}
			}
		},
		
		mounted() {
			  let user = token.getToken()
			  this.user = JSON.parse(user)
			  //this.user = user
			  console.log(this.user)
		},
		
		methods: {
			editClick(editType) {
				this.edit = true
				this.editType = editType
				if(editType === 'e') {
					this.user.oldPassword = this.user.password,
					this.user.password = ''
				}else {
					this.user.code = '',
					this.user.name = '',
					this.user.oldPassword = '',
					this.user.password = ''
				}
			},
			
			ok(params) {
				let data = {
					code: this.user.code,
					name: this.user.name,
					oldPassword: this.user.oldPassword,
					password: this.user.password
				}
				if(params === 'c') {
					this.$axios.post("http://localhost:85/user/insert", data).then((res) => {
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
				}else {
					this.$axios.post("http://localhost:85/user/update", data).then((res) => {
							const us = res.data
							if (!us.success) {
								this.$museUIToast.error("修改密码失败：" + us.meta.message);
								return;
							}
							this.$museUIToast.success("修改密码成功!");
							//this.token.token.password = data.password   // 修改密码成功后，修改tonken密码信息
							this.cancel()
						}).catch((err) => {
							console.log("err", err)
						})
				}
			},
			
			cancel() {
				this.edit = false,
				this.oldVisibility = false,	// 控制旧密码是否显示
				this.visibility = false		// 控制新密码是否显示
			},
			
			exit() {
				token.removeToken()
				location.reload() 
			},
			
			clickLable(label) {
				if(this.$router.history.current.path != label.path) {  // 点击自己不做操作
					this.index = label.order  // 小星星下标来判断是否隐藏
					this.title = label.title
					this.$router.push({
						path: label.path
					})
				}
			}
		},
		comments:{
			edit() {
				return true
			}
		},
		created() {
			const current = this.$router.history.current
			const pending = this.$router.history.pending
			const name = current && current.name?current.name:pending && pending.name?pending.name: ""
			const router = this.$router.options.routes.filter( p => p.name === name)
			const index = this.$router.options.routes.map(item => item.name).indexOf(name)
			this.title = router[0].title    // 刷新列表默认选中的小星星
			this.index = index				// 刷新列表默认选中列表
		}
	}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
	//padding: 30px;
	height: 100vh;
	display: flex;
	.nav-left{
		flex:1.5;
		.paper-height{
			height:100%;
			background-color: #383838
		}
	}
	.nav-right{
		flex:8.5;
	}
  a {
    font-weight: bold;
	color: #fff;
	
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.mu-item{
	color:#FFFFFF !important;
}

.mu-paper {
    background-color: #383838 !important;
}

.mu-popover {
	background-color: #383838 !important;
}

</style>
