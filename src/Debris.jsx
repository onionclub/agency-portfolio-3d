import React, { useMemo } from 'react'

function Rock({ position, scale }) {
  return (
    <mesh position={position} scale={scale} rotation={[Math.random(), Math.random(), Math.random()]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#666677" flatShading roughness={0.8} />
    </mesh>
  )
}

function GrassTuft({ position, scale }) {
  return (
    <group position={position} scale={scale} rotation={[0, Math.random() * Math.PI, 0]}>
      {/* Blade 1 (Wider & Lighter for visibility) */}
      <mesh position={[0, 0.3, 0]} rotation={[0.1, 0, 0]}>
        <coneGeometry args={[0.15, 0.8, 4]} /> {/* Wider base (0.15) */}
        <meshStandardMaterial color="#4a7a35" roughness={1} />
      </mesh>
      {/* Blade 2 */}
      <mesh position={[0.15, 0.2, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.12, 0.6, 4]} />
        <meshStandardMaterial color="#3d662a" roughness={1} />
      </mesh>
      {/* Blade 3 */}
      <mesh position={[-0.15, 0.25, 0.1]} rotation={[0, 0, 0.2]}>
        <coneGeometry args={[0.12, 0.7, 4]} />
        <meshStandardMaterial color="#4a7a35" roughness={1} />
      </mesh>
    </group>
  )
}

export default function Debris() {
  const items = useMemo(() => {
    const generated = []
    // INCREASED COUNT: 80 items for lushness
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2
      // Spread them further out (radius 4 to 18)
      const radius = 4 + Math.random() * 14 
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      
      // 50/50 split between rocks and grass
      const type = Math.random() > 0.5 ? 'rock' : 'grass' 
      const scale = Math.random() * 0.5 + 0.4
      
      generated.push({ position: [x, 0, z], type, scale })
    }
    return generated
  }, [])

  return (
    <group>
      {items.map((item, i) => (
        item.type === 'rock' 
          ? <Rock key={i} position={item.position} scale={item.scale * 0.6} />
          : <GrassTuft key={i} position={item.position} scale={item.scale} />
      ))}
    </group>
  )
}