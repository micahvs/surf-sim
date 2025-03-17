"use client"

import { useRef, useEffect } from "react"
import { useWaveModel } from "./wave-model-provider"

interface VisualizationPanelProps {
  activeTab: string
}

export function VisualizationPanel({ activeTab }: VisualizationPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { swells, sandbars } = useWaveModel()

  // Render the wave visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw beach (bottom of canvas)
    const beachGradient = ctx.createLinearGradient(0, canvas.height - 50, 0, canvas.height)
    beachGradient.addColorStop(0, "#D2B48C")
    beachGradient.addColorStop(1, "#8B4513")
    ctx.fillStyle = beachGradient
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50)

    // Draw ocean
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height - 50)
    oceanGradient.addColorStop(0, "#00BFFF")
    oceanGradient.addColorStop(1, "#0000CD")

    ctx.fillStyle = oceanGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height - 50)

    // Draw sandbars
    ctx.fillStyle = "#D2B48C"
    for (let i = 0; i < sandbars.count; i++) {
      const y = canvas.height - 50 - i * (sandbars.spacing / 5)
      const height = sandbars.height * 10

      // Draw sandbar with angle
      ctx.save()
      ctx.translate(canvas.width / 2, y)
      ctx.rotate((sandbars.angle * Math.PI) / 180)
      ctx.fillRect(-canvas.width / 2, -height / 2, canvas.width, height)
      ctx.restore()
    }

    // Draw waves for each active swell
    Object.entries(swells).forEach(([type, swell]) => {
      if (!swell.enabled) return

      const isActive = type === activeTab
      const waveColor = isActive
        ? type === "primary"
          ? "#FF69B4"
          : type === "secondary"
            ? "#9370DB"
            : "#FFA500"
        : `rgba(255, 255, 255, 0.3)`

      // Draw wave direction arrow
      const arrowLength = 40
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2 - 50
      const angleRad = (swell.direction * Math.PI) / 180
      const endX = centerX + Math.sin(angleRad) * arrowLength
      const endY = centerY - Math.cos(angleRad) * arrowLength

      ctx.strokeStyle = waveColor
      ctx.lineWidth = isActive ? 3 : 1
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(endX, endY)
      ctx.stroke()

      // Draw arrowhead
      ctx.beginPath()
      ctx.moveTo(endX, endY)
      ctx.lineTo(endX - 10 * Math.sin(angleRad - Math.PI / 6), endY + 10 * Math.cos(angleRad - Math.PI / 6))
      ctx.lineTo(endX - 10 * Math.sin(angleRad + Math.PI / 6), endY + 10 * Math.cos(angleRad + Math.PI / 6))
      ctx.closePath()
      ctx.fillStyle = waveColor
      ctx.fill()

      // Draw wave height indicator
      const waveHeight = swell.height * 10
      ctx.fillStyle = waveColor
      ctx.globalAlpha = 0.5
      ctx.fillRect(centerX - 60, centerY + 60, 30, -waveHeight)
      ctx.globalAlpha = 1

      // Draw wave period indicator
      const wavePeriod = swell.period * 2
      ctx.fillStyle = waveColor
      ctx.globalAlpha = 0.5
      ctx.fillRect(centerX + 30, centerY + 60, 30, -wavePeriod)
      ctx.globalAlpha = 1
    })

    // Draw labels
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "12px sans-serif"
    ctx.fillText("Direction", canvas.width / 2 - 20, canvas.height / 2 - 80)
    ctx.fillText("Height", canvas.width / 2 - 75, canvas.height / 2 + 80)
    ctx.fillText("Period", canvas.width / 2 + 35, canvas.height / 2 + 80)
  }, [swells, sandbars, activeTab])

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg bg-black/50">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

