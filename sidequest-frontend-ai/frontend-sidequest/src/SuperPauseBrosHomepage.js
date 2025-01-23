import React from 'react';
import { motion } from 'framer-motion';
import { GamepadIcon, RibbonIcon, CameraIcon } from 'lucide-react';
import mario from './mario.jpg';

const SuperPauseBrosHomepage = () => {
  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#0d1117', // GitHub dark background
    color: '#c9d1d9', // Light text color
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  };

  const headerStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#58a6ff', // GitHub blue
    marginBottom: '20px',
  };

  const sectionStyle = {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '40px',
  };

  const cardStyle = {
    backgroundColor: '#161b22', // Slightly lighter dark background
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '30%',
    textAlign: 'center',
    border: '2px solid #30363d',
    transition: 'transform 0.3s', // Ensure smooth transition
  };

  const buttonStyle = {
    backgroundColor: '#238636', // GitHub green
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    border: '2px solid #30363d',
    cursor: 'pointer',
  };

  const iconColors = ['#fdd835', '#1e88e5', '#e53935', '#43a047']; // Yellow, Blue, Red, Green

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Super Pause Bros</h1>

      <div style={sectionStyle}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={cardStyle}
        >
          <GamepadIcon size={64} style={{ marginBottom: '16px', color: iconColors[0] }} />
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Gaming Scenario</h2>
          <p>Mom calls. Game can't pause. AI takes over!</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={cardStyle}
        >
          <RibbonIcon size={64} style={{ marginBottom: '16px', color: iconColors[1] }} />
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>AI Takeover</h2>
          <p>Our AI learns and plays better than you ever could.</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={cardStyle}
        >
          <CameraIcon size={64} style={{ marginBottom: '16px', color: iconColors[2] }} />
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Smart Detection</h2>
          <p>Real-time game analysis and intelligent intervention.</p>
        </motion.div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={buttonStyle}
      >
        Learn More
      </motion.button>

      {/* Animated Robot with Game Controller */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0], // Move left and right
          y: [0, -20, 0], // Slight bounce
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="https://via.placeholder.com/50" // Placeholder for robot image
          alt="Robot"
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <GamepadIcon size={32} style={{ color: '#ff0000' }} />
      </motion.div>

      {/* Animated background element */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.3, zIndex: 0 }}
      >
        <img 
          src={mario}
          alt="Background Graphic" 
          style={{ width: '50px', height: '50px' }}
        />
      </motion.div>
    </div>
  );
};

export default SuperPauseBrosHomepage;