"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function WavyBackground({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Colors for the waves
    const colors = [
      "rgba(255, 105, 180, 0.3)", // hot pink
      "rgba(147, 112, 219, 0.3)", // purple
      "rgba(255, 165, 0, 0.3)", // orange
      "rgba(0, 191, 255, 0.3)", // deep sky blue
    ]

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw multiple waves with different parameters
      colors.forEach((color, i) => {
        const amplitude = 50 + i * 20
        const period = 0.01 - i * 0.002
        const phaseShift = time * (0.2 + i * 0.1)

        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * period + phaseShift) * amplitude + canvas.height / 2 + i * 50
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

