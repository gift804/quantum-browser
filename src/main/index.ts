import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import path from 'path';
import { StorageManager } from './storage/StorageManager';
import { VPNManager } from './vpn/VPNManager';
import { ObfuscationEngine } from './obfuscation/ObfuscationEngine';
import { BrowserState } from './browser/BrowserState';
import isDev from 'electron-is-dev';

let mainWindow: BrowserWindow | null;
let storageManager: StorageManager;
let vpnManager: VPNManager;
let obfuscationEngine: ObfuscationEngine;
let browserState: BrowserState;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
    icon: path.join(__dirname, '../../assets/icon.png'),
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', async () => {
  // Initialize managers
  storageManager = new StorageManager(250 * 1024 * 1024 * 1024); // 250 GB
  vpnManager = new VPNManager(storageManager);
  obfuscationEngine = new ObfuscationEngine();
  browserState = new BrowserState(storageManager);

  createWindow();
  createMenu();

  // IPC handlers
  setupIPCHandlers();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template as any);
  Menu.setApplicationMenu(menu);
}

function setupIPCHandlers() {
  // Browser state handlers
  ipcMain.handle('browser:open-tab', async (event, url: string) => {
    return await browserState.openTab(url);
  });

  ipcMain.handle('browser:close-tab', async (event, tabId: string) => {
    return await browserState.closeTab(tabId);
  });

  ipcMain.handle('browser:get-tabs', async () => {
    return await browserState.getTabs();
  });

  ipcMain.handle('browser:add-bookmark', async (event, bookmark: any) => {
    return await storageManager.saveBookmark(bookmark);
  });

  ipcMain.handle('browser:get-bookmarks', async () => {
    return await storageManager.getBookmarks();
  });

  ipcMain.handle('browser:get-history', async () => {
    return await storageManager.getHistory();
  });

  // VPN handlers
  ipcMain.handle('vpn:connect', async (event, serverId: string) => {
    return await vpnManager.connect(serverId);
  });

  ipcMain.handle('vpn:disconnect', async () => {
    return await vpnManager.disconnect();
  });

  ipcMain.handle('vpn:get-servers', async () => {
    return await vpnManager.getServers();
  });

  ipcMain.handle('vpn:get-status', async () => {
    return await vpnManager.getStatus();
  });

  ipcMain.handle('vpn:test-leaks', async () => {
    return await vpnManager.testLeaks();
  });

  // Obfuscation/Anti-detection handlers
  ipcMain.handle('obfuscation:get-signature', async () => {
    return obfuscationEngine.getObfuscatedSignature();
  });

  ipcMain.handle('obfuscation:rotate-fingerprint', async () => {
    return obfuscationEngine.rotateFingerprint();
  });

  ipcMain.handle('storage:get-usage', async () => {
    return await storageManager.getStorageUsage();
  });

  ipcMain.handle('storage:clear-cache', async () => {
    return await storageManager.clearCache();
  });
}
