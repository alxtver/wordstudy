<script setup lang="ts">
import { toRefs } from 'vue'

const modelValue = defineModel()
const props = defineProps<{ label?: string }>()
const { label } = toRefs(props)
</script>

<template>
  <div class="flex items-center">
    <div v-if="label" class="mr-2 text-gray-500 font-bold">{{ label }}</div>
    <el-input v-bind="$attrs" v-model="modelValue" />
  </div>
</template>

<style scoped lang="scss"></style>
