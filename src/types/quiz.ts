export enum QuizDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export interface OPENTDBQuizQuestion {
  category: string
  correct_answer: string
  difficulty: QuizDifficulty
  incorrect_answers: string[]
  question: string
  type: string
}

export interface QuizQuestion extends OPENTDBQuizQuestion {
  answers: string[]
  selectedAnswer: string
}

export interface Quiz {
  questions: QuizQuestion[]
}
