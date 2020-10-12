import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.isLogin = function(){
  // 判断缓存中是否登录过，直接登录
  try {
    const value = localStorage.getItem('token');
    if (value) {
      //有登录信息
      console.log("已登录用户：",value);
    }
    else{
      this.$router.push('/login')
    }
  } catch (e) {
    // error
  }
}

Vue.prototype.isAdmin = function(){
  // 判断缓存中是否登录过，直接登录
  try {
    const value = localStorage.getItem('role');
    if (value != 1) {
      this.$router.push('/home')
    }
  } catch (e) {
    // error
  }
}

Vue.prototype.isMobile = function(){
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
