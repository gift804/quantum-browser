import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AddressBar } from './AddressBar';
import { TabManager } from './TabManager';
import { WebView } from './WebView';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #0f3460;
  border-bottom: 1px solid #e94560;
  flex-wrap: wrap;
`;

const IconButton = styled.button`
  background: #e94560;
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff6b9d;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const BrowserWindow: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('https://google.com');
  const [tabs, setTabs] = useState<any[]>([]);

  useEffect(() => {
    // Load tabs from main process
    if (window.electronAPI) {
      window.electronAPI.browser.getTabs().then(loadedTabs => {
        setTabs(loadedTabs);
      });
    }
  }, []);

  const handleNewTab = async () => {
    if (window.electronAPI) {
      const newTab = await window.electronAPI.browser.openTab('https://google.com');
      setTabs([...tabs, newTab]);
      setCurrentUrl('https://google.com');
    }
  };

  const handleCloseTab = async (tabId: string) => {
    if (window.electronAPI) {
      await window.electronAPI.browser.closeTab(tabId);
      setTabs(tabs.filter(t => t.id !== tabId));
    }
  };

  const handleNavigate = (url: string) => {
    setCurrentUrl(url);
    if (window.electronAPI) {
      window.electronAPI.browser.openTab(url);
    }
  };

  const handleReload = () => {
    // Trigger reload
    console.log('Reloading:', currentUrl);
  };

  const handleBack = () => {
    console.log('Going back');
  };

  const handleForward = () => {
    console.log('Going forward');
  };

  return (
    <Container>
      <ToolbarContainer>
        <IconButton onClick={handleBack} title="Back">←</IconButton>
        <IconButton onClick={handleForward} title="Forward">→</IconButton>
        <IconButton onClick={handleReload} title="Reload">⟲</IconButton>
        <AddressBar onNavigate={handleNavigate} currentUrl={currentUrl} />
        <IconButton onClick={handleNewTab} title="New Tab">+</IconButton>
      </ToolbarContainer>
      
      <TabManager tabs={tabs} onCloseTab={handleCloseTab} />
      <WebView url={currentUrl} />
    </Container>
  );
};
