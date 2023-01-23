import { api } from '@/api/index'
import { QuizDifficulty } from '@/types/quiz'

export async function getQuiz(difficulty: QuizDifficulty, token: string) {
  const params = {
    difficulty,
    token,
    type: 'multiple',
    amount: 10
  }

  return api.get('https://opentdb.com/api.php', { params })
}
