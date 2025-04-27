import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export default function MarioSprite({ onPositionChange }) {
  const groupRef = useRef()
  const [direction, setDirection] = useState(0)
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
      if (e.code === 'ArrowRight') {
        setDirection(1)
        setTargetRotation(Math.PI / 2)
      }
      if (e.code === 'ArrowLeft') {
        setDirection(-1)
        setTargetRotation(-Math.PI / 2)
      }
      if (e.code === 'ArrowUp') {
        setDirection(2)
        setTargetRotation(Math.PI)
      }
      if (e.code === 'ArrowDown') {
        setDirection(-2)
        setTargetRotation(0)
      }
    }

    const handleKeyUp = (e) => {
      if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        setDirection(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isJumping])

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let newX = position[0];
    let newY = position[1];
    let newZ = position[2];
    let newVelocity = jumpVelocity;

    // Update position based on direction
    if (direction === 1) newX += delta * MOVEMENT_SPEED;
    if (direction === -1) newX -= delta * MOVEMENT_SPEED;
    if (direction === 2) newZ -= delta * MOVEMENT_SPEED;
    if (direction === -2) newZ += delta * MOVEMENT_SPEED;

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
    setPosition([newX, newY, newZ]);
    setJumpVelocity(newVelocity);
    
    // Send position to parent for collision detection
    if (onPositionChange) {
      onPositionChange([newX, newY, newZ]);
    }

    // Animate legs and arms only when moving
    if (!isJumping && direction !== 0) {
      setLegRotation(Math.sin(state.clock.elapsedTime * 10) * 0.4);
      setArmRotation(Math.sin(state.clock.elapsedTime * 10) * 0.5);
    } else {
      setLegRotation(0);
      setArmRotation(0);
    }

    // Update position
    groupRef.current.position.set(newX, newY, newZ);
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