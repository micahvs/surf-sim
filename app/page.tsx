import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WavyBackground } from "@/components/wavy-background"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-fuchsia-900">
      <WavyBackground className="absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500 md:text-8xl">
          Groovy Surf
        </h1>

        <p className="max-w-2xl mt-6 text-xl text-purple-100 md:text-2xl">
          Ride the cosmic waves in our psychedelic surfing simulator
        </p>

        <div className="flex flex-col gap-4 mt-10 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-0"
          >
            <Link href="/simulator">Start Surfing</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500/10"
          >
            <Link href="/dashboard">Wave Dashboard</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500/10"
          >
            <Link href="/brand">Brand Specs</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

