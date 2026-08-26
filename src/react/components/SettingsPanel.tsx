import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  overflow-y: auto;
  flex: 1;
`;

const Section = styled.div`
  background: #0f3460;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #e94560;
`;

const SectionTitle = styled.h2`
  margin: 0 0 15px 0;
  color: #e94560;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #333;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const Toggle = styled.input.attrs({ type: 'checkbox' })`
  width: 40px;
  height: 24px;
  cursor: pointer;
  accent-color: #e94560;
`;

const Select = styled.select`
  background: #16213e;
  color: white;
  border: 2px solid #e94560;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  
  option {
    background: #0f3460;
    color: white;
  }
  
  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #e94560 0%, #ff6b9d 100%);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoConnect: true,
    killSwitch: true,
    dnsOverVpn: true,
    obfuscation: true,
    theme: 'dark',
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleClearCache = () => {
    if (window.electronAPI) {
      window.electronAPI.storage.clearCache().then(() => {
        alert('Cache cleared successfully!');
      });
    }
  };

  const handleRotateFingerprint = () => {
    if (window.electronAPI) {
      window.electronAPI.obfuscation.rotateFingerprint().then((result: any) => {
        alert(`Fingerprint rotated! New ID: ${result.newFingerprint.slice(0, 8)}...`);
      });
    }
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Connection Settings</SectionTitle>
        <SettingItem>
          <SettingLabel>Auto-Connect on Startup</SettingLabel>
          <Toggle 
            checked={settings.autoConnect} 
            onChange={() => handleToggle('autoConnect')}
          />
        </SettingItem>
        <SettingItem>
          <SettingLabel>Kill Switch</SettingLabel>
          <Toggle 
            checked={settings.killSwitch} 
            onChange={() => handleToggle('killSwitch')}
          />
        </SettingItem>
        <SettingItem>
          <SettingLabel>DNS Over VPN</SettingLabel>
          <Toggle 
            checked={settings.dnsOverVpn} 
            onChange={() => handleToggle('dnsOverVpn')}
          />
        </SettingItem>
      </Section>

      <Section>
        <SectionTitle>Privacy & Security</SectionTitle>
        <SettingItem>
          <SettingLabel>Browser Obfuscation</SettingLabel>
          <Toggle 
            checked={settings.obfuscation} 
            onChange={() => handleToggle('obfuscation')}
          />
        </SettingItem>
        <SettingItem>
          <SettingLabel>Theme</SettingLabel>
          <Select 
            value={settings.theme}
            onChange={(e) => handleSelectChange('theme', e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="auto">Auto</option>
          </Select>
        </SettingItem>
      </Section>

      <Section>
        <SectionTitle>Storage Management</SectionTitle>
        <SettingItem>
          <SettingLabel>Cache Size</SettingLabel>
          <span>128 GB / 250 GB</span>
        </SettingItem>
        <Button onClick={handleClearCache} style={{ marginTop: '15px' }}>
          Clear Cache
        </Button>
      </Section>

      <Section>
        <SectionTitle>Anti-Detection</SectionTitle>
        <SettingItem>
          <SettingLabel>Rotate Browser Fingerprint</SettingLabel>
          <Button onClick={handleRotateFingerprint} style={{ marginBottom: 0 }}>
            Rotate Now
          </Button>
        </SettingItem>
      </Section>

      <Section>
        <SectionTitle>About</SectionTitle>
        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div><strong>Quantum Browser v0.1.0</strong></div>
          <div style={{ color: '#999', marginTop: '10px' }}>A super-powerful VPN browser with 250GB storage</div>
          <div style={{ color: '#999' }}>Undetectable by Luminwise & other detection systems</div>
        </div>
      </Section>
    </Container>
  );
};
