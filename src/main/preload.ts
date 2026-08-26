import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Browser APIs
  browser: {
    openTab: (url: string) => ipcRenderer.invoke('browser:open-tab', url),
    closeTab: (tabId: string) => ipcRenderer.invoke('browser:close-tab', tabId),
    getTabs: () => ipcRenderer.invoke('browser:get-tabs'),
    addBookmark: (bookmark: any) => ipcRenderer.invoke('browser:add-bookmark', bookmark),
    getBookmarks: () => ipcRenderer.invoke('browser:get-bookmarks'),
    getHistory: () => ipcRenderer.invoke('browser:get-history'),
  },

  // VPN APIs
  vpn: {
    connect: (serverId: string) => ipcRenderer.invoke('vpn:connect', serverId),
    disconnect: () => ipcRenderer.invoke('vpn:disconnect'),
    getServers: () => ipcRenderer.invoke('vpn:get-servers'),
    getStatus: () => ipcRenderer.invoke('vpn:get-status'),
    testLeaks: () => ipcRenderer.invoke('vpn:test-leaks'),
  },

  // Obfuscation APIs
  obfuscation: {
    getSignature: () => ipcRenderer.invoke('obfuscation:get-signature'),
    rotateFingerprint: () => ipcRenderer.invoke('obfuscation:rotate-fingerprint'),
  },

  // Storage APIs
  storage: {
    getUsage: () => ipcRenderer.invoke('storage:get-usage'),
    clearCache: () => ipcRenderer.invoke('storage:clear-cache'),
  },
});
