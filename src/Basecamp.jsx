import React, { useEffect, useState } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { Select } from '@react-three/postprocessing' // <--- Import this!

// --- 1. THE GUIDE (With Outline Logic) ---
function Guide({ file, position, rotation, label, onClick, showLabel }) {
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
      {/* WRAP THE PRIMITIVE IN <Select> */}
      <Select enabled={hovered}>
        <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
      </Select>
      
      {showLabel && (
        <Html position={[0, 2.2, 0]} center>
          <div className="glass-label">{label}</div>
        </Html>
      )}
    </group>
  )
}

// --- 2. THE PROPS (Backpack, Compass, Radio) ---

function Backpack({ position, rotation, onClick, showLabel }) {
  const [hovered, setHovered] = useState(false)
  return (
    <group 
      position={position} 
      rotation={rotation} 
      scale={hovered ? 1.2 : 1}
      onClick={onClick}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true) }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false) }}
    >
      {/* Optional: Add <Select enabled={hovered}> here too if you want props outlined! */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 1, 0.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 0.3, 0.3]}>
        <boxGeometry args={[0.5, 0.4, 0.2]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.5, 3]} rotation={[0,0,1.57]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {showLabel && (
        <Html position={[0, 1.5, 0]} center>
          <div className="glass-label">The Kit (Services)</div>
        </Html>
      )}
    </group>
  )
}

function Compass({ position, rotation, onClick, showLabel }) {
  const [hovered, setHovered] = useState(false)
  return (
    <group 
      position={position} 
      rotation={rotation} 
      scale={hovered ? 1.2 : 1}
      onClick={onClick}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true) }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false) }}
    >
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.02, 0.4]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {showLabel && (
        <Html position={[0, 1, 0]} center>
          <div className="glass-label">The Route (Strategy)</div>
        </Html>
      )}
    </group>
  )
}

function Radio({ position, rotation, onClick, showLabel }) {
  const [hovered, setHovered] = useState(false)
  return (
    <group 
      position={position} 
      rotation={rotation} 
      scale={hovered ? 1.2 : 1}
      onClick={onClick}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true) }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false) }}
    >
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.3]} />
        <meshStandardMaterial color="#CC3333" />
      </mesh>
      <mesh position={[0.2, 0.4, 0.16]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[-0.3, 0.8, -0.1]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="silver" />
      </mesh>

      {showLabel && (
        <Html position={[0, 1.2, 0]} center>
          <div className="glass-label">Signal (Contact)</div>
        </Html>
      )}
    </group>
  )
}

// --- MAIN COMPONENT ---
export default function Basecamp({ onSectionSelect, isModalOpen }) {
  const showLabels = !isModalOpen 

  return (
    <group>
      <Guide 
        file="Guide.glb" 
        position={[-2, 0, -1]} 
        rotation={[0, 1.5, 0]} 
        label="The Guide"
        onClick={() => onSectionSelect('guide')}
        showLabel={showLabels}
      />

      <Backpack 
        position={[-1.5, 0, 2]} 
        rotation={[0, 0.5, 0]} 
        onClick={() => onSectionSelect('services')}
        showLabel={showLabels}
      />

      <Compass 
        position={[2, 0, 0]} 
        rotation={[0, 0, 0]} 
        onClick={() => onSectionSelect('strategy')}
        showLabel={showLabels}
      />

      <Radio 
        position={[1, 0, 2.5]} 
        rotation={[0, -0.5, 0]} 
        onClick={() => onSectionSelect('contact')}
        showLabel={showLabels}
      />
    </group>
  )
}