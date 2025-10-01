import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      // allow ngrok wildcard by explicit host names when needed
      'ngrok-free.app',
      '6f285f1284ea.ngrok-free.app'
    ]
  }
});
