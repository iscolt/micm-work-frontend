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
      this.$message.error('您还没有登录！')
      this.$router.push('/login')
    }
  } catch (e) {
    // error
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
