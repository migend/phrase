import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/entries',
      name: 'entries',
      component: () => import('../views/EntriesPage.vue')
    },
    {
      path: '/entries/:id',
      name: 'entry',
      component: () => import('../views/EntryPage.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsPage.vue')
    }
  ]
})

export default router
