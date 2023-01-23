<template>
  <div role="alert" :class="['border rounded-lg px-6 py-4 font-medium', typeClasses]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type AlertType = 'error' | 'info'

interface Props {
  type: AlertType
}

const props = defineProps<Props>()

const typeClasses = computed(() => {
  switch (props.type) {
    case 'error':
      return 'border-red-300 bg-red-50 text-red-700'
    case 'info':
    default:
      return 'border-blue-300 bg-blue-50 text-blue-700'
  }
})
</script>
