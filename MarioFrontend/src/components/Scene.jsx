import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

// Helper function to check collision between Mario and pipe
const checkPipeCollision = (marioPosition, pipePosition) => {
  const distanceX = Math.abs(marioPosition[0] - pipePosition[0]);
  const distanceZ = Math.abs(marioPosition[2] - pipePosition[2]);
  return distanceX < 0.5 && distanceZ < 0.5 && marioPosition[1] < 0.2;
};

export default function Scene({ marioPosition, onPipeEnter }) {
  const lightsRef = useRef()
  const obstacleRef1 = useRef()
  const obstacleRef2 = useRef()
  const pipeRef = useRef()

  useFrame((state, delta) => {
    if (lightsRef.current) {
      lightsRef.current.rotation.y += delta * 0.2
    }
    
    // Check if Mario is entering the pipe
    if (pipeRef.current && marioPosition) {
      const pipePosition = [pipeRef.current.position.x, pipeRef.current.position.y, pipeRef.current.position.z];
      if (checkPipeCollision(marioPosition, pipePosition)) {
        onPipeEnter();
      }
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
      
      {/* Pipe */}
      <group ref={pipeRef} position={[3, 0, -3]}>
        {/* Pipe body */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
          <meshStandardMaterial color="#00AA00" /> {/* Green pipe */}
        </mesh>
        {/* Pipe rim */}
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 16]} />
          <meshStandardMaterial color="#008800" /> {/* Darker green rim */}
        </mesh>
      </group>
    </> 
  )
} 