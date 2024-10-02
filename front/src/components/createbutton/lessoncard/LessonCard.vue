<script setup lang="ts">
import type { Lesson } from '@/views/createlesson/types'
import { toRefs } from 'vue'
import { More } from '@element-plus/icons-vue'
import type { DropDownCommand } from '@/components/createbutton/lessoncard/types'
import { useRouter } from 'vue-router'

const props = defineProps<{ lesson: Lesson }>()
const { lesson } = toRefs(props)

const router = useRouter()

const emit = defineEmits<{ remove: [id: string] }>()

const goToEditPage =async (id: string): Promise<void> => {
    await router.push({ name: 'editLesson', params: { lessonId: id } })
}
const goToSelectPage = (id: string): void => {}

const onChange = (command: DropDownCommand): void => {
  switch (command) {
    case 'DELETE':
      emit('remove', lesson.value.id)
      break
    case 'EDIT':
      goToEditPage(lesson.value.id)
      break
    case 'SELECT':
      goToSelectPage(lesson.value.id)
  }
}
</script>

<template>
  <el-card class="lesson-card" body-class="card-body" :body-style="{ padding: '10px' }">
    <div class="lesson-labels">
      <div class="lesson-name">{{ lesson.name }}</div>
      <div class="lesson-date">{{ lesson.displayDate }}</div>
    </div>
    <el-dropdown
      ref="dropdown1"
      trigger="contextmenu"
      style="margin-right: 30px"
      @command="onChange"
    >
      <el-button type="text" :icon="More"></el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="SELECT">Выбрать</el-dropdown-item>
          <el-dropdown-item command="EDIT">Редактировать</el-dropdown-item>
          <el-dropdown-item divided command="DELETE">Удалить</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-card>
</template>

<style scoped lang="scss">
.lesson-card {
  .lesson-labels {
    .lesson-name {
      font-weight: bold;
    }

    .lesson-date {
      font-size: 10px;
      color: gray;
    }
  }
  ::v-deep {
    .card-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
