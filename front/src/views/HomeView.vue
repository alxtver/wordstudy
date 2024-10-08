<script setup lang="ts">
import CreateButton from '@/components/createbutton/CreateButton.vue'
import { onMounted } from 'vue'
import { Lesson } from '@/views/editlesson/types'
import { ref } from 'vue'
import LessonApi from '@/views/editlesson/api/LessonApi'
import LessonCard from '@/components/lessoncard/LessonCard.vue'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const lessons = ref<Lesson[]>([])

const router = useRouter()

onMounted(async (): Promise<void> => {
  try {
    lessons.value = await LessonApi.getAll()
  } catch (e: any) {
    ElNotification({
      title: 'Error',
      message: e.message,
      duration: 10
    })
  }
})

/** Удалить урок */
const removeLesson = async (lessonId: string): Promise<void> => {
    try {
        await LessonApi.removeLesson(lessonId)
        const index = lessons.value.findIndex(lesson => lesson.id === lessonId)
        if (index > -1) {
            lessons.value.splice(index, 1)
        }
    } catch (e) {
        ElNotification({
            title: 'Error',
            message: 'Не удалось удалить!',
            duration: 10
        })
    }
}

const goToSelectPage = async (id: string): Promise<void> => {
    await router.push({ name: 'runLesson', params: { lessonId: id } })
}
</script>

<template>
  <div class="lessons-container">
    <div class="card-container">
      <LessonCard
        class="lesson-card"
        v-for="lesson in lessons"
        :lesson="lesson"
        :key="lesson.id"
        @remove="removeLesson"
        @click="goToSelectPage(lesson.id)"
      />
    </div>
  </div>
  <CreateButton />
</template>

<style lang="scss" scoped>
.lessons-container {
  height: calc(100vh - 65px);
  .card-container {
    height: calc(100% - 50px);
    overflow: auto;
    .lesson-card + .lesson-card {
      margin-top: 10px;
    }
  }
}
</style>
