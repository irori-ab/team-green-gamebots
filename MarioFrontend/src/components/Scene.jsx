import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function Scene() {
  const lightsRef = useRef()

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

      {/* Background blocks - smaller size */}
      {[-3, -1, 1, 3].map((x) => (
        <mesh key={x} position={[x, 0.5, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} /> {/* Reduced from 1 to 0.5 */}
          <meshStandardMaterial color="#E4A672" /> {/* Question block color */}
        </mesh>
      ))}

      {/* Decorative pipes */}
      <group position={[-4, 0, 0]}>
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1.5]} />
          <meshStandardMaterial color="#2E8B57" />
        </mesh>
      </group>
      <group position={[4, 0, 0]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 2]} />
          <meshStandardMaterial color="#2E8B57" />
        </mesh>
      </group>
    </>
  )
} 