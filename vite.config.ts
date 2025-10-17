// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use VITE_DEV_LAN_IP when present; fall back to localhost.
const devHost = process.env.VITE_DEV_LAN_IP || 'localhost';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces so the LAN IP works even when VPN is active
    host: true, // equivalent to '0.0.0.0'
    port: 5173,
    strictPort: true,
    // Make the HMR client connect to your LAN IP instead of localhost
    hmr: {
      host: devHost, // e.g., 192.168.1.23
      protocol: 'ws',
      clientPort: 5173,
    },
  },
});
