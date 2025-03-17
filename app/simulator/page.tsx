"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SurfingSimulator } from "@/components/surfing-simulator"
import { Home, Settings, Volume2, VolumeX, RotateCcw, PauseCircle, PlayCircle } from "lucide-react"

export default function SimulatorPage() {
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [waveIntensity, setWaveIntensity] = useState(50)
  const [psychedelicLevel, setPsychedelicLevel] = useState(70)

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 3D Surfing Simulator */}
      <SurfingSimulator
        isPaused={isPaused}
        waveIntensity={waveIntensity / 100}
        psychedelicLevel={psychedelicLevel / 100}
      />

      {/* UI Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="container flex flex-col gap-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <PlayCircle /> : <PauseCircle />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX /> : <Volume2 />}
              </Button>

              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <RotateCcw />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" asChild>
                <Link href="/">
                  <Home />
                </Link>
              </Button>

              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Settings />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white">Wave Intensity</span>
              <Slider
                value={[waveIntensity]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setWaveIntensity(value[0])}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white">Psychedelic Level</span>
              <Slider
                value={[psychedelicLevel]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setPsychedelicLevel(value[0])}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

