import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditLesson from '@/views/editlesson/EditLesson.vue'
import RunLesson from "@/views/runlesson/RunLesson.vue";

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
    },
    {
      path: '/runLesson/:lessonId',
      name: 'runLesson',
      component: RunLesson,
      props: true
    }
  ]
})

export default router
