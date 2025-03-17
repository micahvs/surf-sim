import type { MetadataRoute } from "next"

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Groovy Surf - Psychedelic Surfing Simulator",
    short_name: "Groovy Surf",
    description: "A psychedelic and groovy Three.js surfing simulator",
    start_url: "/",
    display: "standalone",
    background_color: "#4B0082",
    theme_color: "#FF69B4",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

