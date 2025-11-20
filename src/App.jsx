import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import { EffectComposer, Pixelation, Outline, Selection, GodRays } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import Campfire from './Campfire'
import Forest from './Forest'
import Basecamp from './Basecamp'
import Overlay from './Overlay'
import Camper from './Camper'
import Debris from './Debris'
import Log from './Log' // <--- IMPORT THE LOG
import { contentData } from './data'

export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const moonRef = useRef()

  const handleSectionSelect = (key) => {
    setActiveSection(contentData[key])
  }

  return (
    <>
      <Canvas shadows camera={{ position: [8, 5, 8] }}>
        
        {/* --- 1. ATMOSPHERE --- */}
        <color attach="background" args={['#121220']} />
        <fog attach="fog" args={['#121220', 5, 30]} />
        <ambientLight intensity={1.0} color="#cce0ff" />

        {/* --- 2. LIGHTING --- */}
        <pointLight position={[5, 10, 5]} intensity={1.5} color="#ffaaee" castShadow />

        {/* --- 3. VISUAL MOON --- */}
        <mesh ref={moonRef} position={[-20, 18, -20]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={1} />
        </mesh>

        {/* --- 4. SCENE CONTENT --- */}
        
        {/* Main Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[50, 32]} />
          <meshStandardMaterial color="#080810" />
        </mesh>

        {/* DIRT PATCH */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <circleGeometry args={[9, 32]} />
          <meshStandardMaterial color="#3b2d24" roughness={1} /> 
        </mesh>

        <Suspense fallback={null}>
          <Selection>
            <Campfire position={[0, 0, 0]} />
            <Forest />
            <Debris /> 
            
            {/* CAMPER */}
            <Camper 
              position={[-8, 0, -5]} 
              rotation={[0, 1.0, 0]} 
              scale={0.8} 
            />

            {/* NEW LOG SEATING */}
            {/* Placed to the right, angled towards the fire */}
            <Log 
              position={[-0.5, 0, -3.2]} 
              rotation={[0.2, 0.15, 0.03]} 
              scale={1.5}
            />
            
            <Basecamp 
              onSectionSelect={handleSectionSelect} 
              isModalOpen={!!activeSection} 
            />
          </Selection>
        </Suspense>

        <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2 - 0.1} />

        {/* --- 5. POST PROCESSING --- */}
        <EffectComposer>
          <Selection>
            <Outline visibleEdgeColor="white" hiddenEdgeColor="white" blur edgeStrength={10} />
          </Selection>

          {/* GOD RAYS */}
          {moonRef.current && (
            <GodRays
              sun={moonRef.current}
              blendFunction={BlendFunction.SCREEN}
              samples={35}    
              density={0.96}  
              decay={0.94}    
              weight={0.15}   
              exposure={0.1}  
              clampMax={1}
              kernelSize={KernelSize.SMALL}
              blur={true}
            />
          )}

          <Pixelation granularity={5} />
        </EffectComposer>

      </Canvas>

      <Overlay 
        activeSection={activeSection} 
        onClose={() => setActiveSection(null)} 
      />
      
      <Loader />
    </>
  )
}