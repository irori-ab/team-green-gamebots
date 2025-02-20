import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export default function MarioSprite() {
  const groupRef = useRef()
  const [direction, setDirection] = useState(1)
  const [position, setPosition] = useState([-2, 0, 0])
  const [isJumping, setIsJumping] = useState(false)
  const [jumpVelocity, setJumpVelocity] = useState(0)
  const [legRotation, setLegRotation] = useState(0)
  const [armRotation, setArmRotation] = useState(0)
  const [targetRotation, setTargetRotation] = useState(Math.PI/2)
  const currentRotation = useRef(Math.PI/2)

  // Adjusted physics constants for smoother movement
  const JUMP_FORCE = 0.18
  const GRAVITY = -0.01
  const GROUND_HEIGHT = 0
  const MOVEMENT_SPEED = 3

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.code === 'KeyW') && !isJumping) {
        setIsJumping(true)
        setJumpVelocity(JUMP_FORCE)
      }
      if (e.code === 'KeyL') {
        setDirection(0); // Stop horizontal movement
        setTargetRotation(0); // Rotate to face the viewer
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isJumping])

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let newX = position[0];
    let newY = position[1];
    let newVelocity = jumpVelocity;

    // Update horizontal position
    newX += delta * direction * MOVEMENT_SPEED;

    // Change direction at boundaries
    if (newX > 2) {
      setDirection(-1);
      setTargetRotation(-Math.PI/2);
      newX = 2;
    }
    if (newX < -2) {
      setDirection(1);
      setTargetRotation(Math.PI/2);
      newX = -2;
    }

    // Smooth rotation
    currentRotation.current += (targetRotation - currentRotation.current) * delta * 10;
    groupRef.current.rotation.y = currentRotation.current;

    // Update vertical position and velocity
    if (isJumping || position[1] > GROUND_HEIGHT) {
      newY += jumpVelocity;
      newVelocity += GRAVITY;

      // Ground collision
      if (newY <= GROUND_HEIGHT) {
        newY = GROUND_HEIGHT;
        newVelocity = 0;
        setIsJumping(false);
      }
    }

    // Update position
    setPosition([newX, newY, position[2]]);
    setJumpVelocity(newVelocity);

    // Animate legs and arms
    if (!isJumping) {
      setLegRotation(Math.sin(state.clock.elapsedTime * 10) * 0.4)
      setArmRotation(Math.sin(state.clock.elapsedTime * 10) * 0.5)
    } else {
      setLegRotation(-0.2)
      setArmRotation(-0.5)
    }
    
    // Update position
    groupRef.current.position.set(newX, newY, position[2])
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Body - Mario's overalls */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial color="#0000FF" /> {/* Blue overalls */}
      </mesh>

      {/* Shirt */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.45, 0.2, 0.45]} />
        <meshStandardMaterial color="#FF0000" /> {/* Red shirt */}
      </mesh>

      {/* Head */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#FFA07A" /> {/* Skin tone */}
      </mesh>

      {/* Eyes */}
      <mesh position={[0.08, 1.05, 0.18]}>
        <boxGeometry args={[0.07, 0.07, 0.01]} />
        <meshStandardMaterial color="#000000" /> {/* Black eyes */}
      </mesh>
      <mesh position={[-0.08, 1.05, 0.18]}>
        <boxGeometry args={[0.07, 0.07, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* White part of eyes */}
      <mesh position={[0.08, 1.05, 0.175]}>
        <boxGeometry args={[0.15, 0.08, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.08, 1.05, 0.175]}>
        <boxGeometry args={[0.15, 0.08, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Cap */}
      <group position={[0, 1.2, 0]}>
        {/* Main cap */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.12, 0.4]} />
          <meshStandardMaterial color="#FF0000" /> {/* Red cap */}
        </mesh>
        {/* Cap brim */}
        <mesh position={[0, -0.02, 0.15]}>
          <boxGeometry args={[0.35, 0.08, 0.15]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
      </group>

      {/* Mustache - center part */}
      <mesh position={[0, 0.92, 0.2]}>
        <boxGeometry args={[0.25, 0.06, 0.05]} />
        <meshStandardMaterial color="#4B371C" />
      </mesh>

      {/* Mustache - left side */}
      <mesh position={[-0.15, 0.9, 0.18]}>
        <boxGeometry args={[0.1, 0.06, 0.05]} />
        <meshStandardMaterial color="#4B371C" />
      </mesh>

      {/* Mustache - right side */}
      <mesh position={[0.15, 0.9, 0.18]}>
        <boxGeometry args={[0.1, 0.06, 0.05]} />
        <meshStandardMaterial color="#4B371C" />
      </mesh>

      {/* Arms with rotation */}
      <group position={[0.25, 0.76, 0]} rotation={[0, 2, -armRotation]}>
        <mesh position={[0, -0.11, 0]}>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshStandardMaterial color="#FF0000" /> {/* Red sleeves */}
        </mesh>
        <mesh position={[0, -0.31, 0]}>
          <boxGeometry args={[0.12, 0.1, 0.12]} />
          <meshStandardMaterial color="#FFA07A" /> {/* Hands */}
        </mesh>
      </group>
      <group position={[-0.25, 0.76, 0]} rotation={[0, 2, armRotation]}>
        <mesh position={[0, -0.11, 0]}>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
        <mesh position={[0, -0.31, 0]}>
          <boxGeometry args={[0.12, 0.1, 0.12]} />
          <meshStandardMaterial color="#FFA07A" />
        </mesh>
      </group>

      {/* Legs with forward/backward rotation */}
      <group position={[0.1, 0.3, 0]}>
        <group rotation={[legRotation, 0, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[0.15, 0.3, 0.15]} />
            <meshStandardMaterial color="#0000FF" />
          </mesh>
          {/* Shoes */}
          <mesh position={[0, -0.3, 0.05]}>
            <boxGeometry args={[0.18, 0.1, 0.25]} />
            <meshStandardMaterial color="#4B371C" /> 
          </mesh>
        </group>
      </group>
      <group position={[-0.1, 0.3, 0]}>
        <group rotation={[-legRotation, 0, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[0.15, 0.3, 0.15]} />
            <meshStandardMaterial color="#0000FF" />
          </mesh>
          <mesh position={[0, -0.3, 0.05]}>
            <boxGeometry args={[0.18, 0.1, 0.25]} />
            <meshStandardMaterial color="#4B371C" />
          </mesh>
        </group>
      </group>

      {/* Overall buttons */}
      <mesh position={[0.1, 0.6, 0.21]}>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <meshStandardMaterial color="#FFD700" /> {/* Gold buttons */}
      </mesh>
      <mesh position={[-0.1, 0.6, 0.21]}>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  )
} 