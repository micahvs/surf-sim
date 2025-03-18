"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Text, MeshDistortMaterial, KeyboardControls, useKeyboardControls } from "@react-three/drei"
import * as THREE from "three"
import { useAudio } from "@/components/audio-effects"

// Physics constants
const GRAVITY = 0.05;
const JUMP_FORCE = 1.5;
const MOVE_SPEED = 0.2;
const DRAG = 0.92;
const WAVE_BOOST = 0.08;
const MAX_SPEED = 3.5;
const ROTATION_SPEED = 0.03;
const TRICK_TIMEOUT = 1000;

// Wave data types
interface WavePoint {
  x: number;
  y: number;
  height: number;
}

interface WaveData {
  peaks: WavePoint[];
  troughs: WavePoint[];
}

// Game state
interface GameStateProps {
  score: number;
  tricks: number;
  gameOver: boolean;
  addScore: (points: number) => void;
  addTrick: () => void;
  endGame: () => void;
  resetGame: () => void;
}

const useGameState = (): GameStateProps => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [tricks, setTricks] = useState(0);
  
  const addScore = (points: number) => {
    setScore(prev => prev + points);
  };
  
  const addTrick = () => {
    setTricks(prev => prev + 1);
    addScore(100);
  };
  
  const endGame = () => {
    setGameOver(true);
  };
  
  const resetGame = () => {
    setScore(0);
    setTricks(0);
    setGameOver(false);
  };
  
  return { score, tricks, gameOver, addScore, addTrick, endGame, resetGame };
};

