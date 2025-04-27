import { useState, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'
import MarioSprite from './components/MarioSprite'
import Scene from './components/Scene'
import MarioExamplePage from './MarioExamplePage'
import LandingPage from '../LandingPage'

function App() {
  const [marioPosition, setMarioPosition] = useState([-2, 0, 0]);
  const [pipeEntered, setPipeEntered] = useState(false);

  const handleMarioPositionChange = (position) => {
    setMarioPosition(position);
  };

  const handlePipeEnter = () => {
    if (!pipeEntered) {
      setPipeEntered(true);
      setMarioPosition([-2, 0, 0]);
      window.location.href = '/PauseBrosHome';
      setPipeEntered(false)
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/PauseBrosHome" element={<LandingPage />} />
        <Route path="/" element={
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
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
