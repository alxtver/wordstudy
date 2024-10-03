<script setup lang="ts">
import TextField from '@/components/basecomponents/textfield/TextField.vue'
import { Plus } from '@element-plus/icons-vue'
import { Word } from '@/components/createwordcard/types'
import { computed, ref } from 'vue'

const emit = defineEmits<{ create: [word: Word] }>()

const word = ref(new Word())

const disableAdd = computed((): boolean => {
  return !word.value.enText || !word.value.ruText
})

const onAddClick = () => {
  emit('create', word.value)
  word.value = new Word()
}
</script>

<template>
  <el-card>
    <div class="flex items-center justify-between">
      <div>
        <TextField v-model="word.enText" label="Слово" />
        <TextField v-model="word.ruText" class="mt-1" label="Перевод" />
      </div>
      <el-button
        class="ml-2"
        type="primary"
        circle
        :icon="Plus"
        :disabled="disableAdd"
        @click="onAddClick"
      />
    </div>
  </el-card>
</template>

<style scoped lang="scss"></style>
