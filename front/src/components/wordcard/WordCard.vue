<script setup lang="ts">
import { Word } from '@/components/createwordcard/types'
import { toRefs } from 'vue'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps<{ word: Word }>()
const emit = defineEmits(['removeWord'])

const { word } = toRefs(props)

const removeWord = (): void => {
  emit('removeWord', word.value.id)
}
</script>

<template>
  <el-card class="mt-2">
    <div class="flex items-center justify-between">
      <div>
        <div class="flex">
          <div class="label">Слово</div>
          <div class="value">{{ word.enText }}</div>
        </div>
        <div class="flex">
          <div class="label">Перевод</div>
          <div class="value">{{ word.ruText }}</div>
        </div>
      </div>
      <el-popconfirm title="Удалить слово?" @confirm="removeWord">
        <template #reference>
          <el-button circle type="danger">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </template>
      </el-popconfirm>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.label {
  width: 80px;
}
.value {
  font-weight: bold;
}
</style>
