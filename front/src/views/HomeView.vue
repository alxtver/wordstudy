<script setup lang="ts">
import CreateButton from '@/components/createbutton/CreateButton.vue'
import { onMounted } from 'vue'
import { Lesson } from '@/views/createlesson/types'
import { ref } from 'vue'
import LessonApi from '@/views/createlesson/api/LessonApi'
import LessonCard from '@/components/createbutton/lessoncard/LessonCard.vue'
import { ElNotification } from 'element-plus'

const lessons = ref<Lesson[]>([])
onMounted(async (): Promise<void> => {
  try {
    lessons.value = await LessonApi.getAll()
  } catch (e) {
    ElNotification({
      title: 'Error',
      message: e.message,
      duration: 0
    })
  }
})
</script>

<template>
  <div class="lessons-container">
    <h2>Проверка</h2>
    <div class="card-container">
      <LessonCard class="lesson-card" v-for="lesson in lessons" :lesson="lesson" :key="lesson.id" />
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
