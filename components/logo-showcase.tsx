import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function LogoShowcase() {
  return (
    <div className="space-y-8">
      <div className="p-6 rounded-lg bg-black/30">
        <h2 className="mb-4 text-xl font-bold text-white">Primary Logo</h2>
        <div className="flex flex-col items-center p-8 rounded-lg bg-gradient-to-br from-purple-900/50 via-indigo-800/50 to-fuchsia-900/50">
          <div className="relative w-64 h-64 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500">
                GROOVY
                <br />
                SURF
              </div>
            </div>
            <div className="absolute inset-0">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  fill="none"
                  stroke="url(#logoGradient)"
                  strokeWidth="3"
                  d="M40,100 C40,60 60,40 100,40 C140,40 160,60 160,100 C160,140 140,160 100,160 C60,160 40,140 40,100 Z"
                />
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF69B4" />
                    <stop offset="50%" stopColor="#9370DB" />
                    <stop offset="100%" stopColor="#00BFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <Button className="bg-black/30 hover:bg-black/50">
            <Download className="w-4 h-4 mr-2" /> Download Logo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-6 rounded-lg bg-black/30">
          <h2 className="mb-4 text-xl font-bold text-white">Logo Variations</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white">
              <div className="flex items-center justify-center h-32">
                <div className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  GS
                </div>
              </div>
              <p className="mt-2 text-xs text-center text-gray-600">Light Background</p>
            </div>
            <div className="p-4 rounded-lg bg-black">
              <div className="flex items-center justify-center h-32">
                <div className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500">
                  GS
                </div>
              </div>
              <p className="mt-2 text-xs text-center text-gray-400">Dark Background</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-black/30">
          <h2 className="mb-4 text-xl font-bold text-white">Icon Set</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Wave", icon: "🌊" },
              { name: "Surfboard", icon: "🏄" },
              { name: "Spiral", icon: "🌀" },
              { name: "Star", icon: "✨" },
              { name: "Sun", icon: "☀️" },
              { name: "Rainbow", icon: "🌈" },
            ].map((item) => (
              <div key={item.name} className="flex flex-col items-center p-4 rounded-lg bg-white/10">
                <div className="text-3xl">{item.icon}</div>
                <p className="mt-2 text-xs text-center text-purple-200">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-black/30">
        <h2 className="mb-4 text-xl font-bold text-white">Logo Usage Guidelines</h2>
        <ul className="space-y-2 text-purple-100">
          <li>• Always maintain the logo's proportions when resizing</li>
          <li>• Ensure adequate clear space around the logo (minimum 1x height of the logo)</li>
          <li>• Do not alter the logo colors outside of approved variations</li>
          <li>• Do not add effects such as drop shadows or outlines to the logo</li>
          <li>• Use the appropriate logo variation based on background color</li>
          <li>• The minimum size for the logo is 40px in height for digital applications</li>
        </ul>
      </div>

      <div className="p-6 rounded-lg bg-black/30">
        <h2 className="mb-4 text-xl font-bold text-white">Assets Folder Structure</h2>
        <div className="p-4 font-mono text-sm rounded bg-black/50 text-purple-100">
          <pre>
            {`/assets
  /logos
    - primary-logo.svg
    - primary-logo.png
    - logo-dark.svg
    - logo-light.svg
    - icon-only.svg
  /icons
    - wave.svg
    - surfboard.svg
    - spiral.svg
    - star.svg
    - sun.svg
    - rainbow.svg
  /patterns
    - psychedelic-pattern-1.svg
    - wave-pattern.svg
    - groovy-background.svg
  /3d
    - surfboard.glb
    - ocean.glb
    - environment.hdr
  /textures
    - water-normal.jpg
    - psychedelic-gradient.jpg
  /audio
    - ambient-waves.mp3
    - psychedelic-music.mp3`}
          </pre>
        </div>
      </div>
    </div>
  )
}

