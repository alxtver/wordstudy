<script setup lang="ts">
import type { Lesson } from '@/views/editlesson/types'
import { toRefs } from 'vue'
import { Delete, EditPen, More, Select } from '@element-plus/icons-vue'
import type { DropDownCommand } from '@/components/lessoncard/types'
import { useRouter } from 'vue-router'
import { type Action, ElMessageBox } from 'element-plus'

const props = defineProps<{ lesson: Lesson }>()
const { lesson } = toRefs(props)

const router = useRouter()

const emit = defineEmits<{ remove: [id: string] }>()

const goToEditPage = async (id: string): Promise<void> => {
  await router.push({ name: 'editLesson', params: { lessonId: id } })
}
const goToSelectPage = async (id: string): Promise<void> => {
  await router.push({ name: 'runLesson', params: { lessonId: id } })
}

const onChange = (command: DropDownCommand): void => {
  switch (command) {
    case 'DELETE':
      ElMessageBox.confirm('Удалить?', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Отмена',
        callback: (action: Action) => {
          if (action === 'confirm') {
            emit('remove', lesson.value.id)
          }
        }
      })

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
    <el-dropdown trigger="click" @command="onChange">
      <el-button :icon="More" text></el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="SELECT">
            <el-icon><Select /></el-icon>
            <span class="label">Выбрать</span>
          </el-dropdown-item>
          <el-dropdown-item command="EDIT">
            <el-icon><EditPen /></el-icon>
            <span class="label">Редактировать</span>
          </el-dropdown-item>
          <el-dropdown-item class="delete-item" divided command="DELETE">
            <el-icon>
              <Delete />
            </el-icon>
            <span class="label">Удалить</span>
          </el-dropdown-item>
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
  :deep(.card-body) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
:deep(.delete-item) {
  background: rgba(255, 0, 0, 0.18) !important;
}
.label {
  margin-left: 10px;
}
</style>
