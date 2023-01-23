export enum QuizDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export interface QuizQuestion {
  category: string
  correct_answer: string
  difficulty: QuizDifficulty
  incorrect_answers: string[]
  question: string
  type: string
}

export interface StoreQuizQuestion extends QuizQuestion {
  answers?: string[]
  selectedAnswer?: string
}

export interface Quiz {
  questions: StoreQuizQuestion[]
}
