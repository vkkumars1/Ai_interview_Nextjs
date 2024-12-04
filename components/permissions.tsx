'use client'

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Camera, Mic, Monitor, Volume2 } from 'lucide-react'
import { motion } from "framer-motion"

interface PermissionsProps {
  onStartInterview: () => void
}

export function Permissions({ onStartInterview }: PermissionsProps) {
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    speaker: false,
    screen: false
  })

  const checkPermission = async (type: keyof typeof permissions, mediaType: MediaStreamConstraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(mediaType)
      stream.getTracks().forEach(track => track.stop())
      setPermissions(prev => ({ ...prev, [type]: true }))
    } catch (err) {
      console.error(`Error accessing ${type}:`, err)
      setPermissions(prev => ({ ...prev, [type]: false }))
    }
  }

  const checkCamera = () => checkPermission('camera', { video: true })
  const checkMicrophone = () => checkPermission('microphone', { audio: true })
  const checkSpeaker = async () => {
    try {
      const audioContext = new AudioContext()
      const oscillator = audioContext.createOscillator()
      oscillator.connect(audioContext.destination)
      oscillator.start()
      oscillator.stop(0.1)
      setPermissions(prev => ({ ...prev, speaker: true }))
    } catch (err) {
      console.error('Error accessing speaker:', err)
      setPermissions(prev => ({ ...prev, speaker: false }))
    }
  }
  const checkScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())
      setPermissions(prev => ({ ...prev, screen: true }))
    } catch (err) {
      console.error('Error accessing screen share:', err)
      setPermissions(prev => ({ ...prev, screen: false }))
    }
  }

  const allPermissionsGranted = Object.values(permissions).every(Boolean)

  const permissionItems = [
    { key: 'camera', label: 'Check Camera', Icon: Camera, check: checkCamera },
    { key: 'microphone', label: 'Check Microphone', Icon: Mic, check: checkMicrophone },
    { key: 'speaker', label: 'Check Speaker', Icon: Volume2, check: checkSpeaker },
    { key: 'screen', label: 'Enable Screen Share', Icon: Monitor, check: checkScreenShare },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-4 sm:p-6 lg:p-8"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Ready to join?</h2>
        <p className="text-sm text-white/80 mb-8 text-center">Please make sure your device is properly configured.</p>

        <div className="space-y-4 mb-8">
          {permissionItems.map(({ key, label, Icon, check }, index) => (
            <motion.button
              key={key}
              onClick={check}
              className="flex w-full items-center justify-between rounded-lg bg-purple-700/50 px-4 py-3 text-left hover:bg-purple-700/70 transition-colors duration-300"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </div>
              <div className={`flex h-5 w-5 items-center justify-center rounded border ${
                permissions[key as keyof typeof permissions]
                  ? 'border-green-500 bg-green-500' 
                  : 'border-white/20'
              }`}>
                {permissions[key as keyof typeof permissions] && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <Button 
          onClick={onStartInterview}
          className="w-full bg-white text-purple-700 hover:bg-purple-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!allPermissionsGranted}
        >
          Start Interview
        </Button>
      </div>
    </motion.div>
  )
}

