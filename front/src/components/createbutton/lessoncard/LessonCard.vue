<script setup lang="ts">
import type { Lesson } from '@/views/createlesson/types'
import { toRefs } from 'vue'
import { More } from '@element-plus/icons-vue'

const props = defineProps<{ lesson: Lesson }>()
const { lesson } = toRefs(props)
</script>

<template>
  <el-card class="lesson-card" body-class="card-body" :body-style="{ padding: '10px' }">
    <div class="lesson-labels">
      <div class="lesson-name">{{ lesson.name }}</div>
      <div class="lesson-date">{{ lesson.displayDate }}</div>
    </div>
    <el-button type="text" :icon="More"></el-button>
  </el-card>
</template>

<style scoped lang="scss">
.lesson-card {
  .lesson-labels {
    .lesson-name {
      font-weight: bold;
    }

    .lesson-date {
      font-size: 10px;
      color: gray;
    }
  }
  ::v-deep {
    .card-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
