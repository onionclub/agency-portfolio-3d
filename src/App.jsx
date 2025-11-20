import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import { EffectComposer, Pixelation } from '@react-three/postprocessing'
import Campfire from './Campfire'
import Forest from './Forest'
import Basecamp from './Basecamp' // <--- Importing your new component

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [8, 5, 8] }}>
        
        {/* 1. LIGHTING & ATMOSPHERE (Pastel Twilight) */}
        <color attach="background" args={['#2a2438']} />
        <fog attach="fog" args={['#2a2438', 8, 25]} />
        <ambientLight intensity={0.7} color="#dcd6f7" />
        <pointLight 
          position={[5, 10, 5]} 
          intensity={1.5} 
          color="#ffaaee" 
          castShadow 
        />

        {/* 2. THE GROUND */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[30, 32]} />
          <meshStandardMaterial color="#151020" />
        </mesh>

        {/* 3. THE SCENE CONTENT */}
        <Suspense fallback={null}>
          <Campfire position={[0, 0, 0]} />
          <Forest />
          
          {/* This loads your Guide, Compass, Backpack, Radio */}
          <Basecamp />
        </Suspense>

        {/* 4. CONTROLS & EFFECTS */}
        <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2 - 0.1} />
        <EffectComposer>
          <Pixelation granularity={5} />
        </EffectComposer>
      </Canvas>
      
      <Loader />
    </>
  )
}