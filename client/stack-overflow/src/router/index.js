import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import groupquestion from '@/components/groupquestion'
import question from '@/components/question'
import comment from '@/components/comment'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: login
  }, {
    path: '/home',
    component: home,
    children: [{
      path: '/',
      component: groupquestion
    }]
  }, {
    path: '/question',
    component: question,
    children: [{
      path: '/',
      component: comment
    }]
  }]
})
