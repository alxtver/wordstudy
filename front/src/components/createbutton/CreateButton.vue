<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import LessonApi from '@/views/editlesson/api/LessonApi'
import { Lesson } from '@/views/editlesson/types'

const router = useRouter()

const createLesson = async (): Promise<void> => {
  const lesson = await LessonApi.create(new Lesson())
  await router.push({ name: 'editLesson', params: { lessonId: lesson.id } })
}
</script>

<template>
  <el-button
    class="add-button"
    type="success"
    :icon="Plus"
    circle
    size="large"
    @click="createLesson"
  />
</template>

<style scoped lang="scss">
.add-button {
  position: fixed;
  right: 20px;
  bottom: 10px;
}
</style>
