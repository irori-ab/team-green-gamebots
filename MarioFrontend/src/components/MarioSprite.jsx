import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

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
  const [isUserControlled, setIsUserControlled] = useState(false)
  const autoMoveDir = useRef([1, 0]) // [dx, dz] direction vector
  const autoMoveTimer = useRef(0)
  const autoMoveInterval = useRef(1 + Math.random() * 2) // random interval between 1-3s
  const userControlTimeout = useRef(null)
  const USER_CONTROL_TIMEOUT_MS = 2000;

  // Adjusted physics constants for smoother movement
  const JUMP_FORCE = 0.18
  const GRAVITY = -0.01
  const GROUND_HEIGHT = 0
  const MOVEMENT_SPEED = 3
  const X_MIN = -3.5, X_MAX = 3.5, Z_MIN = -3.5, Z_MAX = 3.5; // slightly inside bounds for safety

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Take control on any arrow key or spacebar press
      if ([
        'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Space', 'KeyW'
      ].includes(e.code)) {
        setIsUserControlled(true)
        // Reset the user control timeout
        if (userControlTimeout.current) clearTimeout(userControlTimeout.current);
        userControlTimeout.current = setTimeout(() => {
          setIsUserControlled(false);
        }, USER_CONTROL_TIMEOUT_MS);
      }
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
      if ([
        'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'
      ].includes(e.code)) {
        setDirection(0)
        // Also reset the user control timeout on keyup for robustness
        if (userControlTimeout.current) clearTimeout(userControlTimeout.current);
        userControlTimeout.current = setTimeout(() => {
          setIsUserControlled(false);
        }, USER_CONTROL_TIMEOUT_MS);
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      if (userControlTimeout.current) clearTimeout(userControlTimeout.current);
    }
  }, [isJumping])

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let newX = position[0];
    let newY = position[1];
    let newZ = position[2];
    let newVelocity = jumpVelocity;
    let moveDir = direction;

    // Autonomous movement if not user controlled
    if (!isUserControlled) {
      autoMoveTimer.current += delta;
      // Change direction at random intervals or if at bounds
      if (
        autoMoveTimer.current > autoMoveInterval.current ||
        newX <= X_MIN || newX >= X_MAX || newZ <= Z_MIN || newZ >= Z_MAX
      ) {
        // 8 possible directions: [dx, dz]
        const dirs = [
          [1, 0],   // E
          [-1, 0],  // W
          [0, 1],   // S
          [0, -1],  // N
          [1, 1],   // SE
          [1, -1],  // NE
          [-1, 1],  // SW
          [-1, -1], // NW
        ];
        // If at edge, pick a direction that moves inward
        let possibleDirs = dirs.filter(([dx, dz]) => {
          const nextX = newX + dx * delta * MOVEMENT_SPEED;
          const nextZ = newZ + dz * delta * MOVEMENT_SPEED;
          return (
            nextX > X_MIN && nextX < X_MAX &&
            nextZ > Z_MIN && nextZ < Z_MAX &&
            !willCollideWithPipe(nextX, nextZ)
          );
        });
        if (possibleDirs.length === 0) possibleDirs = [[-Math.sign(newX), -Math.sign(newZ)]]; // fallback inward
        autoMoveDir.current = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
        autoMoveTimer.current = 0;
        autoMoveInterval.current = 1 + Math.random() * 2; // new random interval
      }
      // Set rotation for auto-move
      const [autoDx, autoDz] = autoMoveDir.current;
      if (autoDx === 1 && autoDz === 0) setTargetRotation(Math.PI / 2); // E
      if (autoDx === -1 && autoDz === 0) setTargetRotation(-Math.PI / 2); // W
      if (autoDx === 0 && autoDz === -1) setTargetRotation(Math.PI); // N
      if (autoDx === 0 && autoDz === 1) setTargetRotation(0); // S
      if (autoDx === 1 && autoDz === 1) setTargetRotation(Math.PI / 4); // SE
      if (autoDx === 1 && autoDz === -1) setTargetRotation((3 * Math.PI) / 4); // NE
      if (autoDx === -1 && autoDz === 1) setTargetRotation(-Math.PI / 4); // SW
      if (autoDx === -1 && autoDz === -1) setTargetRotation((-3 * Math.PI) / 4); // NW
      // Move in the chosen direction, clamp to bounds
      newX = Math.max(X_MIN, Math.min(X_MAX, newX + autoDx * delta * MOVEMENT_SPEED));
      newZ = Math.max(Z_MIN, Math.min(Z_MAX, newZ + autoDz * delta * MOVEMENT_SPEED));
      moveDir = autoDx !== 0 ? (autoDx > 0 ? 1 : -1) : autoDz !== 0 ? (autoDz > 0 ? -2 : 2) : 0;
    } else {
      // User-controlled movement
      if (direction === 1 && newX < X_MAX) newX += delta * MOVEMENT_SPEED;
      if (direction === -1 && newX > X_MIN) newX -= delta * MOVEMENT_SPEED;
      if (direction === 2 && newZ > Z_MIN) newZ -= delta * MOVEMENT_SPEED;
      if (direction === -2 && newZ < Z_MAX) newZ += delta * MOVEMENT_SPEED;
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
    setPosition([newX, newY, newZ]);
    setJumpVelocity(newVelocity);
    
    // Send position to parent for collision detection
    if (onPositionChange) {
      onPositionChange([newX, newY, newZ]);
    }

    // Animate legs and arms only when moving
    if (!isJumping && moveDir !== 0) {
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
      {/* AI Chill Mode label */}
      {!isUserControlled && (
        <Html position={[0, 1.6, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            color: '#64f4ac',
            padding: '0.2em 0.7em',
            borderRadius: '1em',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            fontSize: '1.1em',
            boxShadow: '0 0 8px #64f4ac',
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}>
            Chill Mode
          </div>
        </Html>
      )}
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

function willCollideWithPipe(nextX, nextZ) {
  const pipeX = 3, pipeZ = -3;
  return Math.abs(nextX - pipeX) < 0.5 && Math.abs(nextZ - pipeZ) < 0.5;
}