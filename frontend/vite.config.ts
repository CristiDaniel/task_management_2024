import react from '@vitejs/plugin-react';
import { defineConfig, InlineConfig, UserConfig } from 'vite';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, 
    environment: 'jsdom', 
  },
} as VitestConfigExport);
