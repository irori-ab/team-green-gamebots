import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'
import MarioSprite from './components/MarioSprite'
import Scene from './components/Scene'

function App() {
  return (
    <div className="retro-container">
      <h1 className="retro-title">Super Pause Bros</h1>
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 2, 5], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene />
            <MarioSprite />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default App
