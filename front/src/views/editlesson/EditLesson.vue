<script setup lang="ts">
import { onMounted, toRefs, ref } from 'vue'
import { Lesson } from '@/views/editlesson/types'
import LessonApi from '@/views/editlesson/api/LessonApi'
import TextField from '@/components/basecomponents/textfield/TextField.vue'
import { useRouter } from 'vue-router'
import CreateWordCard from '@/components/createwordcard/CreateWordCard.vue'
import type { Word } from '@/components/createwordcard/types'
import WordApi from '@/components/createwordcard/api/WordApi'

const props = defineProps<{ lessonId: string }>()
const { lessonId } = toRefs(props)

const router = useRouter()

const lesson = ref<Lesson>(new Lesson())
const words = ref<Word[]>([])

onMounted(async (): Promise<void> => {
  lesson.value = await LessonApi.getById(lessonId.value)
})

const onChangeName = async (): Promise<void> => {
  await LessonApi.update(lesson.value)
}

const goBack = async () => {
  router.back()
}

const onCreateWord = async (word: Word): Promise<void> => {
  word.lesson = lesson.value.id
  const newWord = await WordApi.create(word)
  words.value.push(newWord)
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
      <div class="flex justify-end w-full">
        <CreateWordCard @create="onCreateWord" />
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
}
</style>
