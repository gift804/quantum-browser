import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  background: #0f3460;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e94560;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 350px;
  overflow: hidden;
`;

const Title = styled.h3`
  margin: 0 0 15px 0;
  color: #e94560;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ServerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #16213e;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #e94560;
    border-radius: 3px;
    
    &:hover {
      background: #ff6b9d;
    }
  }
`;

const ServerItem = styled.button<{ isSelected: boolean; isConnected: boolean }>`
  background: ${props => props.isSelected ? 'linear-gradient(135deg, #e94560 0%, #ff6b9d 100%)' : props.isConnected ? 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)' : '#16213e'};
  border: ${props => props.isSelected ? '2px solid #ff6b9d' : '1px solid #333'};
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  
  &:hover {
    transform: translateX(4px);
    border-color: ${props => props.isSelected ? '#ff6b9d' : '#e94560'};
  }
  
  &:active {
    transform: translateX(2px);
  }
`;

const ServerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-weight: 600;
`;

const ServerDetails = styled.div`
  font-size: 11px;
  opacity: 0.8;
  display: flex;
  gap: 10px;
`;

interface Server {
  id: string;
  country: string;
  city: string;
  ip: string;
  load: number;
  ping: number;
  bandwidth: number;
}

interface Props {
  servers: Server[];
  currentServer: string | null;
  onSelectServer: (serverId: string) => void;
  connected: boolean;
}

export const VPNServerList: React.FC<Props> = ({ 
  servers, 
  currentServer, 
  onSelectServer,
  connected 
}) => {
  return (
    <Container>
      <Title>VPN Servers</Title>
      <ServerList>
        {servers.map(server => (
          <ServerItem
            key={server.id}
            isSelected={currentServer === server.id}
            isConnected={connected && currentServer === server.id}
            onClick={() => onSelectServer(server.id)}
          >
            <ServerInfo>
              <span>{server.city}, {server.country}</span>
              {connected && currentServer === server.id && <span>🔒</span>}
            </ServerInfo>
            <ServerDetails>
              <span>Ping: {server.ping}ms</span>
              <span>Load: {server.load}%</span>
              <span>{server.bandwidth}Gbps</span>
            </ServerDetails>
          </ServerItem>
        ))}
      </ServerList>
    </Container>
  );
};
