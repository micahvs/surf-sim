"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

// Define the wave model parameter types
export type SwellType = "primary" | "secondary" | "tertiary"

export interface SwellParameters {
  direction: number // 0-360 degrees
  height: number // 0-10 meters
  period: number // 5-20 seconds
  enabled: boolean
}

export interface SandbarConfiguration {
  count: number // 1-5 sandbars
  spacing: number // 10-100 meters
  height: number // 0-3 meters
  angle: number // 0-90 degrees
}

export interface WaveModelState {
  swells: {
    primary: SwellParameters
    secondary: SwellParameters
    tertiary: SwellParameters
  }
  sandbars: SandbarConfiguration
  updateSwell: (type: SwellType, params: Partial<SwellParameters>) => void
  updateSandbars: (config: Partial<SandbarConfiguration>) => void
  resetToDefaults: () => void
  applyPreset: (presetName: string) => void
}

// Default values
const defaultSwellParams: SwellParameters = {
  direction: 270,
  height: 1.5,
  period: 10,
  enabled: true,
}

const defaultSandbarConfig: SandbarConfiguration = {
  count: 2,
  spacing: 50,
  height: 1,
  angle: 15,
}

// Create the context
const WaveModelContext = createContext<WaveModelState | undefined>(undefined)

// Presets for different wave conditions
const presets = {
  "perfect-point": {
    swells: {
      primary: { direction: 240, height: 2, period: 12, enabled: true },
      secondary: { direction: 210, height: 0.8, period: 8, enabled: true },
      tertiary: { direction: 180, height: 0.3, period: 6, enabled: false },
    },
    sandbars: { count: 3, spacing: 40, height: 1.2, angle: 25 },
  },
  "big-day": {
    swells: {
      primary: { direction: 270, height: 4, period: 16, enabled: true },
      secondary: { direction: 250, height: 1.5, period: 10, enabled: true },
      tertiary: { direction: 290, height: 0.7, period: 8, enabled: true },
    },
    sandbars: { count: 2, spacing: 70, height: 2, angle: 10 },
  },
  "beach-break": {
    swells: {
      primary: { direction: 260, height: 1.2, period: 9, enabled: true },
      secondary: { direction: 280, height: 0.5, period: 7, enabled: true },
      tertiary: { direction: 240, height: 0.3, period: 5, enabled: false },
    },
    sandbars: { count: 4, spacing: 30, height: 0.8, angle: 5 },
  },
  "reef-break": {
    swells: {
      primary: { direction: 220, height: 2.5, period: 14, enabled: true },
      secondary: { direction: 200, height: 1, period: 11, enabled: true },
      tertiary: { direction: 240, height: 0.4, period: 7, enabled: false },
    },
    sandbars: { count: 1, spacing: 90, height: 2.5, angle: 30 },
  },
  "psychedelic-dream": {
    swells: {
      primary: { direction: 180, height: 3, period: 15, enabled: true },
      secondary: { direction: 270, height: 2, period: 12, enabled: true },
      tertiary: { direction: 90, height: 1, period: 8, enabled: true },
    },
    sandbars: { count: 5, spacing: 35, height: 1.5, angle: 45 },
  },
}

export function WaveModelProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with default values
  const [swells, setSwells] = useState({
    primary: { ...defaultSwellParams },
    secondary: { ...defaultSwellParams, height: 0.8, enabled: false },
    tertiary: { ...defaultSwellParams, height: 0.4, enabled: false },
  })

  const [sandbars, setSandbars] = useState({ ...defaultSandbarConfig })

  // Update the parameters display when state changes
  useEffect(() => {
    const parametersOutput = document.getElementById("parameters-output")
    if (parametersOutput) {
      parametersOutput.textContent = JSON.stringify({ swells, sandbars }, null, 2)
    }
  }, [swells, sandbars])

  // Update swell parameters
  const updateSwell = (type: SwellType, params: Partial<SwellParameters>) => {
    setSwells((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        ...params,
      },
    }))
  }

  // Update sandbar configuration
  const updateSandbars = (config: Partial<SandbarConfiguration>) => {
    setSandbars((prev) => ({
      ...prev,
      ...config,
    }))
  }

  // Reset to default values
  const resetToDefaults = () => {
    setSwells({
      primary: { ...defaultSwellParams },
      secondary: { ...defaultSwellParams, height: 0.8, enabled: false },
      tertiary: { ...defaultSwellParams, height: 0.4, enabled: false },
    })
    setSandbars({ ...defaultSandbarConfig })
  }

  // Apply a preset configuration
  const applyPreset = (presetName: string) => {
    const preset = presets[presetName as keyof typeof presets]
    if (preset) {
      setSwells(preset.swells)
      setSandbars(preset.sandbars)
    }
  }

  return (
    <WaveModelContext.Provider
      value={{
        swells,
        sandbars,
        updateSwell,
        updateSandbars,
        resetToDefaults,
        applyPreset,
      }}
    >
      {children}
    </WaveModelContext.Provider>
  )
}

// Custom hook to use the wave model context
export function useWaveModel() {
  const context = useContext(WaveModelContext)
  if (context === undefined) {
    throw new Error("useWaveModel must be used within a WaveModelProvider")
  }
  return context
}

