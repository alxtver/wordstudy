<script setup lang="ts">
import { onMounted, toRefs, ref } from 'vue'
import { Lesson } from '@/views/editlesson/types'
import LessonApi from '@/views/editlesson/api/LessonApi'
import TextField from '@/components/basecomponents/textfield/TextField.vue'
import { useRouter } from 'vue-router'
import CreateWordCard from '@/components/createwordcard/CreateWordCard.vue'
import type { Word } from '@/components/createwordcard/types'
import WordApi from '@/components/createwordcard/api/WordApi'
import WordCard from '@/components/wordcard/WordCard.vue'

const props = defineProps<{ lessonId: string }>()
const { lessonId } = toRefs(props)

const router = useRouter()

const lesson = ref<Lesson>(new Lesson())
const words = ref<Word[]>([])

onMounted(async (): Promise<void> => {
  lesson.value = await LessonApi.getById(lessonId.value)
  words.value = lesson.value.words
})

const onChangeName = async (): Promise<void> => {
  await LessonApi.update(lesson.value)
}

const goBack = async () => {
  router.back()
}

const onCreateWord = async (word: Word): Promise<void> => {
  word.lesson = lesson.value
  const newWord = await WordApi.create(word)
  words.value.unshift(newWord)
}

const onRemoveWord = async (wordId: string): Promise<void> => {
  await WordApi.removeWord(wordId)
  const index = words.value.findIndex((word) => word.id === wordId)
  if (index > -1) {
    words.value.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <TextField
      v-model="lesson.name"
      @change="onChangeName"
      label="Наименование"
      label-width="120px"
    />
    <el-divider />
    <div class="word-container">
      <CreateWordCard @create="onCreateWord" />
        <div class="added-words">
            <WordCard v-for="word in words" :key="word.id" :word="word" @remove-word="onRemoveWord" />
        </div>
    </div>
    <div class="flex justify-end w-full">
      <el-button type="info" @click="goBack">Назад</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.word-container {
  height: calc(100vh - 180px);
    .added-words {
        margin-top: 5px;
        height: calc(100vh - 310px);
        overflow: auto;
    }
}
</style>
