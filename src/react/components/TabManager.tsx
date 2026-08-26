import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  background: #0f3460;
  border-bottom: 1px solid #e94560;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #16213e;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #e94560;
    border-radius: 2px;
    
    &:hover {
      background: #ff6b9d;
    }
  }
`;

const Tab = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.isActive ? '#e94560' : '#16213e'};
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  white-space: nowrap;
  max-width: 200px;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.isActive ? '#ff6b9d' : '#333'};
  
  &:hover {
    background: ${props => props.isActive ? '#ff6b9d' : '#1a1a2e'};
  }
`;

const TabTitle = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ff6b9d;
    transform: scale(1.2);
  }
`;

interface Props {
  tabs: any[];
  onCloseTab: (tabId: string) => void;
}

export const TabManager: React.FC<Props> = ({ tabs, onCloseTab }) => {
  return (
    <Container>
      {tabs.map(tab => (
        <Tab key={tab.id} isActive={tab.isActive}>
          <TabTitle>{tab.title || 'New Tab'}</TabTitle>
          <CloseButton onClick={() => onCloseTab(tab.id)}>×</CloseButton>
        </Tab>
      ))}
    </Container>
  );
};
