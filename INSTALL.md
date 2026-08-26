# Installation & Setup Guide

## System Requirements

- **OS**: Windows 10+, macOS 10.15+, Ubuntu 20.04+
- **RAM**: 4GB minimum, 8GB+ recommended
- **Storage**: 300GB available (250GB for VPN cache)
- **Internet**: 10Mbps+ connection
- **Node.js**: 16+ (for development)

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/gift804/quantum-browser.git
cd quantum-browser
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Mode

```bash
npm run dev
```

This will start:
- React dev server (http://localhost:3000)
- Electron app with hot reload
- DevTools enabled

### 4. Production Build

```bash
npm run build
```

Built applications will be in `out/` directory:
- Windows: `Quantum Browser Setup x.x.x.exe`
- macOS: `Quantum Browser-x.x.x.dmg`
- Linux: `quantum-browser-x.x.x.AppImage`

## Features Setup

### Enable VPN

1. Launch Quantum Browser
2. Click **VPN** in sidebar
3. Select a server
4. Click **CONNECT**
5. Wait for connection confirmation

### Access Any Website

1. Go to **Web Access** panel
2. Enter any website URL
3. Click **🌐 Access Website**
4. Use **🔓 Bypass Block** for blocked sites

### Configure DNS

1. Go to **Web Access** panel
2. Click **Load DNS Providers**
3. Select provider or click **🔄 Rotate DNS**

### Manage Proxies

1. Go to **Web Access** panel
2. Click **Load Proxies**
3. Click **🔄 Rotate Proxy** to switch

## Configuration Files

### Location

- **Windows**: `C:\Users\<username>\.quantum-browser\`
- **macOS**: `~/.quantum-browser/`
- **Linux**: `~/.quantum-browser/`

### Files

- `quantum.db` - Main database (history, bookmarks, cache)
- `cache.db` - Cache database (250GB)
- `wireguard/` - WireGuard configs
- `proxies/` - Proxy configurations

## Advanced Setup

### Custom Proxy

1. Go to **Settings**
2. Add proxy in format: `socks5://host:port` or `http://host:port`

### Custom DNS

1. Go to **Settings** → **DNS Settings**
2. Enter custom DNS IP addresses
3. Save and apply

### Storage Management

1. Go to **Settings** → **Storage Management**
2. View current cache size
3. Click **Clear Cache** to free space

## Troubleshooting

### VPN Connection Fails

1. Check internet connection
2. Try different server
3. Restart application
4. Check firewall settings

### Website Access Blocked

1. Click **🔓 Bypass Block**
2. Try different DNS provider
3. Rotate proxy
4. Use different region

### Slow Performance

1. Clear cache (Settings → Storage)
2. Rotate proxy/DNS
3. Connect to closer VPN server
4. Restart application

### High Memory Usage

1. Close unused tabs
2. Clear browser cache
3. Reduce storage cache size
4. Restart application

## Performance Tuning

### For Speed

1. Connect to nearest VPN server
2. Use WireGuard protocol
3. Enable DNS caching
4. Use fast DNS provider (Cloudflare, Quad9)

### For Anonymity

1. Enable auto-rotate fingerprint
2. Rotate proxy every 5 minutes
3. Rotate DNS provider frequently
4. Use multi-hop VPN
5. Enable Kill Switch

### For Storage

1. Increase cache size limit
2. Enable compression
3. Auto-cleanup expired files
4. Regular maintenance

## Security Best Practices

1. **Keep Updated**: Always use latest version
2. **Enable Kill Switch**: Prevent leaks
3. **Rotate Credentials**: Change fingerprint regularly
4. **Monitor Usage**: Check statistics
5. **Clear Logs**: Periodically clear history
6. **Use HTTPS**: Always prefer secure sites
7. **Strong Passwords**: Use complex passwords

## Getting Help

### Documentation
- [README](../README.md)
- [Security Policy](../SECURITY.md)
- [Contributing Guide](../CONTRIBUTING.md)

### Support
- **Email**: support@quantum-browser.dev
- **Issues**: [GitHub Issues](https://github.com/gift804/quantum-browser/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gift804/quantum-browser/discussions)

## System Requirements Details

### Windows
- Windows 10 (build 1909+) or Windows 11
- .NET Framework 4.8+
- Visual C++ Redistributable

### macOS
- macOS 10.15 (Catalina) or newer
- Intel or Apple Silicon support
- Xcode Command Line Tools (for development)

### Linux
- Ubuntu 20.04 LTS or equivalent
- libssl-dev
- build-essential

## Next Steps

1. Read [README](../README.md) for full features
2. Check [Security Policy](../SECURITY.md) for best practices
3. Join [Discussions](https://github.com/gift804/quantum-browser/discussions)
4. Report bugs via [Issues](https://github.com/gift804/quantum-browser/issues)

---

**Happy browsing! 🚀**
