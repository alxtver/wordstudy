import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateLesson from '@/views/createlesson/CreateLesson.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/createLesson',
      name: 'createLesson',
      component: CreateLesson
    },
  ]
})

export default router
