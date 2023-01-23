<template>
  <div class="flex justify-between items-end">
    <h1 class="text-4xl mr-2 text-gray-600 font-medium">Quiz</h1>
    <span class="text-lg text-gray-500">
      Difficulty: <span class="capitalize font-medium">{{ difficulty }}</span>
    </span>
  </div>
  <div class="text-gray-400 text-lg mt-10">Answer all {{ questionCount }} questions below</div>
</template>

<script lang="ts" setup>
import type { QuizDifficulty } from '@/types/quiz'

interface Props {
  questionCount: number
  difficulty: QuizDifficulty
}

defineProps<Props>()
</script>
