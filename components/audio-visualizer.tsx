'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const points = 128
    const radius = 50
    let angle = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.beginPath()
      ctx.strokeStyle = '#4F46E5'
      ctx.lineWidth = 2

      for (let i = 0; i < points; i++) {
        const theta = (i / points) * Math.PI * 2
        const wave = Math.sin(theta * 8 + angle) * 10
        const x = canvas.width/2 + Math.cos(theta) * (radius + wave)
        const y = canvas.height/2 + Math.sin(theta) * (radius + wave)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()
      ctx.stroke()
      
      angle += 0.05
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas 
        ref={canvasRef}
        width={200}
        height={200}
        className="mx-auto"
      />
    </motion.div>
  )
}

