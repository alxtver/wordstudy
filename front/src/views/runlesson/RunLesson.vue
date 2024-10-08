<script setup lang="ts">
import { computed, onBeforeMount, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Lesson } from '@/views/editlesson/types'
import type { Word } from '@/components/createwordcard/types'
import LessonApi from '@/views/editlesson/api/LessonApi'
import { Back, Check, Microphone } from '@element-plus/icons-vue'
import Alexa from '@/utils/Alexa'
import Unsplash from '@/api/Unsplash'
import type { Nullable } from '@/types'

const props = defineProps<{ lessonId: string }>()
const { lessonId } = toRefs(props)

const router = useRouter()

const lesson = ref<Lesson>(new Lesson())
const words = ref<Word[]>([])
const currentIndex = ref(0)

const showAnswer = ref(false)
const img = ref<Nullable<string>>(null)

onBeforeMount(async (): Promise<void> => {
  lesson.value = await LessonApi.getById(lessonId.value)
  words.value = lesson.value.words
})

const word = computed((): Word => words.value[currentIndex.value])
const ruText = computed((): string => word.value.ruText)
const enText = computed((): string => word.value.enText)

const goBack = (): void => {
  router.back()
}

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

const swipe = (direction: 'left' | 'right'): void => {
  if (direction === 'right') {
    currentIndex.value = currentIndex.value ? --currentIndex.value : currentIndex.value
  } else if (direction === 'left') {
    currentIndex.value < words.value.length - 1 ? ++currentIndex.value : currentIndex.value
  }
  showAnswer.value = false
}
</script>

<template>
  <div class="w-full" style="height: calc(100vh - 4rem)" v-touch:swipe="swipe">
    <div class="w-full flex justify-between">
      <div class="text-amber-300 text-3xl mr-40">{{ `${currentIndex + 1}/${words.length}` }}</div>
      <el-button type="success" @click="goBack" circle size="large">
        <el-icon><Back /></el-icon>
      </el-button>
    </div>

    <el-card v-if="words.length" class="h-screen-1/2 mt-3">
      <div class="word" v-if="showAnswer">{{ ruText }}</div>
      <div class="word" v-else>{{ enText }}</div>
      <template #footer>
        <div class="w-full flex justify-end">
          <el-button type="info" circle @click="onSpeak" size="large">
            <el-icon><Microphone /></el-icon>
          </el-button>
          <el-button type="primary" circle @click="onCheck" size="large">
            <el-icon><Check /></el-icon>
          </el-button>
        </div>
      </template>
    </el-card>

    <div
      v-if="showAnswer"
      class="image mt-3"
      style="height: 40vh"
      :style="{
        background: img ? `url(${img})` : '',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.word {
  font-size: 2.5rem;
  color: #505050;
  box-sizing: border-box;
  font-weight: bold;
  backdrop-filter: blur(8px);
  overflow-wrap: break-word;
  hyphens: auto;
  text-align: center;
}
</style>
