"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { WaveModelDashboard } from "@/components/wave-model-dashboard"
import { SandbarControls } from "@/components/sandbar-controls"
import { VisualizationPanel } from "@/components/visualization-panel"
import { PresetSelector } from "@/components/preset-selector"
import { WaveModelProvider } from "@/components/wave-model-provider"
import { Home, Save, Download, Upload, Info } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("primary")

  return (
    <WaveModelProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-fuchsia-900/95">
        <div className="container py-6 mx-auto">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500">
              Wave Model Dashboard
            </h1>

            <div className="flex gap-2">
              <Button asChild variant="ghost" size="icon" className="text-white">
                <Link href="/">
                  <Home />
                </Link>
              </Button>

              <Button variant="ghost" size="icon" className="text-white">
                <Save />
              </Button>

              <Button variant="ghost" size="icon" className="text-white">
                <Download />
              </Button>

              <Button variant="ghost" size="icon" className="text-white">
                <Upload />
              </Button>

              <Button asChild variant="ghost" size="icon" className="text-white">
                <Link href="/mcp">
                  <Info />
                </Link>
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Panel - Wave Controls */}
            <div className="lg:col-span-2">
              <Card className="p-4 overflow-hidden bg-black/30 backdrop-blur-sm border-none">
                <Tabs defaultValue="primary" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="primary">Primary Swell</TabsTrigger>
                    <TabsTrigger value="secondary">Secondary Swell</TabsTrigger>
                    <TabsTrigger value="tertiary">Tertiary Swell</TabsTrigger>
                  </TabsList>

                  <TabsContent value="primary">
                    <WaveModelDashboard swellType="primary" />
                  </TabsContent>

                  <TabsContent value="secondary">
                    <WaveModelDashboard swellType="secondary" />
                  </TabsContent>

                  <TabsContent value="tertiary">
                    <WaveModelDashboard swellType="tertiary" />
                  </TabsContent>
                </Tabs>
              </Card>

              <Card className="p-4 mt-6 bg-black/30 backdrop-blur-sm border-none">
                <h2 className="mb-4 text-xl font-bold text-white">Sandbar Configuration</h2>
                <SandbarControls />
              </Card>
            </div>

            {/* Right Panel - Visualization & Presets */}
            <div>
              <Card className="p-4 bg-black/30 backdrop-blur-sm border-none">
                <h2 className="mb-4 text-xl font-bold text-white">Wave Visualization</h2>
                <VisualizationPanel activeTab={activeTab} />
              </Card>

              <Card className="p-4 mt-6 bg-black/30 backdrop-blur-sm border-none">
                <h2 className="mb-4 text-xl font-bold text-white">Wave Presets</h2>
                <PresetSelector />
              </Card>

              <Card className="p-4 mt-6 bg-black/30 backdrop-blur-sm border-none">
                <h2 className="mb-4 text-xl font-bold text-white">Current Parameters</h2>
                <div className="p-4 overflow-auto font-mono text-xs rounded bg-black/50 text-purple-100 max-h-60">
                  <pre id="parameters-output">{/* Parameters will be displayed here */}</pre>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </WaveModelProvider>
  )
}

