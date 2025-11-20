import React from 'react'

export default function Camper(props) {
  return (
    // We spread {...props} here so position, rotation, AND scale will work now
    <group {...props}>
      
      {/* --- MAIN BODY (Scaled up 3x) --- */}
      
      {/* Chassis (Bottom Cream) */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[12, 4, 5.5]} />
        <meshStandardMaterial color="#f0f0e0" roughness={0.5} />
      </mesh>

      {/* Cabin (Top Cream - Offset) */}
      <mesh position={[1, 5.5, 0]}>
        <boxGeometry args={[10, 2.5, 5.3]} />
        <meshStandardMaterial color="#f0f0e0" roughness={0.5} />
      </mesh>

      {/* --- THE STRIPE (Thick Orange) --- */}
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[12.1, 0.6, 5.6]} />
        <meshStandardMaterial color="#ff8800" />
      </mesh>

      {/* --- WINDOWS --- */}
      
      {/* Big Side Window */}
      <mesh position={[2, 5.5, 2.7]}>
        <boxGeometry args={[5, 1.2, 0.1]} />
        <meshStandardMaterial color="#223344" roughness={0.2} />
      </mesh>
      
      {/* Front Windshield */}
      <mesh position={[-6.1, 5.0, 0]}>
        <boxGeometry args={[0.1, 1.8, 5.0]} />
        <meshStandardMaterial color="#223344" roughness={0.2} />
      </mesh>

      {/* --- WHEELS (Big Chunky Tires) --- */}
      {/* Front Left */}
      <mesh position={[-4, 1, 2.5]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 1.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Back Left */}
      <mesh position={[4, 1, 2.5]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 1.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Front Right */}
      <mesh position={[-4, 1, -2.5]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 1.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Back Right */}
      <mesh position={[4, 1, -2.5]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 1.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* --- AC UNIT (Roof Detail) --- */}
      <mesh position={[0, 7, 0]}>
        <boxGeometry args={[2.5, 0.8, 2.5]} />
        <meshStandardMaterial color="#ccc" />
      </mesh>
      
      {/* --- BUMPER --- */}
      <mesh position={[-6.2, 1.5, 0]}>
        <boxGeometry args={[0.5, 0.8, 5.8]} />
        <meshStandardMaterial color="#999" metalness={0.6} />
      </mesh>

    </group>
  )
}