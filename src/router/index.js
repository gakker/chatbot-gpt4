import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = true // replace with actual authentication check
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
