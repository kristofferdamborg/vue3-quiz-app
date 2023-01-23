<template>
  <div class="py-10">
    <fieldset>
      <legend class="flex text-xl text-gray-500 font-medium">
        <span class="font-normal mr-2">{{ index + 1 }})</span>
        <span v-html="question.question" />
      </legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <MultipleChoiceCheckbox
          v-for="answer in question.answers"
          :key="answer"
          :checked="answer === question.selectedAnswer && answer === question.correct_answer"
          :error="answer === question.selectedAnswer && answer !== question.correct_answer"
          :disabled="question.selectedAnswer !== ''"
          @click="selectAnswer(answer)"
          @keydown.enter="selectAnswer(answer)"
        >
          <span class="sr-only">Answer:</span> <span v-html="answer" />
        </MultipleChoiceCheckbox>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import MultipleChoiceCheckbox from '@/components/MultipleChoiceCheckbox.vue'
import { StoreQuizQuestion } from '@/types/quiz'

interface Props {
  question: StoreQuizQuestion
  index: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'selectAnswer', answer: string): void
}>()

function selectAnswer(answer: string) {
  emit('selectAnswer', answer)
}
</script>
