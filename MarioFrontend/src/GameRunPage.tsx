// src/GameRunPage.tsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: #ffffff;
  width: 100vw;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 2rem 0;
  video {
    width: 100%;
    border-radius: 20px;
  }
`;

const BackButton = styled(Link)`
  margin-top: 20px;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #64f4ac 0%, #39c4ff 100%);
  border: none;
  color: #000;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const GameRunPage: React.FC = () => {
  return (
    <Container>
      <h1>Game in Action</h1>
      <VideoContainer>
        <video controls>
          <source src="src/assets/game-run.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoContainer>
      <BackButton to="/PauseBrosHome">Back to Home</BackButton>
    </Container>
  );
};

export default GameRunPage;