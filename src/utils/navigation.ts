import { QuizDifficulty } from '@/types/quiz'

interface DifficultyNavigationItem {
  name: string
  route: QuizDifficulty
}

export const difficultyNavItems: DifficultyNavigationItem[] = Object.entries(QuizDifficulty).map(
  ([key, value]) => ({
    name: key,
    route: value
  })
)
