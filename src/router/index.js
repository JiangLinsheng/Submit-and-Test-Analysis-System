import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '../components/UserLogin'
import UserHome from '../components/UserHome'
import UserManage from '../components/UserManage'
import ProjectManage from '../components/ProjectManage'
import StInfoManage from '../components/StInfoManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/UserLogin'
    },
    {
      path: '/UserLogin',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/UserHome',
      name: 'UserHome',
      component: UserHome,
      children: [
        {
          path: '/UserManage',
          name: 'UserManage',
          component: UserManage
        },
        {
          path: '/ProjectManage',
          name: 'ProjectManage',
          component: ProjectManage
        },
        {
          path: '/StInfoManage',
          name: 'StInfoManage',
          component: StInfoManage
        }
      ]
    }
  ]
})
