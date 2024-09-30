<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const createLesson = (): void => {
    router.push('/createLesson');
}
</script>

<template>
  <el-button class="add-button" type="success" :icon="Plus" circle size="large" @click="createLesson"/>
</template>

<style scoped lang="scss">
.add-button {
    position: fixed;
    right: 20px;
    bottom: 10px;
}
</style>
