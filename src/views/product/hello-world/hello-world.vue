<template>
	<div>
		<mu-text-field type="text" label="名称"  style="width: 190px"></mu-text-field></br>
		<input type="text" v-model="value">
		<h1> {{ value }} </h1>
		<input type="button" value="来点我啊" @click="click">
		<v-container>
			<v-layout row wrap>
				<v-flex sm2>
					<select-all
						v-model="selectedFruits"
						:items="fruits"
						label="Favorite Fruits"
						multiple
						item-text="name"
						item-value="code"
						@change = "change"
						return-object
					></select-all>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	
	import selectAll from '@/components/select-all/select-all.vue'
	
	export default {
		name: 'helloWorld',
		components: {
			selectAll
		},
		data: function() {
			return {
				value: "HelloWorld",
				fruits: [
					{ "code": "0001", "name": "张飞" },
					{ "code": "0002", "name": "刘备" },
					{ "code": "0003", "name": "关羽" }
				],
				selectedFruits: []
			}
		},
		computed:{
		},
		methods:{
			click() {
				this.$router.push( { name: 'About' } )   // 路由跳转
			},
			async change(params) {
				const res = await this.$axios.get("http://localhost:85/device/get-product-line")
			}
		},
		mounted() {
			// const _this = this
			// var button = document.getElementsByTagName("input")[1]
			// button.addEventListener('click', function() {
			// 	_this.value = "点我啊"
			// })
		}
	}
	
</script>
	
<style>
</style>
