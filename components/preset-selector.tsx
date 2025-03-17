"use client"

import { Button } from "@/components/ui/button"
import { useWaveModel } from "./wave-model-provider"

const presets = [
  {
    name: "Perfect Point",
    id: "perfect-point",
    description: "Clean, consistent waves with ideal direction for a point break",
  },
  {
    name: "Big Day",
    id: "big-day",
    description: "Large, powerful waves with long period and multiple swells",
  },
  {
    name: "Beach Break",
    id: "beach-break",
    description: "Typical beach break conditions with moderate waves",
  },
  {
    name: "Reef Break",
    id: "reef-break",
    description: "Sharp, hollow waves breaking over a reef formation",
  },
  {
    name: "Psychedelic Dream",
    id: "psychedelic-dream",
    description: "Wild, unpredictable waves from multiple directions",
  },
]

export function PresetSelector() {
  const { applyPreset } = useWaveModel()

  return (
    <div className="space-y-3">
      {presets.map((preset) => (
        <div
          key={preset.id}
          className="flex flex-col p-3 transition-colors rounded-md cursor-pointer bg-purple-900/30 hover:bg-purple-800/40"
          onClick={() => applyPreset(preset.id)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white">{preset.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-purple-300 hover:text-white hover:bg-purple-700/50"
              onClick={(e) => {
                e.stopPropagation()
                applyPreset(preset.id)
              }}
            >
              Apply
            </Button>
          </div>
          <p className="text-xs text-purple-200">{preset.description}</p>
        </div>
      ))}
    </div>
  )
}

