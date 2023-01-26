import { defineStore } from 'pinia'
import { QuizDifficulty } from '@/types/quiz'
import type { Quiz, OPENTDBQuizQuestion, QuizQuestion } from '@/types/quiz'
import { getQuiz } from '@/api/quiz'
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

      const { data } = await getQuiz(difficulty)

      const questions = data.results.map((q: OPENTDBQuizQuestion) => ({
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

      quiz.questions = quiz.questions.map((q: QuizQuestion) => ({
        ...q,
        selectedAnswer: ''
      }))
    }
  },
  getters: {
    getQuizQuestions: (state) => (quizKey: QuizDifficulty) => {
      return state.quizzes[quizKey]?.questions ?? []
    }
  },
  persist: true
})
