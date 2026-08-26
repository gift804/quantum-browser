# Quantum Browser - API Reference

## Table of Contents

1. [Browser API](#browser-api)
2. [VPN API](#vpn-api)
3. [Web Access API](#web-access-api)
4. [DNS API](#dns-api)
5. [Proxy API](#proxy-api)
6. [Storage API](#storage-api)
7. [Obfuscation API](#obfuscation-api)

---

## Browser API

Control browser tabs, history, and bookmarks.

### `browser.openTab(url: string)`

Open a new tab with the given URL.

```typescript
const tab = await window.electronAPI.browser.openTab('https://example.com');
// Returns: { id, url, title, isActive, createdAt }
```

### `browser.closeTab(tabId: string)`

Close a tab by ID.

```typescript
const success = await window.electronAPI.browser.closeTab('tab-id-123');
```

### `browser.getTabs()`

Get all open tabs.

```typescript
const tabs = await window.electronAPI.browser.getTabs();
// Returns: Array of tab objects
```

### `browser.addBookmark(bookmark: object)`

Add a bookmark.

```typescript
await window.electronAPI.browser.addBookmark({
  url: 'https://example.com',
  title: 'Example Site',
  folder: 'My Folder'
});
```

### `browser.getBookmarks()`

Get all bookmarks.

```typescript
const bookmarks = await window.electronAPI.browser.getBookmarks();
```

### `browser.getHistory()`

Get browsing history.

```typescript
const history = await window.electronAPI.browser.getHistory();
```

---

## VPN API

Manage VPN connections and servers.

### `vpn.connect(serverId: string)`

Connect to a VPN server.

```typescript
const result = await window.electronAPI.vpn.connect('us-east-1');
// Returns: { success: boolean, message: string }
```

### `vpn.disconnect()`

Disconnect from VPN.

```typescript
const result = await window.electronAPI.vpn.disconnect();
```

### `vpn.getServers()`

Get all available servers.

```typescript
const servers = await window.electronAPI.vpn.getServers();
// Returns: Array of server objects with location, load, ping, bandwidth
```

### `vpn.getStatus()`

Get current VPN connection status.

```typescript
const status = await window.electronAPI.vpn.getStatus();
// Returns: { connected, currentServer, downloadSpeed, uploadSpeed, ping, ... }
```

### `vpn.testLeaks()`

Test for DNS/IP/WebRTC leaks.

```typescript
const leaks = await window.electronAPI.vpn.testLeaks();
// Returns: { ipLeak, dnsLeak, webrtcLeak, ipv6Leak }
```

---

## Web Access API

**Full internet access** - Access any website on the internet.

### `web.accessWebsite(url: string)`

Access any website.

```typescript
const response = await (window.electronAPI as any).web.accessWebsite('https://example.com');
// Returns: { status, data, headers, success }
```

### `web.postToWebsite(url: string, data: object)`

Send POST request to website.

```typescript
const response = await (window.electronAPI as any).web.postToWebsite(
  'https://api.example.com/endpoint',
  { key: 'value' }
);
```

### `web.bypassBlocked(url: string)`

Bypass blocked/filtered websites.

```typescript
const response = await (window.electronAPI as any).web.bypassBlocked('https://blocked-site.com');
// Uses multiple bypass methods: DNS bypass, proxy rotation, etc.
```

### `web.bypassGeoBlock(url: string, region: string)`

Bypass geo-blocking.

```typescript
const response = await (window.electronAPI as any).web.bypassGeoBlock(
  'https://us-only-site.com',
  'US'
);
```

---

## DNS API

Manage DNS resolution and providers.

### `dns.resolve(domain: string)`

Resolve domain to IP addresses.

```typescript
const ips = await (window.electronAPI as any).dns.resolve('example.com');
// Returns: Array of IP addresses
```

### `dns.resolveIPv6(domain: string)`

Resolve domain to IPv6 addresses.

```typescript
const ips = await (window.electronAPI as any).dns.resolveIPv6('example.com');
```

### `dns.getProviders()`

Get all DNS providers.

```typescript
const providers = await (window.electronAPI as any).dns.getProviders();
// Returns: Array of provider objects
```

### `dns.rotateProvider()`

Rotate to random DNS provider.

```typescript
const provider = await (window.electronAPI as any).dns.rotateProvider();
// Returns: Selected provider object
```

---

## Proxy API

Manage proxy servers.

### `proxy.getAll()`

Get all configured proxies.

```typescript
const proxies = await (window.electronAPI as any).proxy.getAll();
// Returns: Array of proxy URLs
```

### `proxy.add(proxy: string)`

Add a custom proxy.

```typescript
await (window.electronAPI as any).proxy.add('socks5://proxy.example.com:9050');
```

### `proxy.rotate()`

Rotate to next proxy.

```typescript
const proxy = await (window.electronAPI as any).proxy.rotate();
// Returns: Current proxy URL
```

---

## Storage API

Manage local storage and cache.

### `storage.getUsage()`

Get storage usage statistics.

```typescript
const usage = await window.electronAPI.storage.getUsage();
// Returns: { used, total, percentage }
```

### `storage.clearCache()`

Clear browser cache.

```typescript
await window.electronAPI.storage.clearCache();
```

---

## Obfuscation API

Manage browser fingerprinting and obfuscation.

### `obfuscation.getSignature()`

Get current browser signature.

```typescript
const signature = await window.electronAPI.obfuscation.getSignature();
// Returns: { userAgent, fingerprint, screenResolution, timezone, ... }
```

### `obfuscation.rotateFingerprint()`

Rotate browser fingerprint.

```typescript
const result = await window.electronAPI.obfuscation.rotateFingerprint();
// Returns: { newFingerprint, userAgent, timestamp }
```

---

## Error Handling

All APIs return promises that may reject:

```typescript
try {
  const result = await window.electronAPI.web.accessWebsite(url);
  if (result.success) {
    console.log('Success:', result.data);
  } else {
    console.error('Failed:', result.status);
  }
} catch (error) {
  console.error('API Error:', error);
}
```

---

## Best Practices

1. **Error Handling**: Always wrap API calls in try-catch
2. **Async/Await**: Use async/await for better readability
3. **Rate Limiting**: Don't spam API calls
4. **Caching**: Cache results when possible
5. **Timeout**: Set timeouts for long operations

---

For more information, see [README.md](../README.md) and [SECURITY.md](../SECURITY.md)
