'use client'

import { motion } from "framer-motion"
import { CheckCircle } from 'lucide-react'

interface SubmissionPopupProps {
  onClose: () => void
}

export function SubmissionPopup({ onClose }: SubmissionPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-8 flex flex-col items-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Submission Successful!</h2>
        <p className="text-gray-600 mb-4">Thank you for completing the interview.</p>
      </motion.div>
    </motion.div>
  )
}

