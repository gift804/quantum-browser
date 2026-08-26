import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { VPNServerList } from './VPNServerList';
import { VPNStats } from './VPNStats';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  gap: 20px;
  padding: 20px;
  overflow: auto;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 300px;
`;

const ConnectionStatus = styled.div<{ connected: boolean }>`
  background: ${props => props.connected ? 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)' : 'linear-gradient(135deg, #ff6b6b 0%, #cc0000 100%)'};
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
`;

const StatusTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatusSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
`;

const ConnectButton = styled.button<{ connected: boolean }>`
  background: ${props => props.connected ? 'linear-gradient(135deg, #ff6b6b 0%, #cc0000 100%)' : 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)'};
  border: none;
  color: white;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecurityFeatures = styled.div`
  background: #0f3460;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #e94560;
`;

const SecurityTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #e94560;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  
  &::before {
    content: '✓';
    color: #00d4ff;
    font-weight: bold;
    font-size: 18px;
  }
`;

interface Props {
  connected: boolean;
  onConnectChange: (connected: boolean) => void;
  currentServer: string | null;
  onServerChange: (server: string) => void;
}

export const VPNPanel: React.FC<Props> = ({ 
  connected, 
  onConnectChange, 
  currentServer,
  onServerChange 
}) => {
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = async () => {
    if (window.electronAPI) {
      try {
        const loadedServers = await window.electronAPI.vpn.getServers();
        setServers(loadedServers);
      } catch (error) {
        console.error('Failed to load VPN servers:', error);
      }
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    try {
      if (window.electronAPI) {
        if (connected) {
          await window.electronAPI.vpn.disconnect();
          onConnectChange(false);
        } else {
          const serverId = currentServer || 'us-east-1';
          const result = await window.electronAPI.vpn.connect(serverId);
          if (result.success) {
            onConnectChange(true);
            onServerChange(serverId);
          }
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectServer = async (serverId: string) => {
    onServerChange(serverId);
    if (connected) {
      // Reconnect to new server
      handleConnect();
    }
  };

  return (
    <Container>
      <LeftPanel>
        <ConnectionStatus connected={connected}>
          <StatusTitle>{connected ? '🔒 SECURE' : '🔓 UNPROTECTED'}</StatusTitle>
          <StatusSubtitle>
            {connected ? 'Your connection is encrypted' : 'Your connection is unencrypted'}
          </StatusSubtitle>
          <ConnectButton 
            connected={connected} 
            onClick={handleConnect}
            disabled={loading}
          >
            {loading ? 'Connecting...' : (connected ? 'DISCONNECT' : 'CONNECT')}
          </ConnectButton>
        </ConnectionStatus>

        <SecurityFeatures>
          <SecurityTitle>Security Features</SecurityTitle>
          <FeatureList>
            <FeatureItem>AES-256 Encryption</FeatureItem>
            <FeatureItem>DNS Leak Protection</FeatureItem>
            <FeatureItem>IPv6 Leak Blocking</FeatureItem>
            <FeatureItem>Kill Switch Enabled</FeatureItem>
            <FeatureItem>WebRTC Leak Prevention</FeatureItem>
            <FeatureItem>No-Logs Policy</FeatureItem>
            <FeatureItem>Multiple Protocols</FeatureItem>
            <FeatureItem>250 GB Storage Cache</FeatureItem>
          </FeatureList>
        </SecurityFeatures>
      </LeftPanel>

      <VPNStats />
      <VPNServerList 
        servers={servers}
        currentServer={currentServer}
        onSelectServer={handleSelectServer}
        connected={connected}
      />
    </Container>
  );
};
