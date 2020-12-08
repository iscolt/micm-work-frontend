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
              :key="index">{{o.title}}</li>
        </ul>
      </div>
      <div class="content"
           v-show="!(showMenu && isMobile)"
           :style="showMenu ?
            (isMobile ?'width: 80%;' : 'width: 80%;height:600px;')
           : (isMobile ? 'width: 100%;' : 'width: 100%;height:600px;')" style="margin: 10px;overflow:auto;">
        <div class="markdown-body" v-html="content"></div>
      </div>
    </div>
  </div>

</template>

<script>
import {list} from "@/api/article";
import 'mavon-editor/dist/css/index.css'
export default {
  name: "Index",
  created() {
    this.isLogin()
    this.fetch()
  },
  data() {
    return {
      isMobile: this.isMobile(),
      showMenu: true,
      activeMenu: -1,
      data: [],
      content: ''
    };
  },
  methods: {
    fetch() {
      list().then(res => {
        if (res.code === 200) {
          this.data = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    articleHandle(o, index) {
      if (this.isMobile) {
        this.showMenu = false
      }
      this.activeMenu = index
      this.content = o.html
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
  width: 8px;
}
::-webkit-scrollbar-track {
  background-color: #b1b0b0;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
::-webkit-scrollbar-thumb {
  background-color: #7b7d7b;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
</style>
