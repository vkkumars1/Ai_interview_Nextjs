'use client'

import { motion } from "framer-motion"
import { Button } from "../components/ui/button"

interface AIInterviewPlatformProps {
  onStart: () => void
}

export function AIInterviewPlatform({ onStart }: AIInterviewPlatformProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white px-4 sm:px-6 lg:px-8"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center"
      >
        AI Interview Platform
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl mb-8 text-center max-w-2xl"
      >
        Experience the future of interviews with our cutting-edge AI technology
      </motion.p>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={onStart}
          size="lg"
          className="bg-white text-purple-700 hover:bg-purple-100 transition-colors duration-300"
        >
          Start Your AI Interview
        </Button>
      </motion.div>
    </motion.div>
  )
}

