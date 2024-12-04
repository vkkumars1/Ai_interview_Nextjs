'use client'

import { ExternalLink } from 'lucide-react'
import { Button } from "../components/ui/button"
import { motion } from "framer-motion"

interface InstructionsProps {
  onStart: () => void
}

export function Instructions({ onStart }: InstructionsProps) {
  const instructions = [
    "Ensure stable internet and choose a clean, quiet location.",
    "Permission for access of camera, microphone, entire screen sharing is required.",
    "Be in professional attire and avoid distractions.",
    "Give a detailed response, providing as much information as you can.",
    "Answer the question with examples and projects you've worked on."
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-4 sm:p-6 lg:p-8"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Instructions</h2>
        <ol className="space-y-4 list-decimal list-inside text-sm sm:text-base mb-8">
          {instructions.map((instruction, index) => (
            <motion.li 
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="leading-relaxed"
            >
              {instruction}
            </motion.li>
          ))}
        </ol>
        <div className="rounded-lg bg-purple-700/50 p-4 text-sm mb-8">
          <p className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 flex-shrink-0" />
            <span>
              Click here to try a mock interview with Avya, our AI interviewer, and build your confidence before the main interview!
            </span>
          </p>
        </div>
        <Button onClick={onStart} className="w-full bg-white text-purple-700 hover:bg-purple-100 transition-colors duration-300">
          Start Now
        </Button>
      </div>
    </motion.div>
  )
}

