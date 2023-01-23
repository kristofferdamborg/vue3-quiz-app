<template>
  <component
    :is="component"
    :type="type"
    :to="to"
    :disabled="disabled"
    class="inline-flex w-full justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 sm:text-sm disabled:bg-gray-500"
    :class="[{ 'cursor-pointer': !disabled }, colorClasses]"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router'
import { computed } from 'vue'

type ButtonType = 'button' | 'submit'
type ButtonColor = 'primary' | 'white'

interface Props {
  to?: RouteLocationRaw
  href?: string
  type?: ButtonType
  color?: ButtonColor
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: undefined
})

const component = computed(() => {
  if (props.to) {
    return 'RouterLink'
  }

  return 'button'
})

const type = computed(() => {
  return component.value === 'button' ? props.type || 'button' : undefined
})

const colorClasses = computed(() => {
  switch (props.color) {
    case 'white':
      return 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
    case 'primary':
    default:
      return 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none  focus:ring-indigo-500'
  }
})
</script>
