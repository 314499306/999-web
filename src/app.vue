<template>
	<layout v-if = "show"></layout>	
	<login v-else></login>
</template>

<script>
	
import layout from './views/system/layout/layout.vue'
import login from './views/system/login/login.vue'
import token from './views/system/token/token.js'

export default {
  name: 'home',
  components: {
	layout,
	login
  },
  data: function () {
	  return {
		  show: false
	  }
  },
  mounted() {
	  let user = token.getToken()
	  console.log('user', user)
	  if(user) {
		  this.show = true
	  }
  }
}
</script>
