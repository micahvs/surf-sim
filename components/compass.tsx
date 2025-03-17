"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CompassProps {
  direction: number
  onChange: (direction: number) => void
  size?: number
  disabled?: boolean
  className?: string
}

export function Compass({ direction, onChange, size = 200, disabled = false, className }: CompassProps) {
  const compassRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Convert direction to rotation (compass directions are clockwise)
  const rotation = direction

  // Handle mouse/touch interaction
  useEffect(() => {
    if (disabled) return

    const compass = compassRef.current
    if (!compass) return

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      setIsDragging(true)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return

      // Get center of compass
      const rect = compass.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Get mouse/touch position
      let clientX, clientY
      if ("touches" in e) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      // Calculate angle
      const deltaX = clientX - centerX
      const deltaY = clientY - centerY
      const angleRad = Math.atan2(deltaY, deltaX)
      let angleDeg = (angleRad * 180) / Math.PI + 90 // +90 to make 0 at top

      // Normalize to 0-360
      angleDeg = (angleDeg + 360) % 360

      onChange(Math.round(angleDeg))
    }

    compass.addEventListener("mousedown", handleMouseDown)
    compass.addEventListener("touchstart", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchend", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleMouseMove)

    return () => {
      compass.removeEventListener("mousedown", handleMouseDown)
      compass.removeEventListener("touchstart", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleMouseMove)
    }
  }, [isDragging, onChange, disabled])

  return (
    <div
      ref={compassRef}
      className={cn(
        "relative rounded-full border-2 border-purple-500 bg-black/30 backdrop-blur-sm",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* Compass markings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute text-xs font-bold text-white top-2">N</div>
        <div className="absolute text-xs font-bold text-white right-2">E</div>
        <div className="absolute text-xs font-bold text-white bottom-2">S</div>
        <div className="absolute text-xs font-bold text-white left-2">W</div>

        {/* Degree markings */}
        {Array.from({ length: 36 }).map((_, i) => {
          const deg = i * 10
          const isMainDirection = deg % 90 === 0
          const length = isMainDirection ? "20%" : "10%"
          const width = isMainDirection ? "2px" : "1px"
          const transform = `rotate(${deg}deg) translateY(-50%)`

          return (
            <div
              key={i}
              className="absolute top-0 left-1/2 bg-white/70 origin-bottom"
              style={{
                height: length,
                width,
                transform,
              }}
            />
          )
        })}
      </div>

      {/* Direction indicator */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="absolute top-0 left-1/2 w-1 h-1/2 -ml-0.5">
          <div className="w-3 h-3 -mt-1 -ml-1 transform rotate-45 bg-pink-500" />
        </div>
      </div>

      {/* Center dot */}
      <div className="absolute w-3 h-3 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full left-1/2 top-1/2" />
    </div>
  )
}

