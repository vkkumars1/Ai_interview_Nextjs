'use client'

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { Mic } from 'lucide-react'
import type { Question } from "../types/interview"

interface AnswerScreenProps {
  question: Question
  currentQuestion: number
  totalQuestions: number
  onComplete: (recording: Blob) => void
  onSaveSubmit: () => void
}

export function AnswerScreen({ 
  question, 
  currentQuestion, 
  totalQuestions,
  onComplete,
  onSaveSubmit
}: AnswerScreenProps) {
  const [time, setTime] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setTime(t => t + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: true
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' })
          onComplete(blob)
          chunksRef.current = []
        }

        mediaRecorder.start()
        setIsRecording(true)
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }

    setupCamera()

    return () => {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [onComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSaveAndNext = async () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    
      await new Promise(resolve => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.onstop = async () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' })
          
            const formData = new FormData()
            formData.append('recording', blob)
            formData.append('questionId', question.id.toString())
          
            try {
              setIsSubmitting(true)
              const response = await fetch('/api/interview', {
                method: 'POST',
                body: formData
              })
            
              if (!response.ok) {
                throw new Error('Failed to upload recording')
              }
            
              chunksRef.current = []
              onComplete(blob)
              resolve(null)
            } catch (error) {
              console.error('Error uploading recording:', error)
            } finally {
              setIsSubmitting(false)
            }
          }
        }
      })
    }
  }

  const isLastQuestion = currentQuestion === totalQuestions

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-sm text-white/60 mb-4">
        Question {currentQuestion}/{totalQuestions}
      </div>

      <h2 className="text-2xl text-white mb-6 max-w-xl text-center">
        {question.text}
      </h2>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-white/60">Timer:</span>
        <div className="bg-white/10 rounded-md px-3 py-1 text-white">
          {formatTime(time)}
        </div>
      </div>

      <div className="relative mb-6 rounded-xl overflow-hidden bg-black w-full max-w-[600px] aspect-video flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
            <Mic className="w-8 h-8 text-white/20" />
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-red-500 rounded-full w-4 h-4 animate-pulse" />
        <div className="absolute bottom-4 right-4 bg-white/10 rounded-md p-1">
          <Mic className="w-4 h-4 text-white" />
        </div>
      </div>

      <Button 
        onClick={isLastQuestion ? onSaveSubmit : handleSaveAndNext}
        className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-2 rounded-md transition-colors duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : isLastQuestion ? 'Save/Submit' : 'Save & Next'}
      </Button>
      
      <p className="mt-4 text-xs text-white/60">
        Press Enter to {isLastQuestion ? 'Save/Submit' : 'Save and Continue'}
      </p>
    </motion.div>
  )
}

