<template>
  <div>
    <label :for="inputId" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1">
      <input
        v-model="value"
        :id="inputId"
        :type="type"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        :placeholder="placeholder"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { withDefaults, computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { getUniqueId } from '@/utils/helpers'

type InputType = 'text' | 'email' | 'password'

interface Props {
  modelValue: string
  type?: InputType
  id?: string
  label?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = useVModel(props, 'modelValue', emit)
const inputId = computed(() => props.id || `base-input-${getUniqueId().toString()}`)
</script>
