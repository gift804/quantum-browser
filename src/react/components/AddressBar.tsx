import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 300px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 16px;
  border: 2px solid #e94560;
  border-radius: 6px;
  background: #16213e;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff6b9d;
    box-shadow: 0 0 10px rgba(255, 107, 157, 0.3);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  background: #e94560;
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff6b9d;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface Props {
  currentUrl: string;
  onNavigate: (url: string) => void;
}

export const AddressBar: React.FC<Props> = ({ currentUrl, onNavigate }) => {
  const [input, setInput] = useState(currentUrl);

  useEffect(() => {
    setInput(currentUrl);
  }, [currentUrl]);

  const handleNavigate = () => {
    let url = input.trim();
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (url.includes('.')) {
        url = 'https://' + url;
      } else {
        // Search query
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    
    onNavigate(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  return (
    <Container>
      <Input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search or enter URL..."
      />
      <SearchButton onClick={handleNavigate}>Go</SearchButton>
    </Container>
  );
};
