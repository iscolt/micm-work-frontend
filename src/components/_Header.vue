<template>
    <div class="container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item>
                <router-link to="/" >
                    <img style="width: 50px;height: 50px" src="http://micm.oss-cn-shanghai.aliyuncs.com/7977644c-4d10-42eb-9d8d-300f7c8a384c.png"/>
                </router-link>
            </el-menu-item>
            <el-menu-item v-for="menu in menus" :index="menu.path" :key="menu.index">{{menu.name}}</el-menu-item>
            <!--用户已登录-->
            <div class="user" v-if="login">
                <!--头像列表-->
                <li class="user-item account-item">
                  <el-popover
                          placement="bottom"
                          height="500"
                          width="200"
                          trigger="hover">
                      <div class="account-bottom">
                          <ul class="account-ul">
                              <li @click="openBandEmail()">绑定邮箱</li>
                              <li @click="accOut()">退出</li>
                          </ul>
                      </div>
                      <el-button slot="reference" class="user-photo"><img src="https://static.hdslb.com/images/akari.jpg" alt="" class="user-head user-hand-img" ></el-button>
                  </el-popover>
                </li>
              <!--头像列表-->
              <router-link target="_blank" to="/user/account" ><li class="user-item account-item">
                <el-popover
                    placement="bottom"
                    height="500"
                    width="200"
                    trigger="hover">
                  <div class="account-bottom">
                    <router-link class="un-item" target="_blank" to="/user/account">
                      <img :src="user.avatar" alt="" class="user-hand-img"><br>
                      <span>{{user.nickname}}</span>
                    </router-link>
                    <hr align=center color=#888888 size=1>
                    <router-link class="un-item" target="_blank" to="/">LV: <span>2</span></router-link>
                    <hr align=center color=#888888 size=1>
                    <ul class="account-ul">
                      <router-link target="_blank" to="/service"><li>服务中心</li></router-link>
                      <router-link to="/user/account"><li>账号设置</li></router-link>
                      <li @click="accOut()">退出</li>
                    </ul>
                  </div>
                  <el-button slot="reference" class="user-photo"><img :src="user.avatar" alt="" class="user-head user-hand-img" ></el-button>
                </el-popover></li>
              </router-link>
              <router-link to="/user/message"><li class="user-item"><el-badge :is-dot="showMsg" class="item">消息</el-badge></li></router-link>
              <router-link to="/user/collect"><li class="user-item">收藏</li></router-link>
              <router-link to="/user/schedule"><li class="user-item">日程</li></router-link>
            </div>
            <!--        用户未登录-->
            <div class="user" v-if="!login">
                <router-link to="/login"><el-button class="user-item" @click="login()">点击登录</el-button></router-link>
            </div>
        </el-menu>
    </div>
</template>

<script>
import {bindEmail} from "@/api/student";

export default {
        name: "Header",
        data() {
            return {
                user: {},
            }
        },
        props: {
            menus: Array,
            activeIndex: String,
            showMsg: Boolean,
            login: Boolean,
        },
        mounted() {
            if (localStorage.getItem('token')) {
                this.user = JSON.parse(localStorage.getItem('user'))
                console.log('head',this.user)
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key == 0) {
                    this.activeIndex = 1;
                }
                console.log(key, keyPath);
                if (key ==  null) {
                    return
                }
                this.$router.push(key)
            },
            accOut() {
                localStorage.clear()
                this.isLogin = false
                location.reload()
                this.$message('登出成功！')
                this.$router.push('/')
            },
            openBandEmail() {
              this.$prompt('请输入邮箱', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: '邮箱格式不正确'
              }).then(({ value }) => {
                bindEmail(value).then(res => {
                  if (res.code === 200) {
                    this.$message({
                      type: 'success',
                      message: '你的邮箱是: ' + value
                    });
                  } else {
                    this.$message({
                      type: 'warning',
                      message: res.message
                    });
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });
              });
            }
        }
    }
</script>

<style scoped>
    .container {
        position: sticky;
        z-index: 999;
        top: 0;
    }
    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
    /*用户*/
    .user{
        float: right;
    }
    .user:focus{
        background-color: white;
        border: none;
    }
    .user-item{
        padding: 0 12px;
        display: inline-block;
        height: 46px;
        /*line-height: 59px;*/
        color: #909399;
    }
    .user li:hover{
        color: black;
    }
    .user-photo{
        width: 34px;
        height: 34px;
    }
    .user-photo img{
        width: 34px;
        height: 34px;
    }
    /*下拉菜单*/
    .tooltip{
        padding: 0;
    }
    .account-item .el-button{
        border: none;
        color: #909399;
    }
    .account-item .el-button:hover{
        background-color: white;
        color: black;
    }
    .account-bottom{
        text-align: center;
    }
    .account-ul{
        list-style: none;
        padding: 0;
    }
    .account-ul a{
        color: #888888;
    }
    .account-ul li{
        padding: 7px 0;
        cursor: pointer;
    }
    .account-ul li:hover {
        background-color: #eeeeee;
        color: black;
    }
    .el-popover__reference{
        padding: 0;
    }
    .user-hand-img{
        border-radius: 17px;
        width:34px;
        height:34px;
    }
    .user-head{
        position: relative;
        top: 10px;
    }
</style>
