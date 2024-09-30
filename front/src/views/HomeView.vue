<script setup lang="ts">
import CreateButton from '@/components/createbutton/CreateButton.vue'
import { onMounted } from 'vue'
import { Lesson } from '@/views/createlesson/types'
import { ref } from 'vue'
import LessonApi from '@/views/createlesson/api/LessonApi'
import LessonCard from '@/components/createbutton/lessoncard/LessonCard.vue'

const lessons = ref<Lesson[]>([])
onMounted(async (): Promise<void> => {
  lessons.value = await LessonApi.getAll()
})
</script>

<template>
  <div class="lessons-container">
      <h2>Проверка</h2>
    <LessonCard class="lesson-card" v-for="lesson in lessons" :lesson="lesson" :key="lesson.id" />
  </div>
  <CreateButton />
</template>

<style lang="scss" scoped>
.lesson-card + .lesson-card {
    margin-top: 10px;
}
</style>
