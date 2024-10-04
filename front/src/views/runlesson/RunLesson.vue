<script setup lang="ts">
import { onBeforeMount, onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Lesson } from '@/views/editlesson/types'
import type { Word } from '@/components/createwordcard/types'
import LessonApi from '@/views/editlesson/api/LessonApi'
import LessonWordCard from '@/components/lessonwordcard/LessonWordCard.vue'

const props = defineProps<{ lessonId: string }>()
const { lessonId } = toRefs(props)

const router = useRouter()

const lesson = ref<Lesson>(new Lesson())
const words = ref<Word[]>([])
const currentIndex = ref(0)

onBeforeMount(async (): Promise<void> => {
  lesson.value = await LessonApi.getById(lessonId.value)
  words.value = lesson.value.words
})

const goBack = (): void => {
  router.back()
}
</script>

<template>
  <div class="w-full h-full" style="height: calc(100vh - 4rem)">
    <div class="w-full flex justify-end">
      <el-button type="success" @click="goBack">Назад</el-button>
    </div>
    <div v-if="words.length" class="flex items-center p-5" style="height: calc(100% - 32px)">
      <LessonWordCard :word="words[currentIndex]" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
