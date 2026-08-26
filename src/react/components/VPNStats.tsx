import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Container = styled.div`
  flex: 1;
  background: #0f3460;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e94560;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 500px;
  overflow: hidden;
`;

const Title = styled.h3`
  margin: 0 0 15px 0;
  color: #e94560;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
`;

const StatBox = styled.div`
  background: #16213e;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #e94560;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #00d4ff;
`;

const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

interface StatData {
  time: string;
  download: number;
  upload: number;
}

export const VPNStats: React.FC = () => {
  const [stats, setStats] = useState<StatData[]>([
    { time: '00:00', download: 100, upload: 50 },
    { time: '01:00', download: 120, upload: 60 },
    { time: '02:00', download: 140, upload: 70 },
    { time: '03:00', download: 110, upload: 55 },
  ]);
  const [currentDownload, setCurrentDownload] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(0);
  const [bytesTransferred, setBytesTransferred] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate speed updates
      setCurrentDownload(Math.floor(Math.random() * 500));
      setCurrentUpload(Math.floor(Math.random() * 250));
      setBytesTransferred(prev => prev + Math.random() * 1000000);

      // Update stats history
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      setStats(prev => [
        ...prev.slice(-9),
        {
          time: timeStr,
          download: Math.floor(Math.random() * 500),
          upload: Math.floor(Math.random() * 250),
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Container>
      <Title>Connection Stats</Title>
      
      <StatsGrid>
        <StatBox>
          <StatLabel>Download</StatLabel>
          <StatValue>{currentDownload} Mbps</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Upload</StatLabel>
          <StatValue>{currentUpload} Mbps</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Transferred</StatLabel>
          <StatValue>{formatBytes(bytesTransferred)}</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Storage Used</StatLabel>
          <StatValue>128 GB</StatValue>
        </StatBox>
      </StatsGrid>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stats} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#999" style={{ fontSize: 11 }} />
            <YAxis stroke="#999" style={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="download" stroke="#00d4ff" dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="upload" stroke="#e94560" dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Container>
  );
};
