import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditLesson from '@/views/editlesson/EditLesson.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editLesson/:lessonId',
      name: 'editLesson',
      component: EditLesson,
      props: true
    }
  ]
})

export default router