// Ocean wave component with improved physics
function Ocean({ waveIntensity = 0.5, onGetWaveHeight }: { waveIntensity: number, onGetWaveHeight: (data: WaveData) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry] = useState(() => new THREE.PlaneGeometry(100, 100, 128, 128))
  const waveData = useRef<WaveData>({ peaks: [], troughs: [] });
  const timeOffset = useRef(Math.random() * 100); // Random time offset for wave variation

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const time = clock.getElapsedTime() + timeOffset.current
    const position = geometry.attributes.position as THREE.BufferAttribute
    
    // Reset wave data
    waveData.current.peaks = [];
    waveData.current.troughs = [];

    // Create a more realistic wave pattern
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i)
      const y = position.getY(i)

      // Create more dynamic wave effect with multiple frequencies and amplitudes
      const waveX1 = Math.sin(x * 0.5 + time * 0.7) * waveIntensity * 1.0;
      const waveX2 = Math.sin(x * 0.3 + time * 0.5) * waveIntensity * 0.6;
      const waveY1 = Math.cos(y * 0.4 + time * 0.6) * waveIntensity * 0.8;
      const waveY2 = Math.sin(y * 0.2 + time * 0.3) * waveIntensity * 0.5;
      const waveXY = Math.sin(x * 0.1 + y * 0.1 + time * 0.4) * waveIntensity * 0.4;
      
      // Add some randomness and small ripples
      const microRipples = Math.sin(x * 3 + y * 3 + time * 2) * waveIntensity * 0.05;
      
      // Create a more realistic wave formation with a main wave direction
      const directedWave = Math.sin(y * 0.8 + time * 1.2) * Math.cos(x * 0.2) * waveIntensity * 1.2;
      
      const height = waveX1 + waveX2 + waveY1 + waveY2 + waveXY + microRipples + directedWave;
      
      // Track wave peaks and troughs for gameplay - improved detection
      if (Math.abs(x) < 15 && Math.abs(y) < 15) {
        if (height > 0.75 * waveIntensity) {
          waveData.current.peaks.push({ x, y, height });
        } else if (height < -0.75 * waveIntensity) {
          waveData.current.troughs.push({ x, y, height });
        }
      }

      position.setZ(i, height);
    }

    position.needsUpdate = true;
    
    // Provide wave height data to parent
    if (onGetWaveHeight) {
      onGetWaveHeight(waveData.current);
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <primitive object={geometry} />
      <meshStandardMaterial
        color="#0077be" // Updated to a more realistic ocean blue
        metalness={0.3}
        roughness={0.7}
        wireframe={false}
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// Define the controls mapping
enum Controls {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
  jump = 'jump',
}

interface SurfboardProps {
  position: [number, number, number];
  waveData: WaveData;
  gameState: GameStateProps;
}

// Enhanced Surfboard component with physics and controls
function Surfboard({ position = [0, 0, 0], waveData, gameState }: SurfboardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocity = useRef({ x: 0, y: 0, z: 0 });
  const rotation = useRef({ x: 0, y: 0, z: 0 });
  const playerPositionRef = useRef<[number, number, number]>([0, 0, 0]);
  const [surfboardState, setSurfboardState] = useState({ 
    isJumping: false, 
    isOnWave: true,
    trickInProgress: false,
    trickName: '',
    combo: 0,
    airTime: 0,
    lastTrickTime: 0,
    height: 0,
    performedTricks: new Set<string>(),
  });
  
  // Setup keyboard controls and audio
  const [, getKeys] = useKeyboardControls<Controls>();
  const audio = useAudio();
  
  // Last position for wave riding sound
  const lastWaveHeight = useRef(-2);
  const lastJumpTime = useRef(0);
  
  // Define possible tricks
  const tricks = {
    OLLIE: "Ollie",
    KICKFLIP: "Kickflip",
    HEELFLIP: "Heelflip",
    SHUVIT: "Shuvit",
    THREESIXTY: "360 Spin",
    BACKFLIP: "Backflip",
    FRONTFLIP: "Frontflip",
    RODEO: "Rodeo Flip",
    SUPERMAN: "Superman",
    BARREL_ROLL: "Barrel Roll",
  };
  
  // Trick scores - harder tricks are worth more points
  const trickScores = {
    [tricks.OLLIE]: 50,
    [tricks.KICKFLIP]: 100,
    [tricks.HEELFLIP]: 100,
    [tricks.SHUVIT]: 125,
    [tricks.THREESIXTY]: 150,
    [tricks.BACKFLIP]: 200,
    [tricks.FRONTFLIP]: 200,
    [tricks.RODEO]: 300,
    [tricks.SUPERMAN]: 250,
    [tricks.BARREL_ROLL]: 275,
  };
  
  // Surfboard model
  useEffect(() => {
    if (!meshRef.current) return;
    
    // Create a better surfboard shape
    const surfboardGeometry = new THREE.BufferGeometry();
    
    // Define vertices for a more realistic surfboard
    const length = 2;
    const width = 0.5;
    const thickness = 0.08;
    
    const vertices = new Float32Array([
      // Top
      -length/2, thickness/2, -width/2,
      length/2, thickness/2, -width/2,
      length/2, thickness/2, width/2,
      -length/2, thickness/2, width/2,
      
      // Bottom
      -length/2, -thickness/2, -width/2,
      length/2, -thickness/2, -width/2,
      length/2, -thickness/2, width/2,
      -length/2, -thickness/2, width/2,
    ]);
    
    const indices = [
      // Top
      0, 1, 2,
      0, 2, 3,
      
      // Bottom
      4, 7, 6,
      4, 6, 5,
      
      // Sides
      0, 3, 7,
      0, 7, 4,
      1, 0, 4,
      1, 4, 5,
      2, 1, 5,
      2, 5, 6,
      3, 2, 6,
      3, 6, 7
    ];
    
    surfboardGeometry.setIndex(indices);
    surfboardGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    surfboardGeometry.computeVertexNormals();
    
    meshRef.current.geometry = surfboardGeometry;
  }, []);

  // Process keyboard input and physics
  useFrame(({ clock }) => {
    if (!meshRef.current || !waveData) return;

    const keys = getKeys();
    const time = clock.getElapsedTime();
    
    // Apply user controls
    const acceleration = { x: 0, y: 0, z: 0 };
    
    // Left/Right controls with improved responsiveness
    if (keys.left) {
      acceleration.x -= MOVE_SPEED * (surfboardState.isOnWave ? 1.2 : 0.8);
      rotation.current.z = Math.min(rotation.current.z + ROTATION_SPEED, 0.35);
    } else if (keys.right) {
      acceleration.x += MOVE_SPEED * (surfboardState.isOnWave ? 1.2 : 0.8);
      rotation.current.z = Math.max(rotation.current.z - ROTATION_SPEED, -0.35);
    } else {
      // Return to neutral rotation gradually
      rotation.current.z *= 0.92;
    }
    
    // Forward/Backward controls
    if (keys.up) {
      acceleration.z -= MOVE_SPEED * (surfboardState.isOnWave ? 1.2 : 0.8);
      rotation.current.x = Math.min(rotation.current.x + ROTATION_SPEED, 0.25);
    } else if (keys.down) {
      acceleration.z += MOVE_SPEED * (surfboardState.isOnWave ? 1.2 : 0.8);
      rotation.current.x = Math.max(rotation.current.x - ROTATION_SPEED, -0.25);
    } else {
      // Return to neutral rotation gradually
      rotation.current.x *= 0.92;
    }
    
    // Jump control with improved physics
    if (keys.jump && !surfboardState.isJumping && surfboardState.isOnWave) {
      velocity.current.y = JUMP_FORCE * (1 + Math.abs(velocity.current.x * 0.2)); // Higher horizontal speed = higher jump
      lastJumpTime.current = time;
      
      setSurfboardState(prev => ({
        ...prev,
        isJumping: true,
        isOnWave: false,
        airTime: 0,
      }));
      
      audio.playSound("JUMP");
    }
    
    // Apply gravity
    if (!surfboardState.isOnWave) {
      velocity.current.y -= GRAVITY;
    }
    
    // Wave physics - find the wave height at the surfboard position
    const boardX = meshRef.current.position.x;
    const boardZ = meshRef.current.position.z;
    
    // Find closest wave data point to calculate wave height
    let closestWaveHeight = -2; // Default water level
    let onWavePeak = false;
    let distanceToClosestWave = Infinity;
    
    // Check if on a wave peak
    waveData.peaks.forEach(peak => {
      const distance = Math.sqrt((boardX - peak.x) ** 2 + (boardZ - peak.y) ** 2);
      if (distance < distanceToClosestWave && distance < 5) {
        distanceToClosestWave = distance;
        closestWaveHeight = peak.height - 2; // Adjust for ocean base position
        onWavePeak = true;
      }
    });
    
    // Check if in a wave trough if not on a peak
    if (!onWavePeak) {
      waveData.troughs.forEach(trough => {
        const distance = Math.sqrt((boardX - trough.x) ** 2 + (boardZ - trough.y) ** 2);
        if (distance < distanceToClosestWave && distance < 5) {
          distanceToClosestWave = distance;
          closestWaveHeight = trough.height - 2; // Adjust for ocean base position
        }
      });
    }
    
    // Check if the board should be on the wave
    if (meshRef.current.position.y <= closestWaveHeight && velocity.current.y <= 0) {
      // Land on wave
      meshRef.current.position.y = closestWaveHeight;
      velocity.current.y = 0;
      
      // Play splash sound if landing from a jump
      if (surfboardState.isJumping && time - lastJumpTime.current > 0.3) {
        audio.playSound("SPLASH");
        
        // Calculate air time and update state
        const airTime = time - lastJumpTime.current;
        
        setSurfboardState(prev => ({
          ...prev,
          isJumping: false,
          isOnWave: true,
          airTime,
        }));
      }
      
      // Wave boost when riding on a wave peak
      if (onWavePeak) {
        // Boost in the direction the board is facing
        const boostFactor = velocity.current.z < 0 ? -1 : 1;
        velocity.current.z += WAVE_BOOST * boostFactor;
      }
      
      // Play wave sound based on speed
      const speedOnWave = Math.sqrt(velocity.current.x ** 2 + velocity.current.z ** 2);
      if (speedOnWave > 0.5 && Math.random() < 0.02) {
        audio.playSound("WAVE");
      }
    } else if (meshRef.current.position.y < closestWaveHeight) {
      // Keep board on top of the water if it somehow went below
      meshRef.current.position.y = closestWaveHeight;
    } else {
      // Board is in the air
      if (!surfboardState.isJumping && meshRef.current.position.y > closestWaveHeight + 0.1) {
        setSurfboardState(prev => ({
          ...prev,
          isJumping: true,
          isOnWave: false,
          airTime: 0,
        }));
      }
      
      // Update airtime
      if (surfboardState.isJumping) {
        setSurfboardState(prev => ({
          ...prev,
          airTime: time - lastJumpTime.current,
          height: Math.max(prev.height, meshRef.current.position.y - closestWaveHeight),
        }));
      }
    }
    
    // Air trick detection
    if (surfboardState.isJumping && !surfboardState.trickInProgress) {
      // Height-based trick threshold
      const heightThreshold = 0.5;
      const currentHeight = meshRef.current.position.y - closestWaveHeight;
      
      // Detect key combinations for tricks
      if (currentHeight > heightThreshold) {
        // Basic tricks
        if (keys.jump) {
          performTrick(tricks.OLLIE, trickScores[tricks.OLLIE]);
        } 
        // Flip tricks (both horizontal keys)
        else if (keys.left && keys.right) {
          performTrick(tricks.KICKFLIP, trickScores[tricks.KICKFLIP]);
        } 
        // Vertical tricks (both vertical keys)
        else if (keys.up && keys.down) {
          performTrick(tricks.HEELFLIP, trickScores[tricks.HEELFLIP]);
        }
        // Rotation tricks
        else if (keys.left && keys.up) {
          performTrick(tricks.BACKFLIP, trickScores[tricks.BACKFLIP]);
        }
        else if (keys.right && keys.up) {
          performTrick(tricks.FRONTFLIP, trickScores[tricks.FRONTFLIP]);
        }
        else if (keys.left && keys.down) {
          performTrick(tricks.THREESIXTY, trickScores[tricks.THREESIXTY]);
        }
        else if (keys.right && keys.down) {
          performTrick(tricks.BARREL_ROLL, trickScores[tricks.BARREL_ROLL]);
        }
        
        // Special tricks based on airtime and height
        if (surfboardState.airTime > 1.2 && currentHeight > 1.5) {
          if (keys.up) {
            performTrick(tricks.SUPERMAN, trickScores[tricks.SUPERMAN]);
          } else if (keys.down) {
            performTrick(tricks.RODEO, trickScores[tricks.RODEO]);
          }
        }
      }
    }
    
    // Apply acceleration and drag
    velocity.current.x += acceleration.x;
    velocity.current.z += acceleration.z;
    velocity.current.x *= DRAG;
    velocity.current.z *= DRAG;
    
    // Apply maximum speed limit
    const horizontalSpeed = Math.sqrt(velocity.current.x ** 2 + velocity.current.z ** 2);
    if (horizontalSpeed > MAX_SPEED) {
      const scaleFactor = MAX_SPEED / horizontalSpeed;
      velocity.current.x *= scaleFactor;
      velocity.current.z *= scaleFactor;
    }
    
    // Update surfboard position and rotation
    const meshCurrent = meshRef.current; // Get ref to avoid null check warnings
    if (meshCurrent) {
      // Position
      meshCurrent.position.x += velocity.current.x;
      meshCurrent.position.y += velocity.current.y;
      meshCurrent.position.z += velocity.current.z;
      
      // Keep within bounds
      meshCurrent.position.x = Math.max(-45, Math.min(45, meshCurrent.position.x));
      meshCurrent.position.z = Math.max(-45, Math.min(45, meshCurrent.position.z));
      
      // Apply smooth rotation
      meshCurrent.rotation.x = rotation.current.x + 
        (surfboardState.isJumping ? Math.sin(time * 5) * velocity.current.z * 0.2 : 0);
      meshCurrent.rotation.z = rotation.current.z +
        (surfboardState.isJumping ? Math.sin(time * 5) * velocity.current.x * 0.2 : 0);
        
      // Update player position for camera
      playerPositionRef.current = [
        meshCurrent.position.x,
        meshCurrent.position.y,
        meshCurrent.position.z
      ];
    }
  })

  // Perform a trick
  const performTrick = (trickName: string, score: number) => {
    const now = Date.now();
    // Prevent trick spam by enforcing a cooldown
    if (now - surfboardState.lastTrickTime < TRICK_TIMEOUT) return;
    
    // Update state
    setSurfboardState(prev => {
      // Calculate combo multiplier: each unique trick adds 0.25x
      const newPerformedTricks = new Set(prev.performedTricks);
      newPerformedTricks.add(trickName);
      const comboMultiplier = 1 + (newPerformedTricks.size - 1) * 0.25;
      const finalScore = Math.round(score * comboMultiplier);
      
      // Add score and play sound
      gameState.addScore(finalScore);
      gameState.addTrick();
      audio.playSound("TRICK");
      
      // Display a message or visual for combo
      const comboText = comboMultiplier > 1 ? ` x${comboMultiplier.toFixed(1)}` : "";
      
      return {
        ...prev,
        trickInProgress: true,
        trickName: `${trickName} +${finalScore}${comboText}`,
        lastTrickTime: now,
        combo: prev.combo + 1,
        performedTricks: newPerformedTricks,
      };
    });
    
    // Reset trick state after a delay
    setTimeout(() => {
      setSurfboardState(prev => ({
        ...prev,
        trickInProgress: false,
        trickName: '',
      }));
    }, 1000);
  };

  return (
    <mesh
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      castShadow
      receiveShadow
    >
      {/* Text for displaying trick names */}
      {surfboardState.trickName && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          rotation={[0, 0, 0]}
          outlineWidth={0.1}
          outlineColor="black"
        >
          {surfboardState.trickName}
        </Text>
      )}
      
      {/* Surfboard base */}
      <meshPhysicalMaterial color="#f7c37e" metalness={0.2} roughness={0.8} clearcoat={1.0} clearcoatRoughness={0.2} />
      
      {/* Trail effect when moving fast */}
      {Math.sqrt(velocity.current.x ** 2 + velocity.current.z ** 2) > 1.5 && (
        <Trail
          width={1}
          length={5}
          color={surfboardState.isJumping ? "#ff00ff" : "#37ecff"}
          attenuation={(width) => width}
        >
          <mesh position={[0, -0.1, 0]} scale={[0.5, 0.05, 1.5]}>
            <boxGeometry />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
          </mesh>
        </Trail>
      )}
    </mesh>
  );
}

