import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #000;
  color: #ffffff;
  width: 100vw;
  overflow-x: hidden;
  position: relative;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #64f4ac;
  }

  @media (max-width: 768px) {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
`;

const Hero = styled.section`
  min-height: 65vh;
  max-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem 2rem;
  background: url('https://i.imgur.com/your-mario-background.png') center/cover;
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  @media (max-width: 768px) {
    padding: 6rem 1rem 1rem;
    min-height: 90vh;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 2;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #ffffff 0%, #64f4ac 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #a8a8a8;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
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

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    min-width: 180px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const Features = styled.section`
  padding: 1rem 2rem;
  background: #000;
  position: relative;
  z-index: 2;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #64f4ac;
`;

const FeatureDescription = styled.p`
  color: #a8a8a8;
  line-height: 1.6;
`;

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  text-align: center;
  padding: 1rem 0;
  position: relative;
  width: 100%;
  bottom: 0;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Navbar>
        <Logo>Super Pause Bros</Logo>
        <div>
          <NavLink to="/">Play Game</NavLink>
        </div>
      </Navbar>

      <Hero>
        <HeroContent>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Never Miss a Beat
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            When mom calls for dinner, let our AI take over.
            Your game stays alive, your score keeps growing.
            No more lost progress, no more frustration.
          </Subtitle>
          <CTAButton
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={Link}
            to="/game"
          >
            Try It Now
          </CTAButton>
        </HeroContent>
      </Hero>

      <Features>
        <FeatureGrid>
          <FeatureCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FeatureTitle>AI-Powered Gaming</FeatureTitle>
            <FeatureDescription>
              Our advanced AI takes over when you need to pause, playing better than you ever could.
              From Mario to Fortnite, your game stays alive and thriving.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FeatureTitle>No Progress Lost</FeatureTitle>
            <FeatureDescription>
              When you return, your score is at its peak. No more starting over,
              no more lost achievements. Your game continues exactly where you left off.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <FeatureTitle>Family-Friendly</FeatureTitle>
            <FeatureDescription>
              Perfect for balancing gaming and family time. Enjoy dinner with your family
              while our AI keeps your game alive. No more arguments, no more stress.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </Features>

      <Footer>
        <p>&copy; {new Date().getFullYear()} Super Pause Bros. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default LandingPage; 