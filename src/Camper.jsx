import React from 'react'

export default function Camper({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* --- MAIN BODY --- */}
      {/* Bottom Half (White/Cream) */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color="#f0f0e0" roughness={0.5} />
      </mesh>
      {/* Top Half (White/Cream) */}
      <mesh position={[0.2, 2.2, 0]}>
        <boxGeometry args={[3.6, 1, 1.9]} />
        <meshStandardMaterial color="#f0f0e0" roughness={0.5} />
      </mesh>

      {/* --- STRIPE (Retro Orange) --- */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[4.05, 0.2, 2.05]} />
        <meshStandardMaterial color="#ff8800" />
      </mesh>

      {/* --- WINDOWS (Dark Blue) --- */}
      {/* Side Window */}
      <mesh position={[0.5, 2.2, 0.96]}>
        <boxGeometry args={[2, 0.6, 0.1]} />
        <meshStandardMaterial color="#223344" />
      </mesh>
      {/* Windshield */}
      <mesh position={[-1.6, 2.2, 0]}>
        <boxGeometry args={[0.1, 0.7, 1.8]} />
        <meshStandardMaterial color="#223344" />
      </mesh>

      {/* --- WHEELS --- */}
      <mesh position={[-1.2, 0.4, 1]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.2, 0.4, 1]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
       <mesh position={[-1.2, 0.4, -1]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.2, 0.4, -1]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* --- AC UNIT ON ROOF --- */}
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[1, 0.3, 1]} />
        <meshStandardMaterial color="#ddd" />
      </mesh>
    </group>
  )
}