// Trail component for the surfboard
function Trail({ 
  width = 1, 
  length = 5, 
  color = "#ffffff", 
  attenuation = (width: number) => width 
}: { 
  width?: number, 
  length?: number, 
  color?: string, 
  attenuation?: (width: number) => number 
}) {
  const ref = useRef<any>();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.update();
    }
  });
  
  return (
    <mesh>
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

// Enhanced psychedelic objects
function PsychedelicObjects({ count = 20, psychedelicLevel = 0.7 }: { count: number, psychedelicLevel: number }) {
  const objects = useRef<THREE.Mesh[]>([]);
  const group = useRef<THREE.Group>(null);
  const [shapes] = useState(() => [
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.TorusGeometry(0.7, 0.3, 16, 32),
    new THREE.OctahedronGeometry(1),
    new THREE.TetrahedronGeometry(1),
    new THREE.DodecahedronGeometry(1),
  ]);

  // Generate random positions
  useEffect(() => {
    if (!group.current) return;
    
    // Clear existing objects
    objects.current = [];
    
    // Create objects with random shapes, sizes, and positions
    for (let i = 0; i < count; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const mesh = new THREE.Mesh(
        shape,
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5
          ),
          roughness: 0.2,
          metalness: 0.8,
          transparent: true,
          opacity: 0.8,
        })
      );
      
      // Random position within a sphere
      const radius = 30 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
      mesh.position.z = radius * Math.cos(phi);
      
      // Random scale
      const scale = 0.5 + Math.random() * 2.5;
      mesh.scale.set(scale, scale, scale);
      
      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.z = Math.random() * Math.PI * 2;
      
      group.current.add(mesh);
      objects.current.push(mesh);
    }
  }, [count, shapes]);
  
  // Animate objects
  useFrame(({ clock }) => {
    if (!group.current || psychedelicLevel <= 0) return;
    
    const time = clock.getElapsedTime();
    const effectStrength = psychedelicLevel * 1.5; // Scale up effect with psychedelic level
    
    objects.current.forEach((mesh, i) => {
      // Move in a circular path with unique frequency
      const freq = 0.1 + (i % 5) * 0.05;
      const xRadius = 2 + (i % 3);
      const zRadius = 2 + ((i + 1) % 3);
      
      mesh.position.x += Math.sin(time * freq) * 0.05 * effectStrength;
      mesh.position.z += Math.cos(time * freq) * 0.05 * effectStrength;
      
      // Rotate over time with varied speeds
      mesh.rotation.x += 0.005 * (1 + (i % 3) * 0.5) * effectStrength;
      mesh.rotation.y += 0.01 * (1 + ((i + 1) % 3) * 0.5) * effectStrength;
      mesh.rotation.z += 0.0075 * (1 + ((i + 2) % 3) * 0.5) * effectStrength;
      
      // Pulsate size
      const scalePulse = Math.sin(time * (0.2 + (i % 5) * 0.1)) * 0.1 * effectStrength + 1;
      const baseScale = 0.5 + Math.random() * 2.5;
      mesh.scale.set(
        baseScale * scalePulse,
        baseScale * scalePulse, 
        baseScale * scalePulse
      );
      
      // Change color over time for a trippy effect
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        const hue = (time * 0.05 + i * 0.01) % 1;
        const saturation = 0.7 + Math.sin(time * 0.2 + i) * 0.3 * effectStrength;
        const lightness = 0.6 + Math.sin(time * 0.3 + i) * 0.2 * effectStrength;
        
        mesh.material.color.setHSL(hue, saturation, lightness);
        
        // Adjust material properties for added effects
        mesh.material.roughness = 0.2 + Math.sin(time * 0.4 + i) * 0.2 * effectStrength;
        mesh.material.metalness = 0.7 + Math.sin(time * 0.3 + i) * 0.3 * effectStrength;
        mesh.material.opacity = 0.3 + Math.abs(Math.sin(time * 0.1 + i * 0.5)) * 0.7 * effectStrength;
      }
    });
    
    // Rotate entire group slowly
    group.current.rotation.y += 0.001 * effectStrength;
  });
  
  return <group ref={group} />;
}

