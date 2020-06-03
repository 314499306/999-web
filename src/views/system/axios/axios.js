import axios from 'axios'
import token from '../token/token.js'
import Vue from 'vue'
import Toast from 'muse-ui-toast';
Vue.use(Toast)

//请求发送拦截，把数据发送给后台之前做些什么......
axios.interceptors.request.use((request) => {
  console.log("=============== 请求拦截 ==============", request)
  let user = token.getToken()
  var Authorization = new Object
  if(user){
	user = JSON.parse(user)
	Authorization.code = user.code
	Authorization.password = user.password
	console.log(JSON.stringify(Authorization))
  }
  request.headers = {
    'Content-Type':'application/json'
  }
  request.headers['Authorization'] = JSON.stringify(Authorization)
  //再发送给后台
  return request;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//请求返回拦截，把数据返回到页面之前做些什么...
axios.interceptors.response.use((response) => response, function (error) {
  console.log("=============== error ==============", error.response)	
  if(error.response.status === 401) {
	  Toast.error('用户信息已过期!');
	  token.removeToken()
	  location.reload() 
  }
  return Promise.reject(error);
});

export default axios