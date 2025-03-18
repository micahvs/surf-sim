"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SurfingSimulator } from "@/components/surfing-simulator"
import { AudioProvider, useAudio } from "@/components/audio-effects"
import { Home, Settings, Volume2, VolumeX, RotateCcw, PauseCircle, PlayCircle, ChevronUp, ChevronDown } from "lucide-react"

function SimulatorContent() {
  const [isPaused, setIsPaused] = useState(false)
  const [waveIntensity, setWaveIntensity] = useState(60)
  const [psychedelicLevel, setPsychedelicLevel] = useState(80)
  const [showAdvancedControls, setShowAdvancedControls] = useState(false)
  const [volume, setVolume] = useState(80)
  const { isMuted, setMuted, toggleMusic, isMusicPlaying, adjustVolume } = useAudio()
  
  // Start music when component mounts
  useEffect(() => {
    if (!isMusicPlaying) {
      toggleMusic()
    }
  }, [isMusicPlaying, toggleMusic])
  
  // Adjust volume when volume slider changes
  useEffect(() => {
    adjustVolume(volume / 100)
  }, [volume, adjustVolume])

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
                onClick={() => setMuted(!isMuted)}
              >
                {isMuted ? <VolumeX /> : <Volume2 />}
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={() => window.location.reload()}
              >
                <RotateCcw />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              >
                {showAdvancedControls ? <ChevronDown /> : <ChevronUp />}
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
            
            {showAdvancedControls && (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-white">Volume</span>
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setVolume(value[0])}
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white/40 hover:bg-white/20 hover:text-white"
                    onClick={() => setPsychedelicLevel(100)}
                  >
                    Max Trip
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white/40 hover:bg-white/20 hover:text-white"
                    onClick={() => setWaveIntensity(100)}
                  >
                    Epic Waves
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white/40 hover:bg-white/20 hover:text-white"
                    onClick={() => {
                      setWaveIntensity(60);
                      setPsychedelicLevel(80);
                    }}
                  >
                    Reset Settings
                  </Button>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-2 text-center text-xs text-white/60">
            Use arrow keys to move | Space to jump | Try Left+Right or Up+Down in mid-air for tricks!
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SimulatorPage() {
  return (
    <AudioProvider>
      <SimulatorContent />
    </AudioProvider>
  )
}
