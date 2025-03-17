"use client"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Compass } from "@/components/compass"
import { useWaveModel, type SwellType } from "./wave-model-provider"

interface WaveModelDashboardProps {
  swellType: SwellType
}

export function WaveModelDashboard({ swellType }: WaveModelDashboardProps) {
  const { swells, updateSwell } = useWaveModel()
  const swell = swells[swellType]

  // Handle direction change from compass
  const handleDirectionChange = (direction: number) => {
    updateSwell(swellType, { direction })
  }

  return (
    <div className="p-4 space-y-6 rounded-lg bg-black/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white capitalize">{swellType} Swell</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id={`${swellType}-enabled`}
            checked={swell.enabled}
            onCheckedChange={(enabled) => updateSwell(swellType, { enabled })}
          />
          <Label htmlFor={`${swellType}-enabled`} className="text-white">
            {swell.enabled ? "Enabled" : "Disabled"}
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Direction Control */}
        <div className="flex flex-col items-center justify-center">
          <Label className="mb-2 text-white">Direction: {swell.direction}°</Label>
          <Compass direction={swell.direction} onChange={handleDirectionChange} disabled={!swell.enabled} size={180} />
        </div>

        {/* Height and Period Controls */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white">Wave Height</Label>
              <span className="text-sm text-white">{swell.height.toFixed(1)} m</span>
            </div>
            <Slider
              value={[swell.height]}
              min={0}
              max={10}
              step={0.1}
              disabled={!swell.enabled}
              onValueChange={(value) => updateSwell(swellType, { height: value[0] })}
              className={`${!swell.enabled ? "opacity-50" : ""}`}
            />
            <div className="flex justify-between text-xs text-purple-300">
              <span>0 m</span>
              <span>5 m</span>
              <span>10 m</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white">Wave Period</Label>
              <span className="text-sm text-white">{swell.period.toFixed(1)} s</span>
            </div>
            <Slider
              value={[swell.period]}
              min={5}
              max={20}
              step={0.5}
              disabled={!swell.enabled}
              onValueChange={(value) => updateSwell(swellType, { period: value[0] })}
              className={`${!swell.enabled ? "opacity-50" : ""}`}
            />
            <div className="flex justify-between text-xs text-purple-300">
              <span>5 s</span>
              <span>12.5 s</span>
              <span>20 s</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 mt-4 text-sm rounded-md bg-purple-900/30">
        <p className="text-purple-200">
          {swellType === "primary" && "Primary swell represents the dominant wave pattern."}
          {swellType === "secondary" && "Secondary swell adds complexity and cross-waves to the surf."}
          {swellType === "tertiary" && "Tertiary swell creates additional texture and variability."}
        </p>
      </div>
    </div>
  )
}

