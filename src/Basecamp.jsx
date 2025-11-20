import React, { useEffect, useState } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import * as THREE from 'three' // <--- Make sure to add this!

// ... (Keep your Guide component exactly as it is) ...
function Guide({ file, position, rotation, label, onClick }) {
  const { scene, animations } = useGLTF(`/${file}`)
  const { actions, names } = useAnimations(animations, scene)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (names.length > 0) {
      let animName = names.find(n => n.toLowerCase().includes('idle')) || 
                     names.find(n => n.toLowerCase().includes('stand')) || 
                     names[0]
      if (actions[animName]) actions[animName].reset().fadeIn(0.5).play()
    }
  }, [actions, names])

  return (
    <group 
      position={position} 
      rotation={rotation}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true) }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false) }}
      onClick={onClick}
    >
      <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
      <Html position={[0, 2.2, 0]} center>
        <div className="glass-label">{label}</div>
      </Html>
    </group>
  )
}

// --- THE DEBUG PROP ---
function Prop({ file, position, rotation, scale = 1, label, onClick }) {
  const { scene } = useGLTF(`/${file}`)
  const [hovered, setHovered] = useState(false)

  // FORCE OVERRIDE: Make it Pink and Visible
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Paint it bright pink so we can't miss it
        child.material = new THREE.MeshBasicMaterial({ color: 'hotpink', wireframe: true })
      }
    })
  }, [scene])

  return (
    <group 
      position={position} 
      rotation={rotation}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true) }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false) }}
      onClick={onClick}
    >
      {/* EXPERIMENTAL SCALE: Multiply by 50 just to check if it was microscopic */}
      <primitive 
        object={scene} 
        scale={hovered ? (scale * 50) * 1.2 : (scale * 50)} 
      />
      
      <Html position={[0, 1.5, 0]} center>
        <div className="glass-label">{label}</div>
      </Html>
    </group>
  )
}

export default function Basecamp() {
  return (
    <group>
      {/* Guide */}
      <Guide 
        file="Guide.glb" 
        position={[-2, 0, -1]} 
        rotation={[0, 1.5, 0]} 
        label="The Guide"
        onClick={() => alert("About Us")}
      />

      {/* PROPS - Note: I am passing scale={1} but the component multiplies it by 50 */}
      
      {/* Compass */}
      <Prop 
        file="Compass.glb"   
        position={[2, 0.5, 0]} 
        rotation={[0, 0, 0]} 
        scale={1} 
        label="Strategy"
        onClick={() => alert("Strategy")}
      />

      {/* Backpack */}
      <Prop 
        file="Backpack.glb" 
        position={[-1.5, 0, 2]} 
        rotation={[0, 2, 0]} 
        scale={1}
        label="Services"
        onClick={() => alert("Services")}
      />

      {/* Radio */}
      <Prop 
        file="Radio.glb" 
        position={[1, 0, 2.5]} 
        rotation={[0, -0.5, 0]} 
        scale={1}
        label="Contact"
        onClick={() => alert("Contact")}
      />
    </group>
  )
}