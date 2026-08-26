import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserWindow } from './components/BrowserWindow';
import { VPNPanel } from './components/VPNPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { WebAccessPanel } from './components/WebAccessPanel';
import { Sidebar } from './components/Sidebar';
import './App.css';

type PanelType = 'browser' | 'vpn' | 'settings' | 'bookmarks' | 'history' | 'web';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function App() {
  const [activePanel, setActivePanel] = useState<PanelType>('browser');
  const [vpnConnected, setVpnConnected] = useState(false);
  const [currentServer, setCurrentServer] = useState<string | null>(null);

  return (
    <AppContainer>
      <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />
      <MainContent>
        {activePanel === 'browser' && <BrowserWindow />}
        {activePanel === 'vpn' && (
          <VPNPanel 
            connected={vpnConnected} 
            onConnectChange={setVpnConnected}
            currentServer={currentServer}
            onServerChange={setCurrentServer}
          />
        )}
        {activePanel === 'web' && <WebAccessPanel />}
        {activePanel === 'settings' && <SettingsPanel />}
      </MainContent>
    </AppContainer>
  );
}

export default App;
