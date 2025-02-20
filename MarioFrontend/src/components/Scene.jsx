import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function Scene() {
  const lightsRef = useRef()
  const boxRef = useRef()

  useFrame((state, delta) => {
    if (lightsRef.current) {
      lightsRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={lightsRef}>
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#E60012" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C7C7C" />
      </group>
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#90EE90" /> {/* Light green for grass */}
      </mesh>
    </> 
  )
} 