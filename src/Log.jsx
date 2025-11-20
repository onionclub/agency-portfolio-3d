import React from 'react'

export default function Log(props) {
  return (
    <group {...props}>
      {/* --- MAIN LOG BODY --- */}
      {/* Rotated 90 degrees to lay flat. args: [radiusTop, radiusBottom, height, segments] */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 2.5, 7]} /> 
        <meshStandardMaterial color="#4a3c31" roughness={1} />
      </mesh>

      {/* --- END CAPS (Lighter wood color to look like cut timber) --- */}
      {/* Left Cap */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[-1.26, 0.35, 0]}>
        <circleGeometry args={[0.3, 7]} />
        <meshStandardMaterial color="#8c6b4a" roughness={1} />
      </mesh>
      {/* Right Cap */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[1.26, 0.35, 0]}>
        <circleGeometry args={[0.3, 7]} />
        <meshStandardMaterial color="#8c6b4a" roughness={1} />
      </mesh>

      {/* --- BRANCH KNOT (Detail) --- */}
      <mesh position={[0.6, 0.6, 0.15]} rotation={[0.5, 0.2, -0.2]}>
        <cylinderGeometry args={[0.08, 0.12, 0.4, 5]} />
        <meshStandardMaterial color="#4a3c31" roughness={1} />
      </mesh>
      
      {/* --- MOSS PATCH (Optional Detail) --- */}
      <mesh position={[-0.5, 0.65, 0]} rotation={[0, 0, 0.2]}>
        <dodecahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#2d4c1e" roughness={1} />
      </mesh>
    </group>
  )
}