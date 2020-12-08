<template>
  <div class="container" >
    <Header :menus="menus" :showMsg="true" :activeIndex="'1'" :login="login"></Header>
    <router-view v-if="isRouterAlive"></router-view>
    <Feedback v-if="!mobile"></Feedback>
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
        {index: 2, path: '/article', name: '文档中心'},
        {index: 7, path: '/gather', name: '传智杯校内选拔报名'},
        // {index: 2, path: '/student', name: '学生管理'},
        // {index: 3, path: '/homework', name: '作业管理'},
        // {index: 4, path: '/emailTask', name: '邮箱任务'},
        // {index: 2, path: '/tenant', name: '我的大学'},
        // {index: 3, path: '/service', name: '服务大厅'}
      ],
      login: false,
      role: null,
      isRouterAlive: true,
      mobile: this.isMobile()
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      this.login = true
      this.role = localStorage.getItem('role')
      if (this.role == 1) {
        this.menus = [
          {index: 1, path: '/home', name: '作业大厅'},
          {index: 2, path: '/article', name: '文档中心'},
          {index: 3, path: '/student', name: '学生管理'},
          {index: 4, path: '/homework', name: '作业管理'},
          {index: 5, path: '/emailTask', name: '邮箱任务'},
          {index: 6, path: '/articles', name: '文档管理'},
          {index: 7, path: '/gather', name: '传智杯校内选拔报名'},
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
    },
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
