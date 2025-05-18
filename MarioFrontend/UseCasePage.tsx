import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { generateJumpSound } from './src/utils/generateMarioSounds';

const Container = styled.div`
  min-height: 100vh;
  background: #000;
  color: #ffffff;
  width: 100vw;
  overflow-x: hidden;
  position: relative;
  padding-top: 80px; /* Add padding for the fixed navbar */
  margin: 0;
  left: 0;
  right: 0;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #000;
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin: 0;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
`;

const TimelineSection = styled.section`
  padding: 25rem 2rem 2rem;
  min-height: calc(100vh - 80px);
  position: relative;
  background: #000;
  width: 100%;
  margin: 0;
  left: 0;
  right: 0;
`;

const TimelineContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    background: linear-gradient(180deg, #64f4ac, #39c4ff);
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.3;
  }
`;

const TimelineTitle = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(
    90deg,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #4b0082,
    #8b00ff
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 4s linear infinite;
  display: inline-block;

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const TimelineCard = styled(motion.div)<{ $side: 'left' | 'right'; $index: number }>`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  width: 45%;
  margin: 2rem 0;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;

  ${props => {
    switch (props.$index) {
      case 0:
        return `
          animation: wobble 3s ease-in-out infinite;
          @keyframes wobble {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
          }
        `;
      case 1:
        return `
          animation: bounce 2s ease-in-out infinite;
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
        `;
      case 2:
        return `
          animation: shake 4s ease-in-out infinite;
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `;
      case 3:
        return `
          animation: pulse 3s ease-in-out infinite;
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `;
      default:
        return '';
    }
  }}

  &:first-child {
    margin-top: 8rem;
  }

  &:nth-child(odd) {
    margin-left: auto;
  }

  &:nth-child(even) {
    margin-right: auto;
  }

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: linear-gradient(90deg, #64f4ac, #39c4ff);
    border-radius: 50%;
    top: 50%;
    left: ${props => props.$side === 'left' ? 'auto' : '-48px'};
    right: ${props => props.$side === 'left' ? '-48px' : 'auto'};
    transform: translateY(-50%);
    box-shadow: 0 0 20px rgba(100, 244, 172, 0.5);

    ${props => {
      switch (props.$index) {
        case 0:
          return `
            animation: spin 2s linear infinite;
            @keyframes spin {
              from { transform: translateY(-50%) rotate(0deg); }
              to { transform: translateY(-50%) rotate(360deg); }
            }
          `;
        case 1:
          return `
            animation: pulse 1.5s ease-in-out infinite;
            @keyframes pulse {
              0%, 100% { transform: translateY(-50%) scale(1); }
              50% { transform: translateY(-50%) scale(1.5); }
            }
          `;
        case 2:
          return `
            animation: colorChange 3s linear infinite;
            @keyframes colorChange {
              0% { background: #ff0000; }
              33% { background: #00ff00; }
              66% { background: #0000ff; }
              100% { background: #ff0000; }
            }
          `;
        case 3:
          return `
            animation: bounce 1s ease-in-out infinite;
            @keyframes bounce {
              0%, 100% { transform: translateY(-50%) translateX(0); }
              50% { transform: translateY(-50%) translateX(10px); }
            }
          `;
        default:
          return '';
      }
    }}
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(45deg, #64f4ac, #39c4ff, #64f4ac);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;

    ${props => {
      switch (props.$index) {
        case 0:
          return `
            animation: rainbow 4s linear infinite;
            @keyframes rainbow {
              0% { background: linear-gradient(45deg, #ff0000, #ff7f00); }
              33% { background: linear-gradient(45deg, #ffff00, #00ff00); }
              66% { background: linear-gradient(45deg, #0000ff, #4b0082); }
              100% { background: linear-gradient(45deg, #ff0000, #ff7f00); }
            }
          `;
        case 1:
          return `
            animation: glow 2s ease-in-out infinite;
            @keyframes glow {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.8; }
            }
          `;
        case 2:
          return `
            animation: rotate 3s linear infinite;
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `;
        case 3:
          return `
            animation: wave 2s ease-in-out infinite;
            @keyframes wave {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
          `;
        default:
          return '';
      }
    }}
  }
`;

const TimelineDescription = styled(motion.p)<{ $index: number }>`
  font-size: 1.1rem;
  color: #ffffff;
  line-height: 1.5;
  margin-bottom: 1rem;

  ${props => {
    switch (props.$index) {
      case 0:
        return `
          animation: colorShift 3s linear infinite;
          @keyframes colorShift {
            0% { color: #ff0000; }
            33% { color: #00ff00; }
            66% { color: #0000ff; }
            100% { color: #ff0000; }
          }
        `;
      case 1:
        return `
          animation: glow 2s ease-in-out infinite;
          @keyframes glow {
            0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0); }
            50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
          }
        `;
      case 2:
        return `
          animation: pulse 2s ease-in-out infinite;
          @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
        `;
      case 3:
        return `
          animation: slide 3s ease-in-out infinite;
          @keyframes slide {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(5px); }
          }
        `;
      default:
        return '';
    }
  }}
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(90deg, #64f4ac 0%, #39c4ff 100%);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #000;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease;
  min-width: 200px;
  margin: 4rem auto;
  display: block;

  &:hover {
    transform: scale(1.05);
  }
`;

interface TimelineCardProps {
  $side: 'left' | 'right';
  $index: number;
}

const UseCasePage: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([0]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [audioInitialized, setAudioInitialized] = useState(false);

  const handleClick = () => {
    if (!audioInitialized) {
      setAudioInitialized(true);
    }

    if (visibleCards.length < 4) {
      const nextCardIndex = visibleCards.length;
      setVisibleCards(prev => [...prev, nextCardIndex]);
      
      // Play jump sound
      generateJumpSound();
      
      // Scroll to the newly revealed card
      setTimeout(() => {
        cardRefs.current[nextCardIndex]?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  };

  // Initialize audio on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioInitialized) {
        setAudioInitialized(true);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [audioInitialized]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container onClick={handleClick}>
      <Navbar>
        <Logo to="/">Super Pause Bros</Logo>
      </Navbar>

      <TimelineSection>
        <TimelineContainer>
          <TimelineCard
            ref={el => cardRefs.current[0] = el}
            $side="right"
            $index={0}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: visibleCards.includes(0) ? 1 : 0, x: visibleCards.includes(0) ? 0 : 100 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <TimelineTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visibleCards.includes(0) ? 1 : 0, y: visibleCards.includes(0) ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              The Dinner Dilemma
            </TimelineTitle>
            <TimelineDescription
              $index={0}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visibleCards.includes(0) ? 1 : 0, y: visibleCards.includes(0) ? 0 : 20 }}
              transition={{ delay: 0.3 }}
            >
              Mom calls for dinner, but your game doesn't have a pause button. 
              Your character is in the middle of a crucial battle, and you can't 
              just leave them hanging. That's where Super Pause Bros comes in.
            </TimelineDescription>
          </TimelineCard>

          <TimelineCard
            ref={el => cardRefs.current[1] = el}
            $side="left"
            $index={1}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: visibleCards.includes(1) ? 1 : 0, x: visibleCards.includes(1) ? 0 : -100 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <TimelineTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visibleCards.includes(1) ? 1 : 0, y: visibleCards.includes(1) ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              The Airport AFK
            </TimelineTitle>
            <TimelineDescription
              $index={1}
              
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visibleCards.includes(1) ? 1 : 0, y: visibleCards.includes(1) ? 0 : 20 }}
              transition={{ delay: 0.3 }}
            >
              Your flight is boarding, but you're in the middle of a ranked match. 
              No problem! Our AI takes over, ensuring you don't lose your rank or 
              disappoint your teammates.
            </TimelineDescription>
          </TimelineCard>

          <TimelineCard
            ref={el => cardRefs.current[2] = el}
            $side="right"
            $index={2}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: visibleCards.includes(2) ? 1 : 0, x: visibleCards.includes(2) ? 0 : 100 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <TimelineTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visibleCards.includes(2) ? 1 : 0, y: visibleCards.includes(2) ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              Masterclass Replay
            </TimelineTitle>
            <TimelineDescription
              $index={2}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visibleCards.includes(2) ? 1 : 0, y: visibleCards.includes(2) ? 0 : 20 }}
              transition={{ delay: 0.3 }}
            >
              Watch how our AI handles your game while you're away. Learn new 
              strategies and techniques as you review the AI's gameplay, turning 
              downtime into learning opportunities.
            </TimelineDescription>
          </TimelineCard>

          <TimelineCard
            ref={el => cardRefs.current[3] = el}
            $side="left"
            $index={3}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: visibleCards.includes(3) ? 1 : 0, x: visibleCards.includes(3) ? 0 : -100 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <TimelineTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visibleCards.includes(3) ? 1 : 0, y: visibleCards.includes(3) ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              Slappa Söndagen
            </TimelineTitle>
            <TimelineDescription
              $index={3}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visibleCards.includes(3) ? 1 : 0, y: visibleCards.includes(3) ? 0 : 20 }}
              transition={{ delay: 0.3 }}
            >
              Sunday morning, you're still in bed, but your game needs attention. 
              Let our AI handle your daily quests and maintenance while you enjoy 
              your well-deserved rest.
            </TimelineDescription>
          </TimelineCard>

          <CTAButton
            as={Link}
            to="/game"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
              transition: {
                rotate: {
                  repeat: Infinity,
                  duration: 0.5
                }
              }
            }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started
          </CTAButton>
        </TimelineContainer>
      </TimelineSection>
    </Container>
  );
};

export default UseCasePage; 