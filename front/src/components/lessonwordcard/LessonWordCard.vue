<script setup lang="ts">
import { Word } from '@/components/createwordcard/types'
import { ref, toRefs } from 'vue'
import { Check, Microphone } from '@element-plus/icons-vue'
import Alexa from '@/utils/Alexa'
import Unsplash from '@/api/Unsplash'
import type { Nullable } from '@/types'

const props = defineProps<{ word: Word }>()
const { word } = toRefs(props)
const showAnswer = ref(false)
const img = ref<Nullable<string>>(null)

const onSpeak = (): void => {
  const lang = showAnswer.value ? 'ru-RU' : 'en-US'
  const text = showAnswer.value ? word.value.ruText : word.value.enText
  Alexa.say(text, lang)
}

const onCheck = async (): Promise<void> => {
  showAnswer.value = !showAnswer.value
  if (showAnswer.value) {
    img.value = await Unsplash.getImageUrl(word.value.enText)
  } else {
    img.value = null
  }
}
</script>

<template>
  <el-card class="w-full h-full max-h-96 max-w-96" :style="{ background: img ? `url(${img})` : '' }">
    <div
      class="w-full flex word-card-body"
    >
      <div class="word" v-if="!showAnswer">{{ word.enText }}</div>
      <div class="word" v-else>{{ word.ruText }}</div>
    </div>

    <template #footer>
      <div class="w-full flex justify-end">
        <el-button type="primary" circle @click="onSpeak">
          <el-icon><Microphone /></el-icon>
        </el-button>
        <el-button type="primary" circle @click="onCheck">
          <el-icon><Check /></el-icon>
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.word {
  width: 100%;
  display: flex;
  font-size: 9vw;
  justify-content: center;
}
:deep(.el-card__body) {
  height: calc(100% - 70px);
  display: flex;
  justify-content: space-between;
}
</style>
