<template>
  <div
    role="checkbox"
    :aria-checked="checked"
    :aria-disabled="disabled"
    :aria-invalid="error"
    :tabindex="disabled ? -1 : 0"
    :class="[
      'relative flex cursor-pointer rounded-lg border bg-white px-6 p-4 shadow-sm text-gray-500 font-medium transition-colors',
      {
        'cursor-default': disabled,
        'hover:bg-indigo-50 hover:border-indigo-300': !disabled,
        'bg-green-50 border-green-500 focus:outline-none': checked,
        'bg-red-50 border-red-500 focus:outline-none animate-wiggle': error
      }
    ]"
    @click.prevent="handleClick"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  checked?: boolean
  error?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  error: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(e: MouseEvent) {
  if (props.disabled) return

  emit('click', e)
}
</script>