interface SceneProps {
  isPaused: boolean;
  waveIntensity: number;
  psychedelicLevel: number;
}

// Main scene component
function Scene({ isPaused, waveIntensity, psychedelicLevel }: SceneProps) {
  const { camera } = useThree();
  const [waveData, setWaveData] = useState<WaveData>({ peaks: [], troughs: [] });
  const gameState = useGameState();
  
  // Reference for player position to control camera
  const playerRef = useRef<[number, number, number]>([0, 0, 0]);
  
  // Handle pause toggle
  useEffect(() => {
    if (isPaused && gameState.score > 0) {
      // Store high score or something here if needed
    }
  }, [isPaused, gameState.score]);
  
  // Reset game when wave intensity changes dramatically
  useEffect(() => {
    gameState.resetGame();
  }, [gameState, waveIntensity]);
  
  // Handle wave data for game mechanics
  const handleWaveData = (data: WaveData) => {
    setWaveData(data);
  };
  
  return (
    <>
      {/* Better lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      
      {/* Skybox */}
      <Environment preset="sunset" />
      
      {/* Ocean with improved waves */}
      <Ocean waveIntensity={waveIntensity} onGetWaveHeight={handleWaveData} />
      
      {/* Surfboard with physics */}
      <Surfboard position={[0, 0, 0]} waveData={waveData} gameState={gameState} />
      
      {/* Trippy background objects */}
      <PsychedelicObjects count={30} psychedelicLevel={psychedelicLevel} />
      
      {/* Game UI */}
      <ScoreDisplay score={gameState.score} tricks={gameState.tricks} gameOver={gameState.gameOver} />
      
      {/* Camera control with smooth follow */}
      <CameraControl playerRef={playerRef} psychedelicLevel={psychedelicLevel} />
    </>
  );
}

