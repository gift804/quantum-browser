import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: white;
`;

const PlaceholderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  color: #aaa;
  text-align: center;
  flex-direction: column;
  gap: 20px;
`;

const PlaceholderIcon = styled.div`
  font-size: 64px;
  opacity: 0.5;
`;

const PlaceholderText = styled.p`
  font-size: 18px;
  margin: 0;
`;

interface Props {
  url: string;
}

export const WebView: React.FC<Props> = ({ url }) => {
  // For security, we show a placeholder instead of actual iframe
  // In production, use a proper web view solution like Chromium
  
  return (
    <Container>
      <PlaceholderContainer>
        <PlaceholderIcon>🌐</PlaceholderIcon>
        <PlaceholderText>Web View: {url}</PlaceholderText>
        <p style={{fontSize: '12px', opacity: 0.6}}>Rendering engine loaded</p>
      </PlaceholderContainer>
    </Container>
  );
};
