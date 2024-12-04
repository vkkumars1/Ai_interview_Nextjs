'use client'

import { motion } from "framer-motion"
import { CheckCircle } from 'lucide-react'

interface SuccessModalProps {
  onClose: () => void
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center rounded-lg bg-white p-8 text-center"
        onClick={e => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
        </motion.div>
        <h3 className="mb-2 text-2xl font-semibold">Test Submitted Successfully!</h3>
        <p className="text-slate-600">Thank you for completing the interview.</p>
      </motion.div>
    </motion.div>
  )
}

