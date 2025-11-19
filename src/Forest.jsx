import React, { useMemo } from 'react'

function Tree({ position, scale = 1 }) {
  const rotation = Math.random() * Math.PI
  return (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1, 5]} />
        <meshStandardMaterial color="#4a3c31" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[1.3, 1.5, 7]} />
        <meshStandardMaterial color="#1a3300" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[1.0, 1.5, 7]} />
        <meshStandardMaterial color="#1a3300" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[0.7, 1.5, 7]} />
        <meshStandardMaterial color="#1a3300" roughness={0.8} />
      </mesh>
    </group>
  )
}

export default function Forest() {
  const trees = useMemo(() => {
    const items = []
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2
      // TWEAKED: Closer radius (10 to 18 units away)
      const radius = 7 + Math.random() * 8 
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const scale = 0.8 + Math.random() * 0.8
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