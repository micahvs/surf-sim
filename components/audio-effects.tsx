"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Define audio file URLs
const AUDIO_URLS = {
  WAVE: "/sounds/wave.mp3",
  JUMP: "/sounds/jump.mp3",
  SPLASH: "/sounds/splash.mp3",
  TRICK: "/sounds/trick.mp3",
  MUSIC: "/sounds/music.mp3",
  WIPEOUT: "/sounds/wipeout.mp3",  // New sound for wiping out
  CHEER: "/sounds/cheer.mp3",      // New sound for landing special tricks
  COMBO: "/sounds/combo.mp3",      // New sound for combos
  BOOST: "/sounds/boost.mp3",      // New sound for getting wave boosts
}

// Define volume levels for different sounds
const VOLUME_LEVELS = {
  WAVE: 0.4,
  JUMP: 0.6,
  SPLASH: 0.5,
  TRICK: 0.7,
  MUSIC: 0.3,
  WIPEOUT: 0.8,
  CHEER: 0.7,
  COMBO: 0.6,
  BOOST: 0.5,
}

// Define AudioContext type
interface AudioContextType {
  playSound: (sound: keyof typeof AUDIO_URLS) => void
  toggleMusic: () => void
  setMuted: (muted: boolean) => void
  isMuted: boolean
  isMusicPlaying: boolean
  volume: number
  adjustVolume: (newVolume: number) => void
}

// Create context
const AudioContext = createContext<AudioContextType | null>(null)

// Custom hook to use audio
export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

// Audio Provider component
export function AudioProvider({ children }: { children: ReactNode }) {
  const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({})
  const [music, setMusic] = useState<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [volume, setVolume] = useState(1.0) // Master volume control

  // Initialize audio on client-side only
  useEffect(() => {
    // Create audio elements
    const loadedSounds: Record<string, HTMLAudioElement> = {}
    
    // Load sound effects
    Object.entries(AUDIO_URLS).forEach(([key, url]) => {
      if (key !== "MUSIC") {
        const audio = new Audio(url)
        audio.volume = VOLUME_LEVELS[key as keyof typeof VOLUME_LEVELS] || 0.5
        loadedSounds[key] = audio
      }
    })
    
    // Load background music
    const musicAudio = new Audio(AUDIO_URLS.MUSIC)
    musicAudio.loop = true
    musicAudio.volume = VOLUME_LEVELS.MUSIC
    
    setSounds(loadedSounds)
    setMusic(musicAudio)
    
    // Cleanup on unmount
    return () => {
      if (music) {
        music.pause()
      }
    }
  }, []) // Remove AUDIO_URLS dependency
  
  // Update all sound volumes when master volume changes
  useEffect(() => {
    Object.entries(sounds).forEach(([key, audio]) => {
      const baseVolume = VOLUME_LEVELS[key as keyof typeof VOLUME_LEVELS] || 0.5;
      audio.volume = baseVolume * volume;
    });
    
    if (music) {
      music.volume = VOLUME_LEVELS.MUSIC * volume;
    }
  }, [volume, sounds, music]);

  // Play a sound effect with variations
  const playSound = (sound: keyof typeof AUDIO_URLS) => {
    if (isMuted || !sounds[sound]) return
    
    // Clone and play to allow overlapping sounds
    const audioClone = sounds[sound].cloneNode(true) as HTMLAudioElement
    
    // Add slight pitch variation for more natural sound
    if (sound !== "MUSIC") {
      const pitchVariation = 0.9 + Math.random() * 0.2; // Variation between 0.9 and 1.1
      (audioClone as any).preservesPitch = false; // For browsers that support it
      (audioClone as any).mozPreservesPitch = false; // Firefox
      (audioClone as any).webkitPreservesPitch = false; // Safari
      audioClone.playbackRate = pitchVariation;
    }
    
    audioClone.volume = sounds[sound].volume;
    audioClone.play()
    
    // Remove from memory when done
    audioClone.onended = () => {
      audioClone.remove()
    }
  }

  // Toggle background music
  const toggleMusic = () => {
    if (!music) return
    
    if (isMusicPlaying) {
      music.pause()
      setIsMusicPlaying(false)
    } else {
      music.play()
      setIsMusicPlaying(true)
    }
  }

  // Adjust volume
  const adjustVolume = (newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }

  // Handle mute/unmute
  useEffect(() => {
    if (!music) return
    
    if (isMuted) {
      if (isMusicPlaying) {
        music.pause()
      }
    } else if (isMusicPlaying) {
      music.play()
    }
  }, [isMuted, isMusicPlaying, music])

  const value = {
    playSound,
    toggleMusic,
    setMuted: setIsMuted,
    isMuted,
    isMusicPlaying,
    volume,
    adjustVolume,
  }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
