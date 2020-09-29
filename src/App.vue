<template>
  <div class="container" >
    <Header :menus="menus" :showMsg="true" :activeIndex="'1'" :login="login"></Header>
    <router-view v-if="isRouterAlive"></router-view>
    <Feedback></Feedback>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/_Header";
import Footer from "@/components/_Footer";
import Feedback from "@/components/_Feedback";

export default {
  components: {
    Header,
    Footer,
    Feedback
  },
  data() {
    return {
      menus: [
        {index: 1, path: '/home', name: '作业大厅'},
        {index: 2, path: '/student', name: '学生管理'},
        {index: 2, path: '/homework', name: '作业管理'},
        // {index: 2, path: '/tenant', name: '我的大学'},
        // {index: 3, path: '/service', name: '服务大厅'}
      ],
      login: false,
      user: null,
      isRouterAlive: true
    };
  },
  created() {
    console.log(1111)
    if (localStorage.getItem('token')) {
      this.login = true
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user.tenantId == 0) {
        this.menus = [
          {index: 1, path: '/home', name: '首页'},
          {index: 2, path: '/service', name: '服务大厅'}
        ]
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key)
    },
    reload(){
      this.isRouterAlive =false;
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  },
  provide(){
    return{
      reload:this.reload
    }
  },
}
</script>

<style scoped>
</style>