// Score display component
function ScoreDisplay({ score, tricks, gameOver }: { score: number, tricks: number, gameOver: boolean }) {
  return (
    <>
      {/* Score text that follows the camera */}
      <Text
        position={[0, 3, -5]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
        outlineWidth={0.04}
        outlineColor="black"
      >
        {`SCORE: ${score.toLocaleString()}`}
      </Text>
      
      {/* Tricks counter */}
      <Text
        position={[0, 2.4, -5]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
        outlineWidth={0.04}
        outlineColor="black"
      >
        {`TRICKS: ${tricks}`}
      </Text>
      
      {/* Game over text */}
      {gameOver && (
        <Text
          position={[0, 0, -5]}
          fontSize={1}
          color="red"
          anchorX="center"
          anchorY="middle"
          renderOrder={100}
          outlineWidth={0.1}
          outlineColor="black"
        >
          GAME OVER
        </Text>
      )}
    </>
  );
}

// Camera control component
function CameraControl({ playerRef, psychedelicLevel }: { playerRef: React.RefObject<[number, number, number]>, psychedelicLevel: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    if (!playerRef.current) return;
    
    // Smooth camera follow with some wobble based on psychedelic level
    const [x, y, z] = playerRef.current;
    const wobbleX = Math.sin(Date.now() * 0.001) * 0.3 * psychedelicLevel;
    const wobbleY = Math.cos(Date.now() * 0.002) * 0.2 * psychedelicLevel;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x + 3 + wobbleX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y + 3 + wobbleY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, z + 5, 0.05);
    
    camera.lookAt(x, y, z);
  });
  
  return null;
}

