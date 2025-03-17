export function TypographyShowcase() {
  return (
    <div className="space-y-8">
      <div className="p-6 rounded-lg bg-black/30">
        <h2 className="mb-4 text-xl font-bold text-white">Primary Font: Geist</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-purple-300">Geist Bold</h3>
            <p className="text-4xl font-bold text-white font-geist">Groovy Surf Experience</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-purple-300">Geist Regular</h3>
            <p className="text-2xl text-white font-geist">Ride the psychedelic waves</p>
          </div>
          <div className="p-4 mt-4 rounded bg-white/10">
            <p className="text-sm text-purple-100">
              Geist is our primary font, used for headings, buttons, and important UI elements. It provides a modern,
              clean look that contrasts well with our psychedelic visuals.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-black/30">
        <h2 className="mb-4 text-xl font-bold text-white">Display Font: Psychedelic</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-purple-300">For Special Headings</h3>
            <p className="text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500">
              GROOVY SURF
            </p>
          </div>
          <div className="p-4 mt-4 rounded bg-white/10">
            <p className="text-sm text-purple-100">
              For special display text, we use gradient text effects to create a psychedelic feel. This style should be
              reserved for main headings and important brand elements.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-black/30">
        <h2 className="mb-4 text-xl font-bold text-white">Typography Hierarchy</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="p-4 rounded bg-white/10">
              <h3 className="text-sm font-medium text-purple-300">H1 - Main Headings</h3>
              <p className="text-4xl font-bold text-white">Groovy Surf</p>
              <p className="mt-2 text-xs text-purple-200">Font: Geist Bold, 36px+</p>
            </div>
            <div className="p-4 rounded bg-white/10">
              <h3 className="text-sm font-medium text-purple-300">H2 - Section Headings</h3>
              <p className="text-2xl font-bold text-white">Ride the Wave</p>
              <p className="mt-2 text-xs text-purple-200">Font: Geist Bold, 24px</p>
            </div>
            <div className="p-4 rounded bg-white/10">
              <h3 className="text-sm font-medium text-purple-300">H3 - Subsections</h3>
              <p className="text-xl font-bold text-white">Psychedelic Experience</p>
              <p className="mt-2 text-xs text-purple-200">Font: Geist Bold, 18px</p>
            </div>
            <div className="p-4 rounded bg-white/10">
              <h3 className="text-sm font-medium text-purple-300">Body Text</h3>
              <p className="text-base text-white">Experience the cosmic waves</p>
              <p className="mt-2 text-xs text-purple-200">Font: Geist Regular, 16px</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-black/30">
        <h2 className="mb-4 text-xl font-bold text-white">Typography Guidelines</h2>
        <ul className="space-y-2 text-purple-100">
          <li>• Maintain proper hierarchy to guide users through the interface</li>
          <li>• Use gradient text effects sparingly for maximum impact</li>
          <li>• Ensure text remains legible against all backgrounds</li>
          <li>• Maintain consistent line heights and letter spacing</li>
          <li>• Use bold text for emphasis rather than italics</li>
          <li>• Keep body text at 16px or larger for readability</li>
        </ul>
      </div>
    </div>
  )
}

