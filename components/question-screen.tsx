'use client'

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { AudioVisualizer } from "./audio-visualizer"
import type { Question } from "../types/interview"

interface QuestionScreenProps {
  question: Question
  onComplete: () => void
}

export function QuestionScreen({ question, onComplete }: QuestionScreenProps) {
  const [highlightedText, setHighlightedText] = useState("")
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    speechSynthesisRef.current = window.speechSynthesis
    utteranceRef.current = new SpeechSynthesisUtterance(question.text)

    utteranceRef.current.onboundary = (event) => {
      if (event.name === 'word') {
        const words = question.text.split(' ')
        setHighlightedText(words.slice(0, event.charIndex).join(' '))
      }
    }

    utteranceRef.current.onend = () => {
      setHighlightedText(question.text)
      onComplete()
    }

    if (speechSynthesisRef.current && utteranceRef.current) {
      speechSynthesisRef.current.speak(utteranceRef.current)
    }

    return () => {
      if (speechSynthesisRef.current && utteranceRef.current) {
        speechSynthesisRef.current.cancel()
      }
    }
  }, [question.text, onComplete])

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <AudioVisualizer />
      </div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl text-center text-xl mb-8"
      >
        <span className="text-indigo-400">{highlightedText}</span>
        <span>{question.text.slice(highlightedText.length)}</span>
      </motion.p>
    </motion.div>
  )
}

