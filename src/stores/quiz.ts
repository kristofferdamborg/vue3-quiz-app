import { defineStore } from 'pinia'
import { QuizDifficulty } from '@/types/quiz'
import type { Quiz, QuizQuestion, StoreQuizQuestion } from '@/types/quiz'
import { getQuiz } from '@/api/quiz'
import { useAuthStore } from '@/stores/auth'
import shuffle from 'lodash/shuffle'

interface State {
  quizzes: Record<QuizDifficulty, Quiz | null>
}

export const useQuizStore = defineStore('quiz', {
  state: (): State => ({
    quizzes: {
      [QuizDifficulty.Easy]: null,
      [QuizDifficulty.Medium]: null,
      [QuizDifficulty.Hard]: null
    }
  }),
  actions: {
    async fetchQuiz(difficulty: QuizDifficulty) {
      const storedQuiz = this.quizzes[difficulty]

      if (storedQuiz) {
        return storedQuiz
      }

      const authStore = useAuthStore()

      const { data } = await getQuiz(difficulty, authStore.sessionToken as string)

      const questions = data.results.map((q: QuizQuestion) => ({
        ...q,
        answers: shuffle([...q.incorrect_answers, q.correct_answer]),
        selectedAnswer: ''
      }))

      const newQuiz: Quiz = {
        questions
      }

      this.quizzes[difficulty] = newQuiz
    },
    setSelectedAnswer(answer: string, questionIndex: number, quizKey: QuizDifficulty) {
      const quiz = this.quizzes[quizKey]

      if (!quiz) return

      quiz.questions[questionIndex].selectedAnswer = answer
    },
    clearSelectedAnswers(quizKey: QuizDifficulty) {
      const quiz = this.quizzes[quizKey]

      if (!quiz) return

      quiz.questions = quiz.questions.map((q: StoreQuizQuestion) => ({
        ...q,
        selectedAnswer: ''
      }))
    }
  },
  getters: {
    getQuizQuestions: (state) => (quizKey: QuizDifficulty) => {
      const questions = state.quizzes[quizKey]?.questions ?? []

      return questions
    }
  },
  persist: true
})
