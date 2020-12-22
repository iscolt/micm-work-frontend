<template>
  <div>
    <div style="position:fixed; bottom:10px;">
      <el-button @click="showMenu = !showMenu" icon="el-icon-menu" circle style="opacity:0.4;"></el-button>
    </div>
    <div style="width: 100%;display: flex;">
      <div v-show="showMenu"
           class="menu"
           :style="showMenu && isMobile ? 'width: 100%;' : 'width: 20%;'"
           style="border-right:thick double #dbdbdb;overflow:auto;">
        <ul>
          <li :class="activeMenu == index ? 'ul-active' : ''"
              v-for="(o, index) in data"
              @click="articleHandle(o, index)"
              :key="index">{{o.name}}</li>
        </ul>
      </div>
      <div class="content"
           v-show="!(showMenu && isMobile)"
           :style="showMenu ?
            (isMobile ?'width: 80%;' : 'width: 80%;height:600px;')
           : (isMobile ? 'width: 100%;' : 'width: 100%;height:600px;')" style="margin: 10px;overflow:auto;">
        <div class="markdown-body">
          <router-view v-if="isRouterAlive"></router-view>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Index",
  created() {
    this.isLogin()
  },
  data() {
    return {
      isMobile: this.isMobile(),
      showMenu: true,
      activeMenu: 0,
      isRouterAlive: true,
      data: [
        {index: 0, path: '/dashboard', name: '仪表盘'},
        {index: 1, path: '/student', name: '学生管理'},
        {index: 2, path: '/homework', name: '作业管理'},
        {index: 3, path: '/emailTask', name: '邮箱任务'},
        {index: 4, path: '/articles', name: '文档管理'},
        {index: 5, path: '/questions', name: '题库管理'},
      ]
    };
  },
  methods: {
    articleHandle(o, index) {
      if (this.isMobile) {
        this.showMenu = false
      }
      this.activeMenu = index
      this.$router.push(o.path)
    }
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
}
ul {
  padding: 10px;
  width: 88%;
  line-height: 40px;
  color: #b1b0b0;
  font-size: 18px;
  font-weight: bold;
  list-style: none;
}
ul :hover {
  cursor: pointer;
  font-size: 24px;
  color: #000;
}

.ul-active {
  font-size: 24px;
  color: #000;
}
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-track {
  background-color: #ffffff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
::-webkit-scrollbar-thumb {
  background-color: #ced5ce;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
</style>
