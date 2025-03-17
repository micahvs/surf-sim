import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function MCPPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-fuchsia-900/95">
      <div className="container mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500">
            Model Control Protocol (MCP)
          </h1>

          <Button asChild variant="outline" className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500/10">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </header>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="ai-instructions">AI Instructions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Model Control Protocol Overview</CardTitle>
                <CardDescription>Core concepts and architecture of the wave modeling system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Purpose</h3>
                  <p className="text-purple-100">
                    The Model Control Protocol (MCP) defines the interface and data structures for controlling the
                    Groovy Surf wave modeling system. It provides a standardized way to adjust wave parameters,
                    visualize results, and integrate with physical modeling systems.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Architecture</h3>
                  <p className="mb-4 text-purple-100">
                    The system is built with a clear separation between the UI layer and the underlying wave physics
                    model. This allows for future expansion and integration with more sophisticated physical modeling
                    engines.
                  </p>
                  <div className="p-4 font-mono text-sm rounded bg-black/50 text-purple-100">
                    <pre>
                      {`┌─────────────────────────────────────────┐
│             User Interface               │
│  ┌─────────────┐       ┌──────────────┐  │
│  │ Parameter   │       │ Visualization │  │
│  │ Controls    │       │ Panel        │  │
│  └─────────────┘       └──────────────┘  │
└───────────────┬─────────────────┬────────┘
                │                 │
                ▼                 ▼
┌───────────────────────────────────────────┐
│           Wave Model Provider             │
│  ┌─────────────┐       ┌──────────────┐  │
│  │ State       │       │ Parameter    │  │
│  │ Management  │◄─────►│ Validation   │  │
│  └─────────────┘       └──────────────┘  │
└───────────────┬─────────────────┬────────┘
                │                 │
                ▼                 ▼
┌───────────────────────────────────────────┐
│        Physical Modeling Engine           │
│  (Future integration with external system) │
└───────────────────────────────────────────┘`}
                    </pre>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Key Components</h3>
                  <ul className="space-y-2 text-purple-100">
                    <li>
                      <strong>Wave Model Provider:</strong> Central state management for all wave parameters
                    </li>
                    <li>
                      <strong>Parameter Controls:</strong> UI components for adjusting wave characteristics
                    </li>
                    <li>
                      <strong>Visualization Panel:</strong> Real-time visual representation of wave conditions
                    </li>
                    <li>
                      <strong>Preset System:</strong> Pre-configured wave scenarios
                    </li>
                    <li>
                      <strong>Sandbar Configuration:</strong> Controls for underwater topography
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parameters">
            <Card>
              <CardHeader>
                <CardTitle>Parameter Specifications</CardTitle>
                <CardDescription>Detailed information about all controllable parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Swell Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-purple-100">
                      <thead className="text-xs uppercase bg-purple-900/50">
                        <tr>
                          <th className="px-4 py-3">Parameter</th>
                          <th className="px-4 py-3">Range</th>
                          <th className="px-4 py-3">Default</th>
                          <th className="px-4 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">Direction</td>
                          <td className="px-4 py-3">0-360°</td>
                          <td className="px-4 py-3">270° (W)</td>
                          <td className="px-4 py-3">Direction from which the swell is coming</td>
                        </tr>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">Height</td>
                          <td className="px-4 py-3">0-10 m</td>
                          <td className="px-4 py-3">1.5 m</td>
                          <td className="px-4 py-3">Wave height from trough to crest</td>
                        </tr>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">Period</td>
                          <td className="px-4 py-3">5-20 s</td>
                          <td className="px-4 py-3">10 s</td>
                          <td className="px-4 py-3">Time between successive wave crests</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Enabled</td>
                          <td className="px-4 py-3">Boolean</td>
                          <td className="px-4 py-3">
                            Primary: true
                            <br />
                            Others: false
                          </td>
                          <td className="px-4 py-3">Whether the swell is active in the model</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Sandbar Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-purple-100">
                      <thead className="text-xs uppercase bg-purple-900/50">
                        <tr>
                          <th className="px-4 py-3">Parameter</th>
                          <th className="px-4 py-3">Range</th>
                          <th className="px-4 py-3">Default</th>
                          <th className="px-4 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">Count</td>
                          <td className="px-4 py-3">1-5</td>
                          <td className="px-4 py-3">2</td>
                          <td className="px-4 py-3">Number of sandbars in the model</td>
                        </tr>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">Spacing</td>
                          <td className="px-4 py-3">10-100 m</td>
                          <td className="px-4 py-3">50 m</td>
                          <td className="px-4 py-3">Distance between consecutive sandbars</td>
                        </tr>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">Height</td>
                          <td className="px-4 py-3">0-3 m</td>
                          <td className="px-4 py-3">1 m</td>
                          <td className="px-4 py-3">Height of sandbars from ocean floor</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Angle</td>
                          <td className="px-4 py-3">0-90°</td>
                          <td className="px-4 py-3">15°</td>
                          <td className="px-4 py-3">Angle of sandbars relative to shoreline</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Parameter Interactions</h3>
                  <p className="mb-4 text-purple-100">
                    Parameters interact in complex ways to create different wave conditions:
                  </p>
                  <ul className="space-y-2 text-purple-100">
                    <li>
                      • <strong>Direction + Sandbar Angle:</strong> When wave direction is perpendicular to sandbar
                      angle, waves break more cleanly
                    </li>
                    <li>
                      • <strong>Height + Period:</strong> Larger height and longer period create more powerful waves
                    </li>
                    <li>
                      • <strong>Multiple Swells:</strong> When enabled together, create complex wave patterns and peaks
                    </li>
                    <li>
                      • <strong>Sandbar Count + Spacing:</strong> More sandbars with closer spacing create more complex
                      breaking patterns
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration">
            <Card>
              <CardHeader>
                <CardTitle>Integration Guide</CardTitle>
                <CardDescription>How to integrate with physical modeling systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Data Format</h3>
                  <p className="mb-4 text-purple-100">
                    The wave model parameters are stored in a standardized JSON format that can be easily exported to or
                    imported from external systems:
                  </p>
                  <div className="p-4 font-mono text-sm rounded bg-black/50 text-purple-100">
                    <pre>
                      {`{
  "swells": {
    "primary": {
      "direction": 270,
      "height": 1.5,
      "period": 10,
      "enabled": true
    },
    "secondary": {
      "direction": 240,
      "height": 0.8,
      "period": 8,
      "enabled": false
    },
    "tertiary": {
      "direction": 300,
      "height": 0.4,
      "period": 6,
      "enabled": false
    }
  },
  "sandbars": {
    "count": 2,
    "spacing": 50,
    "height": 1,
    "angle": 15
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">API Endpoints</h3>
                  <p className="mb-4 text-purple-100">
                    For future physical model integration, the following API endpoints will be available:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-purple-100">
                      <thead className="text-xs uppercase bg-purple-900/50">
                        <tr>
                          <th className="px-4 py-3">Endpoint</th>
                          <th className="px-4 py-3">Method</th>
                          <th className="px-4 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">/api/wave-model/parameters</td>
                          <td className="px-4 py-3">GET</td>
                          <td className="px-4 py-3">Retrieve current wave model parameters</td>
                        </tr>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">/api/wave-model/parameters</td>
                          <td className="px-4 py-3">POST</td>
                          <td className="px-4 py-3">Update wave model parameters</td>
                        </tr>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">/api/wave-model/presets</td>
                          <td className="px-4 py-3">GET</td>
                          <td className="px-4 py-3">List available presets</td>
                        </tr>
                        <tr className="border-b border-purple-800/30">
                          <td className="px-4 py-3 font-medium">/api/wave-model/presets/{"{name}"}</td>
                          <td className="px-4 py-3">GET</td>
                          <td className="px-4 py-3">Load a specific preset</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">/api/wave-model/simulate</td>
                          <td className="px-4 py-3">POST</td>
                          <td className="px-4 py-3">Run simulation with current parameters</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Physical Model Integration</h3>
                  <p className="mb-4 text-purple-100">To integrate with a physical wave modeling system:</p>
                  <ol className="space-y-2 text-purple-100 list-decimal list-inside">
                    <li>
                      Implement an adapter that translates between the MCP JSON format and your physical model's input
                      format
                    </li>
                    <li>Set up a communication channel (REST API, WebSockets, or direct function calls)</li>
                    <li>Implement real-time or batch processing of wave parameters</li>
                    <li>Return simulation results in a standardized format for visualization</li>
                  </ol>
                  <p className="mt-4 text-purple-100">
                    The system is designed to be agnostic to the underlying physical model implementation, allowing for
                    different simulation engines to be plugged in.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-instructions">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant Instructions</CardTitle>
                <CardDescription>
                  Guidelines for AI assistants to interact with the wave modeling system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">For Claude and Other AI Assistants</h3>
                  <p className="mb-4 text-purple-100">
                    This section provides instructions for AI assistants to effectively interact with and control the
                    Groovy Surf wave modeling system.
                  </p>

                  <h4 className="mt-6 mb-2 font-bold text-pink-300">Understanding the System</h4>
                  <p className="mb-4 text-purple-100">
                    The Groovy Surf wave modeling system allows for the configuration of three distinct swells (primary,
                    secondary, and tertiary) and sandbar formations to create realistic wave patterns. Each swell has
                    properties for direction, height, period, and can be enabled/disabled.
                  </p>

                  <h4 className="mt-6 mb-2 font-bold text-pink-300">Parameter Manipulation</h4>
                  <p className="mb-4 text-purple-100">When a user asks to modify wave parameters, you should:</p>
                  <ol className="space-y-2 text-purple-100 list-decimal list-inside">
                    <li>Identify which swell(s) they want to modify (primary, secondary, tertiary)</li>
                    <li>Determine which parameters they want to change (direction, height, period, enabled)</li>
                    <li>Ensure values are within valid ranges (see Parameter Specifications tab)</li>
                    <li>Explain the expected effect of the parameter changes on wave behavior</li>
                  </ol>

                  <h4 className="mt-6 mb-2 font-bold text-pink-300">Example Interactions</h4>
                  <div className="p-4 mb-4 rounded bg-black/50">
                    <p className="mb-2 font-bold text-purple-200">User: "I want big waves coming from the west"</p>
                    <p className="text-purple-100">
                      AI Response: "I'll set up the primary swell with a westerly direction (270°) and increase the wave
                      height to 4 meters with a period of 14 seconds. This will create powerful, consistent waves
                      approaching from the west. Would you like me to adjust the secondary swell as well for added
                      complexity?"
                    </p>
                  </div>

                  <div className="p-4 mb-4 rounded bg-black/50">
                    <p className="mb-2 font-bold text-purple-200">User: "Create a reef break scenario"</p>
                    <p className="text-purple-100">
                      AI Response: "I'll apply the 'Reef Break' preset, which configures a primary swell from the
                      southwest (220°) with 2.5m height and 14s period, plus a secondary swell. The sandbar
                      configuration will be set to a single, tall (2.5m) formation at a 30° angle to create the sharp,
                      hollow waves characteristic of reef breaks."
                    </p>
                  </div>

                  <h4 className="mt-6 mb-2 font-bold text-pink-300">Terminology Guide</h4>
                  <ul className="space-y-2 text-purple-100">
                    <li>
                      • <strong>Swell:</strong> A series of waves generated by distant storm systems
                    </li>
                    <li>
                      • <strong>Direction:</strong> The compass direction FROM which waves are coming (e.g., 270° means
                      waves coming FROM the west, traveling TOWARD the east)
                    </li>
                    <li>
                      • <strong>Period:</strong> The time between successive wave crests (longer periods = more powerful
                      waves)
                    </li>
                    <li>
                      • <strong>Sandbar:</strong> Underwater ridge of sand that affects how waves break
                    </li>
                    <li>
                      • <strong>Point Break:</strong> Waves breaking around a point of land
                    </li>
                    <li>
                      • <strong>Beach Break:</strong> Waves breaking over a sandy bottom
                    </li>
                    <li>
                      • <strong>Reef Break:</strong> Waves breaking over a coral or rocky reef
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Future Physical Model Integration</h3>
                  <p className="mb-4 text-purple-100">
                    When the physical modeling system is integrated, AI assistants should:
                  </p>
                  <ul className="space-y-2 text-purple-100">
                    <li>• Explain that parameter changes will be sent to the physical model for simulation</li>
                    <li>• Interpret and explain simulation results to users</li>
                    <li>• Suggest parameter adjustments based on desired wave characteristics</li>
                    <li>• Help troubleshoot unexpected simulation results</li>
                  </ul>
                  <p className="mt-4 text-purple-100">
                    The physical model will provide more accurate wave dynamics, including breaking patterns, currents,
                    and interactions with complex bathymetry.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

