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

const Card = styled.div`
  background: #16213e;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  border-left: 4px solid #e94560;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    background: #1a1a2e;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #00d4ff;
  font-size: 14px;
`;

const CardDetail = styled.p`
  margin: 0;
  color: #999;
  font-size: 12px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  background: #16213e;
  border: 2px solid #e94560;
  color: white;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 14px;

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
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DnsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const StatBox = styled.div`
  background: #16213e;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid #00d4ff;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #00d4ff;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  text-transform: uppercase;
`;

export const WebAccessPanel: React.FC = () => {
  const [url, setUrl] = useState('https://example.com');
  const [dnsProviders, setDnsProviders] = useState<any[]>([]);
  const [proxies, setProxies] = useState<any[]>([]);
  const [stats, setStats] = useState({
    requestCount: 0,
    blockedSites: 0,
    bypassedSites: 0,
  });

  const handleAccessWebsite = async () => {
    if (window.electronAPI) {
      try {
        const result = await (window.electronAPI as any).web?.accessWebsite?.(url);
        if (result?.success) {
          alert(`✅ Successfully accessed: ${url}`);
          setStats(prev => ({ ...prev, requestCount: prev.requestCount + 1 }));
        } else {
          alert(`❌ Failed to access: ${url}`);
        }
      } catch (error) {
        console.error('Web access error:', error);
      }
    }
  };

  const handleBypassBlocked = async () => {
    if (window.electronAPI) {
      try {
        const result = await (window.electronAPI as any).web?.bypassBlocked?.(url);
        if (result?.success) {
          alert(`🔓 Successfully bypassed block: ${url}`);
          setStats(prev => ({ ...prev, bypassedSites: prev.bypassedSites + 1 }));
        } else {
          alert('Failed to bypass block');
        }
      } catch (error) {
        console.error('Bypass error:', error);
      }
    }
  };

  const handleLoadDNSProviders = async () => {
    if (window.electronAPI) {
      try {
        const providers = await (window.electronAPI as any).dns?.getProviders?.();
        setDnsProviders(providers || []);
      } catch (error) {
        console.error('DNS providers error:', error);
      }
    }
  };

  const handleLoadProxies = async () => {
    if (window.electronAPI) {
      try {
        const proxyList = await (window.electronAPI as any).proxy?.getAll?.();
        setProxies(proxyList || []);
      } catch (error) {
        console.error('Proxies error:', error);
      }
    }
  };

  const handleRotateDNS = async () => {
    if (window.electronAPI) {
      try {
        const provider = await (window.electronAPI as any).dns?.rotateProvider?.();
        alert(`Rotated to DNS: ${(provider as any)?.name}`);
      } catch (error) {
        console.error('DNS rotation error:', error);
      }
    }
  };

  const handleRotateProxy = async () => {
    if (window.electronAPI) {
      try {
        const proxy = await (window.electronAPI as any).proxy?.rotate?.();
        alert(`Rotated to proxy: ${proxy}`);
      } catch (error) {
        console.error('Proxy rotation error:', error);
      }
    }
  };

  return (
    <Container>
      <Section>
        <SectionTitle>🌐 Web Access - Full Internet</SectionTitle>
        <p style={{ color: '#999', marginBottom: '15px' }}>
          Access any website on the internet with automatic proxy rotation, DNS bypass, and geo-blocking circumvention.
        </p>

        <InputField
          type="text"
          placeholder="Enter website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
          <Button onClick={handleAccessWebsite}>🌐 Access Website</Button>
          <Button onClick={handleBypassBlocked}>🔓 Bypass Block</Button>
        </div>
      </Section>

      <Section>
        <SectionTitle>📊 Access Statistics</SectionTitle>
        <StatGrid>
          <StatBox>
            <StatValue>{stats.requestCount}</StatValue>
            <StatLabel>Requests</StatLabel>
          </StatBox>
          <StatBox>
            <StatValue>{stats.bypassedSites}</StatValue>
            <StatLabel>Bypassed</StatLabel>
          </StatBox>
          <StatBox>
            <StatValue>100%</StatValue>
            <StatLabel>Success</StatLabel>
          </StatBox>
        </StatGrid>
      </Section>

      <Section>
        <SectionTitle>🔍 DNS Providers</SectionTitle>
        <p style={{ color: '#999', marginBottom: '15px', fontSize: '12px' }}>
          Encrypted DNS providers for anonymous domain resolution
        </p>

        <Button onClick={handleLoadDNSProviders} style={{ marginBottom: '10px' }}>
          Load DNS Providers
        </Button>

        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
          {dnsProviders.map((provider: any, idx: number) => (
            <Card key={idx}>
              <CardTitle>✅ {provider.name}</CardTitle>
              <CardDetail>IPs: {provider.ips?.join(', ')}</CardDetail>
              <CardDetail>Encrypted: {provider.encrypted ? '✓' : '✗'} | No-Logs: {provider.noLogs ? '✓' : '✗'} | Speed: {provider.speed}ms</CardDetail>
            </Card>
          ))}
        </div>

        <Button onClick={handleRotateDNS}>🔄 Rotate DNS</Button>
      </Section>

      <Section>
        <SectionTitle>🔌 Proxy Servers</SectionTitle>
        <p style={{ color: '#999', marginBottom: '15px', fontSize: '12px' }}>
          Rotate through multiple proxies for maximum anonymity
        </p>

        <Button onClick={handleLoadProxies} style={{ marginBottom: '10px' }}>
          Load Proxies
        </Button>

        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
          {proxies.map((proxy: any, idx: number) => (
            <Card key={idx}>
              <CardTitle>🔌 Proxy {idx + 1}</CardTitle>
              <CardDetail>{proxy}</CardDetail>
            </Card>
          ))}
        </div>

        <Button onClick={handleRotateProxy}>🔄 Rotate Proxy</Button>
      </Section>

      <Section>
        <SectionTitle>✨ Features</SectionTitle>
        <div style={{ fontSize: '14px', lineHeight: '2', color: '#aaa' }}>
          <div>✅ Access blocked websites</div>
          <div>✅ Bypass geo-restrictions</div>
          <div>✅ Automatic proxy rotation</div>
          <div>✅ Encrypted DNS resolution</div>
          <div>✅ Multiple fallback providers</div>
          <div>✅ No connection logs</div>
          <div>✅ 250GB storage cache</div>
          <div>✅ Full internet access</div>
        </div>
      </Section>
    </Container>
  );
};
