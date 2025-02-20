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

  // Adjusted physics constants for smoother movement
  const JUMP_FORCE = 0.25
  const GRAVITY = -0.01
  const GROUND_HEIGHT = 0
  const MOVEMENT_SPEED = 3

  // Block positions for collision detection
  const BLOCKS = [-3, -1, 1, 3].map(x => ({ x, y: 0.5, width: 1 }))

  const checkBlockCollision = (newX, newY) => {
    for (const block of BLOCKS) {
      // Adjusted collision box size for smaller blocks
      if (Math.abs(newX - block.x) < 0.25 && 
          newY < block.y + 0.45 && 
          newY > block.y - 0.1) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.code === 'KeyW') && !isJumping) {
        setIsJumping(true)
        setJumpVelocity(JUMP_FORCE)
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
      newX = 2;
    }
    if (newX < -2) {
      setDirection(1);
      newX = -2;
    }

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

    // Block collision
    if (checkBlockCollision(newX, newY)) {
      // Only prevent movement in the direction of collision
      if (checkBlockCollision(position[0], newY)) {
        newX = position[0];
      }
      if (checkBlockCollision(newX, position[1])) {
        newY = position[1];
      }
    }

    // Update all state at once to prevent stuttering
    setPosition([newX, newY, position[2]]);
    setJumpVelocity(newVelocity);

    // Animate legs and arms
    if (!isJumping) {
      setLegRotation(Math.sin(state.clock.elapsedTime * 10) * 0.4)
      setArmRotation(-Math.sin(state.clock.elapsedTime * 10) * 0.3)
    } else {
      setLegRotation(-0.2)
      setArmRotation(-0.5)
    }
    
    // Update position and rotation
    groupRef.current.position.set(newX, newY, position[2])
    groupRef.current.rotation.y = direction > 0 ? 0 : Math.PI
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial color="#E60012" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#FFA07A" />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[0.35, 0.1, 0.35]} />
        <meshStandardMaterial color="#E60012" />
      </mesh>

      {/* Arms with rotation */}
      <group position={[0.25, 0.7, 0]} rotation={[0, 0, armRotation]}>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#FFA07A" />
        </mesh>
      </group>
      <group position={[-0.25, 0.7, 0]} rotation={[0, 0, -armRotation]}>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#FFA07A" />
        </mesh>
      </group>

      {/* Legs with rotation */}
      <group position={[0.1, 0.3, 0]} rotation={[0, 0, legRotation]}>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshStandardMaterial color="#1E90FF" />
        </mesh>
      </group>
      <group position={[-0.1, 0.3, 0]} rotation={[0, 0, -legRotation]}>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshStandardMaterial color="#1E90FF" />
        </mesh>
      </group>
    </group>
  )
} 