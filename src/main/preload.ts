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

  // Web Access APIs - FULL INTERNET ACCESS
  web: {
    accessWebsite: (url: string) => ipcRenderer.invoke('web:access-website', url),
    postToWebsite: (url: string, data: any) => ipcRenderer.invoke('web:post-to-website', url, data),
    bypassBlocked: (url: string) => ipcRenderer.invoke('web:bypass-blocked', url),
    bypassGeoBlock: (url: string, region: string) => ipcRenderer.invoke('web:bypass-geo-block', url, region),
  },

  // DNS APIs
  dns: {
    resolve: (domain: string) => ipcRenderer.invoke('dns:resolve', domain),
    resolveIPv6: (domain: string) => ipcRenderer.invoke('dns:resolve-ipv6', domain),
    getProviders: () => ipcRenderer.invoke('dns:get-providers'),
    rotateProvider: () => ipcRenderer.invoke('dns:rotate-provider'),
  },

  // Proxy APIs
  proxy: {
    getAll: () => ipcRenderer.invoke('proxy:get-all'),
    add: (proxy: string) => ipcRenderer.invoke('proxy:add', proxy),
    rotate: () => ipcRenderer.invoke('proxy:rotate'),
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
