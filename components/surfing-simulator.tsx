"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Text, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

// Ocean wave component
function Ocean({ waveIntensity = 0.5 }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry] = useState(() => new THREE.PlaneGeometry(100, 100, 128, 128))

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const time = clock.getElapsedTime()
    const position = geometry.attributes.position as THREE.BufferAttribute

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i)
      const y = position.getY(i)

      // Create wave effect
      const waveX1 = Math.sin(x * 0.5 + time * 0.7) * waveIntensity
      const waveX2 = Math.sin(x * 0.3 + time * 0.5) * waveIntensity * 0.6
      const waveY1 = Math.cos(y * 0.4 + time * 0.6) * waveIntensity * 0.8

      const height = waveX1 + waveX2 + waveY1

      position.setZ(i, height)
    }

    position.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <primitive object={geometry} />
      <meshStandardMaterial
        color="#4169E1"
        metalness={0.2}
        roughness={0.8}
        wireframe={false}
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// Surfboard component
function Surfboard({ position = [0, 0, 0] as [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const time = clock.getElapsedTime()
    meshRef.current.position.y = Math.sin(time) * 0.1 + position[1]
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.05
  })

  return (
    <mesh ref={meshRef} position={position as [number, number, number]}>
      <boxGeometry args={[2, 0.1, 0.5]} />
      <meshStandardMaterial color="#FFA500" />
    </mesh>
  )
}

// Psychedelic background objects
function PsychedelicObjects({ count = 20, psychedelicLevel = 0.7 }) {
  const group = useRef<THREE.Group>(null)
  const objects = useRef<THREE.Mesh[]>([])

  useEffect(() => {
    objects.current = Array(count)
      .fill(0)
      .map(() => {
        const mesh = new THREE.Mesh(
          new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.5, 1),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(Math.random(), Math.random(), Math.random()),
            emissive: new THREE.Color(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5),
            wireframe: Math.random() > 0.7,
          }),
        )

        // Random position in a sphere
        const radius = 15 + Math.random() * 10
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI

        mesh.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        )

        mesh.scale.set(Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5)

        if (group.current) {
          group.current.add(mesh)
        }

        return mesh
      })

    return () => {
      if (group.current) {
        objects.current.forEach((obj) => group.current?.remove(obj))
      }
    }
  }, [count])

  useFrame(({ clock }) => {
    if (!group.current) return

    const time = clock.getElapsedTime()

    objects.current.forEach((obj, i) => {
      const offset = i * 0.1

      // Rotate objects
      obj.rotation.x = time * 0.2 * (i % 2 ? 1 : -1) * psychedelicLevel
      obj.rotation.y = time * 0.1 * psychedelicLevel

      // Pulsate objects
      const scale = 1 + Math.sin(time + offset) * 0.2 * psychedelicLevel
      obj.scale.set(scale, scale, scale)

      // Change colors over time if psychedelic level is high
      if (psychedelicLevel > 0.5 && obj.material instanceof THREE.MeshStandardMaterial) {
        obj.material.color.setHSL((time * 0.05 + offset) % 1, 0.8, 0.5)

        obj.material.emissive.setHSL((time * 0.05 + offset + 0.5) % 1, 0.8, 0.3)
      }
    })

    // Rotate the entire group slowly
    group.current.rotation.y = time * 0.05 * psychedelicLevel
  })

  return <group ref={group} />
}

// Main scene component
function Scene({ isPaused, waveIntensity, psychedelicLevel }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 3, 8)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <PsychedelicObjects count={30} psychedelicLevel={psychedelicLevel} />

      <Ocean waveIntensity={waveIntensity} />
      <Surfboard position={[0, 0, 0]} />

      <Text
        position={[0, 4, 0]}
        rotation={[0, 0, 0]}
        fontSize={1.5}
        color="#ff00ff"
        anchorX="center"
        anchorY="middle"
      >
        GROOVY SURF
      </Text>

      <mesh position={[0, 10, -15]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[8, 32, 32]} />
        <MeshDistortMaterial
          color="#ff00ff"
          speed={isPaused ? 0 : 2 * psychedelicLevel}
          distort={0.4 * psychedelicLevel}
          radius={1}
        />
      </mesh>

      <Environment preset="sunset" />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

// Main component
export function SurfingSimulator({ isPaused = false, waveIntensity = 0.5, psychedelicLevel = 0.7 }) {
  return (
    <Canvas className="w-full h-full">
      <Scene isPaused={isPaused} waveIntensity={waveIntensity} psychedelicLevel={psychedelicLevel} />
    </Canvas>
  )
}

