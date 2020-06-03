import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/product/home/home.vue'
import helloWorld from '../views/product/hello-world/hello-world.vue'
import device from '../views/product/device/device.vue'


Vue.use(VueRouter) 

  const routes = [
	{
		path: '/device', 
		name: 'device',
		title: 'OEE目标维护',
		order: 0,
		component: device
	},  
	{
		path: '/home',
		name: 'home',
		title: 'home',
		order: 1,
		component: home
	},
	{
		path: '/about',
		title: 'about',
		name: 'about',
		order: 2,
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/product/about/about.vue')
	}, 
	{
		path: '/helloWorld', 
		name: 'helloWorld',
		title: 'helloWorld',
		order: 3,
		component: helloWorld
	},
	{
		path: '/demo', 
		name: 'demo',
		title: 'demo',
		order: 4,
		component: () => import(/* webpackChunkName: "about" */ '../views/product/demo/demo.vue')
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
