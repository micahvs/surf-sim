"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useWaveModel } from "./wave-model-provider"

export function SandbarControls() {
  const { sandbars, updateSandbars } = useWaveModel()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Number of Sandbars */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-white">Number of Sandbars</Label>
            <span className="text-sm text-white">{sandbars.count}</span>
          </div>
          <Slider
            value={[sandbars.count]}
            min={1}
            max={5}
            step={1}
            onValueChange={(value) => updateSandbars({ count: value[0] })}
          />
          <div className="flex justify-between text-xs text-purple-300">
            <span>1</span>
            <span>3</span>
            <span>5</span>
          </div>
        </div>

        {/* Sandbar Spacing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-white">Sandbar Spacing</Label>
            <span className="text-sm text-white">{sandbars.spacing} m</span>
          </div>
          <Slider
            value={[sandbars.spacing]}
            min={10}
            max={100}
            step={5}
            onValueChange={(value) => updateSandbars({ spacing: value[0] })}
          />
          <div className="flex justify-between text-xs text-purple-300">
            <span>10 m</span>
            <span>50 m</span>
            <span>100 m</span>
          </div>
        </div>

        {/* Sandbar Height */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-white">Sandbar Height</Label>
            <span className="text-sm text-white">{sandbars.height.toFixed(1)} m</span>
          </div>
          <Slider
            value={[sandbars.height]}
            min={0}
            max={3}
            step={0.1}
            onValueChange={(value) => updateSandbars({ height: value[0] })}
          />
          <div className="flex justify-between text-xs text-purple-300">
            <span>0 m</span>
            <span>1.5 m</span>
            <span>3 m</span>
          </div>
        </div>

        {/* Sandbar Angle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-white">Sandbar Angle</Label>
            <span className="text-sm text-white">{sandbars.angle}°</span>
          </div>
          <Slider
            value={[sandbars.angle]}
            min={0}
            max={90}
            step={1}
            onValueChange={(value) => updateSandbars({ angle: value[0] })}
          />
          <div className="flex justify-between text-xs text-purple-300">
            <span>0°</span>
            <span>45°</span>
            <span>90°</span>
          </div>
        </div>
      </div>

      <div className="p-3 mt-4 text-sm rounded-md bg-purple-900/30">
        <p className="text-purple-200">
          Sandbars affect how waves break and form. More sandbars create complex wave patterns, while height and angle
          influence the shape and power of breaking waves.
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500/10"
          onClick={() =>
            updateSandbars({
              count: 2,
              spacing: 50,
              height: 1,
              angle: 15,
            })
          }
        >
          Reset to Default
        </Button>
      </div>
    </div>
  )
}

