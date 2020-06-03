<template>
	<div style="width: 100%; height: 100%; padding-top: 10px;">
		<mu-dialog scrollable style="font-size:1.5vw;" :title="dialog.target == line ? '修改产线信息' : '修改设备信息'" width="460" :overlay-close="false" :open.sync="dialog.show">
			<mu-text-field type="text" disabled label="名称" v-model="dialog.data.name" style="width: 190px"></mu-text-field>
			<mu-text-field type="number" label="OEE" v-model.number="dialog.data.oee" style="width: 190px" suffix="%"></mu-text-field>
			<mu-text-field type="number" label="时间开动率" v-model.number="dialog.data.usage" style="width: 190px" suffix="%"></mu-text-field>
			<mu-text-field type="number" label="性能开动率" v-model.number="dialog.data.efficiency" style="width: 190px" suffix="%"></mu-text-field>
			<mu-text-field type="number" label="合格率" v-model.number="dialog.data.passRate" style="width: 190px" suffix="%"></mu-text-field>
			<mu-text-field type="number" label="人效" v-model.number="dialog.data.manEfficiency" style="width: 190px;"  suffix="件/小时" v-if="showManEfficiency"></mu-text-field>
			<mu-text-field type="number" label="节拍" v-model.number="dialog.data.speed" style="width: 190px" suffix="件/小时" v-if="showSpeed"></mu-text-field>
			<p style="font-size:1vw;">系统需要进行权限验证，请输入您的用户名和密码</p><br/>
			<mu-text-field style="width: 190px" color="secondary" type="text" label="用户名" v-model.trim="user"></mu-text-field>
			<mu-text-field style="width: 10vw" color="secondary" type="password" label="密码" v-model="password"></mu-text-field><br/>
			<mu-button slot="actions" color="primary" @click="onDialogOk">确定</mu-button>
			<mu-button slot="actions" color="secondary" @click="onDialogCancel">取消</mu-button>
		</mu-dialog>
		<table border="1" style="width: 100%; text-align: center; font-size:0.8vw">
			<thead>
				<tr style="font-weight: 400; height: 3vw ">
					<td style="width: 12%">名称</td>
					<td style="width: 12%">OEE</td>
					<td style="width: 12%">时间开动率</td>
					<td style="width: 12%">性能开动率</td>
					<td style="width: 12%">合格率</td>
					<td style="width: 12%">人效</td>
					<td style="width: 12%">节拍</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{line.name}}</td>
					<td>{{line.oee}}%</td>
					<td>{{line.usage}}%</td>
					<td>{{line.efficiency}}%</td>
					<td>{{line.passRate}}%</td>
					<td>{{line.manEfficiency + '件/人工时'}}</td>
					<td>{{line.speed + '件/小时'}}</td>
					<td style="width: 25%">
						<mu-button @click="openDialog(null)" flat small color="blue">
							<mu-icon size="2vw" value="edit"></mu-icon>修改
						</mu-button>
					</td>
				</tr>
				<tr v-for="dev in devices">
					<td>{{dev.name}}</td>
					<td>{{dev.oee}}%</td>
					<td>{{dev.usage}}%</td>
					<td>{{dev.efficiency}}%</td>
					<td>{{dev.passRate}}%</td>
					<td>{{'/'}}</td>
					<td>{{'/'}}</td>
					<td>
						<mu-button @click="openDialog(dev)" flat small color="blue">
							<mu-icon size="2vw" value="edit"></mu-icon>修改
						</mu-button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: "device",
		data: function () {
			return {
				user: '',
				password: '',
				dialog: {
					target: {},
					data: {
						_id: '',
						name: '',
						oee: 0,
						usage: 0,
						efficiency:0,
						passRate: 0,
						mttr: 0,
						mtbf: 0,
						manEfficiency: 0,
						speed: 0
						
					},
					show: false,
				},
				devices: [],
				line: {},
				showManEfficiency: false,
				showSpeed: false
			}
		},
		methods:{
			openDialog( dev ) {
				var target = dev || this.line
				this.dialog.target = target
				this.dialog.data._id = target._id
				this.dialog.data.name = target.name
				this.dialog.data.oee = target.oee
				this.dialog.data.usage = target.usage
				this.dialog.data.efficiency = target.efficiency
				this.dialog.data.passRate = target.passRate
				this.dialog.data.manEfficiency = target.manEfficiency
				this.dialog.data.speed = target.speed
				this.dialog.data.mttr = target.mttr
				this.dialog.data.mtbf = target.mtbf
				this.dialog.show = true;
				
				this.showManEfficiency = false
				this.showSpeed = false
				if(dev == null){
					this.showManEfficiency = true
					this.showSpeed = true
				}
			},
			
			onDialogOk(){
				if( this.user.length == 0 || this.password.length == 0 ) {
					this.$toast.error('必须输入用户名和密码。');
					return;
				}

				var oee = this.dialog.data.oee / 100;
				var usage = this.dialog.data.usage / 100;
				var efficiency = this.dialog.data.efficiency / 100;
				var passRate = this.dialog.data.passRate / 100;
				
				if( (usage * efficiency * passRate) > oee ) {
					this.$toast.error('oee不能小于时间开动率 * 性能开动率 * 合格率。');
					return;
				}
				
				var url = (this.dialog.target == this.line) ? "/device/update-product-line" : "/device/update"
				var msg = (this.dialog.target == this.line) ? "修改产线信息" : "修改设备信息"
				var data = {
					user: this.user,
					password: this.password,
					target: {
						_id: this.dialog.data._id,
						name: this.dialog.data.name,
						oee: this.dialog.data.oee / 100,
						usage: this.dialog.data.usage / 100,
						efficiency: this.dialog.data.efficiency / 100,
						passRate: this.dialog.data.passRate / 100,
						manEfficiency: this.dialog.data.manEfficiency,
						speed: this.dialog.data.speed,
						mttr: this.dialog.data.mttr,
						mtbf: this.dialog.data.mtbf
					}
				}

				axios.post( url, data )
					.then( res => {
						res = res.data
						if( !res.success ) {
							this.$toast.error( msg +  "失败：" + res.meta.message )
							return
						}else {
							var target = this.dialog.target || this.line
							target.oee = this.dialog.data.oee
							target.usage = this.dialog.data.usage
							target.efficiency = this.dialog.data.efficiency
							target.passRate = this.dialog.data.passRate
							target.manEfficiency = this.dialog.data.manEfficiency
							target.speed = this.dialog.data.speed
							
							
							this.dialog.show = false
							this.password = ''
							
							this.$toast.success( msg +  "成功！"  );
						}
					})
					.catch( err => {
						this.$toast.error( msg +  "失败：" + res.meta.message )
					})
			},
			
			onDialogCancel() {
				this.dialog.show = false
				this.password = ''
			}
		},
		mounted() {
			Promise.all([
				this.$axios.get("http://localhost:85/device/get"),
				this.$axios.get("http://localhost:85/device/get-product-line")
			]).then((res) => {
				var dr = res[0].data;
				var lr = res[1].data;
				
				if (!dr.success) {
					this.$toast.error("读取设备信息失败：" + dr.meta.message);
					return;
				}
				if (!lr.success) {
					this.$toast.error("读取产线信息失败：" + lr.meta.message);
					return;
				}
				
				for(var p of dr.data) {
					this.$set(p, 'oee', p.oee * 100)
					this.$set(p, 'efficiency', p.efficiency * 100)
					this.$set(p, 'passRate', p.passRate * 100)
					this.$set(p, 'usage', p.usage * 100)
				}
				
				this.$set(lr.data, 'oee', lr.data.oee * 100)
				this.$set(lr.data, 'efficiency', lr.data.efficiency * 100)
				this.$set(lr.data, 'passRate', lr.data.passRate * 100)
				this.$set(lr.data, 'usage', lr.data.usage * 100)
				
				this.devices = dr.data
				this.line = lr.data
				
			}).catch((err) => {
				console.log('err', err)
			})
		}
	}
</script>
	
<style>
	tr{
		font-weight: 400;
		height: 3vh;
	}
</style>
