import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'
import MarioSprite from './components/MarioSprite'
import Scene from './components/Scene'

function App() {
  const [marioPosition, setMarioPosition] = useState([-2, 0, 0]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMarioPositionChange = (position) => {
    setMarioPosition(position);
  };

  const handlePipeEnter = () => {
    setShowSuccess(true);
  };

  return (
    <div className="retro-container">
      <h1 className="retro-title">Super Pause Bros</h1>
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 2, 5], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene marioPosition={marioPosition} onPipeEnter={handlePipeEnter} />
            <MarioSprite onPositionChange={handleMarioPositionChange} />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      
      {showSuccess && (
        <div className="success-message">
          <h2>Good Job!</h2>
          <p>You found the secret pipe!</p>
          <button onClick={() => setShowSuccess(false)}>Play Again</button>
        </div>
      )}
    </div>
  )
}

export default App
