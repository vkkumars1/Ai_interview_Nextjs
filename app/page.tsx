'use client'

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Navbar } from "../components/navbar"
import { AIInterviewPlatform } from "../components/ai-interview-platform"
import { Instructions } from "../components/instructions"
import { Permissions } from "../components/permissions"
import { LoaderScreen } from "../components/loader-screen"
import { QuestionScreen } from "../components/question-screen"
import { AnswerScreen } from "../components/answer-screen"
import { PopupMessage } from "../components/popup-message"
import { questions } from "../data/questions"
import "../app/globals.css"
type Screen = "platform" | "instructions" | "permissions" | "loader" | "question" | "answer"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("platform")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")
  const [recordings, setRecordings] = useState<Record<number, Blob>>({})

  const handleStartPlatform = useCallback(() => {
    setScreen("instructions")
  }, [])

  const handleStartInstructions = useCallback(() => {
    setScreen("permissions")
  }, [])

  const handleStartInterview = useCallback(() => {
    setScreen("loader")
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

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setScreen("question")
    }
  }, [currentQuestion])

  const handleSaveSubmit = useCallback(() => {
    setPopupMessage("Thanks for submitting the test!")
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
      setScreen("platform")
      setCurrentQuestion(0)
    }, 3000)
  }, [])

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
    if (screen === "loader") {
      handleFullScreen()
    }
  }, [screen])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <Navbar />
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {screen === "platform" && (
            <AIInterviewPlatform key="platform" onStart={handleStartPlatform} />
          )}
          {screen === "instructions" && (
            <Instructions key="instructions" onStart={handleStartInstructions} />
          )}
          {screen === "permissions" && (
            <Permissions key="permissions" onStartInterview={handleStartInterview} />
          )}
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
              onComplete={handleAnswerComplete}
              onSaveSubmit={handleSaveSubmit}
            />
          )}
          {showPopup && (
            <PopupMessage
              key="popup"
              message={popupMessage}
              onClose={() => setShowPopup(false)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

