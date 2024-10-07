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

const swipeLeft = (direction: 'left' | 'right'): void => {
  if (direction === 'right') {
    currentIndex.value = currentIndex.value ? --currentIndex.value : currentIndex.value
  } else if (direction === 'left') {
    currentIndex.value < words.value.length - 1 ? ++currentIndex.value : currentIndex.value
  }
}
</script>

<template>
  <div
    class="w-full h-full"
    :style="{
      background: img ? `url(${img})` : '',
      height: 'calc(100vh - 4rem)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }"
    v-touch:swipe="swipeLeft"
  >
    )>
    <div class="w-full flex justify-end">
      <el-button type="info" circle @click="onSpeak">
        <el-icon><Microphone /></el-icon>
      </el-button>
      <el-button type="primary" circle @click="onCheck">
        <el-icon><Check /></el-icon>
      </el-button>
      <el-button type="success" @click="goBack" circle>
        <el-icon><Back /></el-icon>
      </el-button>
    </div>
    <div v-if="words.length" class="flex items-center p-5">
      <div class="word" v-if="showAnswer">{{ ruText }}</div>
      <div class="word" v-else>{{ enText }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.word {
  width: 100vw;
  font-size: 3rem;
  color: #d2d1d1;
  box-sizing: border-box;
  position: absolute;
  font-weight: bold;
  left: 0;
  top: 24vh;
  backdrop-filter: blur(8px);
  text-align: center;
  -webkit-text-stroke: 2px #3a3a3a;
  overflow-wrap: break-word;
  hyphens: auto;
}
</style>
