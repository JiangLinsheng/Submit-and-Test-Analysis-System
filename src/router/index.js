import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import home from '../components/home'
import staffmanage from '../components/staffmanage'
import projectManage from '../components/projectManage'
import stManage from '../components/stManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/staffmanage',
          name: 'staffmanage',
          component: staffmanage
        },
        {
          path: '/projectManage',
          name: 'projectManage',
          component: projectManage
        },
        {
          path: '/stManage',
          name: 'stManage',
          component: stManage
        }
      ]
    }
  ]
})
