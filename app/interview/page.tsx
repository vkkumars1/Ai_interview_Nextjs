'use client'

import { useState, useCallback,useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { LoaderScreen } from "../../components/loader-screen"
import { QuestionScreen } from "../../components/question-screen"
import { AnswerScreen } from "../../components/answer-screen"
import { SuccessModal } from "../../components/success-modal"
import { questions } from "../../data/questions"
import { useRouter } from "next/navigation"

type Screen = "loader" | "question" | "answer"

export default function InterviewPage() {
  const router = useRouter()
  const [screen, setScreen] = useState<Screen>("loader")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [recordings, setRecordings] = useState<Record<number, Blob>>({})

  const handleLoaderComplete = useCallback(() => {
    setTimeout(() => {
      setScreen("question")
    }, 3000)
  }, [])

  const handleQuestionComplete = useCallback(() => {
    setScreen("answer")
  }, [])

  const handleAnswerComplete = useCallback((recording: Blob) => {
    setRecordings(prev => ({
      ...prev,
      [currentQuestion]: recording
    }))

    if (currentQuestion === questions.length - 1) {
      setShowSuccess(true)
    } else {
      setCurrentQuestion(prev => prev + 1)
      setScreen("loader")
      handleLoaderComplete()
    }
  }, [currentQuestion, handleLoaderComplete])

  const handleSuccessClose = useCallback(() => {
    router.push('/')
  }, [router])

  useEffect(() => {
    const handleFullScreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen()
        }
      } catch (err) {
        console.error("Error requesting fullscreen:", err)
      }
    }
    handleFullScreen()
  }, [])

  return (
    <AnimatePresence mode="wait">
      {screen === "loader" && (
        <LoaderScreen key="loader" />
      )}
      {screen === "question" && (
        <QuestionScreen
          key="question"
          question={questions[currentQuestion]}
          onComplete={handleQuestionComplete}
        />
      )}
      {screen === "answer" && (
        <AnswerScreen
          key="answer"
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
          onComplete={handleAnswerComplete} onSaveSubmit={function (): void {
            throw new Error("Function not implemented.")
          } }        />
      )}
      {showSuccess && (
        <SuccessModal
          key="success"
          onClose={handleSuccessClose}
        />
      )}
    </AnimatePresence>
  )
}

