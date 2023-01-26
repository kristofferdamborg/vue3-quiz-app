import { api } from '@/api/index'
import { useAuthStore } from '@/stores/auth'
import { QuizDifficulty } from '@/types/quiz'

export async function getQuiz(difficulty: QuizDifficulty) {
  const authStore = useAuthStore()

  const params = {
    difficulty,
    token: authStore.sessionToken,
    type: 'multiple',
    amount: 10
  }

  return api.get('https://opentdb.com/api.php', { params })
}
