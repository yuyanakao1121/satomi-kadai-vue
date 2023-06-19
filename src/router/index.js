import { createRouter, createWebHistory } from 'vue-router'
import Homee from '../views/Homee.vue'
import users from '../views/users.vue'
import create from '../views/create.vue'
import check from '../views/check.vue'
import update from '../views/update.vue'
import up_check from '../views/up_check.vue'
import remove from '../views/remove.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homee',
      component: Homee
    },
    {
      path: '/users',
      name: 'users',
      component: users
    },
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/check',
      name: 'check',
      component: check
    },
    {
      path: '/update',
      name: 'update',
      component: update
    },
    {
      path: '/up_check',
      name: 'up_check',
      component: up_check
    },
    {
      path: '/remove',
      name: 'remove',
      component: remove
    }
  ]
})

export default router

