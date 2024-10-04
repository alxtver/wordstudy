<script setup lang="ts">
import { Word } from '@/components/createwordcard/types'
import { ref, toRefs } from 'vue'

const props = defineProps<{ word: Word }>()
const { word } = toRefs(props)
const showAnswer = ref(false)
</script>

<template>
  <el-card class="w-full h-full max-h-96 max-w-96">
    <div class="w-full h-full flex items-center">
      <div v-if="!showAnswer">{{ word.enText }}</div>
      <div v-else>{{ word.ruText }}</div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
