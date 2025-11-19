import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export default function ServiceItem({ position, label, onClick, children }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Gentle Bobbing Animation (Sine Wave)
    // We move the internal meshRef so the groupRef stays anchored at the prop position
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time * 2 + position[0]) * 0.1;
      
      // 2. Rotation
      // Spin faster if hovered
      meshRef.current.rotation.y += delta * (hovered ? 2.5 : 0.5);
      
      // 3. Scale on Hover (Lerping for smoothness)
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onClick={onClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Wrapper for animation */}
      <group ref={meshRef}>
        {children}
      </group>

      {/* Retro Tooltip Label */}
      {hovered && (
        <Html position={[0, 1.5, 0]} center>
          <div style={{
            background: 'black',
            border: '2px solid white',
            color: 'white',
            padding: '8px 12px',
            fontFamily: "'Courier New', monospace", // Pixel-art style font fallback
            fontSize: '14px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            pointerEvents: 'none', // Let clicks pass through to the 3D object
            userSelect: 'none',
            boxShadow: '4px 4px 0px #000000aa' // Retro shadow
          }}>
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}