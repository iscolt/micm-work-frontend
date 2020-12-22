<template>
  <div>
    <div style="position:fixed; bottom:10px;">
      <el-button @click="showMenu = !showMenu" icon="el-icon-house" circle style="opacity:0.4;"></el-button>
    </div>
    <div v-if="subject != ''" style="position:fixed; bottom:60px;">
      <el-button @click="setActiveHandle" icon="el-icon-notebook-2" circle style="opacity:0.4;"></el-button>
    </div>
    <el-drawer
        :title="subject"
        :visible.sync="drawer"
        :size="isMobile ? '100%' : '30%'"
        :with-header="true">
      <div style="float: left;margin: 10px;">
        <el-button
            type="primary"
            circle
            v-for="(item, index) in data"
            :key="index"
            @click="buttonHandle(index)">{{ index+1 }}</el-button>
      </div>
    </el-drawer>
    <div style="width: 100%;display: flex;">
      <div v-show="showMenu"
           class="menu"
           :style="showMenu && isMobile ? 'width: 100%;' : 'width: 20%;'"
           style="border-right:thick double #dbdbdb;overflow:auto;">
        <ul>
          <li :class="activeMenu == index ? 'ul-active' : ''"
              v-for="(o, index) in subjectList"
              @click="articleHandle(o, index)"
              :key="index">{{o}}</li>
        </ul>
      </div>
      <div class="content"
           v-show="!(showMenu && isMobile)"
           :style="showMenu ?
            (isMobile ?'width: 80%;' : 'width: 80%;height:600px;')
           : (isMobile ? 'width: 100%;' : 'width: 100%;height:600px;')" style="margin: 10px;overflow:auto;">
        <div class="question-body">
          <el-carousel ref="carousel"
                       :height="carouselHeight"
                       indicator-position="none"
                       :initial-index="initiaIndex"
                       :autoplay="false"
                       arrow="never">
            <el-carousel-item v-for="item in data" :key="item">
              <div :ref="'carousel-content-'+item" style="height: 380px; overflow:auto;">
                <h3><el-tag size="mini">{{item.type}}</el-tag>{{item.stem}}</h3>
                <div>
                  <ul v-if="item.type == '单选题'">
                    <li v-for="(o, index) in JSON.parse(item.options)" :key="index">
                      <el-radio :label="o">{{String.fromCharCode((65 + index)) + ". " + o}}</el-radio>
                    </li>
                  </ul>
                  <ul v-if="item.type == '多选题'">
                    <li v-for="(o, index) in JSON.parse(item.options)" :key="index">
                      <el-checkbox>{{String.fromCharCode((65 + index)) + ". " + o}}</el-checkbox>
                    </li>
                  </ul>
                  <div v-if="item.type == '判断题'">
                    <el-radio label="1">正确</el-radio>
                    <el-radio label="2">错误</el-radio>
                  </div>
                  <div v-if="item.type == '填空题'">
                    <el-input placeholder="请输入内容"
                               v-for="(o, index) in JSON.parse(item.options)"
                               v-show="o != ''"
                               :key="index"></el-input><br/>
                  </div>
                  <div v-if="item.type == '主观题'">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容">
                    </el-input>
                  </div>
                </div><br/>
                <div v-show="showResolve">
                  <strong>答案：</strong>
                  <span v-show="o != '' && item.type != '填空题'">{{item.answer}}</span>
                  <span v-for="(o, index) in JSON.parse(item.options)"
                        v-show="o != '' && item.type == '填空题'"
                        :key="index">{{o + " "}}</span><br/>
                </div><br/>
                <div v-show="showResolve">
                  <strong>解析：</strong>{{item.resolve}}
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div style="display: flex;justify-content: space-around;margin-top: 5px">
            <el-button type="primary" @click="prevHandle()" plain>上一题</el-button>
            <el-button type="primary" @click="showResolve = !showResolve" plain>解析</el-button>
            <el-button type="primary" @click="nextHandle()" plain>下一题</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import 'mavon-editor/dist/css/index.css'
import {listBySubject, listSubject} from "@/api/question";
export default {
  name: "Index",
  created() {
    this.isLogin()
    this.fetch()
    this.fetchBySubject()
  },
  data() {
    return {
      isMobile: this.isMobile(),
      showMenu: true,
      activeMenu: -1,
      data: [],
      initiaIndex: 0,
      showResolve: false,
      carouselHeight: '380px',
      subject: "",
      subjectList: [],
      drawer: false,
    };
  },
  methods: {
    fetch() {
      listSubject().then(res => {
        if (res.code === 200) {
          this.subjectList = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    fetchBySubject() {
      listBySubject(this.subject).then(res => {
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
      this.subject = o
      this.activeMenu = index
      this.fetchBySubject()
    },
    prevHandle() {
      if (this.$refs.carousel) {
        this.showResolve = false;
        this.$refs.carousel.prev()
      }
    },
    nextHandle() {
      if (this.$refs.carousel) {
        this.showResolve = false;
        this.$refs.carousel.next()
      }
    },
    setActiveHandle() {
      this.drawer = true
    },
    buttonHandle(index) {
      this.drawer = false
      if (this.$refs.carousel) {
        this.$refs.carousel.setActiveItem(index)
      }
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
}
::-webkit-scrollbar-track {
  background-color: #ffffff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
::-webkit-scrollbar-thumb {
  background-color: #d1d5d1;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}

</style>
