import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'

export default function Campfire(props) {
  const groupRef = useRef()
  const lightRef = useRef()
  
  // Refs for the flame parts to animate them
  const flame1 = useRef()
  const flame2 = useRef()
  const flame3 = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // 1. Flicker the light intensity (Warm throb)
    if (lightRef.current) {
      lightRef.current.intensity = 3 + Math.sin(time * 10) * 0.5 + Math.random() 
    }

    // 2. Animate the flames (Scale up and down slightly to look like burning)
    if (flame1.current) {
      flame1.current.scale.y = 1 + Math.sin(time * 5) * 0.2
      flame1.current.rotation.y += 0.02
    }
    if (flame2.current) {
      flame2.current.scale.y = 0.8 + Math.sin(time * 7 + 100) * 0.2
    }
    if (flame3.current) {
      flame3.current.scale.y = 0.8 + Math.sin(time * 6 + 200) * 0.2
    }
  })

  return (
    <group ref={groupRef} {...props}>
      
      {/* --- LIGHTING --- */}
      {/* Added castShadow so the trees in the forest cast spooky shadows */}
      <pointLight 
        ref={lightRef}
        position={[0, 1.5, 0]} 
        color="#ffaa00" 
        distance={10} 
        decay={2}
        castShadow
        shadow-bias={-0.0005} // Helps prevent shadow artifacts on the logs
      />

      {/* --- THE LOGS --- */}
      <group position={[0, 0.2, 0]}>
        {/* Log 1 */}
        <mesh rotation={[0, 0, 1.4]} position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 2.2, 5]} />
          <meshStandardMaterial 
            color="#8B5A2B" 
            roughness={0.9} 
            emissive="#eb5a13" // Added glow to simulate heat
            emissiveIntensity={0.2} 
          /> 
        </mesh>
        {/* Log 2 */}
        <mesh rotation={[0, 2.1, 1.4]} position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 2.2, 5]} />
          <meshStandardMaterial 
            color="#8B5A2B" 
            roughness={0.9}
            emissive="#eb5a13"
            emissiveIntensity={0.2} 
          />
        </mesh>
        {/* Log 3 */}
        <mesh rotation={[0, -2.1, 1.4]} position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 2.2, 5]} />
          <meshStandardMaterial 
            color="#8B5A2B" 
            roughness={0.9}
            emissive="#eb5a13"
            emissiveIntensity={0.2} 
          />
        </mesh>
      </group>

      {/* --- THE LOW POLY FLAMES --- */}
      <group position={[0, 0.5, 0]}>
        {/* Main Flame (Orange) */}
        <mesh ref={flame1} position={[0, 0.5, 0]}>
          <coneGeometry args={[0.4, 1.5, 4]} /> 
          <meshStandardMaterial color="#ff5500" emissive="#ff2200" emissiveIntensity={0.5} flatShading />
        </mesh>
        
        {/* Side Flame (Yellow) */}
        <mesh ref={flame2} position={[0.3, 0.3, 0.3]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[0.25, 1.2, 4]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.5} flatShading />
        </mesh>

        {/* Side Flame (Red-Orange) */}
        <mesh ref={flame3} position={[-0.3, 0.3, -0.2]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.25, 1.2, 4]} />
          <meshStandardMaterial color="#ff8800" emissive="#ff4400" emissiveIntensity={0.5} flatShading />
        </mesh>
      </group>

      {/* --- SIMPLE SPARKS --- */}
      {/* Increased count slightly for more life */}
      <Sparkles 
        count={30} 
        scale={[1.5, 3, 1.5]} 
        size={6} 
        speed={0.4} 
        opacity={0.8} 
        color="#ffff00"
        position={[0, 1.5, 0]}
      />

    </group>
  )
}