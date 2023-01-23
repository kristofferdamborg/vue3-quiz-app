<template>
  <main>
    <div v-if="isLoading" class="text-xl mt-12 text-center gray-600" role="alert" aria-busy="true">
      Loading quiz...
    </div>
    <div v-else>
      <QuizHeader :questionCount="questions.length" :difficulty="difficultyParam" />
      <div class="divide-y-2 divide-gray-100">
        <QuizQuestion
          v-for="(question, questionIndex) in questions"
          :key="question.question"
          :question="question"
          :index="questionIndex"
          @selectAnswer="setSelectedAnswer($event, questionIndex)"
        />
      </div>
    </div>
    <QuizResultModal
      v-model="showModal"
      :questionCount="questions.length"
      :correctAnswerCount="correctAnswerCount"
      @resetQuiz="resetQuiz"
    />
  </main>
</template>

<script lang="ts" setup>
import QuizHeader from '@/components/quiz/QuizHeader.vue'
import QuizQuestion from '@/components/quiz/QuizQuestion.vue'
import QuizResultModal from '@/components/quiz/QuizResultModal.vue'
import { useRoute } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { computed, ref, watch } from 'vue'
import { QuizDifficulty } from '@/types/quiz'
import { scrollToTop } from '@/utils/scroll'

const route = useRoute()

const quizStore = useQuizStore()

const difficultyParam = computed(() => route.params.difficulty as QuizDifficulty)
const questions = computed(() => quizStore.getQuizQuestions(difficultyParam.value))
const correctAnswerCount = computed(
  () => questions.value.filter((q) => q.selectedAnswer === q.correct_answer).length
)
const isLoading = ref(false)
const showModal = ref(true)

async function getQuiz() {
  try {
    isLoading.value = true

    await quizStore.fetchQuiz(difficultyParam.value)
  } finally {
    isLoading.value = false
  }
}

function resetQuiz() {
  quizStore.clearSelectedAnswers(difficultyParam.value)
  showModal.value = false

  scrollToTop()
}

function setSelectedAnswer(answer: string, questionIndex: number) {
  quizStore.setSelectedAnswer(answer, questionIndex, difficultyParam.value)

  const answeredQuestionCount = questions.value.filter((q) => q.selectedAnswer !== '').length

  if (answeredQuestionCount === questions.value.length) {
    showModal.value = true
  }
}

watch(
  () => route.params.difficulty,
  () => {
    resetQuiz()
    getQuiz()
  },
  { immediate: true }
)
</script>
