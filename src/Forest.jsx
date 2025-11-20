import React, { useMemo } from 'react'

function Tree({ position, scale = 1 }) {
  const rotation = Math.random() * Math.PI
  
  // We want them Tall but not super Fat.
  // So we multiply height (Y) by more than width (X, Z)
  const width = scale * 0.7
  const height = scale * 1.3

  return (
    <group position={position} scale={[width, height, width]} rotation={[0, rotation, 0]}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1, 5]} />
        <meshStandardMaterial color="#4a3c31" roughness={0.9} />
      </mesh>

      {/* Bottom Branch Layer */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[1.3, 1.5, 7]} /> 
        <meshStandardMaterial color="#152e18" roughness={0.9} /> {/* Darker Green for silhouette */}
      </mesh>

      {/* Middle Branch Layer */}
      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[1.0, 1.5, 7]} />
        <meshStandardMaterial color="#152e18" roughness={0.9} />
      </mesh>

      {/* Top Branch Layer */}
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[0.7, 1.5, 7]} />
        <meshStandardMaterial color="#152e18" roughness={0.9} />
      </mesh>
    </group>
  )
}

export default function Forest() {
  const trees = useMemo(() => {
    const items = []
    // INCREASED COUNT: 20 -> 35 trees
    for (let i = 0; i < 35; i++) {
      const angle = (i / 35) * Math.PI * 2
      
      // RADIUS: Slightly wider spread (12-22) to fit the giant trees
      const radius = 12 + Math.random() * 10 
      
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      
      // INCREASED SCALE: Random height between 2.5x and 5.0x
      const scale = 2.5 + Math.random() * 2.5 
      
      items.push({ position: [x, 0, z], scale })
    }
    return items
  }, [])

  return (
    <group>
      {trees.map((tree, index) => (
        <Tree key={index} position={tree.position} scale={tree.scale} />
      ))}
    </group>
  )
}