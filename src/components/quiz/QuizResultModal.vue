<template>
  <Teleport to="body">
    <TransitionRoot as="template" :show="modelValue">
      <Dialog as="div" class="relative z-20" static>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div>
                  <div
                    v-if="isAllAnswersCorrect"
                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                  >
                    <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div
                    v-else
                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
                  >
                    <XMarkIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                      {{ isAllAnswersCorrect ? 'Congratulations!' : 'Great effort!' }}
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{
                          isAllAnswersCorrect
                            ? 'You won by answering all questions correctly.'
                            : `You answered ${correctAnswerCount} of ${questionCount} questions correctly. Try again or choose another difficulty.`
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <UIButton class="sm:col-start-2" :to="{ name: 'home' }">
                    Choose another difficulty
                  </UIButton>
                  <UIButton
                    ref="cancelButtonRef"
                    class="mt-3 sm:col-start-1 sm:mt-0"
                    color="white"
                    @click="resetQuiz"
                  >
                    Try again
                  </UIButton>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>

<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import UIButton from '@/components/ui/UIButton.vue'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  correctAnswerCount: number
  questionCount: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'resetQuiz'): void
}>()

const value = useVModel(props, 'modelValue', emit)
const isAllAnswersCorrect = computed(() => props.correctAnswerCount === props.questionCount)

function resetQuiz() {
  emit('resetQuiz')

  value.value = false
}
</script>
