import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')

    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/Todos',
      name: 'Todos',
      component: () => import('../views/Todo.vue')
    },
    {
      path: '/Blogs',
      name: 'Blogs',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/practice',
      name: 'Practice',
      component: () => import('../views/Practice.vue')
    },
  ]
})

export default router
