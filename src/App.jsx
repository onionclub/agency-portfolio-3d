import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Pixelation } from '@react-three/postprocessing';
import Campfire from './Campfire';
import Forest from './Forest';
import ServiceItem from './ServiceItem';

export default function App() {
  // Data definition for the services
  const services = useMemo(() => {
    const radius = 4;
    const items = [
      { label: 'Social Media', color: '#ff0055', type: 'box', angle: 0 },
      { label: 'Content',      color: '#0099ff', type: 'icosahedron', angle: 72 },
      { label: 'Strategy',     color: '#ffaa00', type: 'cone', angle: 144 },
      { label: 'Community',    color: '#00ff88', type: 'dodecahedron', angle: 216 },
      { label: 'Reporting',    color: '#aa00ff', type: 'torus', angle: 288 },
    ];

    return items.map((item) => {
      const rad = (item.angle * Math.PI) / 180;
      return {
        ...item,
        // Calculate position around the circle
        pos: [Math.sin(rad) * radius, 1, Math.cos(rad) * radius]
      };
    });
  }, []);

  return (
    <Canvas shadows camera={{ position: [8, 5, 8] }}>
      {/* --- ENVIRONMENT --- */}
      <color attach="background" args={['#101020']} />
      <fog attach="fog" args={['#101020', 5, 25]} />
      
      {/* Lights */}
      <ambientLight intensity={0.2} />
      
      {/* The Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[30, 32]} />
        <meshStandardMaterial color="#0b100b" />
      </mesh>

      {/* --- SCENE OBJECTS --- */}
      <Campfire position={[0, 0, 0]} />
      <Forest />

      {/* --- INTERACTIVE SERVICES --- */}
      {services.map((item, index) => (
        <ServiceItem 
          key={index} 
          position={item.pos} 
          label={item.label}
          color={item.color}
          onClick={() => console.log(`Clicked ${item.label}`)}
        >
          {/* Render the specific shape based on type */}
          <mesh castShadow receiveShadow>
            {item.type === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
            {item.type === 'icosahedron' && <icosahedronGeometry args={[0.6, 0]} />}
            {item.type === 'cone' && <coneGeometry args={[0.4, 1, 16]} />}
            {item.type === 'dodecahedron' && <dodecahedronGeometry args={[0.6, 0]} />}
            {item.type === 'torus' && <torusGeometry args={[0.4, 0.15, 16, 32]} />}
            
            {/* Material with Emissive Glow for Visibility at Night */}
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.color}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        </ServiceItem>
      ))}

      {/* --- CONTROLS & EFFECTS --- */}
      <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2 - 0.1} />
      <EffectComposer>
        <Pixelation granularity={5} />
      </EffectComposer>
    </Canvas>
  );
}