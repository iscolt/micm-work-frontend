import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/(home|)',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/Login')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/Reg')
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/Index')
  },
  {
    path: '/homework',
    name: 'Homework',
    component: () => import(/* webpackChunkName: "about" */ '../views/homework/Index')
  },
  {
    path: '/emailTask',
    name: 'EmailTask',
    component: () => import(/* webpackChunkName: "about" */ '../views/emailTask/Index')
  },
  // {
  //   path: '/lanqiao',
  //   name: 'LanQiao',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/gather/Index')
  // },
]

const router = new VueRouter({
  routes
})

export default router
