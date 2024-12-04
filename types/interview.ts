export interface Question {
  id: number
  text: string
  audioUrl: string
}

export interface InterviewState {
  currentQuestion: number
  totalQuestions: number
  recordings: Record<number, Blob>
  isComplete: boolean
}

