import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorPalette } from "@/components/color-palette"
import { TypographyShowcase } from "@/components/typography-showcase"
import { LogoShowcase } from "@/components/logo-showcase"

export default function BrandPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-900/90 via-indigo-900/90 to-fuchsia-900/90">
      <div className="container mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500">
            Groovy Surf Brand Specs
          </h1>

          <Button asChild variant="outline" className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500/10">
            <Link href="/">Back to Home</Link>
          </Button>
        </header>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Brand Overview</CardTitle>
                <CardDescription>The core identity and vision of Groovy Surf</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Brand Vision</h3>
                  <p className="text-purple-100">
                    Groovy Surf is a psychedelic surfing simulator that transports users to a vibrant, mind-expanding
                    digital ocean. Our brand combines the free-spirited nature of 60s and 70s psychedelic art with
                    modern digital aesthetics to create an immersive and unforgettable surfing experience.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Brand Personality</h3>
                  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <li className="p-4 rounded-lg bg-purple-800/50">
                      <span className="block mb-2 font-bold text-pink-300">Psychedelic</span>
                      <p className="text-sm text-purple-100">Mind-expanding, colorful, and consciousness-altering</p>
                    </li>
                    <li className="p-4 rounded-lg bg-purple-800/50">
                      <span className="block mb-2 font-bold text-pink-300">Groovy</span>
                      <p className="text-sm text-purple-100">Retro-inspired, flowing, and rhythmic</p>
                    </li>
                    <li className="p-4 rounded-lg bg-purple-800/50">
                      <span className="block mb-2 font-bold text-pink-300">Adventurous</span>
                      <p className="text-sm text-purple-100">Bold, exciting, and boundary-pushing</p>
                    </li>
                    <li className="p-4 rounded-lg bg-purple-800/50">
                      <span className="block mb-2 font-bold text-pink-300">Immersive</span>
                      <p className="text-sm text-purple-100">Engaging, captivating, and transportive</p>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-black/30">
                  <h3 className="mb-4 text-xl font-bold text-white">Target Audience</h3>
                  <p className="text-purple-100">
                    Digital explorers, psychedelic enthusiasts, virtual surfers, and anyone looking for a unique and
                    mind-expanding digital experience. Our audience spans across age groups but appeals particularly to
                    those with an appreciation for retro aesthetics, digital art, and immersive experiences.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>The vibrant and psychedelic color system that defines Groovy Surf</CardDescription>
              </CardHeader>
              <CardContent>
                <ColorPalette />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>
                  The typefaces and text styles that give Groovy Surf its distinctive voice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TypographyShowcase />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets">
            <Card>
              <CardHeader>
                <CardTitle>Brand Assets</CardTitle>
                <CardDescription>Logos, icons, and other visual elements for Groovy Surf</CardDescription>
              </CardHeader>
              <CardContent>
                <LogoShowcase />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

