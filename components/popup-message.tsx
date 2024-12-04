'use client'

import { motion } from "framer-motion"
import { CheckCircle } from 'lucide-react'

interface PopupMessageProps {
  message: string
  onClose: () => void
}

export function PopupMessage({ message, onClose }: PopupMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-8 flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-black text-center">{message}</h2>
      </motion.div>
    </motion.div>
  )
}

