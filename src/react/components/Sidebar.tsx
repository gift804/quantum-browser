import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 250px;
  background: linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%);
  border-right: 2px solid #e94560;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1a1a2e;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #e94560;
    border-radius: 3px;
    
    &:hover {
      background: #ff6b9d;
    }
  }
`;

const Logo = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e94560;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  background: linear-gradient(135deg, #e94560 0%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NavSection = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #333;
  
  &:last-child {
    border-bottom: none;
  }
`;

const NavSectionTitle = styled.div`
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  padding: 10px 20px;
  letter-spacing: 1px;
  font-weight: 600;
`;

const NavItem = styled.button<{ active: boolean }>`
  width: 100%;
  background: ${props => props.active ? 'linear-gradient(90deg, #e94560 0%, #ff6b9d 100%)' : 'transparent'};
  border: none;
  border-left: 3px solid ${props => props.active ? '#ff6b9d' : 'transparent'};
  color: white;
  padding: 14px 20px;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(90deg, #e94560 0%, #ff6b9d 100%)' : '#0f3460'};
    border-left-color: #e94560;
  }
  
  &:active {
    transform: translateX(2px);
  }
`;

const Icon = styled.span`
  font-size: 18px;
  width: 24px;
  text-align: center;
`;

const StorageIndicator = styled.div`
  margin-top: auto;
  padding: 20px;
  border-top: 1px solid #e94560;
  background: #0f3460;
`;

const StorageLabel = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StorageBar = styled.div`
  width: 100%;
  height: 6px;
  background: #1a1a2e;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const StorageFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00d4ff 0%, #0099cc 100%);
  width: 52%;
  border-radius: 3px;
`;

const StorageText = styled.div`
  font-size: 12px;
  color: #00d4ff;
  font-weight: 600;
`;

interface Props {
  activePanel: string;
  onPanelChange: (panel: any) => void;
}

export const Sidebar: React.FC<Props> = ({ activePanel, onPanelChange }) => {
  return (
    <Container>
      <Logo>⚡ Quantum</Logo>

      <NavSection>
        <NavSectionTitle>Navigation</NavSectionTitle>
        <NavItem active={activePanel === 'browser'} onClick={() => onPanelChange('browser')}>
          <Icon>🌐</Icon>
          Browser
        </NavItem>
        <NavItem active={activePanel === 'vpn'} onClick={() => onPanelChange('vpn')}>
          <Icon>🔒</Icon>
          VPN
        </NavItem>
        <NavItem active={activePanel === 'web'} onClick={() => onPanelChange('web')}>
          <Icon>🌍</Icon>
          Web Access
        </NavItem>
      </NavSection>

      <NavSection>
        <NavSectionTitle>Tools</NavSectionTitle>
        <NavItem active={activePanel === 'bookmarks'} onClick={() => onPanelChange('bookmarks')}>
          <Icon>⭐</Icon>
          Bookmarks
        </NavItem>
        <NavItem active={activePanel === 'history'} onClick={() => onPanelChange('history')}>
          <Icon>📄</Icon>
          History
        </NavItem>
      </NavSection>

      <NavSection>
        <NavSectionTitle>System</NavSectionTitle>
        <NavItem active={activePanel === 'settings'} onClick={() => onPanelChange('settings')}>
          <Icon>⚙️</Icon>
          Settings
        </NavItem>
      </NavSection>

      <StorageIndicator>
        <StorageLabel>Storage Usage</StorageLabel>
        <StorageBar>
          <StorageFill />
        </StorageBar>
        <StorageText>130 GB / 250 GB</StorageText>
      </StorageIndicator>
    </Container>
  );
};
