'use client'

import { motion } from "framer-motion"
import { MessageCircle } from 'lucide-react'

export function LoaderScreen() {
  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <MessageCircle className="h-12 w-12 text-slate-400" />
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-slate-200"
      >
        That&apos;s great! Just give me a moment to take notes
      </motion.p>
    </motion.div>
  )
}

