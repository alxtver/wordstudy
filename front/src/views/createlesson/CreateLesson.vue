<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Lesson } from '@/views/createlesson/types'
import LessonApi from '@/views/createlesson/api/LessonApi'

const lesson = ref<Lesson>(new Lesson());

onMounted(async (): Promise<void> => {
    lesson.value = await LessonApi.create(lesson.value)
})

</script>

<template>
    <h2>Создание</h2>
    <el-input v-model="lesson.name"></el-input>
    <div class="word-container"></div>
</template>

<style scoped lang="scss">
.word-container {
    height: 100%;
}
</style>