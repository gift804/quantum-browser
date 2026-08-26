import Database from 'better-sqlite3';
import path from 'path';
import os from 'os';
import fs from 'fs-extra';

export class StorageManager {
  private maxStorage: number; // in bytes
  private currentUsage: number = 0;
  private db: Database.Database;
  private storageDir: string;

  constructor(maxStorageBytes: number = 250 * 1024 * 1024 * 1024) {
    this.maxStorage = maxStorageBytes;
    this.storageDir = path.join(os.homedir(), '.quantum-browser');
    
    // Create storage directory
    fs.ensureDirSync(this.storageDir);

    // Initialize database
    const dbPath = path.join(this.storageDir, 'quantum.db');
    this.db = new Database(dbPath);
    
    this.initializeTables();
  }

  private initializeTables() {
    // History table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS history (
        id TEXT PRIMARY KEY,
        url TEXT NOT NULL,
        title TEXT,
        visitedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        duration INTEGER
      )
    `);

    // Bookmarks table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id TEXT PRIMARY KEY,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        folder TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        icon BLOB
      )
    `);

    // Cache table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS cache (
        key TEXT PRIMARY KEY,
        value BLOB NOT NULL,
        expiresAt DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Cookies table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS cookies (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        value TEXT NOT NULL,
        domain TEXT,
        path TEXT DEFAULT '/',
        expires DATETIME,
        secure BOOLEAN DEFAULT 0,
        httpOnly BOOLEAN DEFAULT 0
      )
    `);

    // Storage metadata table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS storage_meta (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `);
  }

  async saveHistory(url: string, title: string, duration: number): Promise<void> {
    const id = Math.random().toString(36).substr(2, 9);
    const stmt = this.db.prepare(`
      INSERT INTO history (id, url, title, duration)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(id, url, title, duration);
  }

  async getHistory(limit: number = 100): Promise<any[]> {
    const stmt = this.db.prepare(`
      SELECT * FROM history ORDER BY visitedAt DESC LIMIT ?
    `);
    return stmt.all(limit) as any[];
  }

  async saveBookmark(bookmark: { url: string; title: string; folder?: string }): Promise<void> {
    const id = Math.random().toString(36).substr(2, 9);
    const stmt = this.db.prepare(`
      INSERT INTO bookmarks (id, url, title, folder)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(id, bookmark.url, bookmark.title, bookmark.folder || 'default');
  }

  async getBookmarks(): Promise<any[]> {
    const stmt = this.db.prepare('SELECT * FROM bookmarks ORDER BY createdAt DESC');
    return stmt.all() as any[];
  }

  async saveCache(key: string, value: Buffer, ttl?: number): Promise<void> {
    const expiresAt = ttl ? new Date(Date.now() + ttl) : null;
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO cache (key, value, expiresAt)
      VALUES (?, ?, ?)
    `);
    stmt.run(key, value, expiresAt);
  }

  async getCache(key: string): Promise<Buffer | null> {
    const stmt = this.db.prepare('SELECT value FROM cache WHERE key = ? AND (expiresAt IS NULL OR expiresAt > datetime("now"))');
    const result = stmt.get(key) as any;
    return result ? result.value : null;
  }

  async clearCache(): Promise<void> {
    this.db.exec('DELETE FROM cache WHERE expiresAt < datetime("now")');
  }

  async getStorageUsage(): Promise<{ used: number; total: number; percentage: number }> {
    const cacheDir = path.join(this.storageDir, 'cache');
    const size = this.getDirSize(cacheDir);
    return {
      used: size,
      total: this.maxStorage,
      percentage: (size / this.maxStorage) * 100,
    };
  }

  private getDirSize(dir: string): number {
    if (!fs.existsSync(dir)) return 0;
    
    let size = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        size += this.getDirSize(filePath);
      } else {
        size += stat.size;
      }
    });
    
    return size;
  }

  close(): void {
    this.db.close();
  }
}
