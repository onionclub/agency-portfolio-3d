import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Loader, SpotLight } from '@react-three/drei'
import { EffectComposer, Pixelation, Outline, Selection, GodRays } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import Campfire from './Campfire'
import Forest from './Forest'
import Basecamp from './Basecamp'
import Overlay from './Overlay'
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
        <color attach="background" args={['#101020']} />
        
        {/* FIXED FOG: Pushed back (starts at 10, ends at 45) so it doesn't eat the trees */}
        <fog attach="fog" args={['#101020', 10, 45]} />
        
        {/* Brighter Ambient so the ground isn't pitch black */}
        <ambientLight intensity={0.7} color="#cce0ff" />


        {/* --- 2. LIGHTING --- */}
        
        <pointLight position={[5, 10, 5]} intensity={1.5} color="#ffaaee" castShadow />

        {/* MOON SPOTLIGHT: Higher and Further to match the new Moon position */}
        <SpotLight
          position={[-25, 25, -25]} 
          target-position={[0, 0, 0]}
          color="#b9d5ff"   
          intensity={8}     // Bumped intensity
          distance={80}     
          angle={0.5}         
          attenuation={20}  
          anglePower={5}    
          penumbra={1}      
          castShadow
        />

        {/* --- 3. VISUAL MOON (God Ray Source) --- */}
        {/* Moved Higher and Further Back for steeper rays */}
        <mesh ref={moonRef} position={[-25, 20, -25]}>
          <sphereGeometry args={[4, 32, 32]} /> {/* Made moon slightly larger */}
          <meshBasicMaterial color="#eef4ff" transparent opacity={1} />
        </mesh>

        {/* --- 4. SCENE CONTENT --- */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[50, 32]} />
          <meshStandardMaterial color="#101018" />
        </mesh>

        <Suspense fallback={null}>
          <Selection>
            <Campfire position={[0, 0, 0]} />
            <Forest />
            
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

          {/* BUMPED UP GOD RAYS */}
          {moonRef.current && (
            <GodRays
              sun={moonRef.current}
              blendFunction={BlendFunction.SCREEN}
              samples={35}    
              density={0.96}  // Still thick, but fog isn't hiding trees now
              decay={0.93}    // Rays travel further
              weight={0.8}    // Increased weight
              exposure={0.8}  // Increased brightness (The "Bump")
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