import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import lodash from 'lodash'
import moment from 'moment'
import Vuetify from 'vuetify'
import axios from './views/system/axios/axios.js'
import MaterialIcons from 'material-icons'

// museUi相关
import MuseUI from 'muse-ui'
import MuseUIToast from 'muse-ui-toast'
MuseUIToast.config({
	position: 'top-end',			// 位置
	time: 2000                      // 显示的时长
})
import MuseUIMessage from 'muse-ui-message'
import 'muse-ui/dist/muse-ui.css';
import 'vuetify/dist/vuetify.min.css'
import Theme from 'muse-ui/lib/theme' // 主题
Theme.use('dark'); 

// ECharts相关
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts'
Vue.component('v-chart', ECharts)

// MD5
import MD5 from 'js-md5'

Vue.use(Vuetify)
Vue.use(MuseUI)
Vue.use(MaterialIcons)

Vue.config.productionTip = false

//  下面有两种挂载的方式

// Vue.prototype.userToken = userToken  // 1. 这种挂载调用  this.token.token.name,    

Object.defineProperty(Vue.prototype, "$lodash", {  // 2. 这种挂载调用 this.$lodash
	value: lodash,
	writable: true
})

Object.defineProperty(Vue.prototype, "$moment", {
	value: moment,
	writable: true
})

Object.defineProperty(Vue.prototype, "$axios", {
	value: axios,
	writable: true
})

Object.defineProperty(Vue.prototype, "$MD5", {
	value: MD5,
	writable: true
})

Object.defineProperty(Vue.prototype, "$museUI", {
	value: MuseUI,
	writable: true
})

Object.defineProperty(Vue.prototype, "$museUIToast", {
	value: MuseUIToast,
	writable: true
})

Object.defineProperty(Vue.prototype, "$museUIMessage", {
	value: MuseUIMessage,
	writable: true
})

Object.defineProperty(Vue.prototype, "$MaterialIcons", {
	value: MaterialIcons,
	writable: true
})

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