interface SurfingSimulatorProps {
  isPaused: boolean;
  waveIntensity: number;
  psychedelicLevel: number;
}

// Enhanced main component with improved features
export function SurfingSimulator({ isPaused = false, waveIntensity = 0.5, psychedelicLevel = 0.7 }: SurfingSimulatorProps) {
  // Create full-screen canvas for the 3D scene
  return (
    <KeyboardControls
      map={[
        { name: Controls.left, keys: ["ArrowLeft", "a", "A"] },
        { name: Controls.right, keys: ["ArrowRight", "d", "D"] },
        { name: Controls.up, keys: ["ArrowUp", "w", "W"] },
        { name: Controls.down, keys: ["ArrowDown", "s", "S"] },
        { name: Controls.jump, keys: ["Space"] },
      ]}
    >
      <Canvas shadows gl={{ alpha: false }} camera={{ position: [0, 5, 10], fov: 60 }}>
        {isPaused ? (
          // Pause screen
          <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Text
              position={[0, 0, 0]}
              fontSize={1}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.1}
              outlineColor="black"
            >
              PAUSED
            </Text>
            <mesh position={[0, 5, -10]}>
              <sphereGeometry args={[5, 32, 32]} />
              <MeshDistortMaterial
                color="#4169E1"
                speed={0.5}
                distort={0.3}
                radius={1}
              />
            </mesh>
            <Environment preset="sunset" />
          </group>
        ) : (
          // Active game
          <Scene
            isPaused={isPaused}
            waveIntensity={waveIntensity}
            psychedelicLevel={psychedelicLevel}
          />
        )}
      </Canvas>
      
      {/* Optional helper text for more advanced tricks */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black/60 p-2 rounded-md opacity-70 transition-opacity hover:opacity-100">
        <div className="font-bold mb-1">Pro Tricks:</div>
        <div>Left+Up: Backflip</div>
        <div>Right+Up: Frontflip</div>
        <div>Left+Down: 360 Spin</div>
        <div>Right+Down: Barrel Roll</div>
        <div className="mt-1 text-xs">Get big air for special tricks!</div>
      </div>
    </KeyboardControls>
  );
}
