import { cn } from "@/lib/utils"

const primaryColors = [
  {
    name: "Hot Pink",
    hex: "#FF69B4",
    tailwind: "bg-[#FF69B4]",
    description: "Primary brand color, used for key UI elements and accents",
  },
  {
    name: "Electric Purple",
    hex: "#9370DB",
    tailwind: "bg-[#9370DB]",
    description: "Secondary color, used for supporting elements and backgrounds",
  },
  {
    name: "Psychedelic Orange",
    hex: "#FFA500",
    tailwind: "bg-[#FFA500]",
    description: "Accent color for highlights and call-to-actions",
  },
  {
    name: "Cosmic Blue",
    hex: "#00BFFF",
    tailwind: "bg-[#00BFFF]",
    description: "Used for water elements and cool accents",
  },
]

const gradients = [
  {
    name: "Sunset Wave",
    class: "bg-gradient-to-r from-pink-500 to-orange-500",
    description: "Primary gradient for buttons and important UI elements",
  },
  {
    name: "Cosmic Mind",
    class: "bg-gradient-to-br from-purple-900 via-indigo-800 to-fuchsia-900",
    description: "Background gradient for immersive sections",
  },
  {
    name: "Psychedelic Rainbow",
    class: "bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500",
    description: "Used for text highlights and special elements",
  },
  {
    name: "Ocean Deep",
    class: "bg-gradient-to-b from-blue-400 to-indigo-900",
    description: "Used for water-related elements and depth",
  },
]

function ColorSwatch({ color, className }: { color: any; className?: string }) {
  return (
    <div className={cn("rounded-lg overflow-hidden shadow-lg", className)}>
      <div className={cn("h-24 w-full", color.tailwind || color.class)} />
      <div className="p-4 bg-black/40 text-white">
        <h3 className="font-bold">{color.name}</h3>
        {color.hex && <p className="text-sm text-gray-300">{color.hex}</p>}
        <p className="mt-2 text-sm text-purple-100">{color.description}</p>
      </div>
    </div>
  )
}

export function ColorPalette() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-xl font-bold text-white">Primary Colors</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {primaryColors.map((color) => (
            <ColorSwatch key={color.name} color={color} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold text-white">Gradients</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gradients.map((gradient) => (
            <ColorSwatch key={gradient.name} color={gradient} />
          ))}
        </div>
      </div>

      <div className="p-6 rounded-lg bg-black/30">
        <h2 className="mb-4 text-xl font-bold text-white">Color Usage Guidelines</h2>
        <ul className="space-y-2 text-purple-100">
          <li>• Use Hot Pink as the primary accent color for important UI elements</li>
          <li>• Apply the Sunset Wave gradient to primary buttons and call-to-actions</li>
          <li>• Use Cosmic Mind gradient for immersive backgrounds</li>
          <li>• Psychedelic Rainbow gradient should be used sparingly for special highlights</li>
          <li>• Ensure sufficient contrast between text and background colors</li>
          <li>• Maintain color consistency across all brand touchpoints</li>
        </ul>
      </div>
    </div>
  )
}

