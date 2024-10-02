<script setup lang="ts">
import type { Lesson } from '@/views/createlesson/types'
import { toRefs } from 'vue'

const props = defineProps<{ lesson: Lesson }>()
const { lesson } = toRefs(props)
</script>

<template>
  <el-card>
    <div>{{ lesson.name }}</div>
    <div class="lesson-date">{{ lesson.displayDate }}</div>
  </el-card>
</template>

<style scoped lang="scss"></style>
