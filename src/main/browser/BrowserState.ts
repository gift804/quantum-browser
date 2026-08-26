import { StorageManager } from '../storage/StorageManager';
import { v4 as uuidv4 } from 'uuid';

export interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  isActive: boolean;
  createdAt: number;
}

export class BrowserState {
  private tabs: Map<string, Tab> = new Map();
  private activeTabId: string | null = null;
  private storageManager: StorageManager;

  constructor(storageManager: StorageManager) {
    this.storageManager = storageManager;
  }

  async openTab(url: string): Promise<Tab> {
    const tabId = uuidv4();
    const tab: Tab = {
      id: tabId,
      url,
      title: 'Loading...',
      isActive: true,
      createdAt: Date.now(),
    };

    // Deactivate other tabs
    this.tabs.forEach(t => t.isActive = false);

    this.tabs.set(tabId, tab);
    this.activeTabId = tabId;

    // Save to history
    await this.storageManager.saveHistory(url, 'Loading...', 0);

    return tab;
  }

  async closeTab(tabId: string): Promise<boolean> {
    if (this.tabs.has(tabId)) {
      this.tabs.delete(tabId);
      
      if (this.activeTabId === tabId) {
        this.activeTabId = this.tabs.keys().next().value || null;
        if (this.activeTabId) {
          this.tabs.get(this.activeTabId)!.isActive = true;
        }
      }

      return true;
    }
    return false;
  }

  async getTabs(): Promise<Tab[]> {
    return Array.from(this.tabs.values());
  }

  switchTab(tabId: string): boolean {
    if (this.tabs.has(tabId)) {
      this.tabs.forEach(t => t.isActive = false);
      this.tabs.get(tabId)!.isActive = true;
      this.activeTabId = tabId;
      return true;
    }
    return false;
  }

  getActiveTab(): Tab | null {
    return this.activeTabId ? this.tabs.get(this.activeTabId) || null : null;
  }
}
